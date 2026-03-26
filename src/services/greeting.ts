import type { GreetingBlock } from '@/types/greeting';

export const getGreeting = async (): Promise<GreetingBlock> => {
  return {
    title: 'Привет, путник!',
    description: 'Готов отправиться в путешествие по загадочным подземельям?',
    videoPlaceholder: {
      label: 'Видео о проекте',
    },
    ctaButtons: {
      primary: { text: 'Играть', action: '/play' },
      secondary: { text: 'Как это работает?', action: '/about' },
    },
  };

  // TODO: Когда будут эндпоинты — заменить на:
  // const { data } = await axios.get('/api/greeting');
  // return data;
};