import { NextResponse } from 'next/server';

import { searchMeals } from '@/lib/mealdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') ?? '').trim();
  if (!q) {
    return NextResponse.json({ meals: null }, { status: 200 });
  }

  const meals = await searchMeals(q);
  return NextResponse.json({ meals }, { status: 200 });
}
