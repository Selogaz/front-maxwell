'use client';

import { useState, useEffect } from 'react';
import { getAdvantages } from '@/services/advantages';
import type { AdvantagesBlock } from '@/types/advantages';

export const useAdvantages = () => {
  const [data, setData] = useState<AdvantagesBlock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvantages = async () => {
    try {
      setLoading(true);
      const result = await getAdvantages();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvantages();
  }, []);

  return { data, loading, error, refetch: fetchAdvantages };
};