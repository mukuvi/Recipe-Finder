'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import type { MealCategory } from '@/lib/mealdb-types';
import { toSlug } from '@/lib/slug';

export function CategoryCard({ category }: { category: MealCategory }) {
  const href = `/categories/${toSlug(category.strCategory)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link
        href={href}
        className="group flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-bg-secondary p-4 text-center shadow-sm hover:bg-bg-main"
      >
        <div className="relative h-16 w-16">
          <Image
            src={category.strCategoryThumb}
            alt={category.strCategory}
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>
        <div className="mt-3 text-sm font-semibold text-text-main">
          {category.strCategory}
        </div>
        <div className="mt-1 text-xs text-text-muted group-hover:text-text-main">
          Explore meals
        </div>
      </Link>
    </motion.div>
  );
}
