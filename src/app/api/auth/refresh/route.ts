import { NextRequest, NextResponse } from 'next/server';

function getSessionId(request: NextRequest): string | null {
  return request.cookies.get('session_id')?.value || null;
}

export async function POST(request: NextRequest) {
  const sessionId = getSessionId(request);

  if (!sessionId) {
    return NextResponse.json(
      { message: 'refresh_cookie_missing_or_invalid' },
      { status: 401 }
    );
  }

  return NextResponse.json({ status: 'ok' });
}
