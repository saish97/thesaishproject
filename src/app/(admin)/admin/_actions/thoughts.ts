'use server';

import { db } from '@/db';
import { thoughts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import type { ThoughtContent, ThoughtSection, TiptapNode } from '@/types';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/** Extract all text from a Tiptap node tree */
function extractText(nodes: TiptapNode[]): string {
  let text = '';
  for (const node of nodes) {
    if (node.text) text += node.text + ' ';
    if (node.content) text += extractText(node.content);
  }
  return text;
}

function calculateReadingTime(content: ThoughtContent): string {
  let wordCount: number;

  if (Array.isArray(content)) {
    // Legacy ThoughtSection[] format
    wordCount = (content as ThoughtSection[]).reduce((total, section) => {
      const headingWords = section.heading ? section.heading.split(/\s+/).length : 0;
      const paragraphWords = section.paragraphs.reduce(
        (sum, p) => sum + p.split(/\s+/).length,
        0,
      );
      return total + headingWords + paragraphWords;
    }, 0);
  } else {
    // Tiptap JSON format
    const allText = extractText(content.content ?? []);
    wordCount = allText.split(/\s+/).filter(Boolean).length;
  }

  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

export async function getThoughts() {
  return db.select().from(thoughts).orderBy(thoughts.publishedAt);
}

export async function getAllTags(): Promise<string[]> {
  const rows = await db.select({ tags: thoughts.tags }).from(thoughts);
  const tagSet = new Set<string>();
  for (const row of rows) {
    for (const tag of row.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}

export async function getThought(id: number) {
  const rows = await db.select().from(thoughts).where(eq(thoughts.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createDraftThought(): Promise<number> {
  const now = new Date().toISOString().slice(0, 10);
  const slug = `draft-${Date.now()}`;
  const rows = await db.insert(thoughts).values({
    slug,
    title: 'Untitled Draft',
    excerpt: '',
    publishedAt: now,
    readingTime: '1 min read',
    tags: [],
    content: { type: 'doc', content: [] },
    status: 'draft',
  }).returning({ id: thoughts.id });

  return rows[0].id;
}

export async function createThought(formData: FormData) {
  const title = formData.get('title') as string;
  const contentRaw = formData.get('content') as string;
  const content: ThoughtContent = JSON.parse(contentRaw);

  await db.insert(thoughts).values({
    slug: formData.get('slug') as string || generateSlug(title),
    title,
    excerpt: formData.get('excerpt') as string,
    publishedAt: formData.get('publishedAt') as string,
    readingTime: calculateReadingTime(content),
    tags: (formData.get('tags') as string).split(',').map((t) => t.trim()).filter(Boolean),
    content,
    status: 'published',
  });

  revalidatePath('/');
  revalidatePath('/thoughts');
  revalidatePath('/admin/thoughts');
}

export async function updateThought(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const contentRaw = formData.get('content') as string;
  const content: ThoughtContent = JSON.parse(contentRaw);
  const status = (formData.get('status') as string) || 'published';

  await db
    .update(thoughts)
    .set({
      slug: formData.get('slug') as string || generateSlug(title),
      title,
      excerpt: formData.get('excerpt') as string,
      publishedAt: formData.get('publishedAt') as string,
      readingTime: calculateReadingTime(content),
      tags: (formData.get('tags') as string).split(',').map((t) => t.trim()).filter(Boolean),
      content,
      status,
      updatedAt: new Date(),
    })
    .where(eq(thoughts.id, id));

  revalidatePath('/');
  revalidatePath('/thoughts');
  revalidatePath('/admin/thoughts');
}

export async function autosaveDraft(
  id: number,
  data: { title: string; slug: string; excerpt: string; publishedAt: string; tags: string[]; content: ThoughtContent },
) {
  await db
    .update(thoughts)
    .set({
      title: data.title || 'Untitled Draft',
      slug: data.slug || `draft-${id}`,
      excerpt: data.excerpt,
      publishedAt: data.publishedAt,
      readingTime: calculateReadingTime(data.content),
      tags: data.tags,
      content: data.content,
      updatedAt: new Date(),
    })
    .where(eq(thoughts.id, id));
}

export async function deleteThought(id: number) {
  await db.delete(thoughts).where(eq(thoughts.id, id));
  revalidatePath('/');
  revalidatePath('/thoughts');
  revalidatePath('/admin/thoughts');
}
