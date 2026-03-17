import { notFound, redirect } from 'next/navigation';
import { getSkill, updateSkill, getSkillCategories } from '../../../_actions/skills';
import { FormField, FormSelect } from '@/components/admin/FormField';

const proficiencyOptions = [
  { value: 'Expert', label: 'Expert' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Basic-Intermediate', label: 'Basic-Intermediate' },
  { value: '-', label: 'N/A (Certification)' },
];

type EditSkillPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const { id } = await params;
  const skill = await getSkill(Number(id));
  const categories = await getSkillCategories();

  if (!skill) notFound();

  const categoryOptions = categories.map((c) => ({ value: String(c.id), label: c.category }));

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateSkill(Number(id), formData);
    redirect('/admin/skills');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <p className="eyebrow">Skills</p>
        <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">Edit Skill</h1>
      </div>

      <form action={handleUpdate} className="surface-card space-y-5 p-8">
        <FormSelect label="Category" name="categoryId" options={categoryOptions} defaultValue={String(skill.categoryId)} required />
        <FormField label="Skill Name" name="name" defaultValue={skill.name} required />
        <FormSelect label="Proficiency" name="proficiency" options={proficiencyOptions} defaultValue={skill.proficiency} required />
        <FormField label="Context" name="context" defaultValue={skill.context} required />

        <div className="flex gap-3 pt-3">
          <button type="submit" className="btn-base btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
