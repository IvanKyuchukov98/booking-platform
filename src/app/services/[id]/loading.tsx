export default function ServiceDetailLoading() {
    return (
        <main className="mx-auto max-w-2xl px-6 py-12">
            <div className="mb-6 h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="mb-8 space-y-3 rounded-lg border border-gray-200 bg-white p-6">
                <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
                <div className="space-y-2">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
                </div>
                <div className="space-y-2">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-16 w-full animate-pulse rounded bg-gray-200" />
                </div>
                <div className="h-10 w-36 animate-pulse rounded-full bg-gray-200" />
            </div>
        </main>
    );
}
