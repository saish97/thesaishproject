import { redirect } from 'next/navigation';
import { createSkill, getSkillCategories } from '../../_actions/skills';
import { FormField, FormSelect } from '@/components/admin/FormField';

const proficiencyOptions = [
  { value: 'Expert', label: 'Expert' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Basic-Intermediate', label: 'Basic-Intermediate' },
  { value: '-', label: 'N/A (Certification)' },
];

export default async function NewSkillPage() {
  const categories = await getSkillCategories();
  const categoryOptions = categories.map((c) => ({ value: String(c.id), label: c.category }));

  async function handleCreate(formData: FormData) {
    'use server';
    await createSkill(formData);
    redirect('/admin/skills');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <p className="eyebrow">Skills</p>
        <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">New Skill</h1>
      </div>

      <form action={handleCreate} className="surface-card space-y-5 p-8">
        <FormSelect label="Category" name="categoryId" options={categoryOptions} required />
        <FormField label="Skill Name" name="name" required />
        <FormSelect label="Proficiency" name="proficiency" options={proficiencyOptions} required />
        <FormField label="Context" name="context" placeholder="Brief description of experience" required />

        <div className="flex gap-3 pt-3">
          <button type="submit" className="btn-base btn-primary">Create Skill</button>
        </div>
      </form>
    </div>
  );
}
