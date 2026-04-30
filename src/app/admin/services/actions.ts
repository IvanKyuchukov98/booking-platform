"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const CreateServiceSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    description: z
        .string()
        .trim()
        .max(500, "Description is too long")
        .optional()
        .transform((v) => (v && v.length > 0 ? v : null)),
    durationMinutes: z.coerce
        .number()
        .int()
        .min(5, "Duration must be at least 5 minutes")
        .max(8 * 60, "Duration cannot exceed 8 hours"),
    priceCents: z.coerce
        .number()
        .int()
        .min(0, "Price cannot be negative")
        .max(1_000_000, "Price seems too high"),
});

export type CreateServiceState = {
    error: string | null;
    ok: boolean;
};

export async function createService(
    _prevState: CreateServiceState,
    formData: FormData,
): Promise<CreateServiceState> {
    await requireAdmin();

    const parsed = CreateServiceSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        durationMinutes: formData.get("durationMinutes"),
        priceCents: formData.get("priceCents"),
    });

    if (!parsed.success) {
        return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    await prisma.service.create({ data: parsed.data });
    revalidatePath("/admin/services");
    revalidatePath("/services");

    return { ok: true, error: null };
}

export async function toggleServiceActive(serviceId: string) {
    await requireAdmin();

    const service = await prisma.service.findUnique({
        where: { id: serviceId },
        select: { isActive: true },
    });
    if (!service) return;

    await prisma.service.update({
        where: { id: serviceId },
        data: { isActive: !service.isActive },
    });
    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath(`/services/${serviceId}`);
}
