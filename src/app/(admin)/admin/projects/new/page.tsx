import { redirect } from 'next/navigation';
import { createProject } from '../../_actions/projects';
import { FormField, FormTextarea } from '@/components/admin/FormField';

export default function NewProjectPage() {
  async function handleCreate(formData: FormData) {
    'use server';
    await createProject(formData);
    redirect('/admin/projects');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-ink">New Project</h1>

      <form action={handleCreate} className="surface-card space-y-4 p-6">
        <FormField label="Title" name="title" required />
        <FormField label="Short Description" name="description" required />
        <FormTextarea label="Long Description" name="longDescription" rows={6} required />
        <FormField label="Image Path" name="image" placeholder="/images/project.jpg" required />
        <FormField label="Technologies (comma-separated)" name="technologies" placeholder="React, TypeScript, Node.js" required />
        <FormField label="Demo Link" name="demoLink" placeholder="https://..." />
        <FormField label="GitHub Link" name="githubLink" placeholder="https://github.com/..." />

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-base btn-primary">Create Project</button>
        </div>
      </form>
    </div>
  );
}
