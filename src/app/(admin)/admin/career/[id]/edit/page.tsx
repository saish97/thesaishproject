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
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-ink">Edit Career Entry</h1>

      <form action={handleUpdate} className="surface-card space-y-4 p-6">
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

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-base btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
