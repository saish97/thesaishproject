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
        className="text-sm font-medium text-red-500 hover:underline"
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
        className="text-sm font-medium text-red-500 hover:underline"
      >
        {isPending ? 'Deleting...' : 'Confirm'}
      </button>
      <button
        onClick={() => setConfirming(false)}
        className="text-sm text-dim hover:underline"
      >
        Cancel
      </button>
    </span>
  );
}
