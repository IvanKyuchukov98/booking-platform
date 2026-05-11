import type Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getStripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'no signature' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'misconfigured' }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (e) {
    console.error('Stripe signature verification failed:', e);
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;
      if (!bookingId) break;

      const booking = await prisma.roomBooking.findUnique({
        where: { id: bookingId },
      });
      if (!booking || booking.status !== 'PENDING') break;

      const conflicting = await prisma.roomBooking.findFirst({
        where: {
          roomId: booking.roomId,
          id: { not: booking.id },
          status: 'CONFIRMED',
          checkIn: { lt: booking.checkOut },
          checkOut: { gt: booking.checkIn },
        },
      });

      if (conflicting) {
        if (typeof session.payment_intent === 'string') {
          try {
            await getStripe().refunds.create({
              payment_intent: session.payment_intent,
            });
          } catch (e) {
            console.error('Refund failed for booking', bookingId, e);
          }
        }
        await prisma.roomBooking.update({
          where: { id: booking.id },
          data: { status: 'CANCELLED' },
        });
        revalidatePath(`/rooms/${booking.roomId}`);
        revalidatePath('/dashboard');
        break;
      }

      await prisma.roomBooking.updateMany({
        where: { id: booking.id, status: 'PENDING' },
        data: { status: 'CONFIRMED' },
      });
      revalidatePath(`/rooms/${booking.roomId}`);
      revalidatePath('/dashboard');
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;
      if (!bookingId) break;
      const result = await prisma.roomBooking.updateMany({
        where: { id: bookingId, status: 'PENDING' },
        data: { status: 'CANCELLED' },
      });
      if (result.count > 0) {
        const booking = await prisma.roomBooking.findUnique({
          where: { id: bookingId },
        });
        if (booking) revalidatePath(`/rooms/${booking.roomId}`);
        revalidatePath('/dashboard');
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
