const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
const GAME_START_ENDPOINT = `${API_BASE_URL}/api/game/start`;

export type RoomPaymentMode = 'FREE' | 'HOST_PAYS' | 'EACH_PLAYER_PAYS';

export interface GameRoom {
  id: string;
  code: string;
  /** Открытый пароль. Backend отдаёт его ТОЛЬКО при создании комнаты, потом — никогда. */
  password: string;
  status: 'active';
  maxPlayers: number;
  paymentMode: RoomPaymentMode;
  entryPriceRubies: number;
}

export interface GameParty {
  id: string;
  name: string;
  status: 'active';
}

export interface GameStory {
  id: string;
  name: string;
}

export interface StartGameResponse {
  room: GameRoom;
  party: GameParty;
  story: GameStory;
}

/**
 * POST /api/game/start — создаёт комнату + партию + берёт активную историю.
 * MVP: storyId не передаётся, бэк выбирает первую активную.
 */
export const startGame = async (): Promise<StartGameResponse> => {
  const response = await fetch(GAME_START_ENDPOINT, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    let detail = '';
    try {
      const text = await response.text();
      detail = text ? ` — ${text}` : '';
    } catch {
      /* ignore */
    }
    throw new Error(`Failed to start game: ${response.status} ${response.statusText}${detail}`);
  }

  return response.json();
};

// ──────────────────────────────────────────────────────────────────────
// Локальное хранилище данных активной игры.
//
// Backend отдаёт пароль комнаты только один раз — при создании.
// Хост обязан сохранить его на клиенте и показать остальным игрокам.
// Используем sessionStorage: данные переживают навигацию между шагами
// визарда, но очищаются при закрытии вкладки.
// ──────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'maxwell:current-game';

export const saveCurrentGame = (data: StartGameResponse): void => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota / disabled storage */
  }
};

export const getCurrentGame = (): StartGameResponse | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StartGameResponse) : null;
  } catch {
    return null;
  }
};

export const clearCurrentGame = (): void => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
};
