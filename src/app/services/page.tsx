import Link from "next/link";
import { prisma } from "@/lib/prisma";

function formatPrice(cents: number) {
    return `€${(cents / 100).toFixed(2)}`;
}

function formatDuration(minutes: number) {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    return remainder === 0 ? `${hours}h` : `${hours}h ${remainder}m`;
}

export default async function ServicesPage() {
    const services = await prisma.service.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="mx-auto max-w-5xl px-6 py-12">
            <header className="mb-10">
                <h1 className="mb-2 text-3xl font-bold tracking-tight">Services</h1>
                <p className="text-gray-600">Pick a service to book a slot.</p>
            </header>

            {services.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-500">
                    No services available yet. Check back soon.
                </div>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s) => (
                        <li
                            key={s.id}
                            className="flex flex-col rounded-lg border border-gray-200 bg-white p-5"
                        >
                            <h2 className="mb-1 text-lg font-semibold">{s.name}</h2>
                            {s.description && (
                                <p className="mb-3 text-sm text-gray-600">{s.description}</p>
                            )}
                            <div className="mt-auto flex items-end justify-between pt-4">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        {formatDuration(s.durationMinutes)}
                                    </p>
                                    <p className="text-base font-semibold">
                                        {formatPrice(s.priceCents)}
                                    </p>
                                </div>
                                <Link
                                    href={`/services/${s.id}`}
                                    className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                                >
                                    Book
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
