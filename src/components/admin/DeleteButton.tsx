'use client';

import { useState, useTransition } from 'react';

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  itemLabel?: string;
}

export function DeleteButton({ onDelete, itemLabel = 'this item' }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="rounded-full px-2.5 py-1 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-500/10"
      >
        Delete
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-xs text-dim">Delete {itemLabel}?</span>
      <button
        onClick={() => {
          startTransition(async () => {
            await onDelete();
            setConfirming(false);
          });
        }}
        disabled={isPending}
        className="rounded-full px-2.5 py-1 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-500/10 disabled:opacity-50"
      >
        {isPending ? 'Deleting...' : 'Confirm'}
      </button>
      <button
        onClick={() => setConfirming(false)}
        className="rounded-full px-2.5 py-1 text-sm text-dim transition-all duration-200 hover:bg-[rgba(var(--accent-rgb),0.06)] hover:text-ink"
      >
        Cancel
      </button>
    </span>
  );
}
