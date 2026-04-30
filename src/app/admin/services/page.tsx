import { prisma } from "@/lib/prisma";
import { CreateServiceForm } from "./CreateServiceForm";
import { toggleServiceActive } from "./actions";

function formatPrice(cents: number) {
    return `€${(cents / 100).toFixed(2)}`;
}

function formatDuration(minutes: number) {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    return remainder === 0 ? `${hours}h` : `${hours}h ${remainder}m`;
}

export default async function AdminServicesPage() {
    const services = await prisma.service.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
            <CreateServiceForm />

            <section>
                <h2 className="mb-4 text-lg font-semibold">All services ({services.length})</h2>

                {services.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
                        No services yet. Create your first one →
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
                        {services.map((s) => (
                            <li
                                key={s.id}
                                className="flex items-center justify-between gap-4 px-5 py-4"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{s.name}</span>
                                        {!s.isActive && (
                                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                                Hidden
                                            </span>
                                        )}
                                    </div>
                                    {s.description && (
                                        <p className="mt-0.5 text-sm text-gray-600">
                                            {s.description}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">
                                        {formatDuration(s.durationMinutes)} ·{" "}
                                        {formatPrice(s.priceCents)}
                                    </p>
                                </div>
                                <form action={toggleServiceActive.bind(null, s.id)}>
                                    <button
                                        type="submit"
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        {s.isActive ? "Hide" : "Show"}
                                    </button>
                                </form>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
