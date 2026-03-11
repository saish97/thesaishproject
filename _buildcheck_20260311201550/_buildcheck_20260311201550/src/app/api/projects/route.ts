import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Project, ProjectsResponse } from '@/types';

function isValidProject(project: any): project is Project {
  return (
    typeof project.id === 'number' &&
    typeof project.title === 'string' &&
    typeof project.description === 'string' &&
    typeof project.longDescription === 'string' &&
    typeof project.image === 'string' &&
    Array.isArray(project.technologies) &&
    project.technologies.every((tech: any) => typeof tech === 'string') &&
    (project.demoLink === undefined || typeof project.demoLink === 'string') &&
    (project.githubLink === undefined || typeof project.githubLink === 'string')
  );
}

export const GET = async () => {
  try {
    const jsonDirectory = path.join(process.cwd(), 'src/data');
    const fileContents = await fs.readFile(jsonDirectory + '/projects.json', 'utf8');
    const data = JSON.parse(fileContents);

    // Validate the data structure
    if (!Array.isArray(data?.projects)) {
      throw new Error('Invalid projects data format');
    }

    // Validate each project
    if (!data.projects.every(isValidProject)) {
      throw new Error('Invalid project format');
    }

    const response: ProjectsResponse = { data };
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Projects API Error:', error);
    const errorResponse: ProjectsResponse = {
      error: error instanceof Error ? error.message : 'Failed to load projects'
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
