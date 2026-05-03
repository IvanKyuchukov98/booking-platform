import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";

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
        <main className="mx-auto max-w-[1200px] px-4 py-6">
            <header className="mb-6">
                <h1 className="text-2xl leading-[32px] font-semibold text-white-1a1c1c mb-1">Services</h1>
                <p className="text-gray-5f5e5e">Pick a service to book a slot.</p>
            </header>

            {services.length === 0 ? (
                <Card className="p-6">
                    <div className="border border-dashed border-gray-c2c6d6 rounded-lg px-6 py-12 text-center">
                        <p className="text-sm leading-[20px] text-gray-5f5e5e">
                            No services available yet. Check back soon.
                        </p>
                    </div>
                </Card>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s) => (
                        <Card key={s.id} className="flex flex-col p-6">
                            <h2 className="text-xl leading-[28px] font-semibold text-white-1a1c1c mb-1">{s.name}</h2>
                            {s.description && (
                                <p className="text-sm leading-[20px] text-gray-5f5e5e mb-4">
                                    {s.description}
                                </p>
                            )}
                            <div className="mt-auto flex items-end justify-between pt-4">
                                <div>
                                    <p className="text-xs leading-[16px] font-medium text-gray-727785 uppercase tracking-wide">
                                        {formatDuration(s.durationMinutes)}
                                    </p>
                                    <p className="text-xl leading-[28px] font-semibold text-white-1a1c1c mt-1">
                                        {formatPrice(s.priceCents)}
                                    </p>
                                </div>
                                <Link href={`/services/${s.id}`}>
                                    <Button variant="primary">Book</Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </ul>
            )}
        </main>
    );
}
