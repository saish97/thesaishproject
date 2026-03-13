import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';

export const careerEntries = pgTable('career_entries', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  organization: text('organization').notNull(),
  location: text('location').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  icon: text('icon').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  longDescription: text('long_description').notNull(),
  image: text('image').notNull(),
  technologies: text('technologies').array().notNull(),
  demoLink: text('demo_link'),
  githubLink: text('github_link'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const thoughts = pgTable('thoughts', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  publishedAt: text('published_at').notNull(),
  readingTime: text('reading_time').notNull(),
  tags: text('tags').array().notNull(),
  content: jsonb('content').notNull(),
  status: text('status').notNull().default('published'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const skillCategories = pgTable('skill_categories', {
  id: serial('id').primaryKey(),
  category: text('category').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => skillCategories.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  proficiency: text('proficiency').notNull(),
  context: text('context').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});
