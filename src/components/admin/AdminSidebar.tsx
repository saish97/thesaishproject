'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/career', label: 'Career', icon: '💼' },
  { href: '/admin/projects', label: 'Projects', icon: '🚀' },
  { href: '/admin/thoughts', label: 'Thoughts', icon: '💭' },
  { href: '/admin/skills', label: 'Skills', icon: '🎯' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <aside className="surface-panel flex h-screen w-64 flex-col border-r border-[var(--border)]">
      <div className="p-6">
        <Link href="/admin" className="text-lg font-semibold text-ink">
          Admin Console
        </Link>
        <p className="mt-1 text-xs text-dim">The Saish Project</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-[var(--accent)]/10 font-medium text-[var(--accent)]'
                  : 'text-dim hover:bg-[var(--surface-strong)] hover:text-ink'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[var(--border)] p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-dim hover:bg-[var(--surface-strong)] hover:text-ink"
        >
          <span>🌐</span>
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-dim hover:bg-[var(--surface-strong)] hover:text-ink"
        >
          <span>🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
