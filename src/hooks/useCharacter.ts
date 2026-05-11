'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { CharacterData, CharacterSelection, CharacterStats, SubRace, DEFAULT_STATS, STATS_POINTS, STATS_BASE, STATS_MAX, STATS_MIN, STATS_TOTAL_MAX, StepId, RaceOption, SubRaceOption, ClassOption, BackgroundOption, SpellsResponse, SpellChoiceGroup, FirstLevelSubclassOption, AlignmentOption } from '@/types/character';
import { getCharacterData } from '@/services/character';
import { getRaces, adaptRaceOption } from '@/services/races';
import { getSubRaces, adaptSubRaceOption } from '@/services/subraces';
import { getClasses, adaptClassOption } from '@/services/classes';
import { getBackgrounds, adaptBackgroundOption } from '@/services/backgrounds';
import { getSpells } from '@/services/spells';
import { getAlignments } from '@/services/alignments';
import { getFirstLevelSubclasses, adaptSubclassOption } from '@/services/subclasses';
import { withRetry } from '@/services/_retry';

interface UseCharacterReturn {
  data: CharacterData | null;
  raceOptions: RaceOption[];
  selectedRaceOption: RaceOption | null;
  subRaceOptions: SubRaceOption[];
  selectedSubRaceOption: SubRaceOption | null;
  subRacesLoading: boolean;
  classOptions: ClassOption[];
  selectedClassOption: ClassOption | null;
  classOptionsLoading: boolean;
  subclassOptions: FirstLevelSubclassOption[];
  selectedSubclassOption: FirstLevelSubclassOption | null;
  subclassesLoading: boolean;
  backgroundOptions: BackgroundOption[];
  selectedBackgroundOption: BackgroundOption | null;
  backgroundsLoading: boolean;
  alignmentOptions: AlignmentOption[];
  selectedAlignmentOption: AlignmentOption | null;
  alignmentsLoading: boolean;
  cantripChoices: SpellChoiceGroup;
  spellChoices: SpellChoiceGroup;
  spellsLoading: boolean;
  classSkills: ClassOption['proficiencies']['skills'] | null;
  selection: CharacterSelection;
  primaryStat: string;
  raceBonuses: Record<string, number>;
  loading: boolean;
  error: string | null;
  currentStep: StepId;
  usedPoints: number;
  totalStats: CharacterStats | null;
  filteredSubRaces: SubRace[];
  setCurrentStep: (step: StepId) => void;
  selectRace: (raceId: string) => void;
  selectSubRace: (subRaceId: string) => void;
  selectClass: (classId: string) => void;
  selectSubClass: (subClassId: string) => void;
  selectOrigin: (originId: string) => void;
  selectAlignment: (alignmentId: string) => void;
  selectSkills: (skillRefs: string[]) => void;
  selectPrimaryStat: (stat: string) => void;
  selectSpells: (spellIds: string[]) => void;
  selectCantrips: (cantripIds: string[]) => void;
  updateStats: (stat: keyof CharacterStats, value: number) => void;
  setGender: (gender: 'male' | 'female') => void;
  setName: (name: string) => void;
  applyRecommendedStats: () => void;
  resetStats: () => void;
  randomizeRace: () => void;
  randomizeSubRace: () => void;
  randomizeClass: () => void;
  randomizeSubClass: () => void;
  randomizeOrigin: () => void;
  randomizeAlignment: () => void;
  randomizeSpells: () => void;
  randomizeStats: () => void;
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
  const [raceOptions, setRaceOptions] = useState<RaceOption[]>([]);
  const [subRaceOptions, setSubRaceOptions] = useState<SubRaceOption[]>([]);
  const [subRacesLoading, setSubRacesLoading] = useState(false);
  const [classOptions, setClassOptions] = useState<ClassOption[]>([]);
  const [classOptionsLoading, setClassOptionsLoading] = useState(false);
  const [subclassOptions, setSubclassOptions] = useState<FirstLevelSubclassOption[]>([]);
  const [subclassesLoading, setSubclassesLoading] = useState(false);
  const [backgroundOptions, setBackgroundOptions] = useState<BackgroundOption[]>([]);
  const [backgroundsLoading, setBackgroundsLoading] = useState(false);
  const [alignmentOptions, setAlignmentOptions] = useState<AlignmentOption[]>([]);
  const [alignmentsLoading, setAlignmentsLoading] = useState(false);
  const [cantripChoices, setCantripChoices] = useState<SpellChoiceGroup>({ choose: 0, items: [] });
  const [spellChoices, setSpellChoices] = useState<SpellChoiceGroup>({ choose: 0, items: [] });
  const [spellsLoading, setSpellsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<StepId>('name');

  // Подраса, которую UI должен выбрать по умолчанию для каждой расы.
  // Ключи — `index` (slug) расы, значения — `index` подрасы. Если
  // совпадения нет — фолбэк на первую подрасу.
  const DEFAULT_SUBRACE_BY_RACE: Record<string, string> = {
    elf: 'high-elf',
    dwarf: 'mountain-dwarf',
    gnome: 'forest-gnome',
    halfling: 'lightfoot-halfling',
    dragonborn: 'red-dragonborn',
    tiefling: 'zariel',
  };

  // Загрузка списка рас с бэкенда. Адаптируем RaceOption → Race и
  // подменяем `data.races`, чтобы остальной UI продолжал работать
  // без изменений; сами «сырые» опции храним отдельно для шагов,
  // которые показывают choices/traits/proficiencies.
  const fetchRaces = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const options = await withRetry(() => getRaces());
      setRaceOptions(options);
      setData((prev) => {
        if (!prev) return prev;
        return { ...prev, races: options.map(adaptRaceOption) };
      });
    } catch (e) {
      console.warn('[races]', e);
      setError(e instanceof Error ? e.message : 'Не удалось загрузить расы');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRaces();
  }, [fetchRaces]);

  // Загрузка списка классов с бэкенда. Адаптируем ClassOption → CharacterClass
  // и подменяем `data.classes`, чтобы остальной UI продолжал работать
  // без изменений; сами «сырые» опции храним отдельно для шагов классов.
  const fetchClasses = useCallback(async () => {
    setClassOptionsLoading(true);
    try {
      const options = await withRetry(() => getClasses());
      setClassOptions(options);
      setData((prev) => {
        if (!prev) return prev;
        return { ...prev, classes: options.map(adaptClassOption) };
      });
    } catch (e) {
      console.warn('[classes]', e);
    } finally {
      setClassOptionsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  // Загрузка списка происхождений с бэкенда. Адаптируем BackgroundOption → Origin
  // и подменяем `data.origins`, чтобы UI продолжал работать без изменений.
  const fetchBackgrounds = useCallback(async () => {
    setBackgroundsLoading(true);
    try {
      const options = await withRetry(() => getBackgrounds());
      setBackgroundOptions(options);
      setData((prev) => {
        if (!prev) return prev;
        return { ...prev, origins: options.map(adaptBackgroundOption) };
      });
    } catch (e) {
      console.warn('[backgrounds]', e);
    } finally {
      setBackgroundsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBackgrounds();
  }, [fetchBackgrounds]);

  const fetchAlignments = useCallback(async () => {
    setAlignmentsLoading(true);
    try {
      const options = await withRetry(() => getAlignments());
      setAlignmentOptions(options);
    } catch (e) {
      console.warn('[alignments]', e);
    } finally {
      setAlignmentsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlignments();
  }, [fetchAlignments]);

  const [primaryStat, setPrimaryStat] = useState<string>('str');

  const [selection, setSelection] = useState<CharacterSelection>({
    race: null,
    subRace: null,
    characterClass: null,
    subClass: null,
    origin: null,
    alignment: null,
    stats: { ...DEFAULT_STATS },
    gender: null,
    name: '',
    spells: [],
    cantrips: [],
    selectedSkills: [],
  });

  const usedPoints = Object.values(selection.stats).reduce((sum, val) => sum + val, 0) - STATS_BASE * 6;

  const raceBonuses = useMemo(() => {
    const result: Record<string, number> = { str: 0, dex: 0, int: 0, wis: 0, cha: 0 };
    const keyMap: Record<string, string> = {
      strength: 'str', agility: 'dex', intelligence: 'int', wisdom: 'wis', charisma: 'cha'
    };
    if (selection.race?.modifier) {
      Object.entries(selection.race.modifier).forEach(([key, val]) => {
        const uiKey = keyMap[key];
        if (uiKey) result[uiKey] += val;
      });
    }
    if (selection.subRace?.modifier) {
      Object.entries(selection.subRace.modifier).forEach(([key, val]) => {
        const uiKey = keyMap[key];
        if (uiKey) result[uiKey] += val;
      });
    }
    return result;
  }, [selection.race, selection.subRace]);

  // Полные данные (с фронт-API) текущей выбранной расы — нужны UI-шагам
  // подрасы / характеристик / превью, чтобы показать choices, traits,
  // hasSubraces, languages и т. п.
  const selectedRaceOption = useMemo(
    () => (selection.race ? raceOptions.find((r) => r.id === selection.race!.id) ?? null : null),
    [raceOptions, selection.race]
  );

  const selectedSubRaceOption = useMemo(
    () => (selection.subRace ? subRaceOptions.find((s) => s.id === selection.subRace!.id) ?? null : null),
    [subRaceOptions, selection.subRace]
  );

  // Полные данные (с бэкенда) текущего выбранного класса — нужны UI-шагу класса,
  // чтобы показать hitPoints, proficiencies и т. п.
  const selectedClassOption = useMemo(
    () => (selection.characterClass ? classOptions.find((c) => c.id === selection.characterClass!.id) ?? null : null),
    [classOptions, selection.characterClass]
  );

  // Полные данные текущего выбранного подкласса — для шагов, которым нужны
  // grants/spells/resources подкласса.
  const selectedSubclassOption = useMemo(
    () => (selection.subClass ? subclassOptions.find((s) => s.id === selection.subClass!.id) ?? null : null),
    [subclassOptions, selection.subClass]
  );

  // Подгружаем подклассы при смене выбранного класса, если у класса
  // выбор подкласса происходит на 1 уровне. Иначе очищаем.
  useEffect(() => {
    const classId = selection.characterClass?.id;
    if (!classId) {
      setSubclassOptions([]);
      return;
    }
    const charClass = selection.characterClass;
    if (charClass?.subclassSelectionLevel !== 1) {
      setSubclassOptions([]);
      return;
    }

    let cancelled = false;
    setSubclassesLoading(true);
    withRetry(() => getFirstLevelSubclasses(classId))
      .then((options) => {
        if (cancelled) return;
        setSubclassOptions(options);
        // Авто-выбор первой подрасы по slug, если стейт пуст
        // или подкласс относится к другому классу.
        if (options.length > 0) {
          setSelection((prev) => {
            const stillValid =
              prev.subClass && options.some((o) => o.id === prev.subClass!.id);
            if (stillValid) return prev;
            return { ...prev, subClass: adaptSubclassOption(options[0], classId) };
          });
        } else {
          setSelection((prev) => (prev.subClass ? { ...prev, subClass: null } : prev));
        }
      })
      .catch((e) => {
        if (cancelled) return;
        console.warn('[subclasses]', e);
        const fallback = (data?.subClasses ?? [])
          .filter((s) => s.classId === (charClass?.slug ?? classId))
          .map((sc) => ({
            id: sc.id,
            index: sc.id,
            name: { en: sc.name, ru: sc.name },
            summary: sc.description,
            grants: {
              proficiencies: { armor: [], tools: [], skills: { from: [], choose: 0 }, weapons: [], languages: { from: [], choose: 0 } },
              spells: { alwaysPrepared: [] },
              resources: [],
            },
          }));
        setSubclassOptions(fallback);
        if (fallback.length > 0) {
          setSelection((prev) => {
            const stillValid = prev.subClass && fallback.some((o) => o.id === prev.subClass!.id);
            if (stillValid) return prev;
            return { ...prev, subClass: adaptSubclassOption(fallback[0], classId) };
          });
        } else {
          setSelection((prev) => (prev.subClass ? { ...prev, subClass: null } : prev));
        }
      })
      .finally(() => {
        if (!cancelled) setSubclassesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selection.characterClass]);

  // Полные данные текущего выбранного происхождения — для шагов,
  // которым может понадобиться `index` или полное описание.
  const selectedBackgroundOption = useMemo(
    () => (selection.origin ? backgroundOptions.find((b) => b.id === selection.origin!.id) ?? null : null),
    [backgroundOptions, selection.origin]
  );

  const selectedAlignmentOption = useMemo(
    () => (selection.alignment ? alignmentOptions.find((a) => a.id === selection.alignment!.id) ?? null : null),
    [alignmentOptions, selection.alignment]
  );

  // Подгружаем подрасы при смене выбранной расы. Зависит ТОЛЬКО от
  // строкового UUID расы (`selection.race?.id`) и от справочника
  // `raceOptions` (нужен только для slug в логах). Не зависит от
  // `selectedRaceOption` (объект-ссылка пересчитывается при каждом
  // изменении selection — иначе ловим race-condition между
  // несколькими параллельными запросами `getSubRaces`).
  useEffect(() => {
    const raceId = selection.race?.id;
    if (!raceId) {
      setSubRaceOptions([]);
      return;
    }

    const raceOption = raceOptions.find((r) => r.id === raceId) ?? null;
    // Раньше здесь был ранний выход при `hasSubraces === false`,
    // но бэк выставляет этот флаг непоследовательно (например,
    // тифлингам ставит false, хотя подрасы есть). Поэтому
    // запрашиваем подрасы всегда — если бэк отдаст пустой
    // массив, UI сам покажет «У этой расы нет подрасы».

    let cancelled = false;
    setSubRacesLoading(true);
    withRetry(() => getSubRaces(raceId))
      .then((options) => {
        if (cancelled) return;
        setSubRaceOptions(options);
        const adapted = options.map((opt) => adaptSubRaceOption(opt, raceId));
        setData((prev) => {
          if (!prev) return prev;
          return { ...prev, subRaces: adapted };
        });
        // Автовыбор подрасы по умолчанию для текущей расы. Если для
        // расы задан слаг по умолчанию (DEFAULT_SUBRACE_BY_RACE) —
        // выбираем именно его. Иначе детерминированный фолбэк:
        // первая подраса при сортировке по slug — чтобы порядок
        // ответа от бэка не влиял на выбор.
        if (adapted.length > 0) {
          const raceSlug = raceOption?.index;
          const defaultSlug = raceSlug ? DEFAULT_SUBRACE_BY_RACE[raceSlug] : undefined;
          const matched = defaultSlug ? adapted.find((s) => s.slug === defaultSlug) : undefined;
          const sortedFallback = [...adapted].sort((a, b) => {
            const ka = a.slug ?? a.name ?? a.id ?? '';
            const kb = b.slug ?? b.name ?? b.id ?? '';
            return ka.localeCompare(kb);
          })[0];
          const defaultSubRace = matched ?? sortedFallback;
          setSelection((prev) => {
            if (
              prev.subRace &&
              prev.subRace.raceId === raceId &&
              prev.subRace.slug === defaultSubRace.slug
            ) {
              return prev;
            }
            return { ...prev, subRace: defaultSubRace };
          });
        }
      })
      .catch((e) => {
        if (cancelled) return;
        console.warn('[subraces]', e);
        setSubRaceOptions([]);
      })
      .finally(() => {
        if (!cancelled) setSubRacesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selection.race?.id, raceOptions]);

  const classSkills = useMemo(() => {
    return selectedClassOption?.proficiencies?.skills ?? null;
  }, [selectedClassOption]);

  const totalStats = useMemo(() => {
    if (!selection.race) return null;
    const result: CharacterStats = { ...selection.stats };
    if (selection.race.modifier) {
      Object.entries(selection.race.modifier).forEach(([key, val]) => {
        const statKey = key as keyof CharacterStats;
        result[statKey] = Math.min((result[statKey] || STATS_MIN) + val, STATS_TOTAL_MAX);
      });
    }
    if (selection.subRace?.modifier) {
      Object.entries(selection.subRace.modifier).forEach(([key, val]) => {
        const statKey = key as keyof CharacterStats;
        result[statKey] = Math.min((result[statKey] || STATS_MIN) + val, STATS_TOTAL_MAX);
      });
    }
    return result;
  }, [selection.stats, selection.race, selection.subRace]);

  useEffect(() => {
    if (currentStep === 'race' && !selection.race && data && data.races.length > 0) {
      const firstRace = data.races[0];
      setSelection((prev) => ({
        ...prev,
        race: firstRace,
        subRace: null,
        subClass: null,
      }));
    }
  }, [currentStep, data]);

  // Подгружаем доступные заговоры/заклинания при смене класса или подкласса.
  // Если класс не выбран — состояние сбрасывается. Если выбранный класс
  // ничего не колдует, бэк вернёт `choose: 0, items: []` для обеих групп.
  useEffect(() => {
    const classId = selection.characterClass?.id;
    if (!classId) {
      setCantripChoices({ choose: 0, items: [] });
      setSpellChoices({ choose: 0, items: [] });
      return;
    }

    let cancelled = false;
    setSpellsLoading(true);
    const rawSubclassId = selection.subClass?.id ?? null;
    const validSubclassId = rawSubclassId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(rawSubclassId) ? rawSubclassId : null;
    withRetry(() => getSpells({ classId, subclassId: validSubclassId }))
      .then((response: SpellsResponse) => {
        if (cancelled) return;
        setCantripChoices(response.cantrips);
        setSpellChoices(response.spells);
      })
      .catch((e) => {
        if (cancelled) return;
        console.warn('[spells]', e);
        setCantripChoices({ choose: 0, items: [] });
        setSpellChoices({ choose: 0, items: [] });
      })
      .finally(() => {
        if (!cancelled) setSpellsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selection.characterClass?.id, selection.subClass?.id]);

  const filteredSubRaces: SubRace[] = useMemo(() => {
    if (!data || !selection.race) return [];
    return data.subRaces.filter(s => s.raceId === selection.race!.id);
  }, [data, selection.race]);

const selectRace = (raceId: string) => {
  if (!data) return;
  const race = data.races.find((r) => r.id === raceId);
  if (race) {
    setSelection((prev) => ({
      ...prev,
      race,
      // Сбрасываем подрасу — она подгрузится отдельным эффектом и шаг подрасы
      // сам предложит первую/выбранную пользователем.
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
        selectedSkills: [],
      }));
    }
  };

  const selectSubClass = (subClassId: string) => {
    // Сначала ищем среди подклассов, загруженных с бэка для текущего класса.
    const apiOption = subclassOptions.find((o) => o.id === subClassId);
    if (apiOption) {
      const classId = selection.characterClass?.id;
      if (classId) {
        setSelection((prev) => ({ ...prev, subClass: adaptSubclassOption(apiOption, classId) }));
        return;
      }
    }
    // Fallback на хардкод-моки из getCharacterData (для совместимости).
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

  const selectAlignment = (alignmentId: string) => {
    const alignment = alignmentOptions.find((a) => a.id === alignmentId);
    if (alignment) {
      setSelection((prev) => ({ ...prev, alignment }));
    }
  };

  const updateStats = (stat: keyof CharacterStats, value: number) => {
    const clampedValue = Math.max(STATS_MIN, Math.min(STATS_MAX, value));
    
    setSelection((prev) => {
      const newStats = { ...prev.stats, [stat]: clampedValue };
      const newUsedPoints = Object.values(newStats).reduce((sum, val) => sum + val, 0) - STATS_BASE * 6;
      
      if (newUsedPoints > STATS_POINTS) {
        return prev;
      }
      
      const raceMod = prev.race?.modifier?.[stat] ?? 0;
      const subRaceMod = prev.subRace?.modifier?.[stat] ?? 0;
      if (clampedValue + raceMod + subRaceMod > STATS_TOTAL_MAX) {
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
        // Ограничиваем рекомендованное значение с учётом расовых/подрасовых бонусов
        // чтобы итоговая характеристика не превышала STATS_TOTAL_MAX
        const raceMod = selection.race?.modifier?.[statKey] ?? 0;
        const subRaceMod = selection.subRace?.modifier?.[statKey] ?? 0;
        const maxBase = STATS_TOTAL_MAX - raceMod - subRaceMod;
        newStats[statKey] = Math.min(value, STATS_MAX, maxBase);
      }
    });
    
    setSelection((prev) => ({ ...prev, stats: newStats }));
  };

  const resetStats = () => {
    setSelection((prev) => ({ ...prev, stats: { ...DEFAULT_STATS } }));
  };

  const randomizeStats = () => {
    const statKeys = Object.keys(DEFAULT_STATS) as (keyof CharacterStats)[];
    const newStats: CharacterStats = { ...DEFAULT_STATS };
    let remaining = STATS_POINTS;

    while (remaining > 0) {
      const available = statKeys.filter((key) => {
        const raceMod = selection.race?.modifier?.[key] ?? 0;
        const subRaceMod = selection.subRace?.modifier?.[key] ?? 0;
        if (newStats[key] + raceMod + subRaceMod >= STATS_TOTAL_MAX) return false;
        return newStats[key] < STATS_MAX;
      });
      if (available.length === 0) break;
      const randomKey = available[Math.floor(Math.random() * available.length)];
      newStats[randomKey]++;
      remaining--;
    }
    setSelection((prev) => ({ ...prev, stats: newStats }));
  };

  const randomizeRace = () => {
    if (!data || data.races.length === 0) return;
    const race = data.races[Math.floor(Math.random() * data.races.length)];
    setSelection((prev) => ({ ...prev, race, subRace: null, subClass: null }));
  };

  const randomizeSubRace = () => {
    if (subRaceOptions.length === 0) return;
    const option = subRaceOptions[Math.floor(Math.random() * subRaceOptions.length)];
    const raceId = selection.race?.id;
    if (raceId) {
      setSelection((prev) => ({ ...prev, subRace: adaptSubRaceOption(option, raceId) }));
    }
  };

  const randomizeClass = () => {
    if (!data || data.classes.length === 0) return;
    const charClass = data.classes[Math.floor(Math.random() * data.classes.length)];
    setSelection((prev) => ({ ...prev, characterClass: charClass, subClass: null, selectedSkills: [] }));
  };

  const randomizeSubClass = () => {
    if (subclassOptions.length === 0 || !selection.characterClass?.id) return;
    const option = subclassOptions[Math.floor(Math.random() * subclassOptions.length)];
    setSelection((prev) => ({ ...prev, subClass: adaptSubclassOption(option, selection.characterClass!.id) }));
  };

  const randomizeOrigin = () => {
    if (!data || data.origins.length === 0) return;
    const origin = data.origins[Math.floor(Math.random() * data.origins.length)];
    setSelection((prev) => ({ ...prev, origin }));
  };

  const randomizeAlignment = () => {
    if (alignmentOptions.length === 0) return;
    const alignment = alignmentOptions[Math.floor(Math.random() * alignmentOptions.length)];
    setSelection((prev) => ({ ...prev, alignment }));
  };

  const randomizeSpells = () => {
    const randomCantrips = cantripChoices.items
      .sort(() => Math.random() - 0.5)
      .slice(0, cantripChoices.choose)
      .map((item) => item.id);
    const randomSpells = spellChoices.items
      .sort(() => Math.random() - 0.5)
      .slice(0, spellChoices.choose)
      .map((item) => item.id);
    setSelection((prev) => ({ ...prev, cantrips: randomCantrips, spells: randomSpells }));
  };

  const selectSkills = (skillRefs: string[]) => {
    setSelection((prev) => ({ ...prev, selectedSkills: skillRefs }));
  };

  const selectPrimaryStat = (stat: string) => {
    setPrimaryStat(stat);
  };

  const selectSpells = (spellIds: string[]) => {
    setSelection((prev) => ({ ...prev, spells: spellIds }));
  };

  const selectCantrips = (cantripIds: string[]) => {
    setSelection((prev) => ({ ...prev, cantrips: cantripIds }));
  };

  const canCreateCharacter = Boolean(
    selection.race &&
    selection.characterClass &&
    selection.gender &&
    selection.name.trim().length > 0 &&
    selection.alignment &&
    selection.origin &&
    (selection.characterClass.subclassSelectionLevel !== 1 || selection.subClass)
  );

  return {
    data,
    raceOptions,
    selectedRaceOption,
    subRaceOptions,
    selectedSubRaceOption,
    subRacesLoading,
    classOptions,
    selectedClassOption,
    classOptionsLoading,
    subclassOptions,
    selectedSubclassOption,
    subclassesLoading,
    backgroundOptions,
    selectedBackgroundOption,
    backgroundsLoading,
    alignmentOptions,
    selectedAlignmentOption,
    alignmentsLoading,
    cantripChoices,
    spellChoices,
    spellsLoading,
    classSkills,
    selection,
    primaryStat,
    raceBonuses,
    loading,
    error,
    currentStep,
    usedPoints,
    totalStats,
    filteredSubRaces,
    setCurrentStep,
    selectRace,
    selectSubRace,
    selectClass,
    selectSubClass,
    selectOrigin,
    selectAlignment,
    selectSkills,
    selectPrimaryStat,
    selectSpells,
    selectCantrips,
    updateStats,
    setGender,
    setName,
    applyRecommendedStats,
    resetStats,
    randomizeRace,
    randomizeSubRace,
    randomizeClass,
    randomizeSubClass,
    randomizeOrigin,
    randomizeAlignment,
    randomizeSpells,
    randomizeStats,
    canCreateCharacter,
    refetch: () => { fetchRaces(); fetchClasses(); },
  };
};
