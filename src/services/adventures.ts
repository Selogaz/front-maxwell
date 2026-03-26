import type { AdventuresBlock } from '@/types/adventures';

export const getAdventures = async (): Promise<AdventuresBlock> => {
  return {
    title: 'Приключения',
    subtitle: 'Найди свои приключения',
    adventures: [
      { id: '1', name: 'История 1' },
      { id: '2', name: 'История 2' },
      { id: '3', name: 'История 3' },
    ],
    ctaButton: {
      text: 'Начать игру',
      action: '/play',
    },
  };

  // TODO: Когда будут эндпоинты — заменить на:
  // const { data } = await axios.get('/api/adventures');
  // return data;
};