'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { RecipeCard } from '@/components/RecipeCard';
import type { MealSummary } from '@/lib/mealdb-types';

type SearchState =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'error'; message: string }
  | { type: 'results'; meals: MealSummary[] };

export function HomeClient() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [state, setState] = React.useState<SearchState>({ type: 'idle' });

  async function fetchSearch(q: string) {
    const res = await fetch(`/api/mealdb/search?q=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error('Search route failed');
    return (await res.json()) as { meals: MealSummary[] | null };
  }

  async function fetchSearchFallback(q: string) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`
    );
    if (!res.ok) throw new Error('MealDB search failed');
    return (await res.json()) as { meals: MealSummary[] | null };
  }

  async function runSearch(nextQuery?: string) {
    const q = (nextQuery ?? query).trim();
    if (!q) {
      setState({ type: 'error', message: 'Please enter a recipe name.' });
      return;
    }

    setState({ type: 'loading' });
    try {
      const data = await fetchSearch(q);
      setState({ type: 'results', meals: data.meals ?? [] });
    } catch {
      try {
        const data = await fetchSearchFallback(q);
        setState({ type: 'results', meals: data.meals ?? [] });
      } catch {
        setState({
          type: 'error',
          message: 'Failed to fetch recipes. Please try again later.',
        });
      }
    }
  }

  async function surpriseMe() {
    setState({ type: 'loading' });
    try {
      const res = await fetch('/api/mealdb/random');
      if (!res.ok) throw new Error('Bad response');
      const data = (await res.json()) as {
        meal: { idMeal: string } | null;
      };
      const id = data.meal?.idMeal;
      if (!id) throw new Error('No meal');
      router.push(`/recipe/${id}`);
    } catch {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (!res.ok) throw new Error('MealDB random failed');
        const data = (await res.json()) as { meals: { idMeal: string }[] | null };
        const id = data.meals?.[0]?.idMeal;
        if (!id) throw new Error('No meal');
        router.push(`/recipe/${id}`);
      } catch {
        setState({
          type: 'error',
          message: 'Could not load a random recipe. Try again!',
        });
      }
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-balance text-4xl tracking-tight sm:text-5xl">
          Discover recipes you’ll actually want to cook
        </h1>
        <p className="mt-4 text-pretty text-lg text-text-muted">
          Search by name, explore categories, or let RecipeFinder pick something
          great.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-bg-secondary p-3 shadow-sm">
          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              runSearch();
            }}
          >
            <label className="sr-only" htmlFor="search">
              Search recipes
            </label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “pasta”, “chicken”, or “dessert”…"
              className="h-12 flex-1 rounded-xl border border-border bg-bg-main px-4 text-sm text-text-main shadow-sm outline-none placeholder:text-text-muted/70 focus:border-primary focus:ring-4 focus:ring-accent/30"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-bg-main shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-accent/40"
            >
              Search
            </button>
            <button
              type="button"
              onClick={surpriseMe}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-bg-main px-5 text-sm font-medium text-text-main shadow-sm hover:bg-bg-secondary focus:outline-none focus:ring-4 focus:ring-accent/30"
            >
              Surprise me
            </button>
          </form>
        </div>
      </section>

      <section className="mt-10">
        <AnimatePresence mode="popLayout" initial={false}>
          {state.type === 'loading' ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-border bg-bg-secondary p-10 text-center shadow-sm"
            >
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
              <p className="mt-4 text-sm text-text-muted">
                Finding delicious recipes…
              </p>
            </motion.div>
          ) : null}

          {state.type === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl border border-primary/30 bg-bg-secondary p-6 text-center text-text-main shadow-sm"
            >
              <div className="font-display text-sm tracking-tight">Something went wrong</div>
              <p className="mt-2 text-sm text-text-muted">{state.message}</p>
            </motion.div>
          ) : null}

          {state.type === 'idle' ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-border bg-bg-secondary p-10 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-bg-main text-primary">
                <span className="text-sm font-semibold">RF</span>
              </div>
              <h2 className="font-display mt-4 text-lg tracking-tight">Search for recipes</h2>
              <p className="mt-2 text-sm text-text-muted">
                Start with a keyword, or jump into categories for ideas.
              </p>
            </motion.div>
          ) : null}

          {state.type === 'results' ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {state.meals.length === 0 ? (
                <div className="rounded-2xl border border-border bg-bg-secondary p-10 text-center shadow-sm">
                  <h2 className="font-display text-lg tracking-tight">No recipes found</h2>
                  <p className="mt-2 text-sm text-text-muted">
                    Try a different search term.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {state.meals.map((meal) => (
                    <RecipeCard key={meal.idMeal} meal={meal} />
                  ))}
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    </div>
  );
}
