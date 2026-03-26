import { NextResponse } from 'next/server';
import { getHeader } from '@/services/header';

export async function GET() {
  const data = await getHeader();
  return NextResponse.json(data);
}