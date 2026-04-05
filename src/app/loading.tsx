export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-14">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-bg-secondary px-6 py-8 text-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary"
          aria-label="Loading"
          role="status"
        />
        <div>
          <div className="text-sm font-semibold text-text-main">Loading…</div>
          <div className="mt-1 text-sm text-text-muted">Fetching fresh meals from TheMealDB.</div>
        </div>
      </div>
    </div>
  );
}
