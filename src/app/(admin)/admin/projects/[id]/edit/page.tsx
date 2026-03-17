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
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <p className="eyebrow">Projects</p>
        <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">Edit Project</h1>
      </div>

      <form action={handleUpdate} className="surface-card space-y-5 p-8">
        <FormField label="Title" name="title" defaultValue={project.title} required />
        <FormField label="Short Description" name="description" defaultValue={project.description} required />
        <FormTextarea label="Long Description" name="longDescription" defaultValue={project.longDescription} rows={6} required />
        <FormField label="Image Path" name="image" defaultValue={project.image} required />
        <FormField label="Technologies (comma-separated)" name="technologies" defaultValue={project.technologies.join(', ')} required />
        <FormField label="Demo Link" name="demoLink" defaultValue={project.demoLink ?? ''} />
        <FormField label="GitHub Link" name="githubLink" defaultValue={project.githubLink ?? ''} />

        <div className="flex gap-3 pt-3">
          <button type="submit" className="btn-base btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
