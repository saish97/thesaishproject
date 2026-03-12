'use client';

import type { MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cx, iconButtonClassName, surfaceClasses } from './ui';

const pageLinks = [
  { href: '/about', label: 'about.' },
  { href: '/thoughts', label: 'thoughts.' },
];

const sectionLinks = [
  { href: '/#projects', label: 'projects.' },
  { href: '/#career', label: 'career.' },
  { href: '/#contact', label: 'contact.' },
];

const navLinkClassName = 'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-dim transition-colors hover:text-accent';

export default function NavMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    const hasLocalStorage = typeof window !== 'undefined' && window.localStorage;

    if (!hasLocalStorage) {
      setIsThemeReady(true);
      return;
    }

    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = storedTheme ? storedTheme === 'dark' : prefersDark;

    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
    setIsThemeReady(true);
  }, []);

  useEffect(() => {
    if (!isThemeReady) {
      return;
    }

    document.documentElement.classList.toggle('dark', isDarkMode);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, isThemeReady]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleThemeToggle = useCallback(() => {
    setIsDarkMode((current) => !current);
  }, []);

  const handleNavClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    const hashIndex = href?.indexOf('#') ?? -1;

    if (!href || hashIndex === -1) {
      setIsOpen(false);
      return;
    }

    if (pathname !== '/') {
      setIsOpen(false);
      return;
    }

    e.preventDefault();

    const targetId = href.slice(hashIndex + 1);
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 110;
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    setIsOpen(false);
  }, [pathname]);

  const allLinks = useMemo(() => [...pageLinks, ...sectionLinks], []);

  const isPathActive = useCallback(
    (href: string) => {
      if (href.startsWith('/#')) {
        return false;
      }

      return pathname === href;
    },
    [pathname],
  );

  return (
    <nav className="fixed inset-x-4 top-4 z-50">
      <div className={cx(surfaceClasses.card, 'surface-glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 md:px-5')}>
        <Link
          href="/"
          className="rounded-full px-3 py-2 text-[0.95rem] font-semibold text-ink transition-colors hover:text-accent"
          style={{ fontFamily: 'var(--font-display), serif' }}
          aria-label="The Saish Project home"
        >
          the.saish.project
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {allLinks.map((link) => {
            const active = isPathActive(link.href);

            if (link.href.startsWith('/#')) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className={navLinkClassName}
                >
                  <span
                    className="rounded-full px-2 py-1"
                    style={active ? { background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)' } : undefined}
                  >
                    {link.label}
                  </span>
                </a>
              );
            }

            return (
              <Link key={link.href} href={link.href} className={navLinkClassName} aria-current={active ? 'page' : undefined}>
                <span
                  className="rounded-full px-2 py-1"
                  style={active ? { background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)' } : undefined}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={handleThemeToggle}
            className={cx(iconButtonClassName, 'ml-2 h-11 w-11')}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={handleThemeToggle}
            className={cx(iconButtonClassName, 'h-11 w-11')}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className={cx(iconButtonClassName, 'h-11 w-11')}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Toggle navigation</span>
            <div className={cx('h-0.5 w-5 bg-current transition-transform duration-300', isOpen && 'translate-y-[7px] rotate-45')} />
            <div className={cx('my-1.5 h-0.5 w-5 bg-current transition-opacity duration-300', isOpen && 'opacity-0')} />
            <div className={cx('h-0.5 w-5 bg-current transition-transform duration-300', isOpen && '-translate-y-[7px] -rotate-45')} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cx(
          'mx-auto mt-3 max-w-7xl transition-all duration-300 md:hidden',
          isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0',
        )}
        aria-hidden={!isOpen}
      >
        <div className={cx(surfaceClasses.panel, 'overflow-hidden p-3')}>
          <div className="grid gap-2">
            {allLinks.map((link, index) => {
              const active = isPathActive(link.href);
              const sharedClassName = cx(
                'rounded-[1.25rem] px-4 py-3 text-sm font-medium transition-colors',
                active ? 'text-accent' : 'text-ink hover:text-accent',
              );

              const style = active
                ? { background: 'rgba(var(--accent-rgb), 0.1)' }
                : { background: 'rgba(var(--bg-rgb), 0.28)', transitionDelay: `${index * 35}ms` };

              if (link.href.startsWith('/#')) {
                return (
                  <a key={link.href} href={link.href} onClick={handleNavClick} className={sharedClassName} style={style}>
                    {link.label}
                  </a>
                );
              }

              return (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={sharedClassName} style={style}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
}
