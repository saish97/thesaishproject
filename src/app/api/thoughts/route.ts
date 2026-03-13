import { NextResponse } from 'next/server';
import { getAllThoughts } from '@/db/queries';
import type { ThoughtPost } from '@/types';

export interface ThoughtsResponse {
  data?: ThoughtPost[];
  error?: string;
}

export const GET = async () => {
  try {
    const data = await getAllThoughts();

    const response: ThoughtsResponse = { data };
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Thoughts API Error:', error);
    const errorResponse: ThoughtsResponse = {
      error: error instanceof Error ? error.message : 'Failed to load thoughts',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
};
