import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getMealById } from '@/lib/mealdb';
import { toSlug } from '@/lib/slug';
import { getYouTubeEmbedUrl, getYouTubeUrl } from '@/lib/youtube';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meal = await getMealById(id);

  if (!meal) {
    return { title: 'Recipe' };
  }

  return {
    title: meal.strMeal,
    description: `Ingredients, instructions, and details for ${meal.strMeal}.`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const meal = await getMealById(id);

  if (!meal) {
    notFound();
  }

  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const i = index + 1;
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    const label = `${ingredient ?? ''}`.trim();
    const qty = `${measure ?? ''}`.trim();
    if (!label) return null;
    return qty ? `${label} — ${qty}` : label;
  }).filter(Boolean) as string[];

  const youtubeUrl = getYouTubeUrl(meal.strYoutube);
  const embedUrl = getYouTubeEmbedUrl(meal.strYoutube);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
        >
          Back to search
        </Link>

        {meal.strCategory ? (
          <Link
            href={`/categories/${toSlug(meal.strCategory)}`}
            className="inline-flex w-fit items-center justify-center rounded-xl border border-border bg-bg-secondary px-4 py-2 text-sm font-medium text-text-main shadow-sm hover:bg-bg-main"
          >
            Browse {meal.strCategory}
          </Link>
        ) : null}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-bg-secondary shadow-sm">
        <div className="relative aspect-[16/9] bg-bg-main sm:aspect-[21/9]">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {meal.strCategory ? (
              <span className="inline-flex items-center rounded-full bg-accent/40 px-3 py-1 text-sm font-medium text-text-main">
                {meal.strCategory}
              </span>
            ) : null}
            {meal.strArea ? (
              <span className="inline-flex items-center rounded-full bg-bg-main px-3 py-1 text-sm font-medium text-secondary">
                {meal.strArea}
              </span>
            ) : null}
          </div>

          <h1 className="font-display mt-4 text-balance text-3xl tracking-tight sm:text-4xl">
            {meal.strMeal}
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <section>
              <h2 className="font-display text-lg tracking-tight">Ingredients</h2>
              <ul className="mt-4 space-y-2 text-text-main">
                {ingredients.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg tracking-tight">Instructions</h2>
              <div className="prose prose-slate mt-4 max-w-none">
                {meal.strInstructions
                  .split('\n')
                  .map((p) => p.trim())
                  .filter(Boolean)
                  .map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
              </div>
            </section>
          </div>

          {embedUrl ? (
            <section className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold">Video Tutorial</h2>
                {youtubeUrl ? (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                      className="inline-flex w-fit items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-bg-main shadow-sm hover:bg-primary-hover"
                  >
                    Open on YouTube
                  </a>
                ) : null}
              </div>
                <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-bg-main">
                <div className="relative aspect-video">
                  <iframe
                    src={embedUrl}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${meal.strMeal} video`}
                  />
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
