'use client';

import { useState, useEffect, useCallback } from 'react';
import { CharacterData, CharacterSelection, CharacterStats, DEFAULT_STATS, STATS_POINTS, STATS_MAX, STATS_MIN, StepId } from '@/types/character';
import { getCharacterData } from '@/services/character';

interface UseCharacterReturn {
  data: CharacterData | null;
  selection: CharacterSelection;
  loading: boolean;
  error: string | null;
  currentStep: StepId;
  usedPoints: number;
  setCurrentStep: (step: StepId) => void;
  selectRace: (raceId: string) => void;
  selectSubRace: (subRaceId: string) => void;
  selectClass: (classId: string) => void;
  selectSubClass: (subClassId: string) => void;
  selectOrigin: (originId: string) => void;
  updateStats: (stat: keyof CharacterStats, value: number) => void;
  setGender: (gender: 'male' | 'female') => void;
  setName: (name: string) => void;
  applyRecommendedStats: () => void;
  resetStats: () => void;
  randomizeCharacter: () => void;
  canCreateCharacter: boolean;
  refetch: () => void;
}

export const useCharacter = (): UseCharacterReturn => {
  const [data, setData] = useState<CharacterData | null>(() => {
    try {
      return getCharacterData();
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<StepId>('name');

  const [selection, setSelection] = useState<CharacterSelection>({
    race: null,
    subRace: null,
    characterClass: null,
    subClass: null,
    origin: null,
    stats: { ...DEFAULT_STATS },
    gender: null,
    name: '',
  });

  const usedPoints = Object.values(selection.stats).reduce((sum, val) => sum + val, 0) - STATS_MIN * 6;

  const selectRace = (raceId: string) => {
    if (!data) return;
    const race = data.races.find((r) => r.id === raceId);
    if (race) {
      setSelection((prev) => ({
        ...prev,
        race,
        subRace: null,
        subClass: null,
      }));
    }
  };

  const selectSubRace = (subRaceId: string) => {
    if (!data) return;
    const subRace = data.subRaces.find((s) => s.id === subRaceId);
    if (subRace) {
      setSelection((prev) => ({ ...prev, subRace }));
    }
  };

  const selectClass = (classId: string) => {
    if (!data) return;
    const characterClass = data.classes.find((c) => c.id === classId);
    if (characterClass) {
      setSelection((prev) => ({
        ...prev,
        characterClass,
        subClass: null,
      }));
    }
  };

  const selectSubClass = (subClassId: string) => {
    if (!data) return;
    const subClass = data.subClasses.find((s) => s.id === subClassId);
    if (subClass) {
      setSelection((prev) => ({ ...prev, subClass }));
    }
  };

  const selectOrigin = (originId: string) => {
    if (!data) return;
    const origin = data.origins.find((o) => o.id === originId);
    if (origin) {
      setSelection((prev) => ({ ...prev, origin }));
    }
  };

  const updateStats = (stat: keyof CharacterStats, value: number) => {
    const clampedValue = Math.max(STATS_MIN, Math.min(STATS_MAX, value));
    
    setSelection((prev) => {
      const newStats = { ...prev.stats, [stat]: clampedValue };
      const newUsedPoints = Object.values(newStats).reduce((sum, val) => sum + val, 0) - STATS_MIN * 6;
      
      if (newUsedPoints > STATS_POINTS) {
        return prev;
      }
      
      return { ...prev, stats: newStats };
    });
  };

  const setGender = (gender: 'male' | 'female') => {
    setSelection((prev) => ({ ...prev, gender }));
  };

  const setName = (name: string) => {
    setSelection((prev) => ({ ...prev, name }));
  };

  const applyRecommendedStats = () => {
    if (!data || !selection.characterClass) return;
    
    const recommended = selection.characterClass.recommendedStats;
    const newStats: CharacterStats = { ...DEFAULT_STATS };
    
    Object.entries(recommended).forEach(([key, value]) => {
      const statKey = key.toLowerCase() as keyof CharacterStats;
      if (statKey in newStats) {
        newStats[statKey] = Math.min(value, STATS_MAX);
      }
    });
    
    setSelection((prev) => ({ ...prev, stats: newStats }));
  };

  const resetStats = () => {
    setSelection((prev) => ({ ...prev, stats: { ...DEFAULT_STATS } }));
  };

  const randomizeCharacter = () => {
    if (!data) return;

    const randomRace = data.races[Math.floor(Math.random() * data.races.length)];
    const raceSubRaces = data.subRaces.filter((s) => s.raceId === randomRace.id);
    const randomSubRace = raceSubRaces.length > 0 ? raceSubRaces[Math.floor(Math.random() * raceSubRaces.length)] : null;

    const randomClass = data.classes[Math.floor(Math.random() * data.classes.length)];
    const classSubClasses = data.subClasses.filter((s) => s.classId === randomClass.id);
    const randomSubClass = classSubClasses.length > 0 ? classSubClasses[Math.floor(Math.random() * classSubClasses.length)] : null;

    const randomOrigin = data.origins[Math.floor(Math.random() * data.origins.length)];
    const randomGender = Math.random() > 0.5 ? 'male' : 'female';

    const randomStats: CharacterStats = {
      strength: Math.floor(Math.random() * (STATS_MAX - STATS_MIN + 1)) + STATS_MIN,
      agility: Math.floor(Math.random() * (STATS_MAX - STATS_MIN + 1)) + STATS_MIN,
      constitution: Math.floor(Math.random() * (STATS_MAX - STATS_MIN + 1)) + STATS_MIN,
      intelligence: Math.floor(Math.random() * (STATS_MAX - STATS_MIN + 1)) + STATS_MIN,
      wisdom: Math.floor(Math.random() * (STATS_MAX - STATS_MIN + 1)) + STATS_MIN,
      charisma: Math.floor(Math.random() * (STATS_MAX - STATS_MIN + 1)) + STATS_MIN,
    };

    const names = ['Альaric', 'Торин', 'Эльвира', 'Грок', 'Селена', 'Дракон', 'Люмина', 'Шадоу', 'Винтер', 'Фаер'];
    const randomName = names[Math.floor(Math.random() * names.length)] + ' ' + names[Math.floor(Math.random() * names.length)];

    setSelection({
      race: randomRace,
      subRace: randomSubRace,
      characterClass: randomClass,
      subClass: randomSubClass,
      origin: randomOrigin,
      stats: randomStats,
      gender: randomGender,
      name: randomName,
    });
  };

  const canCreateCharacter = Boolean(
    selection.race &&
    selection.characterClass &&
    selection.gender &&
    selection.name.trim().length > 0
  );

  return {
    data,
    selection,
    loading,
    error,
    currentStep,
    usedPoints,
    setCurrentStep,
    selectRace,
    selectSubRace,
    selectClass,
    selectSubClass,
    selectOrigin,
    updateStats,
    setGender,
    setName,
    applyRecommendedStats,
    resetStats,
    randomizeCharacter,
    canCreateCharacter,
    refetch: () => {},
  };
};
