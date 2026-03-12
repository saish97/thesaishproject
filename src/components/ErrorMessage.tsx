'use client';

import { m } from 'framer-motion';
import { cx, surfaceClasses } from './ui';

interface ErrorMessageProps {
  message: string;
  severity?: 'error' | 'warning' | 'info';
  className?: string;
}

const severityStyles = {
  error: {
    badge: 'error',
    title: 'could not load this section',
  },
  warning: {
    badge: 'warning',
    title: 'something needs attention',
  },
  info: {
    badge: 'info',
    title: 'quick note',
  },
};

export function ErrorMessage({ message, severity = 'error', className = '' }: ErrorMessageProps) {
  const styles = severityStyles[severity];

  return (
    <m.div
      className={cx(surfaceClasses.card, 'flex items-start gap-4 p-5', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      role="alert"
      aria-live="polite"
    >
      <span className="tag-pill" style={{ minWidth: 'fit-content' }}>
        {styles.badge}
      </span>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{styles.title}</p>
        <p className="mt-2 text-sm leading-7 text-dim">{message}</p>
      </div>
    </m.div>
  );
}
