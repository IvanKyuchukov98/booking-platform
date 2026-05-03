export default function DashboardLoading() {
    return (
        <main className="mx-auto max-w-[1200px] px-4 py-6">
            <div className="bg-white border border-gray-c2c6d6 rounded-lg mb-6 p-6 flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="h-8 w-64 animate-pulse rounded bg-white-e8e8e8" />
                    <div className="h-4 w-40 animate-pulse rounded bg-white-e8e8e8" />
                </div>
                <div className="flex gap-2">
                    <div className="h-9 w-32 animate-pulse rounded-md bg-white-e8e8e8" />
                </div>
            </div>
            <div className="bg-white border border-gray-c2c6d6 rounded-lg overflow-hidden">
                <div className="bg-white-f3f3f3 border-b border-gray-c2c6d6 px-6 py-3">
                    <div className="h-5 w-24 animate-pulse rounded bg-white-e8e8e8" />
                </div>
                <div className="divide-y divide-gray-c2c6d6">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between gap-4 px-6 py-4"
                        >
                            <div className="space-y-1">
                                <div className="h-4 w-48 animate-pulse rounded bg-white-e8e8e8" />
                                <div className="h-3 w-32 animate-pulse rounded bg-white-e8e8e8" />
                            </div>
                            <div className="h-7 w-20 animate-pulse rounded-md bg-white-e8e8e8" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
