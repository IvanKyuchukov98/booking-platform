"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getOrCreateDbUser } from "@/lib/auth";

const CreateBookingSchema = z.object({
    serviceId: z.string().min(1),
    startsAt: z.coerce.date(),
    notes: z
        .string()
        .trim()
        .max(500, "Notes are too long")
        .optional()
        .transform((v) => (v && v.length > 0 ? v : null)),
});

export type CreateBookingState = {
    error: string | null;
    bookingId: string | null;
};

export async function createBooking(
    _prevState: CreateBookingState,
    formData: FormData,
): Promise<CreateBookingState> {
    const user = await getOrCreateDbUser();
    if (!user) {
        return { error: "You must be signed in to book.", bookingId: null };
    }

    const parsed = CreateBookingSchema.safeParse({
        serviceId: formData.get("serviceId"),
        startsAt: formData.get("startsAt"),
        notes: formData.get("notes"),
    });

    if (!parsed.success) {
        return {
            error: parsed.error.issues[0]?.message ?? "Invalid booking input",
            bookingId: null,
        };
    }

    const { serviceId, startsAt, notes } = parsed.data;

    if (startsAt.getTime() <= Date.now()) {
        return { error: "That slot is in the past.", bookingId: null };
    }

    const service = await prisma.service.findUnique({
        where: { id: serviceId },
        select: { id: true, durationMinutes: true, isActive: true },
    });

    if (!service || !service.isActive) {
        return { error: "Service is no longer available.", bookingId: null };
    }

    const endsAt = new Date(startsAt.getTime() + service.durationMinutes * 60 * 1000);

    const conflict = await prisma.booking.findFirst({
        where: {
            serviceId: service.id,
            status: "CONFIRMED",
            startsAt: { lt: endsAt },
            endsAt: { gt: startsAt },
        },
        select: { id: true },
    });

    if (conflict) {
        return { error: "That slot was just taken. Pick another.", bookingId: null };
    }

    const booking = await prisma.booking.create({
        data: {
            userId: user.id,
            serviceId: service.id,
            startsAt,
            endsAt,
            notes,
        },
        select: { id: true },
    });

    revalidatePath(`/services/${service.id}`);
    revalidatePath("/dashboard");

    return { error: null, bookingId: booking.id };
}
