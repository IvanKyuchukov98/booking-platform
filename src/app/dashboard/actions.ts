"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getOrCreateDbUser } from "@/lib/auth";

export async function cancelBooking(bookingId: string): Promise<void> {
    const user = await getOrCreateDbUser();
    if (!user) return;

    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        select: { id: true, userId: true, status: true, startsAt: true, serviceId: true },
    });

    if (!booking || booking.userId !== user.id) return;
    if (booking.status !== "CONFIRMED") return;
    if (booking.startsAt.getTime() <= Date.now()) return;

    await prisma.booking.update({
        where: { id: booking.id },
        data: { status: "CANCELLED" },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/services/${booking.serviceId}`);
}
