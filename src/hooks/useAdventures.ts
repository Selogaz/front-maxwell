'use client';

import { useState, useEffect } from 'react';
import { getAdventures } from '@/services/adventures';
import type { AdventuresBlock } from '@/types/adventures';

export const useAdventures = () => {
  const [data, setData] = useState<AdventuresBlock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdventures = async () => {
    try {
      setLoading(true);
      const result = await getAdventures();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, []);

  return { data, loading, error, refetch: fetchAdventures };
};