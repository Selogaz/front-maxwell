import { NextResponse } from 'next/server';
import { getGreeting } from '@/services/greeting';

export async function GET() {
  const data = await getGreeting();
  return NextResponse.json(data);
}