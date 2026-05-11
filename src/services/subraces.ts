import { SubRace, SubRaceOption, SubRacesResponse, AbilityRef } from '@/types/character';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/**
 * GET /api/character-builder/races/:raceId/subraces
 * Возвращает «сырой» ответ бэкенда — массив подрас выбранной расы.
 */
export const getSubRaces = async (raceId: string): Promise<SubRaceOption[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/character-builder/races/${encodeURIComponent(raceId)}/subraces`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to load subraces: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  // Поддерживаем разные формы ответа: { raceId, items: [...] } | { data: [...] } | прямой массив.
  if (Array.isArray(payload)) return payload as SubRaceOption[];
  if (Array.isArray((payload as SubRacesResponse)?.items)) return (payload as SubRacesResponse).items;
  if (Array.isArray(payload?.data)) return payload.data as SubRaceOption[];
  if (Array.isArray(payload?.results)) return payload.results as SubRaceOption[];

  console.warn('[subraces] unexpected payload shape:', payload);
  throw new Error('Subraces endpoint returned unexpected payload shape');
};

const ABILITY_TO_STAT: Record<AbilityRef, keyof SubRace['modifier']> = {
  str: 'strength',
  dex: 'agility',
  con: 'constitution',
  int: 'intelligence',
  wis: 'wisdom',
  cha: 'charisma',
};

// Локальные fallback-иконки подрас по slug'у бэкенда. Когда у бэка
// нет своих картинок (`images.thumb === null`) — используем эти.
const SUBRACE_FALLBACK_ICON: Record<string, string> = {
  'zariel': '/create_char/subrace/mobile-subrace/Зариэль.svg',
  'asmodeus': '/create_char/subrace/mobile-subrace/Асмодей.svg',
  'mephisto': '/create_char/subrace/mobile-subrace/Мефистофель_gray.svg',
  'high-elf': '/create_char/subrace/mobile-subrace/Зариэль.svg',
  'wood-elf': '/create_char/subrace/mobile-subrace/Зариэль.svg',
  'drow': '/create_char/subrace/mobile-subrace/Мефистофель_gray.svg',
  'mountain-dwarf': '/create_char/subrace/mobile-subrace/Асмодей.svg',
  'hill-dwarf': '/create_char/subrace/mobile-subrace/Асмодей.svg',
  'forest-gnome': '/create_char/subrace/mobile-subrace/Зариэль.svg',
  'rock-gnome': '/create_char/subrace/mobile-subrace/Асмодей.svg',
  'deep-gnome': '/create_char/subrace/mobile-subrace/Мефистофель_gray.svg',
  'lightfoot': '/create_char/subrace/mobile-subrace/Мефистофель_gray.svg',
  'stout': '/create_char/subrace/mobile-subrace/Асмодей.svg',
  'dragonblood': '/create_char/subrace/mobile-subrace/Зариэль.svg',
  'colored-dragonborn': '/create_char/subrace/mobile-subrace/Зариэль.svg',
  'ravenite': '/create_char/subrace/mobile-subrace/Зариэль.svg',
};
const DEFAULT_SUBRACE_ICON = '/create_char/subrace/mobile-subrace/Зариэль.svg';

/**
 * Адаптер `SubRaceOption` → существующего интерфейса `SubRace`,
 * чтобы UI продолжал работать без массовых правок.
 *
 * @param parentRaceId — UUID расы, к которой относятся подрасы (тот же,
 *   что использовался в URL запроса). Используется как fallback,
 *   если бэк не присылает `raceId` в самих подрасах либо присылает
 *   slug вместо UUID.
 */
export const adaptSubRaceOption = (option: SubRaceOption, parentRaceId?: string): SubRace => {
  const modifier: Record<string, number> = {};
  option.abilityBonuses.fixed.forEach((bonus) => {
    const key = ABILITY_TO_STAT[bonus.ability.ref];
    if (key) modifier[key] = (modifier[key] ?? 0) + bonus.value;
  });

  const imageUrl =
    option.images.card ??
    option.images.thumb ??
    SUBRACE_FALLBACK_ICON[option.index] ??
    DEFAULT_SUBRACE_ICON;

  return {
    id: option.id,
    slug: option.index,
    raceId: parentRaceId ?? option.raceId,
    name: option.name.ru ?? option.name.en ?? option.index,
    description: option.summary,
    imageUrl,
    modifier,
    traits: option.traits?.items ?? [],
  };
};
