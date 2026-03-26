'use client';

import { useState, useEffect } from 'react';
import { getHeader } from '@/services/header';
import type { HeaderBlock } from '@/types/header';

export const useHeader = () => {
  const [data, setData] = useState<HeaderBlock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeader = async () => {
    try {
      setLoading(true);
      const result = await getHeader();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeader();
  }, []);

  return { data, loading, error, refetch: fetchHeader };
};