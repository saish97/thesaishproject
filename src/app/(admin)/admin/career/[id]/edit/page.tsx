import { notFound, redirect } from 'next/navigation';
import { getCareerEntry, updateCareerEntry } from '../../../_actions/career';
import { FormField, FormTextarea, FormSelect } from '@/components/admin/FormField';

const careerTypes = [
  { value: 'Professional', label: 'Professional' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Leadership', label: 'Leadership' },
  { value: 'Ambassadorship', label: 'Ambassadorship' },
  { value: 'Volunteer', label: 'Volunteer' },
];

type EditCareerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCareerEntryPage({ params }: EditCareerPageProps) {
  const { id } = await params;
  const entry = await getCareerEntry(Number(id));

  if (!entry) notFound();

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateCareerEntry(Number(id), formData);
    redirect('/admin/career');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <p className="eyebrow">Career</p>
        <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">Edit Entry</h1>
      </div>

      <form action={handleUpdate} className="surface-card space-y-5 p-8">
        <FormField label="Title" name="title" defaultValue={entry.title} required />
        <FormField label="Organization" name="organization" defaultValue={entry.organization} required />
        <FormField label="Location" name="location" defaultValue={entry.location} required />
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Start Date" name="startDate" defaultValue={entry.startDate} required />
          <FormField label="End Date" name="endDate" defaultValue={entry.endDate} required />
        </div>
        <FormField label="Icon (emoji)" name="icon" defaultValue={entry.icon} required />
        <FormSelect label="Type" name="type" options={careerTypes} defaultValue={entry.type} required />
        <FormTextarea label="Description" name="description" defaultValue={entry.description} rows={6} required />

        <div className="flex gap-3 pt-3">
          <button type="submit" className="btn-base btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
