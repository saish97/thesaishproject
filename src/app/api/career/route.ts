import { NextResponse } from 'next/server';
import { getAllCareerEntries } from '@/db/queries';
import { CareerResponse } from '@/types';

export const GET = async () => {
  try {
    const data = await getAllCareerEntries();

    const response: CareerResponse = { data };
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Career API Error:', error);
    const errorResponse: CareerResponse = {
      error: error instanceof Error ? error.message : 'Failed to load career data',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
};
