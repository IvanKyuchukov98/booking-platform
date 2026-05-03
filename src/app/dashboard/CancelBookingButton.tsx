"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/app/components/ui/Button";
import { cancelBooking } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" variant="secondary" size="sm" disabled={pending}>
            {pending ? "Cancelling…" : "Cancel"}
        </Button>
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
