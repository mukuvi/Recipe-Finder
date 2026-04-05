export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="h-4 w-24 animate-pulse rounded-lg bg-bg-secondary" />
          <div className="mt-2 h-9 w-64 max-w-full animate-pulse rounded-xl bg-bg-secondary" />
          <div className="mt-3 h-4 w-56 max-w-full animate-pulse rounded-lg bg-bg-secondary" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded-xl border border-border bg-bg-secondary" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-border bg-bg-secondary shadow-sm"
          >
            <div className="relative aspect-[4/3] animate-pulse bg-bg-main" />
            <div className="p-5">
              <div className="h-5 w-3/4 animate-pulse rounded-lg bg-bg-main" />
              <div className="mt-4 h-10 w-full animate-pulse rounded-xl bg-bg-main" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
