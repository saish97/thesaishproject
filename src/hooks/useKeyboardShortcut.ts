import { useEffect, useCallback } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

export function useKeyboardShortcut(key: string, handler: KeyHandler, options: { 
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  enabled?: boolean;
} = {}) {
  const { ctrl = false, alt = false, shift = false, enabled = true } = options;

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    const matchesKey = event.key.toLowerCase() === key.toLowerCase();
    const matchesModifiers = (
      (!ctrl || event.ctrlKey) &&
      (!alt || event.altKey) &&
      (!shift || event.shiftKey)
    );

    if (matchesKey && matchesModifiers) {
      event.preventDefault();
      handler(event);
    }
  }, [key, ctrl, alt, shift, enabled, handler]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
}