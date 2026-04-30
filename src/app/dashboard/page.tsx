import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrCreateDbUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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
        <main className="mx-auto max-w-4xl px-6 py-16">
            <div className="mb-10 flex items-start justify-between gap-4">
                <div>
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">
                        Welcome, {user.name ?? user.email}.
                    </h1>
                    <p className="text-gray-600">
                        You have <strong>{upcoming.length}</strong> upcoming{" "}
                        {upcoming.length === 1 ? "booking" : "bookings"}.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href="/services"
                        className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                    >
                        Browse services
                    </Link>
                    {isAdmin && (
                        <Link
                            href="/admin/services"
                            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                        >
                            Admin panel
                        </Link>
                    )}
                </div>
            </div>

            {total === 0 ? (
                <section>
                    <h2 className="mb-4 text-lg font-semibold">My bookings</h2>
                    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
                        No bookings yet.{" "}
                        <Link href="/services" className="text-gray-900 underline">
                            Browse services
                        </Link>{" "}
                        to make your first one.
                    </div>
                </section>
            ) : (
                <div className="space-y-10">
                    {upcoming.length > 0 && (
                        <section>
                            <h2 className="mb-4 text-lg font-semibold">Upcoming</h2>
                            <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
                                {upcoming.map((b) => (
                                    <li
                                        key={b.id}
                                        className="flex items-center justify-between gap-4 px-5 py-4"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{b.service.name}</span>
                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                                                    Upcoming
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {formatWhen(b.startsAt)}
                                            </p>
                                            {b.notes && (
                                                <p className="mt-1 text-xs italic text-gray-500">
                                                    &ldquo;{b.notes}&rdquo;
                                                </p>
                                            )}
                                            <p className="mt-1 text-xs text-gray-500">
                                                {formatPrice(b.service.priceCents)}
                                            </p>
                                        </div>
                                        <CancelBookingButton bookingId={b.id} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {history.length > 0 && (
                        <section>
                            <h2 className="mb-4 text-lg font-semibold">History</h2>
                            <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
                                {history.map((b) => {
                                    const isCancelled = b.status === "CANCELLED";
                                    return (
                                        <li
                                            key={b.id}
                                            className="flex items-center justify-between gap-4 px-5 py-4"
                                        >
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">
                                                        {b.service.name}
                                                    </span>
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-xs ${
                                                            isCancelled
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-gray-100 text-gray-700"
                                                        }`}
                                                    >
                                                        {isCancelled ? "Cancelled" : "Past"}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {formatWhen(b.startsAt)}
                                                </p>
                                                {b.notes && (
                                                    <p className="mt-1 text-xs italic text-gray-500">
                                                        &ldquo;{b.notes}&rdquo;
                                                    </p>
                                                )}
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {formatPrice(b.service.priceCents)}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    )}
                </div>
            )}
        </main>
    );
}
