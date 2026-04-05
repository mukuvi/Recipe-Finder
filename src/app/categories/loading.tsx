export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="h-9 w-40 animate-pulse rounded-xl bg-bg-secondary" />
          <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded-lg bg-bg-secondary" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded-xl border border-border bg-bg-secondary" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex h-28 animate-pulse flex-col items-center justify-center rounded-2xl border border-border bg-bg-secondary p-4 shadow-sm"
          >
            <div className="h-12 w-12 rounded-2xl bg-bg-main" />
            <div className="mt-3 h-4 w-24 rounded-lg bg-bg-main" />
            <div className="mt-2 h-3 w-16 rounded-lg bg-bg-main" />
          </div>
        ))}
      </div>
    </div>
  );
}
