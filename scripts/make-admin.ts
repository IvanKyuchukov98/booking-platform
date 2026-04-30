import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];
    if (!email) {
        console.error("Usage: npm run db:make-admin -- <email>");
        process.exit(1);
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
        console.error(
            `No user with email "${email}" in the DB.\n` +
                `Sign in at least once with that email first — the Clerk-to-DB sync runs on first dashboard load.`,
        );
        process.exit(1);
    }

    const user = await prisma.user.update({
        where: { email },
        data: { role: "ADMIN" },
    });

    console.log(`OK — ${user.email} is now ADMIN (was ${existing.role})`);
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
