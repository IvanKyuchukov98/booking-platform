'use client';

import { useActionState, useMemo, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/app/components/ui/Button';
import { StarIcon } from '@/app/components/icons/StarIcon';
import { formatPrice } from '@/lib/amenities';
import {
  CLEANING_FEE_CENTS,
  SERVICE_FEE_CENTS,
  addDays,
  computeNights,
  computeTotalCents,
} from '@/lib/booking';
import { createBooking, type BookingState } from './actions';

type Props = {
  roomId: string;
  pricePerNight: number;
  maxGuests: number;
  initialCheckIn: string;
  initialCheckOut: string;
};

function ReserveButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant='roundedFill'
      className='bg-green-0d9488 mt-6 h-14 !rounded-[12px] disabled:opacity-60'
    >
      <span className='font-bold text-white'>
        {pending ? 'Reserving…' : 'Reserve'}
      </span>
    </Button>
  );
}

export function BookingForm({
  roomId,
  pricePerNight,
  maxGuests,
  initialCheckIn,
  initialCheckOut,
}: Props) {
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(2 > maxGuests ? 1 : 2);

  const [state, formAction] = useActionState<BookingState, FormData>(
    createBooking,
    { error: null },
  );

  const nights = useMemo(
    () => computeNights(checkIn, checkOut),
    [checkIn, checkOut],
  );
  const subtotalCents = nights * pricePerNight;
  const totalCents = computeTotalCents(pricePerNight, nights);

  return (
    <form
      action={formAction}
      className='border-gray-cfcfcf flex h-fit w-[380px] shrink-0 flex-col rounded-[16px] border bg-white p-6'
    >
      <input type='hidden' name='roomId' value={roomId} />

      <div className='flex items-center justify-between'>
        <div className='flex items-end gap-1'>
          <span className='text-black-191c1e text-2xl font-bold'>
            {formatPrice(pricePerNight)}
          </span>
          <span className='text-black-45464d mb-0.5'>/ night</span>
        </div>
        <div className='flex items-center gap-1'>
          <StarIcon className='fill-green-0d9488 h-4 w-4' />
          <span className='text-black-191c1e'>4.98 · 124 reviews</span>
        </div>
      </div>
      <div className='border-gray-cfcfcf mt-6 flex flex-col rounded-[12px] border'>
        <div className='border-gray-cfcfcf flex border-b'>
          <div className='border-gray-cfcfcf flex w-full flex-col border-r p-3'>
            <label
              htmlFor='checkIn'
              className='text-black-45464d text-xs font-bold'
            >
              CHECK-IN
            </label>
            <input
              id='checkIn'
              type='date'
              name='checkIn'
              value={checkIn}
              min={initialCheckIn}
              onChange={(e) => {
                const v = e.target.value;
                setCheckIn(v);
                if (computeNights(v, checkOut) <= 0) {
                  setCheckOut(addDays(v, 1));
                }
              }}
              required
              className='text-black-191c1e cursor-pointer bg-transparent text-sm outline-none'
            />
          </div>
          <div className='flex w-full flex-col p-3'>
            <label
              htmlFor='checkOut'
              className='text-black-45464d text-xs font-bold'
            >
              CHECK-OUT
            </label>
            <input
              id='checkOut'
              type='date'
              name='checkOut'
              value={checkOut}
              min={addDays(checkIn, 1)}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className='text-black-191c1e cursor-pointer bg-transparent text-sm outline-none'
            />
          </div>
        </div>
        <div className='border-gray-cfcfcf flex w-full flex-col border-r p-3'>
          <label
            htmlFor='guests'
            className='text-black-45464d text-xs font-bold'
          >
            GUESTS
          </label>
          <select
            id='guests'
            name='guests'
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className='text-black-191c1e w-fit cursor-pointer appearance-none bg-transparent pr-1 text-sm outline-none'
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ReserveButton />

      <span className='text-black-45464d mt-4 text-center text-xs'>
        You won&apos;t be charged yet
      </span>

      {state.error ? (
        <span className='text-red-ba1a1a mt-2 text-center text-xs font-semibold'>
          {state.error}
        </span>
      ) : null}

      <div className='text-black-191c1e border-gray-cfcfcf mt-6 flex flex-col gap-4 border-b pb-6'>
        <div className='flex items-center justify-between gap-4'>
          <span>
            {formatPrice(pricePerNight)} x {nights}{' '}
            {nights === 1 ? 'night' : 'nights'}
          </span>
          <span>{formatPrice(subtotalCents)}</span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <span>Cleaning fee</span>
          <span>{formatPrice(CLEANING_FEE_CENTS)}</span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <span>Service fee</span>
          <span>{formatPrice(SERVICE_FEE_CENTS)}</span>
        </div>
      </div>

      <div className='text-black-191c1e mt-6 flex justify-between gap-4 text-lg font-bold'>
        <span>Total</span>
        <span>{formatPrice(totalCents)}</span>
      </div>
    </form>
  );
}
