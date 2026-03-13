import { redirect } from 'next/navigation';
import { createSkillCategory } from '../../../_actions/skills';
import { FormField } from '@/components/admin/FormField';

export default function NewSkillCategoryPage() {
  async function handleCreate(formData: FormData) {
    'use server';
    await createSkillCategory(formData);
    redirect('/admin/skills');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-ink">New Skill Category</h1>

      <form action={handleCreate} className="surface-card space-y-4 p-6">
        <FormField label="Category Name" name="category" placeholder="e.g. Digital Learning & L&D" required />

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-base btn-primary">Create Category</button>
        </div>
      </form>
    </div>
  );
}
