import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export async function getOrCreateDbUser() {
    const { userId } = await auth();
    if (!userId) return null;

    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) return null;

    const name =
        [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

    return prisma.user.upsert({
        where: { clerkId: userId },
        update: { email, name },
        create: { clerkId: userId, email, name },
    });
}

export async function requireAdmin() {
    const user = await getOrCreateDbUser();
    if (!user) redirect("/");
    if (user.role !== "ADMIN") redirect("/dashboard");
    return user;
}