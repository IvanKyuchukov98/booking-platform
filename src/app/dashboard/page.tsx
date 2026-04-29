import { redirect } from "next/navigation";
import { getOrCreateDbUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
    const user = await getOrCreateDbUser();
    if (!user) redirect("/");

    const bookingCount = await prisma.booking.count({ where: { userId: user.id } });

    return (
        <main className="mx-auto max-w-4xl px-6 py-16">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
                Welcome, {user.name ?? user.email}.
            </h1>
            <p className="mb-10 text-gray-600">
                You have <strong>{bookingCount}</strong> bookings.
            </p>

            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
                Empty
            </div>
        </main>
    );
}