import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";

const features = [
    {
        title: "Easy booking",
        body: "Find an open slot and confirm in under 30 seconds. No accounts to create, no friction.",
    },
    {
        title: "No phone tag",
        body: "Real-time availability means no double-booking, no missed calls, no rescheduling chains.",
    },
    {
        title: "Manage online",
        body: "Reschedule or cancel from any device. Your dashboard keeps everything organized.",
    },
];

export default function Home() {
    return (
        <main>
            <section className="mx-auto max-w-[1200px] px-4 py-24 md:py-32">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-white-1a1c1c mb-4 text-4xl font-semibold tracking-tight md:text-6xl">
                        Book your next appointment in seconds.
                    </h1>
                    <p className="text-gray-424754 mb-6 md:text-lg">
                        BookSpace helps local service providers — barbers, coaches,
                        therapists — manage their schedule and lets customers reserve a
                        slot without phone tag.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link href="/services">
                            <Button variant="primary">Browse services</Button>
                        </Link>
                    </div>
                    <div className="text-gray-5f5e5e mt-6 inline-flex items-center gap-2 rounded-full border border-gray-c2c6d6 bg-white px-3 py-1 text-xs leading-[16px] font-medium">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        Building in public — MVP shipped this week
                    </div>
                </div>
            </section>

            <section className="bg-white-f3f3f3 border-y border-gray-c2c6d6 py-24">
                <div className="mx-auto max-w-[1200px] px-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {features.map((f) => (
                            <Card
                                key={f.title}
                                className="p-6 transition-colors hover:border-blue-0058be/40"
                            >
                                <div className="bg-blue-0058be/10 mb-4 flex h-10 w-10 items-center justify-center rounded-md">
                                    <span className="text-blue-0058be text-xl leading-[28px] font-semibold font-semibold">
                                        ◆
                                    </span>
                                </div>
                                <h2 className="text-xl leading-[28px] font-semibold text-white-1a1c1c mb-2">{f.title}</h2>
                                <p className="text-sm leading-[20px] text-gray-424754">{f.body}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
