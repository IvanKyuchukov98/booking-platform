import { prisma } from "@/lib/prisma";
import { CreateServiceForm } from "./CreateServiceForm";
import { AdminServicesTable } from "./AdminServicesTable";

export default async function AdminServicesPage() {
    const services = await prisma.service.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
            <CreateServiceForm />

            <section>
                <h2 className="mb-4 text-lg font-semibold">All services ({services.length})</h2>
                <AdminServicesTable data={services} />
            </section>
        </div>
    );
}
