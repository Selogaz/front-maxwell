import type { AboutBlock } from '@/types/about';

export const getAbout = async (): Promise<AboutBlock> => {
  return {
    title: 'Как это работает?',
    videos: [
      { id: '1', title: 'Видео 1' },
      { id: '2', title: 'Видео 2' },
      { id: '3', title: 'Видео 3' },
    ],
    ctaButton: {
      text: 'Попробовать демо',
      action: '/demo',
    },
  };

  // TODO: Когда будут эндпоинты — заменить на:
  // const { data } = await axios.get('/api/about');
  // return data;
};