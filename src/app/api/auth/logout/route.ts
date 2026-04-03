import { NextRequest, NextResponse } from 'next/server';

function getSessionId(request: NextRequest): string | null {
  return request.cookies.get('session_id')?.value || null;
}

export async function POST(request: NextRequest) {
  const sessionId = getSessionId(request);

  if (!sessionId) {
    return NextResponse.json({ status: 'ok' });
  }

  const response = NextResponse.json({ status: 'ok' });
  response.cookies.set('session_id', '', { maxAge: 0, path: '/' });

  return response;
}
