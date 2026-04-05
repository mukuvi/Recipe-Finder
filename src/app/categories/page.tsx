import type { Metadata } from 'next';
import Link from 'next/link';

import { CategoryCard } from '@/components/CategoryCard';
import { listCategories } from '@/lib/mealdb';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse meal categories and explore recipes.',
};

export default async function Page() {
  let categories = [] as Awaited<ReturnType<typeof listCategories>>;
  let loadError: string | null = null;

  try {
    categories = await listCategories();
  } catch {
    loadError = 'Unable to load categories right now. Please try again.';
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
            Categories
          </h1>
          <p className="mt-2 max-w-2xl text-text-muted">
            Pick a category to browse meals, then open any recipe for details.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-bg-secondary px-4 py-2 text-sm font-medium text-text-main shadow-sm hover:bg-bg-main"
        >
          Back to search
        </Link>
      </div>

      {loadError ? (
        <div className="mt-8 rounded-2xl border border-primary/30 bg-bg-secondary p-5 text-text-main">
          <div className="text-sm font-medium text-primary">Temporary error</div>
          <p className="mt-1 text-sm text-text-muted">{loadError}</p>
        </div>
      ) : null}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard key={category.idCategory} category={category} />
        ))}
      </div>
    </div>
  );
}
