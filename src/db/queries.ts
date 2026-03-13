import { eq, asc, desc, and, ne } from 'drizzle-orm';
import { db } from './index';
import { careerEntries, projects, thoughts, skillCategories, skills } from './schema';
import type { CareerEntry, Project, ThoughtPost, ThoughtSection } from '@/types';

export async function getAllCareerEntries(): Promise<CareerEntry[]> {
  const rows = await db
    .select()
    .from(careerEntries)
    .orderBy(asc(careerEntries.sortOrder));

  return rows.map((row) => ({
    title: row.title,
    organization: row.organization,
    location: row.location,
    startDate: row.startDate,
    endDate: row.endDate,
    icon: row.icon,
    description: row.description,
    type: row.type as CareerEntry['type'],
  }));
}

export async function getAllProjects(): Promise<Project[]> {
  const rows = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder));

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    longDescription: row.longDescription,
    image: row.image,
    technologies: row.technologies,
    demoLink: row.demoLink ?? undefined,
    githubLink: row.githubLink ?? undefined,
  }));
}

export async function getAllThoughts(): Promise<ThoughtPost[]> {
  const rows = await db
    .select()
    .from(thoughts)
    .where(eq(thoughts.status, 'published'))
    .orderBy(desc(thoughts.publishedAt));

  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    publishedAt: row.publishedAt,
    readingTime: row.readingTime,
    tags: row.tags,
    content: row.content as ThoughtSection[],
  }));
}

export async function getThoughtBySlug(slug: string): Promise<ThoughtPost | undefined> {
  const rows = await db
    .select()
    .from(thoughts)
    .where(and(eq(thoughts.slug, slug), eq(thoughts.status, 'published')))
    .limit(1);

  const row = rows[0];
  if (!row) return undefined;

  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    publishedAt: row.publishedAt,
    readingTime: row.readingTime,
    tags: row.tags,
    content: row.content as ThoughtSection[],
  };
}

export async function getFeaturedThoughts(limit = 3): Promise<ThoughtPost[]> {
  const rows = await db
    .select()
    .from(thoughts)
    .where(eq(thoughts.status, 'published'))
    .orderBy(desc(thoughts.publishedAt))
    .limit(limit);

  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    publishedAt: row.publishedAt,
    readingTime: row.readingTime,
    tags: row.tags,
    content: row.content as ThoughtSection[],
  }));
}

export interface SkillCategoryWithSkills {
  category: string;
  skills: { name: string; proficiency: string; context: string }[];
}

export async function getSkillsMatrix(): Promise<SkillCategoryWithSkills[]> {
  const categories = await db
    .select()
    .from(skillCategories)
    .orderBy(asc(skillCategories.sortOrder));

  const allSkills = await db
    .select()
    .from(skills)
    .orderBy(asc(skills.sortOrder));

  return categories.map((cat) => ({
    category: cat.category,
    skills: allSkills
      .filter((s) => s.categoryId === cat.id)
      .map((s) => ({
        name: s.name,
        proficiency: s.proficiency,
        context: s.context,
      })),
  }));
}
