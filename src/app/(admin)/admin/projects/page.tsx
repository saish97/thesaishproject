import Link from 'next/link';
import { getProjects, deleteProject } from '../_actions/projects';
import { DataTable, type Column } from '@/components/admin/DataTable';

type ProjectRow = Awaited<ReturnType<typeof getProjects>>[number];

const columns: Column<ProjectRow>[] = [
  { header: 'Title', accessor: 'title' },
  { header: 'Description', accessor: (row) => row.description.slice(0, 60) + (row.description.length > 60 ? '...' : '') },
  { header: 'Technologies', accessor: (row) => row.technologies.join(', ') },
];

export default async function ProjectsListPage() {
  const projectsList = await getProjects();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Manage</p>
          <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">Projects</h1>
        </div>
        <Link href="/admin/projects/new" className="btn-base btn-primary">
          Add Project
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={projectsList}
        editHref={(row) => `/admin/projects/${row.id}/edit`}
        onDelete={async (row) => {
          'use server';
          await deleteProject(row.id);
        }}
      />
    </div>
  );
}
