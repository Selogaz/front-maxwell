export type StepId = 'race' | 'subrace' | 'class' | 'subclass' | 'origin' | 'stats';

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

export interface Race extends CharacterOption {
  modifier: Record<string, number>;
}

export interface SubRace extends CharacterOption {
  raceId: string;
  modifier: Record<string, number>;
}

export interface CharacterClass extends CharacterOption {
  description: string;
  recommendedStats: Record<string, number>;
}

export interface SubClass extends CharacterOption {
  classId: string;
}

export interface Origin extends CharacterOption {
  bonus: string;
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
  stats: CharacterStats;
  gender: 'male' | 'female' | null;
  name: string;
}

export const DEFAULT_STATS: CharacterStats = {
  strength: 8,
  agility: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8,
};

export const STATS_POINTS = 27;

export const STATS_MAX = 15;
export const STATS_MIN = 8;
