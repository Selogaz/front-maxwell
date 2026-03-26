import { NextResponse } from 'next/server';
import { getFooter } from '@/services/footer';

export async function GET() {
  const data = await getFooter();
  return NextResponse.json(data);
}