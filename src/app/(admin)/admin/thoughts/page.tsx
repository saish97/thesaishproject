import Link from 'next/link';
import { getThoughts, deleteThought } from '../_actions/thoughts';
import { DataTable, type Column } from '@/components/admin/DataTable';

type ThoughtRow = Awaited<ReturnType<typeof getThoughts>>[number];

const columns: Column<ThoughtRow>[] = [
  {
    header: 'Title',
    accessor: (row) => (
      <Link href={`/admin/thoughts/${row.id}/edit`} className="font-medium text-[var(--accent)] hover:underline">
        {row.title}
      </Link>
    ),
  },
  {
    header: 'Status',
    accessor: (row) =>
      row.status === 'draft' ? '📝 Draft' : 'Published',
  },
  { header: 'Published', accessor: 'publishedAt' },
  { header: 'Tags', accessor: (row) => row.tags.join(', ') },
];

export default async function ThoughtsListPage() {
  const thoughtsList = await getThoughts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Manage</p>
          <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">Thoughts</h1>
        </div>
        <Link href="/admin/thoughts/new" className="btn-base btn-primary">
          New Thought
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={thoughtsList}
        viewHref={(row) => row.status === 'published' ? `/thoughts/${row.slug}` : null}
        onDelete={async (row) => {
          'use server';
          await deleteThought(row.id);
        }}
      />
    </div>
  );
}
