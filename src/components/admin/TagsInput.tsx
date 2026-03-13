'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface TagsInputProps {
  name: string;
  label: string;
  suggestions: string[];
  defaultValue?: string[];
  required?: boolean;
}

export function TagsInput({ name, label, suggestions, defaultValue = [], required }: TagsInputProps) {
  const [tags, setTags] = useState<string[]>(defaultValue);
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = suggestions.filter(
    (s) => !tags.includes(s) && s.toLowerCase().includes(input.toLowerCase()),
  );

  const addTag = useCallback((tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setInput('');
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }, [tags]);

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
        addTag(filtered[highlightedIndex]);
      } else if (input.trim()) {
        addTag(input);
      }
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Reset highlight when filter changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [input]);

  return (
    <div ref={containerRef}>
      <label className="block text-sm font-medium text-dim">{label}</label>

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={tags.join(', ')} />

      <div
        className="field-input mt-1 flex flex-wrap items-center gap-2 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-[rgba(var(--accent-rgb),0.12)] px-3 py-1 text-sm text-accent"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="ml-0.5 text-accent/60 hover:text-accent transition-colors"
              aria-label={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
        <div className="relative flex-1 min-w-[120px]">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? 'Type to add tags...' : ''}
            className="w-full border-none bg-transparent p-0 text-[0.95rem] text-ink outline-none placeholder:text-muted"
            // Satisfy HTML required validation only when no tags exist
            required={required && tags.length === 0}
          />

          {showDropdown && filtered.length > 0 && (
            <ul className="absolute left-0 top-full z-50 mt-2 max-h-48 w-56 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-lg">
              {filtered.map((suggestion, i) => (
                <li
                  key={suggestion}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    addTag(suggestion);
                  }}
                  onMouseEnter={() => setHighlightedIndex(i)}
                  className={`cursor-pointer px-4 py-2 text-sm transition-colors ${
                    i === highlightedIndex
                      ? 'bg-[rgba(var(--accent-rgb),0.1)] text-accent'
                      : 'text-dim hover:bg-[rgba(var(--accent-rgb),0.06)]'
                  }`}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
