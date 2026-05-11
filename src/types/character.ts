export type StepId = 'name' | 'gender' | 'race' | 'subrace' | 'class' | 'subclass' | 'origin' | 'alignment' | 'spells' | 'stats';

export interface CharacterStep {
  id: StepId;
  number: number;
  title: string;
  icon: string;
}

export interface CharacterOption {
  id: string;
  name: string;
  imageUrl?: string;
  description: string;
}

export interface RaceTraitInfo {
  ref: string;
  name: string;
  summary: string;
}

export interface Race extends CharacterOption {
  modifier: Record<string, number>;
  /** Технический slug расы (например "human", "tiefling"). Приходит из поля `index` бэкенда. */
  slug?: string;
  /** Расовые черты/особенности. */
  traits?: RaceTraitInfo[];
}

export interface SubRace extends CharacterOption {
  raceId: string;
  modifier: Record<string, number>;
  /** Технический slug подрасы (например "high-elf"). Приходит из поля `index` бэкенда. */
  slug?: string;
  /** Особенности подрасы (добавляются к расовым). */
  traits?: RaceTraitInfo[];
}

export interface CharacterClass extends CharacterOption {
  description: string;
  recommendedStats: Record<string, number>;
  slug?: string;
  hitDie?: number;
  summary?: string;
  /** Уровень, на котором класс выбирает подкласс. 1 = выбор на старте создания персонажа. */
  subclassSelectionLevel?: number;
}

export interface SubClass extends CharacterOption {
  classId: string;
}

export interface Origin extends CharacterOption {
  bonus: string;
}

export interface AlignmentOption {
  id: string;
  index: string;
  name: string;
  description: string;
}

export interface AlignmentsResponse {
  items: AlignmentOption[];
}

