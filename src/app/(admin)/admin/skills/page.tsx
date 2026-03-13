import Link from 'next/link';
import { getSkillCategories, getSkills, deleteSkillCategory, deleteSkill } from '../_actions/skills';

export default async function SkillsListPage() {
  const categories = await getSkillCategories();
  const allSkills = await getSkills();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Skills</h1>
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
              <h2 className="text-lg font-semibold text-ink">{category.category}</h2>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/skills/categories/${category.id}/edit`}
                  className="text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  Edit Category
                </Link>
                <form
                  action={async () => {
                    'use server';
                    await deleteSkillCategory(category.id);
                  }}
                >
                  <button type="submit" className="text-sm font-medium text-red-500 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </div>

            {categorySkills.length > 0 ? (
              <table className="mt-4 w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-dim">Name</th>
                    <th className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-dim">Proficiency</th>
                    <th className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-dim">Context</th>
                    <th className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-dim">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categorySkills.map((skill) => (
                    <tr key={skill.id} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-2 py-2 text-ink">{skill.name}</td>
                      <td className="px-2 py-2 text-dim">{skill.proficiency}</td>
                      <td className="px-2 py-2 text-dim">{skill.context}</td>
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/skills/${skill.id}/edit`}
                            className="text-sm font-medium text-[var(--accent)] hover:underline"
                          >
                            Edit
                          </Link>
                          <form
                            action={async () => {
                              'use server';
                              await deleteSkill(skill.id);
                            }}
                          >
                            <button type="submit" className="text-sm font-medium text-red-500 hover:underline">
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
              <p className="mt-3 text-sm text-dim">No skills in this category.</p>
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
