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
  const categories = await listCategories();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
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

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard key={category.idCategory} category={category} />
        ))}
      </div>
    </div>
  );
}
