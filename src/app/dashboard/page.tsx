import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
    const { userId } = await auth();
    if (!userId) redirect("/");

    const user = await currentUser();
    const greeting = user?.firstName ?? user?.emailAddresses[0]?.emailAddress ?? "there";

    return (
        <main className="mx-auto max-w-4xl px-6 py-16">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
                Welcome, {greeting}.
            </h1>
            <p className="mb-10 text-gray-600">
               Dashobard content
            </p>

            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
                Empty for now
            </div>
        </main>
    );
}