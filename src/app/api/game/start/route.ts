import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL ?? 'https://test.dndmaxwell.online';

/**
 * Proxy `POST /api/game/start` → backend.
 *
 * Зачем отдельный route, а не rewrite: backend проверяет заголовок `Origin`
 * и режет запросы с `localhost:3000` через `invalid_origin`. Здесь мы шлём
 * запрос со стороны Node-сервера и подменяем `Origin` на адрес бэка.
 */
export async function POST(request: NextRequest) {
  const upstream = await fetch(`${BACKEND_URL}/api/game/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: BACKEND_URL,
      // Прокидываем cookie пользователя как есть.
      Cookie: request.headers.get('cookie') ?? '',
    },
    body: JSON.stringify({}),
  });

  const text = await upstream.text();
  const response = new NextResponse(text, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: {
      'content-type': upstream.headers.get('content-type') ?? 'application/json',
    },
  });

  // Если бэк решил выставить/обновить cookie — пробрасываем.
  const setCookie = upstream.headers.get('set-cookie');
  if (setCookie) {
    response.headers.append('set-cookie', setCookie);
  }
  return response;
}
