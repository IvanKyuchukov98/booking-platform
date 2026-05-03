export default function AdminServicesLoading() {
    return (
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <div className="bg-white border border-gray-c2c6d6 rounded-lg p-6 space-y-3">
                <div className="h-5 w-28 animate-pulse rounded bg-white-e8e8e8" />
                <div className="h-9 w-full animate-pulse rounded-md bg-white-e8e8e8" />
                <div className="h-9 w-full animate-pulse rounded-md bg-white-e8e8e8" />
                <div className="h-9 w-full animate-pulse rounded-md bg-white-e8e8e8" />
                <div className="h-9 w-32 animate-pulse rounded-md bg-white-e8e8e8" />
            </div>
            <div className="space-y-3">
                <div className="h-5 w-32 animate-pulse rounded bg-white-e8e8e8" />
                <div className="bg-white border border-gray-c2c6d6 rounded-lg overflow-hidden">
                    <div className="bg-white-f3f3f3 border-b border-gray-c2c6d6 px-4 py-3">
                        <div className="h-3 w-48 animate-pulse rounded bg-white-e8e8e8" />
                    </div>
                    <div className="divide-y divide-gray-c2c6d6">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between gap-4 px-4 py-3"
                            >
                                <div className="space-y-1">
                                    <div className="h-4 w-40 animate-pulse rounded bg-white-e8e8e8" />
                                    <div className="h-3 w-24 animate-pulse rounded bg-white-e8e8e8" />
                                </div>
                                <div className="h-7 w-12 animate-pulse rounded-md bg-white-e8e8e8" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
