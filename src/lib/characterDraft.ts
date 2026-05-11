import type { CharacterSelection, CharacterStats } from '@/types/character';
import type { CreateCharacterRequest } from '@/services/character-create';

/**
 * Собирает payload для POST /api/character из текущего состояния визарда.
 * Возвращает null, если обязательные поля не заполнены — вызывающий код
 * должен заранее проверять `canCreateCharacter` и/или показывать ошибку.
 */
export const buildCreateCharacterPayload = (
  selection: CharacterSelection,
  totalStats: CharacterStats | null,
): CreateCharacterRequest | null => {
  if (
    !selection.race ||
    !selection.characterClass ||
    !selection.gender ||
    !selection.name.trim() ||
    !selection.alignment ||
    !selection.origin
  ) {
    return null;
  }

  const stats = totalStats ?? selection.stats;

  return {
    name: selection.name.trim(),
    gender: selection.gender,
    raceId: selection.race.id,
    subraceId: selection.subRace?.id ?? null,
    alignmentId: selection.alignment.id,
    backgroundId: selection.origin.id,
    classId: selection.characterClass.id,
    subclassId: selection.subClass?.id ?? null,
    str: stats.strength,
    dex: stats.agility,
    con: stats.constitution,
    int: stats.intelligence,
    wis: stats.wisdom,
    cha: stats.charisma,
    proficiencies: { armor: [], weapons: [], skills: selection.selectedSkills ?? [], tools: [], languages: [] },
    spells: {
      cantrips: selection.cantrips ?? [],
      spells: selection.spells ?? [],
    },
    inventory: { items: [] },
  };
};
