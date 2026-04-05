import { NextResponse } from 'next/server';

import { filterMealsByCategory } from '@/lib/mealdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const c = (searchParams.get('c') ?? '').trim();
  if (!c) {
    return NextResponse.json({ meals: null }, { status: 200 });
  }

  const meals = await filterMealsByCategory(c);
  return NextResponse.json({ meals }, { status: 200 });
}
