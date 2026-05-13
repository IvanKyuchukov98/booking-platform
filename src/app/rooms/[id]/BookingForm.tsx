'use client';

import { useActionState, useEffect, useMemo, useRef, useState } from 'react';
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
import { Calendar } from './Calendar';
import { GuestsSelect } from './GuestsSelect';
import { createBooking, type BookingState } from './actions';

type Props = {
  roomId: string;
  pricePerNight: number;
  maxGuests: number;
  today: string;
  initialCheckIn: string;
  initialCheckOut: string;
  reservedDates: string[];
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

function formatDisplay(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function BookingForm({
  roomId,
  pricePerNight,
  maxGuests,
  today,
  initialCheckIn,
  initialCheckOut,
  reservedDates,
}: Props) {
  const reservedSet = useMemo(() => new Set(reservedDates), [reservedDates]);
  const sortedReserved = useMemo(
    () => [...reservedDates].sort(),
    [reservedDates],
  );

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(2 > maxGuests ? 1 : 2);
  const [openPicker, setOpenPicker] = useState<
    'in' | 'out' | 'guests' | null
  >(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openPicker) return;
    function onDown(e: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node)
      ) {
        setOpenPicker(null);
      }
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [openPicker]);

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

  const checkOutDisabled = useMemo(() => {
    const nextReserved = sortedReserved.find((d) => d > checkIn);
    if (!nextReserved) return reservedSet;
    const combined = new Set(reservedSet);
    let cursor = addDays(nextReserved, 1);
    for (let i = 0; i < 365; i++) {
      combined.add(cursor);
      cursor = addDays(cursor, 1);
    }
    return combined;
  }, [reservedSet, sortedReserved, checkIn]);

  function handleSelectCheckIn(iso: string) {
    setCheckIn(iso);
    const nextReserved = sortedReserved.find((d) => d > iso);
    let newOut = checkOut;
    if (computeNights(iso, newOut) <= 0) newOut = addDays(iso, 1);
    if (nextReserved && newOut > nextReserved) newOut = nextReserved;
    setCheckOut(newOut);
    setOpenPicker('out');
  }

  function handleSelectCheckOut(iso: string) {
    setCheckOut(iso);
    setOpenPicker(null);
  }

  return (
    <form
      action={formAction}
      className='border-gray-cfcfcf flex h-fit w-[380px] shrink-0 flex-col rounded-[16px] border bg-white p-6'
    >
      <input type='hidden' name='roomId' value={roomId} />
      <input type='hidden' name='checkIn' value={checkIn} />
      <input type='hidden' name='checkOut' value={checkOut} />

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
      <div
        ref={pickerRef}
        className='border-gray-cfcfcf relative mt-6 flex flex-col rounded-[12px] border'
      >
        <div className='border-gray-cfcfcf flex border-b'>
          <button
            type='button'
            onClick={() => setOpenPicker(openPicker === 'in' ? null : 'in')}
            className='border-gray-cfcfcf flex w-full cursor-pointer flex-col border-r p-3 text-left'
          >
            <span className='text-black-45464d text-xs font-bold'>
              CHECK-IN
            </span>
            <span className='text-black-191c1e mt-0.5 text-sm'>
              {formatDisplay(checkIn)}
            </span>
          </button>
          <button
            type='button'
            onClick={() => setOpenPicker(openPicker === 'out' ? null : 'out')}
            className='flex w-full cursor-pointer flex-col p-3 text-left'
          >
            <span className='text-black-45464d text-xs font-bold'>
              CHECK-OUT
            </span>
            <span className='text-black-191c1e mt-0.5 text-sm'>
              {formatDisplay(checkOut)}
            </span>
          </button>
        </div>
        <GuestsSelect
          name='guests'
          value={guests}
          maxGuests={maxGuests}
          open={openPicker === 'guests'}
          onToggle={() =>
            setOpenPicker(openPicker === 'guests' ? null : 'guests')
          }
          onChange={(n) => {
            setGuests(n);
            setOpenPicker(null);
          }}
        />

        {openPicker === 'in' ? (
          <div className='absolute top-full left-0 z-20 mt-2'>
            <Calendar
              selected={checkIn}
              minDate={today}
              disabledDates={reservedSet}
              onSelect={handleSelectCheckIn}
            />
          </div>
        ) : null}
        {openPicker === 'out' ? (
          <div className='absolute top-full right-0 z-20 mt-2'>
            <Calendar
              selected={checkOut}
              minDate={addDays(checkIn, 1)}
              disabledDates={checkOutDisabled}
              onSelect={handleSelectCheckOut}
            />
          </div>
        ) : null}
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
