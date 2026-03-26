import { NextResponse } from 'next/server';
import { getAdventures } from '@/services/adventures';

export async function GET() {
  const data = await getAdventures();
  return NextResponse.json(data);
}