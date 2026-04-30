"use client";

import { useFormStatus } from "react-dom";
import { cancelBooking } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
        >
            {pending ? "Cancelling…" : "Cancel"}
        </button>
    );
}

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
    return (
        <form
            action={cancelBooking.bind(null, bookingId)}
            onSubmit={(e) => {
                if (!confirm("Cancel this booking? This can't be undone.")) {
                    e.preventDefault();
                }
            }}
        >
            <SubmitButton />
        </form>
    );
}
