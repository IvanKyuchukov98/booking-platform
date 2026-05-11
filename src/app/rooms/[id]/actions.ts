'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getOrCreateDbUser } from '@/lib/auth';
import { getStripe } from '@/lib/stripe';
import {
  BOOKING_PENDING_EXPIRY_MINUTES,
  computeNights,
  computeTotalCents,
  todayIsoDate,
} from '@/lib/booking';

function isOverlapConstraintViolation(e: unknown): boolean {
  // Postgres exclusion_violation = SQLSTATE 23P01.
  // Raised by our `RoomBooking_no_overlap` EXCLUDE constraint when a race
  // beats the JS-side pre-check.
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    const code = (e.meta as { code?: string } | undefined)?.code;
    if (code === '23P01') return true;
  }
  return (
    e instanceof Error && /RoomBooking_no_overlap|exclusion/i.test(e.message)
  );
}

const BookingSchema = z.object({
  roomId: z.string().min(1),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Pick a check-in date.'),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Pick a check-out date.'),
  guests: z.coerce.number().int().min(1).max(50),
});

export type BookingState = { error: string | null };

export async function createBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const user = await getOrCreateDbUser();
  if (!user) return { error: 'Please sign in to book.' };

  const parsed = BookingSchema.safeParse({
    roomId: formData.get('roomId'),
    checkIn: formData.get('checkIn'),
    checkOut: formData.get('checkOut'),
    guests: formData.get('guests'),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' };
  }

  const checkIn = new Date(`${parsed.data.checkIn}T00:00:00Z`);
  const checkOut = new Date(`${parsed.data.checkOut}T00:00:00Z`);
  const today = new Date(`${todayIsoDate()}T00:00:00Z`);

  if (checkIn < today) return { error: 'Check-in must be today or later.' };
  if (checkOut <= checkIn) {
    return { error: 'Check-out must be after check-in.' };
  }

  const room = await prisma.room.findUnique({
    where: { id: parsed.data.roomId },
  });
  if (!room || !room.isActive) return { error: 'Room not available.' };
  if (parsed.data.guests > room.maxGuests) {
    return { error: `This stay sleeps up to ${room.maxGuests} guests.` };
  }

  const expiredBefore = new Date(
    Date.now() - BOOKING_PENDING_EXPIRY_MINUTES * 60 * 1000,
  );
  const overlap = await prisma.roomBooking.findFirst({
    where: {
      roomId: room.id,
      checkIn: { lt: checkOut },
      checkOut: { gt: checkIn },
      OR: [
        { status: 'CONFIRMED' },
        { status: 'PENDING', createdAt: { gte: expiredBefore } },
      ],
    },
  });
  if (overlap) {
    return { error: 'These dates overlap an existing reservation.' };
  }

  const nights = computeNights(parsed.data.checkIn, parsed.data.checkOut);
  const totalCents = computeTotalCents(room.pricePerNight, nights);

  let booking;
  try {
    booking = await prisma.roomBooking.create({
      data: {
        userId: user.id,
        roomId: room.id,
        checkIn,
        checkOut,
        guests: parsed.data.guests,
        totalCents,
        status: 'PENDING',
      },
    });
  } catch (e) {
    if (isOverlapConstraintViolation(e)) {
      return { error: 'These dates were just booked by someone else.' };
    }
    throw e;
  }

  const h = await headers();
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const host = h.get('host') ?? 'localhost:3000';
  const origin = `${proto}://${host}`;

  let checkoutUrl: string | null = null;
  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: totalCents,
            product_data: {
              name: `${nights}-night stay at ${room.name}`,
              description: `${parsed.data.checkIn} → ${parsed.data.checkOut} · ${parsed.data.guests} guest${parsed.data.guests > 1 ? 's' : ''} · ${room.location}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: { bookingId: booking.id },
      success_url: `${origin}/dashboard?bookingId=${booking.id}&payment=success`,
      cancel_url: `${origin}/rooms/${room.id}?payment=cancelled`,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    await prisma.roomBooking.update({
      where: { id: booking.id },
      data: { stripeSessionId: session.id },
    });

    checkoutUrl = session.url;
  } catch (e) {
    console.error('Stripe session creation failed:', e);
    await prisma.roomBooking.update({
      where: { id: booking.id },
      data: { status: 'CANCELLED' },
    });
    return { error: 'Could not start checkout. Please try again.' };
  }

  revalidatePath(`/rooms/${room.id}`);

  if (!checkoutUrl) {
    return { error: 'Stripe did not return a checkout URL.' };
  }
  redirect(checkoutUrl);
}
