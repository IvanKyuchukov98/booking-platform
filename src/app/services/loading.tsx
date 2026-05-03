export default function ServicesLoading() {
    return (
        <main className="mx-auto max-w-[1200px] px-4 py-6">
            <header className="mb-6 space-y-1">
                <div className="h-8 w-40 animate-pulse rounded bg-white-e8e8e8" />
                <div className="h-4 w-64 animate-pulse rounded bg-white-e8e8e8" />
            </header>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <li
                        key={i}
                        className="bg-white border border-gray-c2c6d6 rounded-lg flex h-44 flex-col p-6"
                    >
                        <div className="h-5 w-32 animate-pulse rounded bg-white-e8e8e8" />
                        <div className="mt-2 h-4 w-full animate-pulse rounded bg-white-e8e8e8" />
                        <div className="mt-auto flex items-end justify-between pt-4">
                            <div className="space-y-1">
                                <div className="h-3 w-12 animate-pulse rounded bg-white-e8e8e8" />
                                <div className="h-5 w-16 animate-pulse rounded bg-white-e8e8e8" />
                            </div>
                            <div className="h-9 w-16 animate-pulse rounded-md bg-white-e8e8e8" />
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
