"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createBooking, type CreateBookingState } from "./actions";

const initialState: CreateBookingState = { error: null, bookingId: null };

type SlotOption = {
    value: string;
    label: string;
};

export function BookingForm({
    serviceId,
    slots,
}: {
    serviceId: string;
    slots: SlotOption[];
}) {
    const [state, formAction, isPending] = useActionState(createBooking, initialState);

    if (state.bookingId) {
        return (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h2 className="mb-1 text-lg font-semibold text-green-900">Booked.</h2>
                <p className="mb-4 text-sm text-green-800">
                    Your appointment is confirmed. You&apos;ll see it on your dashboard.
                </p>
                <Link
                    href="/dashboard"
                    className="inline-block rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Go to dashboard
                </Link>
            </div>
        );
    }

    if (slots.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
                No open slots in the next 7 days. Try again later.
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
            <input type="hidden" name="serviceId" value={serviceId} />

            <div>
                <label htmlFor="startsAt" className="mb-1 block text-sm font-medium text-gray-700">
                    Pick a slot
                </label>
                <select
                    id="startsAt"
                    name="startsAt"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Choose a date and time…
                    </option>
                    {slots.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="notes" className="mb-1 block text-sm font-medium text-gray-700">
                    Notes <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    maxLength={500}
                    placeholder="Anything we should know?"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
                />
            </div>

            {state.error && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {state.error}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
                {isPending ? "Booking…" : "Confirm booking"}
            </button>
        </form>
    );
}
