import { NextResponse } from 'next/server';
import { getPlans } from '@/services/pricing';

export async function GET() {
  const data = await getPlans();
  return NextResponse.json(data);
}