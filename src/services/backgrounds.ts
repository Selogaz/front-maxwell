import { Origin, BackgroundOption, BackgroundsResponse } from '@/types/character';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const BACKGROUNDS_ENDPOINT = `${API_BASE_URL}/api/character-builder/backgrounds`;

/**
 * GET /api/character-builder/backgrounds
 * Возвращает «сырой» массив происхождений (BackgroundOption[]) с бэкенда.
 */
export const getBackgrounds = async (): Promise<BackgroundOption[]> => {
  const response = await fetch(BACKGROUNDS_ENDPOINT, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to load backgrounds: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  // Бэк отдаёт { items: [...] }, но поддерживаем и другие формы.
  if (Array.isArray((payload as BackgroundsResponse)?.items)) {
    return (payload as BackgroundsResponse).items;
  }
  if (Array.isArray(payload)) return payload as BackgroundOption[];
  if (Array.isArray(payload?.data)) return payload.data as BackgroundOption[];
  if (Array.isArray(payload?.results)) return payload.results as BackgroundOption[];

  console.warn('[backgrounds] unexpected payload shape:', payload);
  throw new Error('Backgrounds endpoint returned unexpected payload shape');
};

/**
 * Адаптер `BackgroundOption` → существующего интерфейса `Origin`,
 * чтобы UI продолжал работать без массовых правок.
 *
 * Поле `bonus` в `Origin` пока пустая строка — бэк его не присылает,
 * формат бонусов в спецификации не оговорён.
 */
export const adaptBackgroundOption = (option: BackgroundOption): Origin => ({
  id: option.id,
  name: option.name,
  description: option.description,
  bonus: '',
});
