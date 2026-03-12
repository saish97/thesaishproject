'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { cx } from './ui';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 320);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <m.button
          type="button"
          className={cx('floating-control fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors hover:text-accent')}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Scroll to top"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </m.button>
      ) : null}
    </AnimatePresence>
  );
}
