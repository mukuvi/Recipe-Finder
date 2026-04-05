import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { RecipeCard } from '@/components/RecipeCard';
import { filterMealsByCategory, listCategories } from '@/lib/mealdb';
import { toSlug } from '@/lib/slug';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categories = await listCategories();
  const canonical = categories.find((c) => toSlug(c.strCategory) === category);
  const name = canonical?.strCategory ?? category;
  return {
    title: name,
  };
}

export default async function Page({ params }: Props) {
  const { category } = await params;
  const categories = await listCategories();
  const canonical = categories.find((c) => toSlug(c.strCategory) === category);
  if (!canonical) notFound();

  const meals = await filterMealsByCategory(canonical.strCategory);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm font-medium text-secondary">Category</div>
          <h1 className="font-display mt-1 text-3xl tracking-tight sm:text-4xl">
            {canonical.strCategory}
          </h1>
          <p className="mt-2 max-w-2xl text-text-muted">
            Explore meals in this category.
          </p>
        </div>
        <Link
          href="/categories"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-bg-secondary px-4 py-2 text-sm font-medium text-text-main shadow-sm hover:bg-bg-main"
        >
          All categories
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {meals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}
