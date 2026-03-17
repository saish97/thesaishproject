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
      <div className="p-6 pb-4">
        <Link
          href="/admin"
          className="text-[0.95rem] font-semibold text-ink transition-colors hover:text-accent"
          style={{ fontFamily: 'var(--font-display), serif' }}
        >
          the.saish.project
        </Link>
        <p className="mt-1.5 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-accent">
          Admin Console
        </p>
      </div>

      <div className="divider-line mx-4" />

      <nav className="surface-scroll flex-1 space-y-1 overflow-y-auto px-3 py-3">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[rgba(var(--accent-rgb),0.1)] font-medium text-accent'
                  : 'text-dim hover:bg-[rgba(var(--accent-rgb),0.06)] hover:text-ink'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="divider-line mx-4" />

      <div className="p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-full px-4 py-2.5 text-sm text-dim transition-all duration-200 hover:bg-[rgba(var(--accent-rgb),0.06)] hover:text-ink"
        >
          <span>🌐</span>
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm text-dim transition-all duration-200 hover:bg-[rgba(var(--accent-rgb),0.06)] hover:text-ink"
        >
          <span>🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
