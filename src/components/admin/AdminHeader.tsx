'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/career': 'Career',
  '/admin/projects': 'Projects',
  '/admin/thoughts': 'Thoughts',
  '/admin/skills': 'Skills',
};

export function AdminHeader() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];

  let path = '';
  for (const segment of segments) {
    path += `/${segment}`;
    const label = breadcrumbMap[path] || segment;
    crumbs.push({ label, href: path });
  }

  // Handle special segments
  const lastSegment = segments[segments.length - 1];
  if (lastSegment === 'new') {
    crumbs[crumbs.length - 1].label = 'New';
  } else if (lastSegment === 'edit') {
    crumbs[crumbs.length - 1].label = 'Edit';
  }

  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)] px-6 py-4">
      <nav className="flex items-center gap-2 text-sm text-dim">
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i === crumbs.length - 1 ? (
              <span className="font-medium text-ink">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-ink">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </header>
  );
}
