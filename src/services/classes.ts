import { ClassOption, CharacterClass } from '@/types/character';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const CLASSES_ENDPOINT = `${API_BASE_URL}/api/character-builder/classes`;

export const getClasses = async (): Promise<ClassOption[]> => {
  const response = await fetch(CLASSES_ENDPOINT, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to load classes: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  let list: ClassOption[];
  if (Array.isArray(payload)) list = payload as ClassOption[];
  else if (Array.isArray(payload?.data)) list = payload.data as ClassOption[];
  else if (Array.isArray(payload?.items)) list = payload.items as ClassOption[];
  else if (Array.isArray(payload?.results)) list = payload.results as ClassOption[];
  else {
    console.warn('[classes] unexpected payload shape:', payload);
    throw new Error('Classes endpoint returned unexpected payload shape');
  }

  return list;
};

const CLASS_ASSET = '/create_char/class/mobile-class';

export const CLASS_FALLBACK_ICON: Record<string, string> = {
  warrior:   `${CLASS_ASSET}/воин_new.svg`,
  barbarian: `${CLASS_ASSET}/Barbarian (2).svg`,
  sorcerer:  `${CLASS_ASSET}/чар_new_gray.svg`,
  wizard:    `${CLASS_ASSET}/волш_new.svg`,
  ranger:    `${CLASS_ASSET}/след_new.svg`,
  rogue:     `${CLASS_ASSET}/плут_new.svg`,
  paladin:   `${CLASS_ASSET}/пал_new.svg`,
  monk:      `${CLASS_ASSET}/монах_v2_unselected.svg`,
  druid:     `${CLASS_ASSET}/друид.svg`,
  cleric:    `${CLASS_ASSET}/жрец.svg`,
  bard:      `${CLASS_ASSET}/Bard (4).svg`,
};
const DEFAULT_CLASS_ICON = `${CLASS_ASSET}/воин_new.svg`;

export const getClassIcon = (option: ClassOption): string =>
  CLASS_FALLBACK_ICON[option.index] ?? DEFAULT_CLASS_ICON;

// Классы, у которых выбор подкласса происходит на 1 уровне (на старте создания
// персонажа). Используется как фолбэк, если бэк не присылает
// `subclassSelectionLevel` явно. Slug'и совпадают с `index` бэкенда.
const SUBCLASS_AT_LEVEL_1 = new Set(['sorcerer', 'warlock', 'cleric']);

export const adaptClassOption = (option: ClassOption): CharacterClass => ({
  id: option.id,
  slug: option.index,
  name: option.name,
  description: option.summary,
  summary: option.summary,
  hitDie: option.hitPoints.hitDie,
  recommendedStats: {},
  subclassSelectionLevel:
    option.subclassSelectionLevel ?? (SUBCLASS_AT_LEVEL_1.has(option.index) ? 1 : undefined),
});
