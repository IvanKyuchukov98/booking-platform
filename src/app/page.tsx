export default function Home() {
  return (
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
            Book your next appointment in seconds.
          </h1>
          <p className="mb-10 text-lg text-gray-600">
            BookSpace helps local service providers — barbers, coaches, therapists — manage
            their schedule and lets customers reserve a slot without phone tag.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2
  text-sm text-gray-500">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Building in public — MVP shipping this week.
          </div>
        </div>
      </main>
  );
}