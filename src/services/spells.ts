import { SpellsResponse, SpellsRequestBody, SpellChoiceGroup } from '@/types/character';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const SPELLS_ENDPOINT = `${API_BASE_URL}/api/character-builder/spells`;

const EMPTY_GROUP: SpellChoiceGroup = { choose: 0, items: [] };

/**
 * POST /api/character-builder/spells
 * Возвращает доступные заговоры/заклинания для выбранного класса и подкласса.
 *
 * Бэкенд рассчитан на персонажа 1 уровня. Уровень в body не передаётся.
 */
export const getSpells = async (body: SpellsRequestBody): Promise<SpellsResponse> => {
  const response = await fetch(SPELLS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    // Стараемся вытащить тело ошибки, чтобы понять причину (часто бэк
    // присылает { detail: "..."} даже для 4xx).
    let detail = '';
    try {
      const text = await response.text();
      detail = text ? ` — ${text}` : '';
    } catch {
      /* ignore */
    }
    throw new Error(`Failed to load spells: ${response.status} ${response.statusText}${detail}`);
  }

  const payload = await response.json();

  // Ожидаем { cantrips: {...}, spells: {...} }. Защищаемся от частичных ответов.
  return {
    cantrips: payload?.cantrips ?? EMPTY_GROUP,
    spells: payload?.spells ?? EMPTY_GROUP,
  };
};
