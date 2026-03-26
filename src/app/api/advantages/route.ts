import { NextResponse } from 'next/server';
import { getAdvantages } from '@/services/advantages';

export async function GET() {
  const data = await getAdvantages();
  return NextResponse.json(data);
}