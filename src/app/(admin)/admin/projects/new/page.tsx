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
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <p className="eyebrow">Projects</p>
        <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">New Project</h1>
      </div>

      <form action={handleCreate} className="surface-card space-y-5 p-8">
        <FormField label="Title" name="title" required />
        <FormField label="Short Description" name="description" required />
        <FormTextarea label="Long Description" name="longDescription" rows={6} required />
        <FormField label="Image Path" name="image" placeholder="/images/project.jpg" required />
        <FormField label="Technologies (comma-separated)" name="technologies" placeholder="React, TypeScript, Node.js" required />
        <FormField label="Demo Link" name="demoLink" placeholder="https://..." />
        <FormField label="GitHub Link" name="githubLink" placeholder="https://github.com/..." />

        <div className="flex gap-3 pt-3">
          <button type="submit" className="btn-base btn-primary">Create Project</button>
        </div>
      </form>
    </div>
  );
}
