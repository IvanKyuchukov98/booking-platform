'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  cancelBooking,
  type CancelBookingState,
} from '../../dashboard/actions';

function SubmitText() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='text-black-45464d hover:text-black-191c1e mt-2 cursor-pointer text-center text-sm font-medium underline disabled:opacity-60'
    >
      {pending ? 'Cancelling…' : 'Cancel booking'}
    </button>
  );
}

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [state, formAction] = useActionState<CancelBookingState, FormData>(
    cancelBooking.bind(null, bookingId),
    { error: null }
  );
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (
          !confirm('Cancel this booking? You will be refunded the full amount.')
        ) {
          e.preventDefault();
        }
      }}
      className='flex flex-col'
    >
      <SubmitText />
      {state.error ? (
        <span className='text-red-ba1a1a mt-1 text-center text-xs'>
          {state.error}
        </span>
      ) : null}
    </form>
  );
}
