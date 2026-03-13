import { NextResponse } from 'next/server';
import { getAllProjects } from '@/db/queries';
import { ProjectsResponse } from '@/types';

export const GET = async () => {
  try {
    const projects = await getAllProjects();

    const response: ProjectsResponse = { data: { projects } };
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Projects API Error:', error);
    const errorResponse: ProjectsResponse = {
      error: error instanceof Error ? error.message : 'Failed to load projects',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
};
