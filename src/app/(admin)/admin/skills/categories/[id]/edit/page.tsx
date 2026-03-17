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
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <p className="eyebrow">Skills</p>
        <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">Edit Category</h1>
      </div>

      <form action={handleUpdate} className="surface-card space-y-5 p-8">
        <FormField label="Category Name" name="category" defaultValue={category.category} required />

        <div className="flex gap-3 pt-3">
          <button type="submit" className="btn-base btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
