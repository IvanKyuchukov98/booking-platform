export default function DashboardLoading() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-16">
            <div className="mb-10 flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="flex gap-2">
                    <div className="h-9 w-32 animate-pulse rounded-full bg-gray-200" />
                </div>
            </div>
            <div className="space-y-3">
                <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
                <div className="space-y-px rounded-lg border border-gray-200 bg-white">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="flex items-center justify-between gap-4 px-5 py-4">
                            <div className="space-y-2">
                                <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
                                <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
                            </div>
                            <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
