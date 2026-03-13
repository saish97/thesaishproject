import { redirect } from 'next/navigation';
import { createCareerEntry } from '../../_actions/career';
import { FormField, FormTextarea, FormSelect } from '@/components/admin/FormField';

const careerTypes = [
  { value: 'Professional', label: 'Professional' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Leadership', label: 'Leadership' },
  { value: 'Ambassadorship', label: 'Ambassadorship' },
  { value: 'Volunteer', label: 'Volunteer' },
];

export default function NewCareerEntryPage() {
  async function handleCreate(formData: FormData) {
    'use server';
    await createCareerEntry(formData);
    redirect('/admin/career');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-ink">New Career Entry</h1>

      <form action={handleCreate} className="surface-card space-y-4 p-6">
        <FormField label="Title" name="title" placeholder="e.g. Digital Learning Executive" required />
        <FormField label="Organization" name="organization" placeholder="e.g. Biz Group" required />
        <FormField label="Location" name="location" placeholder="e.g. Dubai, UAE" required />
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Start Date" name="startDate" placeholder="YYYY-MM" required />
          <FormField label="End Date" name="endDate" placeholder="YYYY-MM or Present" required />
        </div>
        <FormField label="Icon (emoji)" name="icon" placeholder="e.g. 💼" required />
        <FormSelect label="Type" name="type" options={careerTypes} required />
        <FormTextarea label="Description" name="description" rows={6} required />

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-base btn-primary">Create Entry</button>
        </div>
      </form>
    </div>
  );
}
