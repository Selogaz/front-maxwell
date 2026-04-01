import type { HeaderBlock } from '@/types/header';

export const getHeader = async (): Promise<HeaderBlock> => {
  return {
    logo: {
      src: '/full_logo.svg',
      alt: 'Logo',
      width: 40,
      height: 40,
    },
    navLinks: [
      { id: 'how-it-works', href: '/about', label: 'Как это работает?', isActive: false },
      { id: 'play', href: '/play', label: 'Играть', isActive: false },
      { id: 'adventures', href: '/adventures', label: 'Приключения', isActive: false },
      { id: 'pricing', href: '/price', label: 'Цены', isActive: false },
    ],
    userMenu: {
      label: 'Личный кабинет',
      href: '/lk',
    },
    mobileMenuButton: {
      label: 'Меню',
    },
  };

  // TODO: Когда будут эндпоинты — заменить на:
  // const { data } = await axios.get('/api/header');
  // return data;
};