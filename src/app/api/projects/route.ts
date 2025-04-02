import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const GET = async () => {
  try {
    const jsonDirectory = path.join(process.cwd(), 'src/data');
    const fileContents = await fs.readFile(jsonDirectory + '/projects.json', 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load projects' }, 
      { status: 500 }
    );
  }
}
