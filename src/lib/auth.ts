import { auth, currentUser } from "@clerk/nextjs/server";
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