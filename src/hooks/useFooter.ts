'use client';

import { useState, useEffect } from 'react';
import { getFooter } from '@/services/footer';
import type { FooterBlock } from '@/types/footer';

export const useFooter = () => {
  const [data, setData] = useState<FooterBlock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFooter = async () => {
    try {
      setLoading(true);
      const result = await getFooter();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  return { data, loading, error, refetch: fetchFooter };
};