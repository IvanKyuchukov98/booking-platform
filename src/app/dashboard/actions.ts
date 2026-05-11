'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getOrCreateDbUser } from '@/lib/auth';
import { getStripe } from '@/lib/stripe';

export type CancelBookingState = { error: string | null };

export async function cancelBooking(
  bookingId: string,
  _prev: CancelBookingState,
  _formData: FormData,
): Promise<CancelBookingState> {
  const user = await getOrCreateDbUser();
  if (!user) return { error: 'Please sign in.' };

  const booking = await prisma.roomBooking.findUnique({
    where: { id: bookingId },
  });
  if (!booking) return { error: 'Booking not found.' };
  if (booking.userId !== user.id) {
    return { error: 'You can only cancel your own bookings.' };
  }
  if (booking.status !== 'CONFIRMED') {
    return { error: 'Only confirmed bookings can be cancelled.' };
  }
  if (booking.checkIn <= new Date()) {
    return { error: 'Cannot cancel a trip that has already started.' };
  }

  if (booking.stripeSessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(
        booking.stripeSessionId,
      );
      if (typeof session.payment_intent === 'string') {
        await getStripe().refunds.create(
          { payment_intent: session.payment_intent },
          { idempotencyKey: `refund-${bookingId}` },
        );
      }
    } catch (e) {
      console.error('Refund failed for booking', bookingId, e);
      return {
        error:
          'Refund could not be processed. Please try again or contact support.',
      };
    }
  } else {
    console.warn('Cancelling booking without stripeSessionId', bookingId);
  }

  const result = await prisma.roomBooking.updateMany({
    where: { id: bookingId, status: 'CONFIRMED' },
    data: { status: 'CANCELLED' },
  });

  if (result.count === 0) {
    return { error: 'Booking is no longer in a cancellable state.' };
  }

  revalidatePath('/dashboard');
  revalidatePath(`/rooms/${booking.roomId}`);
  return { error: null };
}
