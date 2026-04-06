import { NextRequest, NextResponse } from 'next/server';

type UserData = { id: string; name: string; email: string; password: string; role: string; createdAt: string };

// TEST_MODE: true — для локального тестирования без реальной БД
// TODO: Удалить перед продакшеном
const TEST_MODE = true;

const users: UserData[] = [];

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function POST(request: NextRequest) {
  if (TEST_MODE) {
    const url = new URL(request.url);
    const isTestMode = url.searchParams.get('test') === 'true';

    if (isTestMode) {
      const body = await request.json();
      const { email } = body;
      const userId = generateId();

      const response = NextResponse.json({
        user: {
          id: userId,
          email,
          role: 'user',
        },
      });

      response.cookies.set('session_id', generateId(), {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'email and password are required' },
        { status: 400 }
      );
    }

    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: 'invalid_credentials' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set('session_id', generateId(), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: 'invalid_credentials' },
      { status: 401 }
    );
  }
}

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('session_id')?.value;

  if (!sessionId) {
    return NextResponse.json(
      { message: 'no_access_cookie' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    user: {
      id: 'authorized-user-id',
      email: 'authorized@example.com',
      role: 'user',
    },
  });
}
