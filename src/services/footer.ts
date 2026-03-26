import type { FooterBlock } from '@/types/footer';

export const getFooter = async (): Promise<FooterBlock> => {
  return {
    images: [
      { id: '1', label: 'Изображение 1' },
      { id: '2', label: 'Изображение 2' },
      { id: '3', label: 'Изображение 3' },
    ],
    logo: {
      src: '/full_logo.svg',
      alt: 'Logo',
      width: 200,
      height: 40,
    },
  };

  // TODO: Когда будут эндпоинты — заменить на:
  // const { data } = await axios.get('/api/footer');
  // return data;
};