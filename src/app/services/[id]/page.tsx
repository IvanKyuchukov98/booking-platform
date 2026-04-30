import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { generateAvailableSlots, formatSlotLabel } from "@/lib/slots";
import { BookingForm } from "./BookingForm";

function formatPrice(cents: number) {
    return `€${(cents / 100).toFixed(2)}`;
}

function formatDuration(minutes: number) {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    return remainder === 0 ? `${hours}h` : `${hours}h ${remainder}m`;
}

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const service = await prisma.service.findUnique({ where: { id } });
    if (!service || !service.isActive) notFound();

    const { userId } = await auth();

    const upcomingBookings = await prisma.booking.findMany({
        where: {
            serviceId: service.id,
            status: "CONFIRMED",
            endsAt: { gt: new Date() },
        },
        select: { startsAt: true, endsAt: true },
    });

    const slots = generateAvailableSlots({
        durationMinutes: service.durationMinutes,
        existingBookings: upcomingBookings,
    });

    const slotOptions = slots.map((s) => ({
        value: s.startsAt.toISOString(),
        label: formatSlotLabel(s),
    }));

    return (
        <main className="mx-auto max-w-2xl px-6 py-12">
            <Link
                href="/services"
                className="mb-6 inline-block text-sm text-gray-500 hover:text-gray-700"
            >
                ← Back to services
            </Link>

            <header className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
                <h1 className="mb-2 text-2xl font-bold tracking-tight">{service.name}</h1>
                {service.description && (
                    <p className="mb-3 text-gray-600">{service.description}</p>
                )}
                <p className="text-sm text-gray-500">
                    {formatDuration(service.durationMinutes)} · {formatPrice(service.priceCents)}
                </p>
            </header>

            {userId ? (
                <BookingForm serviceId={service.id} slots={slotOptions} />
            ) : (
                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
                    <p className="mb-4 text-sm text-gray-700">Sign in to book this service.</p>
                    <Link
                        href="/"
                        className="inline-block rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        Go to home & sign in
                    </Link>
                </div>
            )}
        </main>
    );
}
