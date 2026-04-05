export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-5 w-28 animate-pulse rounded-lg bg-bg-secondary" />
        <div className="h-10 w-44 animate-pulse rounded-xl border border-border bg-bg-secondary" />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-bg-secondary shadow-sm">
        <div className="relative aspect-[16/9] animate-pulse bg-bg-main sm:aspect-[21/9]" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            <div className="h-7 w-24 animate-pulse rounded-full bg-bg-main" />
            <div className="h-7 w-20 animate-pulse rounded-full bg-bg-main" />
          </div>

          <div className="mt-4 h-10 w-3/4 animate-pulse rounded-xl bg-bg-main" />

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <section>
              <div className="h-6 w-32 animate-pulse rounded-lg bg-bg-main" />
              <div className="mt-4 space-y-3">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-4 w-full animate-pulse rounded-lg bg-bg-main" />
                ))}
              </div>
            </section>

            <section>
              <div className="h-6 w-32 animate-pulse rounded-lg bg-bg-main" />
              <div className="mt-4 space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-4 w-full animate-pulse rounded-lg bg-bg-main" />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
