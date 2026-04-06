import { NextRequest, NextResponse } from 'next/server';

// TEST_MODE: true — для локального тестирования без реальной БД
// TODO: Удалить перед продакшеном
const TEST_MODE = true;

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('session_id')?.value;

  if (TEST_MODE) {
    if (sessionId) {
      return NextResponse.json({
        user: {
          id: 'test-user-id',
          name: 'Тестовый Пользователь',
          email: 'test@test.com',
          role: 'user',
        },
      });
    }
    return NextResponse.json(
      { message: 'no_access_cookie' },
      { status: 401 }
    );
  }

  if (!sessionId) {
    return NextResponse.json(
      { message: 'no_access_cookie' },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: 'no_access_cookie' },
    { status: 401 }
  );
}
