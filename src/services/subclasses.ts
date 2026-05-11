import {
  SubClass,
  FirstLevelSubclassOption,
  FirstLevelSubclassesResponse,
} from '@/types/character';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/**
 * GET /api/character-builder/classes/{classId}/subclasses?level=1
 * Возвращает «сырой» массив подклассов, которые выбираются на 1 уровне
 * для указанного класса. Endpoint вызывается только если у класса
 * `subclassSelectionLevel === 1`.
 */
export const getFirstLevelSubclasses = async (
  classId: string
): Promise<FirstLevelSubclassOption[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/character-builder/classes/${encodeURIComponent(classId)}/subclasses?level=1`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    let detail = '';
    try {
      const text = await response.text();
      detail = text ? ` — ${text}` : '';
    } catch {
      /* ignore */
    }
    throw new Error(
      `Failed to load subclasses: ${response.status} ${response.statusText}${detail}`
    );
  }

  const payload = await response.json();

  if (Array.isArray((payload as FirstLevelSubclassesResponse)?.items)) {
    return (payload as FirstLevelSubclassesResponse).items;
  }
  if (Array.isArray(payload)) return payload as FirstLevelSubclassOption[];
  if (Array.isArray(payload?.data)) return payload.data as FirstLevelSubclassOption[];

  console.warn('[subclasses] unexpected payload shape:', payload);
  throw new Error('Subclasses endpoint returned unexpected payload shape');
};

/**
 * Адаптер `FirstLevelSubclassOption` → существующего интерфейса `SubClass`,
 * чтобы UI продолжал работать без массовых правок.
 *
 * @param parentClassId — UUID родительского класса (тот же, что в URL запроса).
 *   Кладём его в `classId` подкласса как страховку, если бэк не присылает связь.
 */
export const adaptSubclassOption = (
  option: FirstLevelSubclassOption,
  parentClassId: string
): SubClass => ({
  id: option.id,
  classId: parentClassId,
  name: option.name.ru ?? option.name.en ?? option.index,
  description: option.summary,
});
