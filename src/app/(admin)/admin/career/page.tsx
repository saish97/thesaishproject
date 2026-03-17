import Link from 'next/link';
import { getCareerEntries, deleteCareerEntry } from '../_actions/career';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { DeleteButton } from '@/components/admin/DeleteButton';

type CareerRow = Awaited<ReturnType<typeof getCareerEntries>>[number];

const columns: Column<CareerRow>[] = [
  { header: 'Icon', accessor: 'icon', className: 'w-12' },
  { header: 'Title', accessor: 'title' },
  { header: 'Organization', accessor: 'organization' },
  { header: 'Period', accessor: (row) => `${row.startDate} — ${row.endDate}` },
  { header: 'Type', accessor: 'type' },
];

export default async function CareerListPage() {
  const entries = await getCareerEntries();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Manage</p>
          <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">Career Entries</h1>
        </div>
        <Link href="/admin/career/new" className="btn-base btn-primary">
          Add Entry
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={entries}
        editHref={(row) => `/admin/career/${row.id}/edit`}
        onDelete={async (row) => {
          'use server';
          await deleteCareerEntry(row.id);
        }}
      />
    </div>
  );
}
