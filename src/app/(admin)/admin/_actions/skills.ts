'use server';

import { db } from '@/db';
import { skillCategories, skills } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Categories
export async function getSkillCategories() {
  return db.select().from(skillCategories).orderBy(asc(skillCategories.sortOrder));
}

export async function getSkillCategory(id: number) {
  const rows = await db.select().from(skillCategories).where(eq(skillCategories.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createSkillCategory(formData: FormData) {
  const all = await db.select().from(skillCategories).orderBy(asc(skillCategories.sortOrder));
  const nextOrder = all.length > 0 ? all[all.length - 1].sortOrder + 1 : 0;

  await db.insert(skillCategories).values({
    category: formData.get('category') as string,
    sortOrder: nextOrder,
  });

  revalidatePath('/');
  revalidatePath('/admin/skills');
}

export async function updateSkillCategory(id: number, formData: FormData) {
  await db
    .update(skillCategories)
    .set({ category: formData.get('category') as string })
    .where(eq(skillCategories.id, id));

  revalidatePath('/');
  revalidatePath('/admin/skills');
}

export async function deleteSkillCategory(id: number) {
  await db.delete(skillCategories).where(eq(skillCategories.id, id));
  revalidatePath('/');
  revalidatePath('/admin/skills');
}

// Skills
export async function getSkills() {
  return db.select().from(skills).orderBy(asc(skills.sortOrder));
}

export async function getSkill(id: number) {
  const rows = await db.select().from(skills).where(eq(skills.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createSkill(formData: FormData) {
  const categoryId = Number(formData.get('categoryId'));
  const categorySkills = await db
    .select()
    .from(skills)
    .where(eq(skills.categoryId, categoryId))
    .orderBy(asc(skills.sortOrder));
  const nextOrder = categorySkills.length > 0 ? categorySkills[categorySkills.length - 1].sortOrder + 1 : 0;

  await db.insert(skills).values({
    categoryId,
    name: formData.get('name') as string,
    proficiency: formData.get('proficiency') as string,
    context: formData.get('context') as string,
    sortOrder: nextOrder,
  });

  revalidatePath('/');
  revalidatePath('/admin/skills');
}

export async function updateSkill(id: number, formData: FormData) {
  await db
    .update(skills)
    .set({
      categoryId: Number(formData.get('categoryId')),
      name: formData.get('name') as string,
      proficiency: formData.get('proficiency') as string,
      context: formData.get('context') as string,
    })
    .where(eq(skills.id, id));

  revalidatePath('/');
  revalidatePath('/admin/skills');
}

export async function deleteSkill(id: number) {
  await db.delete(skills).where(eq(skills.id, id));
  revalidatePath('/');
  revalidatePath('/admin/skills');
}
