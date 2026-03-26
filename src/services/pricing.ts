import type { PricingPlan } from '@/types/pricing';

export const getPlans = async (): Promise<PricingPlan[]> => {
  return [
    {
      id: '1',
      name: 'Бесплатно',
      price: 0,
      period: '',
      features: ['Играть с ИИ', 'До 3 друзей', '3 игры'],
      isCurrent: true,
    },
    {
      id: '2',
      name: 'Мини-сессии',
      price: 150,
      period: 'руб/сессия',
      features: ['Играть с друзьями', 'До 10 друзей', 'Безлимит игр'],
    },
    {
      id: '3',
      name: 'Полная игра',
      price: 1200,
      period: 'руб/сессия',
      features: ['Всё из базового', 'Приоритет в очереди'],
    },
  ];

  // TODO: Когда будут эндпоинты — заменить на:
  // const { data } = await axios.get('/api/pricing/plans');
  // return data;
};
