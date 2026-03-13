import { notFound, redirect } from 'next/navigation';
import { getProject, updateProject } from '../../../_actions/projects';
import { FormField, FormTextarea } from '@/components/admin/FormField';

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProject(Number(id));

  if (!project) notFound();

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateProject(Number(id), formData);
    redirect('/admin/projects');
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-ink">Edit Project</h1>

      <form action={handleUpdate} className="surface-card space-y-4 p-6">
        <FormField label="Title" name="title" defaultValue={project.title} required />
        <FormField label="Short Description" name="description" defaultValue={project.description} required />
        <FormTextarea label="Long Description" name="longDescription" defaultValue={project.longDescription} rows={6} required />
        <FormField label="Image Path" name="image" defaultValue={project.image} required />
        <FormField label="Technologies (comma-separated)" name="technologies" defaultValue={project.technologies.join(', ')} required />
        <FormField label="Demo Link" name="demoLink" defaultValue={project.demoLink ?? ''} />
        <FormField label="GitHub Link" name="githubLink" defaultValue={project.githubLink ?? ''} />

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-base btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
