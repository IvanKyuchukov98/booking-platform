import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
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
        <main className="mx-auto max-w-2xl px-4 py-6">
            <Link
                href="/services"
                className="inline-block mb-4 text-sm leading-[20px] text-gray-5f5e5e hover:text-white-1a1c1c transition-colors"
            >
                ← Back to services
            </Link>

            <Card className="mb-6 p-6">
                <h1 className="text-2xl leading-[32px] font-semibold text-white-1a1c1c mb-1">{service.name}</h1>
                {service.description && (
                    <p className=" text-gray-5f5e5e mb-3">
                        {service.description}
                    </p>
                )}
                <p className="text-xs leading-[16px] font-medium text-gray-727785 uppercase tracking-wide">
                    {formatDuration(service.durationMinutes)} ·{" "}
                    {formatPrice(service.priceCents)}
                </p>
            </Card>

            {userId ? (
                <BookingForm serviceId={service.id} slots={slotOptions} />
            ) : (
                <Card className="p-6 text-center">
                    <p className="text-white-1a1c1c mb-4">
                        Sign in to book this service.
                    </p>
                    <Link href="/">
                        <Button variant="primary">Go to home & sign in</Button>
                    </Link>
                </Card>
            )}
        </main>
    );
}
