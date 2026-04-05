import type { MealByCategory, MealCategory, MealDetail, MealSummary } from './mealdb-types';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url: string, init: RequestInit | undefined, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function getJsonWithRetry<T>(url: string, init?: RequestInit): Promise<T> {
  const method = (init?.method ?? 'GET').toUpperCase();
  const maxAttempts = method === 'GET' ? 3 : 1;

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetchWithTimeout(url, init, 8000);
      if (!res.ok) {
        throw new Error(`MealDB request failed (${res.status})`);
      }
      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await sleep(250 * attempt);
        continue;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error('MealDB request failed');
}

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  return getJsonWithRetry<T>(url, init);
}

export async function searchMeals(query: string): Promise<MealSummary[]> {
  const q = query.trim();
  if (!q) return [];
  const data = await getJson<{ meals: MealSummary[] | null }>(
    `${API_BASE}/search.php?s=${encodeURIComponent(q)}`,
    { cache: 'no-store' }
  );
  return data.meals ?? [];
}

export async function getRandomMeal(): Promise<MealDetail | null> {
  const data = await getJson<{ meals: MealDetail[] | null }>(
    `${API_BASE}/random.php`,
    { cache: 'no-store' }
  );
  return data.meals?.[0] ?? null;
}

export async function getMealById(id: string): Promise<MealDetail | null> {
  const mealId = id.trim();
  if (!mealId) return null;
  const data = await getJson<{ meals: MealDetail[] | null }>(
    `${API_BASE}/lookup.php?i=${encodeURIComponent(mealId)}`,
    { cache: 'no-store' }
  );
  return data.meals?.[0] ?? null;
}

export async function listCategories(): Promise<MealCategory[]> {
  const data = await getJson<{ categories: MealCategory[] }>(
    `${API_BASE}/categories.php`,
    {
      next: { revalidate: 60 * 60 * 24 },
    }
  );
  return data.categories ?? [];
}

export async function filterMealsByCategory(category: string): Promise<MealByCategory[]> {
  const c = category.trim();
  if (!c) return [];
  const data = await getJson<{ meals: MealByCategory[] | null }>(
    `${API_BASE}/filter.php?c=${encodeURIComponent(c)}`,
    {
      next: { revalidate: 60 * 30 },
    }
  );
  return data.meals ?? [];
}
