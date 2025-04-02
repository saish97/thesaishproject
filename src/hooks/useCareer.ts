import { useState, useEffect } from 'react';
import { CareerEntry, CareerResponse } from '@/types';

export function useCareer() {
  const [entries, setEntries] = useState<CareerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCareerData = async () => {
      try {
        const response = await fetch('/api/career', {
          signal: abortController.signal
        });
        const result: CareerResponse = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch career data');
        }
        
        if (result.data) {
          setEntries(result.data);
        } else {
          throw new Error('No career data received');
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        setError(error instanceof Error ? error.message : 'Failed to fetch career data');
      } finally {
        setLoading(false);
      }
    };

    fetchCareerData();

    return () => {
      abortController.abort();
    };
  }, []);

  return { entries, loading, error };
}