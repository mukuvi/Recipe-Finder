import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] w-full max-w-6xl flex-col items-center justify-center px-4 py-12 text-center">
      <div className="text-6xl font-semibold tracking-tight text-primary sm:text-8xl">
        404
      </div>
      <h1 className="mt-4 text-balance text-2xl font-semibold sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-xl text-pretty text-text-muted">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-bg-main shadow-sm hover:bg-primary-hover"
      >
        Go to Home
      </Link>
    </div>
  );
}
