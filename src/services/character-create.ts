const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const CHARACTER_ENDPOINT = `${API_BASE_URL}/api/character`;

export interface CharacterProficienciesPayload {
  armor: string[];
  weapons: string[];
  skills: string[];
  tools: string[];
  languages: string[];
}

export interface CharacterSpellsPayload {
  cantrips: string[];
  spells: string[];
}

export interface CharacterInventoryItemPayload {
  ref: string;
  quantity: number;
}

export interface CharacterInventoryPayload {
  items: CharacterInventoryItemPayload[];
}

export interface CreateCharacterRequest {
  name: string;
  gender: 'male' | 'female';

  raceId: string;
  subraceId: string | null;

  alignmentId: string;
  backgroundId: string;

  classId: string;
  subclassId: string | null;

  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;

  proficiencies: CharacterProficienciesPayload;
  spells: CharacterSpellsPayload;
  inventory: CharacterInventoryPayload;
}

/**
 * POST /api/character — финальное сохранение персонажа.
 * 201 Created без тела при успехе. 400/401/404 — ошибки валидации/авторизации/не найдено.
 */
export const createCharacter = async (body: CreateCharacterRequest): Promise<void> => {
  const response = await fetch(CHARACTER_ENDPOINT, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let detail = '';
    try {
      const text = await response.text();
      detail = text ? ` — ${text}` : '';
    } catch {
      /* ignore */
    }
    throw new Error(`Failed to create character: ${response.status} ${response.statusText}${detail}`);
  }
};
