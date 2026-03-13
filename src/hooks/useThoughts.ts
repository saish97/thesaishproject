'use client';

import { useState, useEffect } from 'react';
import { ThoughtPost } from '@/types';

interface ThoughtsResponse {
  data?: ThoughtPost[];
  error?: string;
}

export function useThoughts() {
  const [thoughts, setThoughts] = useState<ThoughtPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchThoughts = async () => {
      try {
        const response = await fetch('/api/thoughts', {
          signal: abortController.signal,
        });
        const result: ThoughtsResponse = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch thoughts');
        }

        if (result.data) {
          setThoughts(result.data);
        } else {
          throw new Error('No thoughts data received');
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        setError(error instanceof Error ? error.message : 'Failed to fetch thoughts');
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();

    return () => {
      abortController.abort();
    };
  }, []);

  return { thoughts, loading, error };
}
