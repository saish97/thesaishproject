'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { updateThought, deleteThought, autosaveDraft, getAllTags } from '../../../_actions/thoughts';
import { FormField, FormTextarea } from '@/components/admin/FormField';
import { TagsInput } from '@/components/admin/TagsInput';
import { ThoughtEditor } from '@/components/admin/ThoughtEditor';
import type { ThoughtContent, TiptapDoc } from '@/types';

interface EditThoughtFormProps {
  id: number;
  thought: {
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    tags: string[];
    content: ThoughtContent;
    status: string;
  };
}

export function EditThoughtForm({ id, thought }: EditThoughtFormProps) {
  const [content, setContent] = useState<TiptapDoc | null>(null);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const router = useRouter();
  const isDraft = thought.status === 'draft';
  const formRef = useRef<HTMLFormElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    getAllTags().then(setTagSuggestions);
  }, []);

  const triggerAutosave = useCallback(() => {
    if (!isDraft || !formRef.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      const form = formRef.current;
      if (!form) return;

      const formData = new FormData(form);
      const tags = (formData.get('tags') as string || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      setSaveStatus('saving');
      await autosaveDraft(id, {
        title: (formData.get('title') as string) || '',
        slug: (formData.get('slug') as string) || '',
        excerpt: (formData.get('excerpt') as string) || '',
        publishedAt: (formData.get('publishedAt') as string) || '',
        tags,
        content: content ?? thought.content,
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 3000);
  }, [isDraft, id, content, thought.content]);

  // Autosave when content changes (editor typing)
  useEffect(() => {
    if (content) triggerAutosave();
  }, [content, triggerAutosave]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function handleSubmit(formData: FormData) {
    if (timerRef.current) clearTimeout(timerRef.current);
    formData.set('content', JSON.stringify(content ?? thought.content));
    formData.set('status', 'published');
    await updateThought(id, formData);
    router.push('/admin/thoughts');
  }

  async function handleSaveDraft(formData: FormData) {
    if (timerRef.current) clearTimeout(timerRef.current);
    formData.set('content', JSON.stringify(content ?? thought.content));
    formData.set('status', 'draft');
    await updateThought(id, formData);
    router.push('/admin/thoughts');
  }

  async function handleDelete() {
    if (!confirm(isDraft ? 'Discard this draft?' : 'Delete this thought?')) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsDeleting(true);
    await deleteThought(id);
    router.push('/admin/thoughts');
  }

  return (
    <form ref={formRef} action={handleSubmit} className="surface-card space-y-5 p-8">
      {isDraft && (
        <div className="flex items-center justify-between rounded-full border border-[rgba(var(--accent-rgb),0.16)] bg-[rgba(var(--accent-rgb),0.06)] px-5 py-2.5 text-sm">
          <span className="font-medium text-accent">Draft — not visible to the public until published.</span>
          {saveStatus === 'saving' && <span className="text-xs text-dim">Saving...</span>}
          {saveStatus === 'saved' && <span className="text-xs text-accent">Saved</span>}
        </div>
      )}

      <FormField
        label="Title"
        name="title"
        defaultValue={isDraft && thought.title === 'Untitled Draft' ? '' : thought.title}
        required
        placeholder="Give your thought a title"
        onChange={triggerAutosave}
      />
      <FormField label="Slug" name="slug" defaultValue={isDraft ? '' : thought.slug} placeholder="auto-generated from title" onChange={triggerAutosave} />
      <FormTextarea label="Excerpt" name="excerpt" defaultValue={thought.excerpt} rows={3} required onChange={triggerAutosave} />
      <FormField label="Published Date" name="publishedAt" type="date" defaultValue={thought.publishedAt} required onChange={triggerAutosave} />
      <TagsInput label="Tags" name="tags" suggestions={tagSuggestions} defaultValue={thought.tags} required />

      <div>
        <label className="block text-sm font-medium text-dim">Content</label>
        <div className="mt-1.5">
          <ThoughtEditor initialContent={thought.content} onChange={setContent} />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-3">
        <button type="submit" className="btn-base btn-primary">
          {isDraft ? 'Publish' : 'Save Changes'}
        </button>
        {isDraft ? (
          <button type="submit" formAction={handleSaveDraft} className="btn-base btn-secondary">
            Save Draft
          </button>
        ) : (
          <button type="submit" formAction={handleSaveDraft} className="btn-base btn-secondary">
            Unpublish
          </button>
        )}
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="btn-base ml-auto text-red-500 transition-all duration-200 hover:bg-red-500/10 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : isDraft ? 'Discard Draft' : 'Delete'}
        </button>
      </div>
    </form>
  );
}
