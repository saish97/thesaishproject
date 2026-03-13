'use server';

import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getProjects() {
  return db.select().from(projects).orderBy(asc(projects.sortOrder));
}

export async function getProject(id: number) {
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createProject(formData: FormData) {
  const maxOrder = await db.select().from(projects).orderBy(asc(projects.sortOrder));
  const nextOrder = maxOrder.length > 0 ? maxOrder[maxOrder.length - 1].sortOrder + 1 : 0;

  await db.insert(projects).values({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    longDescription: formData.get('longDescription') as string,
    image: formData.get('image') as string,
    technologies: (formData.get('technologies') as string).split(',').map((t) => t.trim()).filter(Boolean),
    demoLink: (formData.get('demoLink') as string) || null,
    githubLink: (formData.get('githubLink') as string) || null,
    sortOrder: nextOrder,
  });

  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function updateProject(id: number, formData: FormData) {
  await db
    .update(projects)
    .set({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      longDescription: formData.get('longDescription') as string,
      image: formData.get('image') as string,
      technologies: (formData.get('technologies') as string).split(',').map((t) => t.trim()).filter(Boolean),
      demoLink: (formData.get('demoLink') as string) || null,
      githubLink: (formData.get('githubLink') as string) || null,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id));

  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath('/');
  revalidatePath('/admin/projects');
}
