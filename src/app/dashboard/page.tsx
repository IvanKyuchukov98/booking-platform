import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrCreateDbUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { CancelBookingButton } from "./CancelBookingButton";

function formatPrice(cents: number) {
    return `€${(cents / 100).toFixed(2)}`;
}

function formatWhen(d: Date) {
    return d.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

const bookingInclude = {
    service: { select: { name: true, priceCents: true } },
} as const;

export default async function DashboardPage() {
    const user = await getOrCreateDbUser();
    if (!user) redirect("/");

    const [upcoming, history] = await Promise.all([
        prisma.booking.findMany({
            where: {
                userId: user.id,
                status: "CONFIRMED",
                startsAt: { gt: new Date() },
            },
            include: bookingInclude,
            orderBy: { startsAt: "asc" },
        }),
        prisma.booking.findMany({
            where: {
                userId: user.id,
                OR: [
                    { status: "CANCELLED" },
                    { status: "CONFIRMED", startsAt: { lte: new Date() } },
                ],
            },
            include: bookingInclude,
            orderBy: { startsAt: "desc" },
        }),
    ]);

    const isAdmin = user.role === "ADMIN";
    const total = upcoming.length + history.length;

    return (
        <main className="mx-auto max-w-[1200px] px-4 py-6">
            <Card className="mb-6 flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center">
                <div className="space-y-1">
                    <h1 className="text-2xl leading-[32px] font-semibold text-white-1a1c1c">
                        Welcome, {user.name ?? user.email}.
                    </h1>
                    <p className=" text-gray-5f5e5e">
                        You have{" "}
                        <span className="text-white-1a1c1c font-semibold">
                            {upcoming.length}
                        </span>{" "}
                        upcoming {upcoming.length === 1 ? "booking" : "bookings"}.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href="/services">
                        <Button variant="secondary">Browse services</Button>
                    </Link>
                    {isAdmin && (
                        <Link href="/admin/services">
                            <Button variant="primary">Admin panel</Button>
                        </Link>
                    )}
                </div>
            </Card>

            {total === 0 ? (
                <Card className="p-6">
                    <h2 className="text-xl leading-[28px] font-semibold text-white-1a1c1c mb-3">My bookings</h2>
                    <div className="border border-dashed border-gray-c2c6d6 rounded-lg px-6 py-12 text-center">
                        <p className="text-sm leading-[20px] text-gray-5f5e5e">
                            No bookings yet.{" "}
                            <Link
                                href="/services"
                                className="text-blue-0058be hover:underline font-medium"
                            >
                                Browse services
                            </Link>{" "}
                            to make your first one.
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="space-y-6">
                    {upcoming.length > 0 && (
                        <Card className="overflow-hidden">
                            <div className="bg-white-f3f3f3 border-b border-gray-c2c6d6 px-6 py-3">
                                <h2 className="text-xl leading-[28px] font-semibold text-white-1a1c1c">Upcoming</h2>
                            </div>
                            <ul className="divide-y divide-gray-c2c6d6">
                                {upcoming.map((b) => (
                                    <li
                                        key={b.id}
                                        className="flex items-center justify-between gap-4 px-6 py-4"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white-1a1c1c font-medium">
                                                    {b.service.name}
                                                </span>
                                                <Badge variant="success">Upcoming</Badge>
                                            </div>
                                            <p className="text-sm leading-[20px] text-gray-5f5e5e">
                                                {formatWhen(b.startsAt)} ·{" "}
                                                {formatPrice(b.service.priceCents)}
                                            </p>
                                            {b.notes && (
                                                <p className="text-sm leading-[20px] text-gray-424754 italic">
                                                    &ldquo;{b.notes}&rdquo;
                                                </p>
                                            )}
                                        </div>
                                        <CancelBookingButton bookingId={b.id} />
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}

                    {history.length > 0 && (
                        <Card className="overflow-hidden">
                            <div className="bg-white-f3f3f3 border-b border-gray-c2c6d6 px-6 py-3">
                                <h2 className="text-xl leading-[28px] font-semibold text-white-1a1c1c">History</h2>
                            </div>
                            <ul className="divide-y divide-gray-c2c6d6">
                                {history.map((b) => {
                                    const isCancelled = b.status === "CANCELLED";
                                    return (
                                        <li
                                            key={b.id}
                                            className="flex items-center justify-between gap-4 px-6 py-4"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white-1a1c1c font-medium">
                                                        {b.service.name}
                                                    </span>
                                                    <Badge
                                                        variant={
                                                            isCancelled ? "danger" : "neutral"
                                                        }
                                                    >
                                                        {isCancelled ? "Cancelled" : "Past"}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm leading-[20px] text-gray-5f5e5e">
                                                    {formatWhen(b.startsAt)} ·{" "}
                                                    {formatPrice(b.service.priceCents)}
                                                </p>
                                                {b.notes && (
                                                    <p className="text-sm leading-[20px] text-gray-424754 italic">
                                                        &ldquo;{b.notes}&rdquo;
                                                    </p>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Card>
                    )}
                </div>
            )}
        </main>
    );
}
