export default function AdminServicesLoading() {
    return (
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
                <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-9 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-9 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-9 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-9 w-32 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="space-y-4">
                <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                <div className="space-y-px rounded-lg border border-gray-200 bg-white">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between gap-4 px-5 py-4">
                            <div className="space-y-2">
                                <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                                <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                            </div>
                            <div className="h-6 w-12 animate-pulse rounded bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
