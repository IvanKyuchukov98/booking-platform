import { Button } from '@/app/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import type { BookingStatus, Room, RoomBooking } from '@prisma/client';
import { LocationIcon } from '@/app/components/icons/LocationIcon';
import { CancelBookingButton } from './CancelBookingButton';

type BookingWithRoom = RoomBooking & { room: Room };

const STATUS_BADGE: Record<
  BookingStatus,
  { label: string; bg: string; text: string }
> = {
  CONFIRMED: {
    label: 'CONFIRMED',
    bg: 'bg-green-86f2e4',
    text: 'text-green-006f66',
  },
  PENDING: {
    label: 'PENDING PAYMENT',
    bg: 'bg-gray-eceef0',
    text: 'text-black-191c1e',
  },
  CANCELLED: {
    label: 'CANCELLED',
    bg: 'bg-pink-ffdad6',
    text: 'text-red-93000a',
  },
};

function formatDateRange(start: Date, end: Date): string {
  const sM = start
    .toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })
    .toUpperCase();
  const eM = end
    .toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })
    .toUpperCase();
  const sD = start.getUTCDate();
  const eD = end.getUTCDate();
  if (sM === eM) return `${sM} ${sD} - ${eD}`;
  return `${sM} ${sD} - ${eM} ${eD}`;
}

function formatReservationNumber(id: string): string {
  return `#HQ-${id.slice(-7).toUpperCase()}`;
}

export function BookingCard({
  booking,
  isUpcoming,
}: {
  booking: BookingWithRoom;
  isUpcoming: boolean;
}) {
  const badge = STATUS_BADGE[booking.status];
  const isPending = booking.status === 'PENDING';
  const isCancelled = booking.status === 'CANCELLED';
  const canCancel = isUpcoming && booking.status === 'CONFIRMED';

  return (
    <div className='relative flex max-w-[600px] flex-col overflow-hidden rounded-[24px] bg-white'>
      <Image
        src={booking.room.imageUrl}
        alt={booking.room.name}
        width={600}
        height={600}
        className='aspect-square object-cover'
      />
      <span
        className={`${badge.bg} ${badge.text} absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold`}
      >
        {badge.label}
      </span>
      <div className='flex justify-between gap-4 p-6'>
        <div className='flex w-full flex-col'>
          <span className='text-green-006a61 text-sm font-semibold'>
            {formatDateRange(booking.checkIn, booking.checkOut)}
          </span>
          <h2 className='text-black-191c1e mt-2 text-2xl font-semibold'>
            {booking.room.name}
          </h2>
          <div className='mt-2 flex items-center gap-1'>
            <LocationIcon className='fill-black-45464d h-4 w-4' />
            <span className='text-black-45464d text-sm font-medium'>
              {booking.room.location}
            </span>
          </div>
          <div className='bg-gray-e6e8eA mt-4 flex rounded-[16px] p-4'>
            <div className='border-gray-94a3b8 flex w-full flex-col border-r'>
              <span className='text-black-45464d text-xs font-semibold'>
                Check-in
              </span>
              <span className='text-black-191c1e text-sm font-bold'>
                14:00 PM
              </span>
            </div>
            <div className='flex w-full flex-col'>
              <span className='text-black-45464d text-end text-xs font-semibold'>
                Reservation
              </span>
              <span className='text-black-191c1e text-end text-sm font-bold'>
                {formatReservationNumber(booking.id)}
              </span>
            </div>
          </div>
          {isPending ? (
            <Link href={`/rooms/${booking.roomId}`} className='mt-6'>
              <Button
                variant='roundedBorder'
                className='!border-gray-76777D h-12 w-full !rounded-[16px] px-6'
              >
                <span className='text-black-191c1e'>Complete Payment</span>
              </Button>
            </Link>
          ) : isCancelled ? (
            <Link href={`/rooms/${booking.roomId}`} className='mt-6'>
              <Button
                variant='roundedBorder'
                className='!border-gray-76777D h-12 w-full !rounded-[16px] px-6'
              >
                <span className='text-black-191c1e'>Book again</span>
              </Button>
            </Link>
          ) : (
            <Link href={`/rooms/${booking.roomId}`} className='mt-6'>
              <Button
                variant='roundedFill'
                className='h-12 w-full !rounded-[16px] bg-black px-6'
              >
                <span className='text-white'>Manage Booking</span>
              </Button>
            </Link>
          )}
          {canCancel ? <CancelBookingButton bookingId={booking.id} /> : null}
        </div>
      </div>
    </div>
  );
}
