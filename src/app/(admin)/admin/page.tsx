import Link from 'next/link';
import { db } from '@/db';
import { careerEntries, projects, thoughts, skillCategories } from '@/db/schema';
import { count } from 'drizzle-orm';

async function getCounts() {
  const [careerCount] = await db.select({ count: count() }).from(careerEntries);
  const [projectCount] = await db.select({ count: count() }).from(projects);
  const [thoughtCount] = await db.select({ count: count() }).from(thoughts);
  const [skillCategoryCount] = await db.select({ count: count() }).from(skillCategories);
  return {
    career: careerCount.count,
    projects: projectCount.count,
    thoughts: thoughtCount.count,
    skillCategories: skillCategoryCount.count,
  };
}

const sections = [
  { key: 'career', label: 'Career Entries', href: '/admin/career', icon: '💼' },
  { key: 'projects', label: 'Projects', href: '/admin/projects', icon: '🚀' },
  { key: 'thoughts', label: 'Thoughts', href: '/admin/thoughts', icon: '💭' },
  { key: 'skillCategories', label: 'Skill Categories', href: '/admin/skills', icon: '🎯' },
] as const;

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-ink">Dashboard</h1>
        <p className="mt-2 text-sm text-dim">Manage all content on The Saish Project.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.key}
            href={section.href}
            className="surface-card p-6 transition-colors hover:bg-[var(--surface-strong)]"
          >
            <span className="text-2xl">{section.icon}</span>
            <p className="mt-3 text-3xl font-semibold text-ink">
              {counts[section.key]}
            </p>
            <p className="mt-1 text-sm text-dim">{section.label}</p>
          </Link>
        ))}
      </div>

      <div className="surface-card p-6">
        <h2 className="text-lg font-semibold text-ink">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/career/new" className="btn-base btn-primary">
            New Career Entry
          </Link>
          <Link href="/admin/projects/new" className="btn-base btn-secondary">
            New Project
          </Link>
          <Link href="/admin/thoughts/new" className="btn-base btn-secondary">
            New Thought
          </Link>
          <Link href="/admin/skills/new" className="btn-base btn-secondary">
            New Skill
          </Link>
        </div>
      </div>
    </div>
  );
}
