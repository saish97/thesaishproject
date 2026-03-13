import Link from 'next/link';
import { DeleteButton } from './DeleteButton';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  editHref?: (row: T) => string;
  viewHref?: (row: T) => string | null;
  onDelete?: (row: T) => Promise<void>;
  deleteLabel?: string;
}

export function DataTable<T>({
  columns,
  data,
  editHref,
  viewHref,
  onDelete,
  deleteLabel = 'Delete',
}: DataTableProps<T>) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {columns.map((col) => (
                <th
                  key={String(col.header)}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dim ${col.className ?? ''}`}
                >
                  {col.header}
                </th>
              ))}
              {(editHref || viewHref || onDelete) && (
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dim">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-[var(--border)] last:border-0">
                {columns.map((col) => (
                  <td key={String(col.header)} className={`px-4 py-3 text-ink ${col.className ?? ''}`}>
                    {typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : String(row[col.accessor] ?? '')}
                  </td>
                ))}
                {(editHref || viewHref || onDelete) && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {editHref && (
                        <Link
                          href={editHref(row)}
                          className="text-sm font-medium text-[var(--accent)] hover:underline"
                        >
                          Edit
                        </Link>
                      )}
                      {viewHref && viewHref(row) && (
                        <Link
                          href={viewHref(row)!}
                          className="text-sm font-medium text-[var(--accent)] hover:underline"
                        >
                          View
                        </Link>
                      )}
                      {onDelete && (
                        <DeleteButton onDelete={onDelete.bind(null, row)} itemLabel={deleteLabel} />
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + ((editHref || viewHref || onDelete) ? 1 : 0)} className="px-4 py-8 text-center text-dim">
                  No entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
