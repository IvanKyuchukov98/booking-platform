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

type BookingRowStatus = "upcoming" | "past" | "cancelled";

function rowStatus(b: { status: "CONFIRMED" | "CANCELLED"; startsAt: Date }): BookingRowStatus {
    if (b.status === "CANCELLED") return "cancelled";
    if (b.startsAt.getTime() <= Date.now()) return "past";
    return "upcoming";
}

const badgeClass: Record<BookingRowStatus, string> = {
    upcoming: "bg-green-100 text-green-800",
    past: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-800",
};

const badgeLabel: Record<BookingRowStatus, string> = {
    upcoming: "Upcoming",
    past: "Past",
    cancelled: "Cancelled",
};

export default async function DashboardPage() {
    const user = await getOrCreateDbUser();
    if (!user) redirect("/");

    const bookings = await prisma.booking.findMany({
        where: { userId: user.id },
        include: { service: { select: { name: true, priceCents: true } } },
        orderBy: { startsAt: "desc" },
    });

    const upcomingCount = bookings.filter(
        (b) => b.status === "CONFIRMED" && b.startsAt.getTime() > Date.now(),
    ).length;
    const isAdmin = user.role === "ADMIN";

    return (
        <main className="mx-auto max-w-4xl px-6 py-16">
            <div className="mb-10 flex items-start justify-between gap-4">
                <div>
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">
                        Welcome, {user.name ?? user.email}.
                    </h1>
                    <p className="text-gray-600">
                        You have <strong>{upcomingCount}</strong> upcoming{" "}
                        {upcomingCount === 1 ? "booking" : "bookings"}.
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

            <section>
                <h2 className="mb-4 text-lg font-semibold">My bookings</h2>

                {bookings.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
                        No bookings yet.{" "}
                        <Link href="/services" className="text-gray-900 underline">
                            Browse services
                        </Link>{" "}
                        to make your first one.
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
                        {bookings.map((b) => {
                            const status = rowStatus(b);
                            return (
                                <li
                                    key={b.id}
                                    className="flex items-center justify-between gap-4 px-5 py-4"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{b.service.name}</span>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs ${badgeClass[status]}`}
                                            >
                                                {badgeLabel[status]}
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
                                    {status === "upcoming" && (
                                        <CancelBookingButton bookingId={b.id} />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </main>
    );
}