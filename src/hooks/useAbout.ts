'use client';

import { useState, useEffect } from 'react';
import { getAbout } from '@/services/about';
import type { AboutBlock } from '@/types/about';

export const useAbout = () => {
  const [data, setData] = useState<AboutBlock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const result = await getAbout();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return { data, loading, error, refetch: fetchAbout };
};