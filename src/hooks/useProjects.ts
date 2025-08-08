"use client";

import { useState, useEffect } from 'react';
import { Project, ProjectsResponse } from '@/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects', {
          signal: abortController.signal
        });
        const result: ProjectsResponse = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch projects');
        }

        if (result.data?.projects) {
          setProjects(result.data.projects);
        } else {
          throw new Error('No projects data received');
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        setError(error instanceof Error ? error.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      abortController.abort();
    };
  }, []);

  return { projects, loading, error };
}