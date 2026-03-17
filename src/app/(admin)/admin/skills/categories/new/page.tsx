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
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <p className="eyebrow">Skills</p>
        <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">New Category</h1>
      </div>

      <form action={handleCreate} className="surface-card space-y-5 p-8">
        <FormField label="Category Name" name="category" placeholder="e.g. Digital Learning & L&D" required />

        <div className="flex gap-3 pt-3">
          <button type="submit" className="btn-base btn-primary">Create Category</button>
        </div>
      </form>
    </div>
  );
}
