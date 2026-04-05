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
  try {
    const categories = await listCategories();
    const canonical = categories.find((c) => toSlug(c.strCategory) === category);
    const name = canonical?.strCategory ?? category;
    return {
      title: name,
    };
  } catch {
    return {
      title: category,
    };
  }
}

export default async function Page({ params }: Props) {
  const { category } = await params;
  let categories = [] as Awaited<ReturnType<typeof listCategories>>;
  let loadError: string | null = null;

  try {
    categories = await listCategories();
  } catch {
    loadError = 'Unable to load categories right now. Please try again.';
  }

  const canonical = categories.find((c) => toSlug(c.strCategory) === category);
  if (!loadError && !canonical) notFound();

  const categoryTitle = canonical?.strCategory ?? category;

  let meals = [] as Awaited<ReturnType<typeof filterMealsByCategory>>;
  if (canonical) {
    try {
      meals = await filterMealsByCategory(canonical.strCategory);
    } catch {
      loadError = 'Unable to load meals right now. Please try again.';
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm font-medium text-secondary">Category</div>
          <h1 className="font-display mt-1 text-3xl tracking-tight sm:text-4xl">
            {categoryTitle}
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

      {loadError ? (
        <div className="mt-8 rounded-2xl border border-primary/30 bg-bg-secondary p-5 text-text-main">
          <div className="text-sm font-medium text-primary">Temporary error</div>
          <p className="mt-1 text-sm text-text-muted">{loadError}</p>
        </div>
      ) : null}

      {!loadError ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
