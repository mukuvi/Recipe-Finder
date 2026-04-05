'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import type { MealSummary } from '@/lib/mealdb-types';

export function RecipeCard({ meal }: { meal: MealSummary }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="overflow-hidden rounded-2xl border border-border bg-bg-secondary shadow-sm"
    >
      <div className="relative aspect-[4/3] bg-bg-main">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-base leading-snug tracking-tight">{meal.strMeal}</h3>
        </div>
        <div className="mt-4">
          <Link
            href={`/recipe/${meal.idMeal}`}
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-bg-main shadow-sm hover:bg-primary-hover"
          >
            View recipe
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
