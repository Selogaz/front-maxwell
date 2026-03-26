import { NextResponse } from 'next/server';
import { getAbout } from '@/services/about';

export async function GET() {
  const data = await getAbout();
  return NextResponse.json(data);
}