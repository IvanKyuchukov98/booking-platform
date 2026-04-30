import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrCreateDbUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
    const user = await getOrCreateDbUser();
    if (!user) redirect("/");

    const bookingCount = await prisma.booking.count({ where: { userId: user.id } });
    const isAdmin = user.role === "ADMIN";

    return (
        <main className="mx-auto max-w-4xl px-6 py-16">
            <div className="mb-10 flex items-start justify-between gap-4">
                <div>
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">
                        Welcome, {user.name ?? user.email}.
                    </h1>
                    <p className="text-gray-600">
                        You have <strong>{bookingCount}</strong> bookings.
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

            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
                My bookings list — coming Day 5
            </div>
        </main>
    );
}