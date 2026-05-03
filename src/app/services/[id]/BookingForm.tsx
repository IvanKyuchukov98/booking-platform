"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Label, Select, Textarea } from "@/app/components/ui/Input";
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
            <Card className="p-6">
                <div className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-800 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-xl leading-[28px] font-semibold">
                        ✓
                    </div>
                    <div className="flex-1 space-y-2">
                        <h2 className="text-xl leading-[28px] font-semibold text-white-1a1c1c">Booked.</h2>
                        <p className="text-sm leading-[20px] text-gray-5f5e5e">
                            Your appointment is confirmed. You&apos;ll see it on your dashboard.
                        </p>
                        <Link href="/dashboard" className="inline-block pt-2">
                            <Button variant="primary">Go to dashboard</Button>
                        </Link>
                    </div>
                </div>
            </Card>
        );
    }

    if (slots.length === 0) {
        return (
            <Card className="p-6">
                <div className="border border-dashed border-gray-c2c6d6 rounded-lg px-6 py-12 text-center">
                    <p className="text-sm leading-[20px] text-gray-5f5e5e">
                        No open slots in the next 7 days. Try again later.
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <form action={formAction} className="space-y-4">
                <input type="hidden" name="serviceId" value={serviceId} />

                <div>
                    <Label htmlFor="startsAt">Pick a slot</Label>
                    <Select id="startsAt" name="startsAt" required defaultValue="">
                        <option value="" disabled>
                            Choose a date and time…
                        </option>
                        {slots.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </Select>
                </div>

                <div>
                    <Label htmlFor="notes">
                        Notes <span className="text-gray-727785">(optional)</span>
                    </Label>
                    <Textarea
                        id="notes"
                        name="notes"
                        rows={2}
                        maxLength={500}
                        placeholder="Anything we should know?"
                    />
                </div>

                {state.error && (
                    <p className="bg-pink-ffdad6 text-red-93000a rounded-md px-3 py-2 text-sm leading-[20px]">
                        {state.error}
                    </p>
                )}

                <Button type="submit" variant="primary" disabled={isPending}>
                    {isPending ? "Booking…" : "Confirm booking"}
                </Button>
            </form>
        </Card>
    );
}
