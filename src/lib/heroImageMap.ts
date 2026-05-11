import { Race, SubRace } from '@/types/character';

type Gender = 'male' | 'female';

interface HeroImageMap {
  [raceId: string]: {
    base?: string;
    subRaces?: {
      [subRaceId: string]: string;
    };
  };
}

const HERO_IMAGE_MAP: HeroImageMap = {
  human: {
    base: 'human',
  },
  elf: {
    base: 'high_elf',
    subRaces: {
      'high-elf': 'high_elf',
      'wood-elf': 'forest_elf',
      'drow': 'drou_elf',
      'dark-elf': 'drou_elf',
      'drow-elf': 'drou_elf',
      'dark-elf-drow': 'drou_elf',
    },
  },
  dwarf: {
    base: 'mountain_dwarf',
    subRaces: {
      'mountain-dwarf': 'mountain_dwarf',
      'hill-dwarf': 'dwarf_hill',
    },
  },
  halfling: {
    base: 'halfling_light',
    subRaces: {
      'lightfoot': 'halfling_light',
      'stout': 'thickheel_halfling',
    },
  },
  orc: {
    base: 'half_orc',
  },
  'half-orc': {
    base: 'half_orc',
  },
  
  dragonborn: {
    base: 'dragonborn_colored',
    subRaces: {
      'dragonblood': 'dragonborn_dragonblood',
      'colored-dragonborn': 'dragonborn_colored',
      'ravenite': 'dragonborn_ravenite',
    },
  },
  gnome: {
    base: 'gnome_forest',
    subRaces: {
      'deep-gnome': 'gnome_deep',
      'forest-gnome': 'gnome_forest',
      'rock-gnome': 'gnome_rock',
    },
  },
  tiefling: {
    base: 'tiefling_zariel',
    subRaces: {
      'asmodeus': 'tiefling_asmodeus',
      'asmodeus-tiefling': 'tiefling_asmodeus',
      'tiefling-asmodeus': 'tiefling_asmodeus',
      'zariel': 'tiefling_zariel',
      'zariel-tiefling': 'tiefling_zariel',
      'tiefling-zariel': 'tiefling_zariel',
      'mephisto': 'tiefling_mephistopheles',
      'mephistopheles': 'tiefling_mephistopheles',
      'mephisto-tiefling': 'tiefling_mephistopheles',
      'tiefling-mephisto': 'tiefling_mephistopheles',
      'tiefling-mephistopheles': 'tiefling_mephistopheles',
    },
  },
};

export function getHeroImagePath(
  race: Race | null,
  subRace: SubRace | null,
  gender: Gender | null
): string | null {
  if (!race || !gender) return null;

  // Сначала ищем по `slug` (это `index` из бэка, типа "human", "tiefling"),
  // затем фолбэк на `id` для совместимости со старыми источниками.
  const raceMap = HERO_IMAGE_MAP[race.slug ?? ''] ?? HERO_IMAGE_MAP[race.id];
  if (!raceMap) return null;

  let prefix: string | undefined;

  // Сначала пробуем по slug подрасы (приходит из бэка), затем по id —
  // fallback для старых моков, где id были строковые слаги.
  const subRaceKey = subRace?.slug ?? subRace?.id;
  if (subRace && raceMap.subRaces && subRaceKey && raceMap.subRaces[subRaceKey]) {
    prefix = raceMap.subRaces[subRaceKey];
  } else if (raceMap.base) {
    prefix = raceMap.base;
  }

  if (!prefix) return null;

  return `/create_char/HeroBlock/${prefix}_${gender}.png`;
}
