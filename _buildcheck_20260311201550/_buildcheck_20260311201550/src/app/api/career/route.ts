import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { CareerEntry, CareerResponse, CareerEntryType } from '@/types';

function isValidCareerEntry(entry: any): entry is CareerEntry {
  const validTypes: CareerEntryType[] = [
    'Professional',
    'Internship',
    'Leadership',
    'Ambassadorship',
    'Volunteer'
  ];

  return (
    typeof entry.title === 'string' &&
    typeof entry.organization === 'string' &&
    typeof entry.location === 'string' &&
    typeof entry.startDate === 'string' &&
    typeof entry.endDate === 'string' &&
    typeof entry.icon === 'string' &&
    typeof entry.description === 'string' &&
    typeof entry.type === 'string' &&
    validTypes.includes(entry.type as CareerEntryType)
  );
}

export const GET = async () => {
  try {
    const jsonDirectory = path.join(process.cwd(), 'src/data');
    const fileContents = await fs.readFile(jsonDirectory + '/career.json', 'utf8');
    const data = JSON.parse(fileContents);

    // Validate the data structure
    if (!Array.isArray(data)) {
      throw new Error('Invalid career data format');
    }

    // Validate each career entry
    if (!data.every(isValidCareerEntry)) {
      throw new Error('Invalid career entry format');
    }

    const response: CareerResponse = { data };
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Career API Error:', error);
    const errorResponse: CareerResponse = {
      error: error instanceof Error ? error.message : 'Failed to load career data'
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}