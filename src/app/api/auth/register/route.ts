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
      const { email, name } = body;

      return NextResponse.json({
        id: generateId(),
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
      }, { status: 201 });
    }
  }

  try {
    const body = await request.json();
    const { email, password, name, refCode } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'email and password are required' },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { message: 'name is required' },
        { status: 400 }
      );
    }

    if (refCode && refCode.length > 0) {
      return NextResponse.json(
        { message: 'invalid_ref_code' },
        { status: 400 }
      );
    }

    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'email_already_used' },
        { status: 400 }
      );
    }

    const newUser: UserData = {
      id: generateId(),
      name,
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    return NextResponse.json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'validation_error' },
      { status: 400 }
    );
  }
}
