'use client';

import { useState, useEffect } from 'react';
import { getGreeting } from '@/services/greeting';
import type { GreetingBlock } from '@/types/greeting';

export const useGreeting = () => {
  const [data, setData] = useState<GreetingBlock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGreeting = async () => {
    try {
      setLoading(true);
      const result = await getGreeting();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGreeting();
  }, []);

  return { data, loading, error, refetch: fetchGreeting };
};