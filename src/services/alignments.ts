import { AlignmentOption, AlignmentsResponse } from '@/types/character';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const ALIGNMENTS_ENDPOINT = `${API_BASE_URL}/api/character-builder/alignments`;

export const getAlignments = async (): Promise<AlignmentOption[]> => {
  const response = await fetch(ALIGNMENTS_ENDPOINT, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to load alignments: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  if (Array.isArray((payload as AlignmentsResponse)?.items)) {
    return (payload as AlignmentsResponse).items;
  }
  if (Array.isArray(payload)) return payload as AlignmentOption[];
  if (Array.isArray(payload?.data)) return payload.data as AlignmentOption[];
  if (Array.isArray(payload?.results)) return payload.results as AlignmentOption[];

  console.warn('[alignments] unexpected payload shape:', payload);
  throw new Error('Alignments endpoint returned unexpected payload shape');
};