export interface CharacterStats {
  strength: number;
  agility: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface CharacterStatsInfo {
  name: string;
  shortName: string;
  description: string;
  icon: string;
}

export interface CharacterData {
  steps: CharacterStep[];
  races: Race[];
  subRaces: SubRace[];
  classes: CharacterClass[];
  subClasses: SubClass[];
  origins: Origin[];
  statsInfo: CharacterStatsInfo[];
}

export interface CharacterSelection {
  race: Race | null;
  subRace: SubRace | null;
  characterClass: CharacterClass | null;
  subClass: SubClass | null;
  origin: Origin | null;
  alignment: AlignmentOption | null;
  stats: CharacterStats;
  gender: 'male' | 'female' | null;
  name: string;
  /** UUID выбранных обычных заклинаний 1 уровня. */
  spells: string[];
  /** UUID выбранных заговоров (cantrips). */
  cantrips: string[];
  /** ref выбранных навыков из класса. */
  selectedSkills: string[];
}

export const DEFAULT_STATS: CharacterStats = {
  strength: 10,
  agility: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};

export const STATS_POINTS = 27;
export const STATS_BASE = 10;

export const STATS_MAX = 20;
export const STATS_MIN = 0;
export const STATS_TOTAL_MAX = 20;

// ──────────────────────────────────────────────────────────────────────
// Backend API: GET /api/character-builder/races
// ──────────────────────────────────────────────────────────────────────

export type AbilityRef = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export interface RaceFixedAbilityBonus {
  ref: AbilityRef;
  value: number;
}

export interface RaceAbilityChoice {
  from: { ref: AbilityRef }[];
  count: number;
  value: number;
  differentAbilities: boolean;
}

export interface RaceLanguageItem {
  ref: string;
  name: string;
}

export interface RaceLanguageChoice {
  count: number;
  /** "any" — любой язык; массив — конкретный список. */
  from: 'any' | RaceLanguageItem[];
}

export interface RaceProficiencyItem {
  ref: string;
  name: string;
  summary?: string;
}

export interface RaceProficiencyChoice {
  count: number;
  from: RaceProficiencyItem[];
}

export interface RaceProficiencyGroup {
  fixed: RaceProficiencyItem[];
  choices: RaceProficiencyChoice[];
}

export interface RaceTrait {
  ref: string;
  name: string;
  summary: string;
}

export interface RaceOption {
  id: string;
  index: string;
  name: string;
  summary: string;
  size: { ref: string; name: string };
  speed: { walk: number };
  abilityBonuses: {
    fixed: RaceFixedAbilityBonus[];
    choices: RaceAbilityChoice[];
  };
  senses: {
    truesight: number | null;
    blindsight: number | null;
    darkvision: number | null;
    tremorsense: number | null;
  };
  languages: {
    fixed: RaceLanguageItem[];
    choices: RaceLanguageChoice[];
  };
  traits: { items: RaceTrait[] };
  proficiencies: {
    armor: RaceProficiencyGroup;
    tools: RaceProficiencyGroup;
    skills: RaceProficiencyGroup;
    weapons: RaceProficiencyGroup;
  };
  images: {
    card: string | null;
    thumb: string | null;
    original: string | null;
  };
  hasSubraces: boolean;
}

// ──────────────────────────────────────────────────────────────────────
// GET /api/character-builder/races/:raceId/subraces
// ──────────────────────────────────────────────────────────────────────

export interface SubRaceFixedAbilityBonus {
  value: number;
  ability: { ref: AbilityRef };
}

export interface SubRaceLanguageChoice {
  from: 'any' | RaceLanguageItem[];
  choose: number;
}

export interface SubRaceOption {
  id: string;
  index: string;
  name: { en: string; ru: string };
  summary: string;
  raceId: string;
  abilityBonuses: {
    fixed: SubRaceFixedAbilityBonus[];
    choices: RaceAbilityChoice[];
  };
  senses: {
    truesight: number | null;
    blindsight: number | null;
    darkvision: number | null;
    tremorsense: number | null;
  };
  traits: { items: RaceTrait[] };
  proficiencies: {
    armor: RaceProficiencyGroup;
    tools: RaceProficiencyGroup;
    skills: RaceProficiencyGroup;
    weapons: RaceProficiencyGroup;
    languages: {
      fixed: RaceLanguageItem[];
      choices: SubRaceLanguageChoice[];
    };
  };
  images: {
    card: string | null;
    thumb: string | null;
    original: string | null;
  };
}

export interface SubRacesResponse {
  raceId: string;
  items: SubRaceOption[];
}

// ──────────────────────────────────────────────────────────────────────
// GET /api/character-builder/backgrounds
// ──────────────────────────────────────────────────────────────────────

export interface BackgroundOption {
  id: string;
  index: string;
  name: string;
  description: string;
}

export interface BackgroundsResponse {
  items: BackgroundOption[];
}

// ──────────────────────────────────────────────────────────────────────
// POST /api/character-builder/spells
// ──────────────────────────────────────────────────────────────────────

export interface SpellOption {
  id: string;
  index: string;
  name: string;
  description: string | string[] | null;
}

export interface SpellChoiceGroup {
  /** Сколько элементов игрок должен выбрать. 0 = выбор не требуется. */
  choose: number;
  items: SpellOption[];
}

export interface SpellsResponse {
  cantrips: SpellChoiceGroup;
  spells: SpellChoiceGroup;
}

export interface SpellsRequestBody {
  classId: string;
  subclassId: string | null;
}

// ──────────────────────────────────────────────────────────────────────
// GET /api/character-builder/classes/{classId}/subclasses?level=1
// ──────────────────────────────────────────────────────────────────────

export interface SubclassSkillChoice {
  from: { ref: string }[];
  choose: number;
}

export interface SubclassLanguageChoice {
  from: { ref: string }[];
  choose: number;
}

export interface SubclassAlwaysPreparedSpells {
  level: number;
  spells: { ref: string }[];
}

export interface SubclassResource {
  resourceKey: string;
  usage: {
    min: number;
    scaling: unknown[];
    recovery: string;
    maxAbilityModifier: { ref: AbilityRef };
  };
}

export interface SubclassGrants {
  proficiencies: {
    armor: { ref: string }[];
    tools: { ref: string }[];
    skills: SubclassSkillChoice;
    weapons: { ref: string }[];
    languages: SubclassLanguageChoice;
  };
  spells: {
    alwaysPrepared: SubclassAlwaysPreparedSpells[];
  };
  resources: SubclassResource[];
}

export interface FirstLevelSubclassOption {
  id: string;
  index: string;
  name: { en: string; ru: string };
  summary: string;
  grants: SubclassGrants;
}

export interface FirstLevelSubclassesResponse {
  classId: string;
  items: FirstLevelSubclassOption[];
}

// ──────────────────────────────────────────────────────────────────────
// Backend API: GET /api/character-builder/classes
// ──────────────────────────────────────────────────────────────────────

export interface ClassHitPoints {
  hitDie: number;
  perLevelAfter1: {
    roll: string;
    fixedAverage: number;
  };
  abilityModifierRef: string;
}

export interface ClassProficiencyRef {
  ref: string;
}

export interface ClassSkillItem {
  ref: string;
  name: string;
}

export interface ClassProficiencies {
  armor: ClassProficiencyRef[];
  weapons: ClassProficiencyRef[];
  tools: ClassProficiencyRef[];
  savingThrows: ClassProficiencyRef[];
  skills: {
    choose: number;
    from: ClassSkillItem[];
  };
}

export interface ClassStartingEquipment {
  fixed: unknown[];
  choices: unknown[];
}

export interface ClassOption {
  id: string;
  index: string;
  name: string;
  summary: string;
  hitPoints: ClassHitPoints;
  proficiencies: ClassProficiencies;
  startingEquipment: ClassStartingEquipment;
  /** Уровень выбора подкласса (если бэк присылает). */
  subclassSelectionLevel?: number;
}
