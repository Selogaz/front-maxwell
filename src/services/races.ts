import { Race, RaceOption, AbilityRef } from '@/types/character';

/**
 * Базовый URL бэкенда. Если переменная не задана — клиент ходит по
 * относительному пути и предполагается reverse-proxy на стороне Next.js.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const RACES_ENDPOINT = `${API_BASE_URL}/api/character-builder/races`;

/**
 * GET /api/character-builder/races
 * Возвращает «сырой» ответ бэкенда (массив RaceOption) — со всеми полями,
 * включая choices/fixed/traits/proficiencies. Используется UI слоем,
 * которому нужно показать выбор бонусов / языков / навыков и т.п.
 */
export const getRaces = async (): Promise<RaceOption[]> => {
  const response = await fetch(RACES_ENDPOINT, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to load races: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  // Бэкенд может отдавать как голый массив, так и обёртку { data: [...] } / { items: [...] }.
  let list: RaceOption[];
  if (Array.isArray(payload)) list = payload as RaceOption[];
  else if (Array.isArray(payload?.data)) list = payload.data as RaceOption[];
  else if (Array.isArray(payload?.items)) list = payload.items as RaceOption[];
  else if (Array.isArray(payload?.results)) list = payload.results as RaceOption[];
  else {
    console.warn('[races] unexpected payload shape:', payload);
    throw new Error('Races endpoint returned unexpected payload shape');
  }

  // Расы, которых не должно быть в UI (бэк присылает их по ошибке/в качестве справочных).
  const HIDDEN_INDEXES = new Set(['half-elf']);
  return list.filter((race) => !HIDDEN_INDEXES.has(race.index));
};

// Карта ability-ref'ов бэкенда в наши ключи в CharacterStats.
const ABILITY_TO_STAT: Record<AbilityRef, keyof Race['modifier']> = {
  str: 'strength',
  dex: 'agility',
  con: 'constitution',
  int: 'intelligence',
  wis: 'wisdom',
  cha: 'charisma',
};

/**
 * Адаптер `RaceOption` → существующего интерфейса `Race`, чтобы
 * остальное приложение (UI карточек, модификаторы статов, превью)
 * продолжало работать без массовых правок.
 */
export const adaptRaceOption = (option: RaceOption): Race => {
  const modifier: Record<string, number> = {};
  option.abilityBonuses.fixed.forEach((bonus) => {
    const key = ABILITY_TO_STAT[bonus.ref];
    if (key) modifier[key] = (modifier[key] ?? 0) + bonus.value;
  });

  return {
    id: option.id,
    slug: option.index,
    name: option.name,
    description: option.summary,
    imageUrl: option.images.card ?? option.images.thumb ?? undefined,
    modifier,
    traits: option.traits?.items ?? [],
  };
};
