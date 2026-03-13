import { notFound, redirect } from 'next/navigation';
import { getSkillCategory, updateSkillCategory } from '../../../../_actions/skills';
import { FormField } from '@/components/admin/FormField';

type EditSkillCategoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSkillCategoryPage({ params }: EditSkillCategoryPageProps) {
  const { id } = await params;
  const category = await getSkillCategory(Number(id));

  if (!category) notFound();

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateSkillCategory(Number(id), formData);
    redirect('/admin/skills');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-ink">Edit Skill Category</h1>

      <form action={handleUpdate} className="surface-card space-y-4 p-6">
        <FormField label="Category Name" name="category" defaultValue={category.category} required />

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-base btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
