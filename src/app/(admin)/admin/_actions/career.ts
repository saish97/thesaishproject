'use server';

import { db } from '@/db';
import { careerEntries } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getCareerEntries() {
  return db.select().from(careerEntries).orderBy(asc(careerEntries.sortOrder));
}

export async function getCareerEntry(id: number) {
  const rows = await db.select().from(careerEntries).where(eq(careerEntries.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createCareerEntry(formData: FormData) {
  const maxOrder = await db.select().from(careerEntries).orderBy(asc(careerEntries.sortOrder));
  const nextOrder = maxOrder.length > 0 ? maxOrder[maxOrder.length - 1].sortOrder + 1 : 0;

  await db.insert(careerEntries).values({
    title: formData.get('title') as string,
    organization: formData.get('organization') as string,
    location: formData.get('location') as string,
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string,
    icon: formData.get('icon') as string,
    description: formData.get('description') as string,
    type: formData.get('type') as string,
    sortOrder: nextOrder,
  });

  revalidatePath('/');
  revalidatePath('/admin/career');
}

export async function updateCareerEntry(id: number, formData: FormData) {
  await db
    .update(careerEntries)
    .set({
      title: formData.get('title') as string,
      organization: formData.get('organization') as string,
      location: formData.get('location') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      icon: formData.get('icon') as string,
      description: formData.get('description') as string,
      type: formData.get('type') as string,
      updatedAt: new Date(),
    })
    .where(eq(careerEntries.id, id));

  revalidatePath('/');
  revalidatePath('/admin/career');
}

export async function deleteCareerEntry(id: number) {
  await db.delete(careerEntries).where(eq(careerEntries.id, id));
  revalidatePath('/');
  revalidatePath('/admin/career');
}
