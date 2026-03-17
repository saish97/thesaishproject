import Link from 'next/link';
import { getSkillCategories, getSkills, deleteSkillCategory, deleteSkill } from '../_actions/skills';

export default async function SkillsListPage() {
  const categories = await getSkillCategories();
  const allSkills = await getSkills();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Manage</p>
          <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">Skills</h1>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/skills/categories/new" className="btn-base btn-secondary">
            Add Category
          </Link>
          <Link href="/admin/skills/new" className="btn-base btn-primary">
            Add Skill
          </Link>
        </div>
      </div>

      {categories.map((category) => {
        const categorySkills = allSkills.filter((s) => s.categoryId === category.id);
        return (
          <div key={category.id} className="surface-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-ink">{category.category}</h2>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/skills/categories/${category.id}/edit`}
                  className="text-link text-sm font-medium"
                >
                  Edit Category
                </Link>
                <form
                  action={async () => {
                    'use server';
                    await deleteSkillCategory(category.id);
                  }}
                >
                  <button type="submit" className="rounded-full px-2.5 py-1 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-500/10">
                    Delete
                  </button>
                </form>
              </div>
            </div>

            {categorySkills.length > 0 ? (
              <table className="mt-4 w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="px-3 py-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-dim">Name</th>
                    <th className="px-3 py-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-dim">Proficiency</th>
                    <th className="px-3 py-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-dim">Context</th>
                    <th className="px-3 py-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-dim">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categorySkills.map((skill) => (
                    <tr key={skill.id} className="border-b border-[var(--border)] transition-colors duration-200 last:border-0 hover:bg-[rgba(var(--accent-rgb),0.04)]">
                      <td className="px-3 py-3 text-ink">{skill.name}</td>
                      <td className="px-3 py-3 text-dim">{skill.proficiency}</td>
                      <td className="px-3 py-3 text-dim">{skill.context}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/admin/skills/${skill.id}/edit`}
                            className="text-link text-sm font-medium"
                          >
                            Edit
                          </Link>
                          <form
                            action={async () => {
                              'use server';
                              await deleteSkill(skill.id);
                            }}
                          >
                            <button type="submit" className="rounded-full px-2.5 py-1 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-500/10">
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-4 text-sm text-dim">No skills in this category.</p>
            )}
          </div>
        );
      })}

      {categories.length === 0 && (
        <div className="surface-card p-8 text-center text-dim">
          No skill categories yet. Create one to get started.
        </div>
      )}
    </div>
  );
}
