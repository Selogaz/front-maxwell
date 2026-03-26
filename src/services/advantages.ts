import type { AdvantagesBlock } from '@/types/advantages';

export const getAdvantages = async (): Promise<AdvantagesBlock> => {
  return {
    title: 'Наши преимущества',
    items: [
      {
        id: '1',
        title: 'Погружение с отыгрышем',
        description: 'Огромный простор для творчества и погружение в атмосферу dark fantasy',
        iconName: 'diamond',
      },
      {
        id: '2',
        title: 'ИИ-мастер',
        description: 'ИИ-мастер всегда доступен и мягко направляет даже новичков',
        iconName: 'robot',
      },
      {
        id: '3',
        title: 'Легкий старт',
        description: 'Не обязательно знать таблицы и формулы — наслаждайтесь атмосферой',
        iconName: 'rocket',
      },
      {
        id: '4',
        title: 'Время и компания не важны',
        description: 'Играйте в команде или в соло-режиме, когда вам удобно',
        iconName: 'clock',
      },
    ],
    ctaButtons: {
      primary: { text: 'Начать игру', action: '/play' },
      secondary: { text: 'Цена', action: '/price' },
    },
  };

  // TODO: Когда будут эндпоинты — заменить на:
  // const { data } = await axios.get('/api/advantages');
  // return data;
};