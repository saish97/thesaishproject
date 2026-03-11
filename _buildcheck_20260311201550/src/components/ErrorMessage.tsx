import { m } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  severity?: 'error' | 'warning' | 'info';
  className?: string;
}

const severityStyles = {
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    icon: '❌'
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-600 dark:text-yellow-400',
    icon: '⚠️'
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    icon: 'ℹ️'
  }
};

export function ErrorMessage({ 
  message, 
  severity = 'error',
  className = '' 
}: ErrorMessageProps) {
  const styles = severityStyles[severity];

  return (
    <m.div 
      className={`flex items-center justify-center p-4 rounded-lg ${styles.bg} ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      role="alert"
      aria-live="polite"
    >
      <span className="mr-2" aria-hidden="true">{styles.icon}</span>
      <p className={styles.text}>{message}</p>
    </m.div>
  );
}