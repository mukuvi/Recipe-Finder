import { NextResponse } from 'next/server';

import { getRandomMeal } from '@/lib/mealdb';

export async function GET() {
  const meal = await getRandomMeal();
  return NextResponse.json({ meal }, { status: 200 });
}
