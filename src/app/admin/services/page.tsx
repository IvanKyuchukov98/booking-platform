import { prisma } from "@/lib/prisma";
import { CreateServiceForm } from "./CreateServiceForm";
import { AdminServicesTable } from "./AdminServicesTable";

export default async function AdminServicesPage() {
    const services = await prisma.service.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <CreateServiceForm />

            <section>
                <h2 className="text-xl leading-[28px] font-semibold text-white-1a1c1c mb-3">
                    All services{" "}
                    <span className="text-gray-5f5e5e font-normal">({services.length})</span>
                </h2>
                <AdminServicesTable data={services} />
            </section>
        </div>
    );
}
