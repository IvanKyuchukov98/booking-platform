export default function ServicesLoading() {
    return (
        <main className="mx-auto max-w-5xl px-6 py-12">
            <header className="mb-10 space-y-2">
                <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />
            </header>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <li
                        key={i}
                        className="flex h-44 flex-col rounded-lg border border-gray-200 bg-white p-5"
                    >
                        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                        <div className="mt-2 h-4 w-full animate-pulse rounded bg-gray-200" />
                        <div className="mt-auto flex items-end justify-between pt-4">
                            <div className="space-y-2">
                                <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
                                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                            </div>
                            <div className="h-9 w-16 animate-pulse rounded-full bg-gray-200" />
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
