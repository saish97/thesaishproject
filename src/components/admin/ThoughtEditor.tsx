'use client';

import { useCallback, useRef } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import type { ThoughtContent, ThoughtSection, TiptapDoc } from '@/types';

interface ThoughtEditorProps {
  initialContent?: ThoughtContent;
  onChange: (content: TiptapDoc) => void;
}

/**
 * Check if content is legacy ThoughtSection[] format
 */
function isLegacySections(content: ThoughtContent): content is ThoughtSection[] {
  return Array.isArray(content);
}

/**
 * Convert legacy ThoughtSection[] into Tiptap JSON document (for loading old posts)
 */
function sectionsToTiptapDoc(sections: ThoughtSection[]): TiptapDoc {
  const content: TiptapDoc['content'] = [];

  for (const section of sections) {
    if (section.heading) {
      content.push({
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: section.heading }],
      });
    }
    for (const paragraph of section.paragraphs) {
      content.push({
        type: 'paragraph',
        content: [{ type: 'text', text: paragraph }],
      });
    }
  }

  return { type: 'doc', content };
}

/**
 * Resolve initial content to Tiptap JSON, handling both legacy and new formats
 */
function resolveInitialContent(content?: ThoughtContent): TiptapDoc | undefined {
  if (!content) return undefined;
  if (isLegacySections(content)) return sectionsToTiptapDoc(content);
  return content;
}

export function ThoughtEditor({ initialContent, onChange }: ThoughtEditorProps) {
  const editorRef = useRef<Editor | null>(null);

  const setLink = useCallback(() => {
    if (!editorRef.current) return;
    const previousUrl = editorRef.current.getAttributes('link').href as string | undefined;
    const url = window.prompt('URL', previousUrl ?? '');
    if (url === null) return;
    if (url === '') {
      editorRef.current.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editorRef.current.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, []);

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file || !editorRef.current) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok) throw new Error(data.error ?? 'Upload failed');
        editorRef.current.chain().focus().setImage({ src: data.url! }).run();
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Upload failed');
      }
    };
    input.click();
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2] },
      }),
      Placeholder.configure({
        placeholder: 'Start writing... Use headings (Ctrl+Alt+2) to create sections.',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-[var(--accent)] underline' },
      }),
      Underline,
      Image.configure({
        inline: false,
        HTMLAttributes: { class: 'rounded-lg max-w-full' },
      }),
    ],
    content: resolveInitialContent(initialContent),
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON() as TiptapDoc);
    },
    editorProps: {
      attributes: {
        class: 'field-input !rounded-xl min-h-[300px] p-4 prose prose-sm dark:prose-invert max-w-none focus:outline-none',
      },
    },
  });

  editorRef.current = editor;

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 border-b border-[var(--border)] pb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`rounded px-2 py-1 text-xs font-medium ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'text-dim hover:bg-[var(--surface-strong)]'
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded px-2 py-1 text-xs font-bold ${
            editor.isActive('bold')
              ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'text-dim hover:bg-[var(--surface-strong)]'
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded px-2 py-1 text-xs italic ${
            editor.isActive('italic')
              ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'text-dim hover:bg-[var(--surface-strong)]'
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`rounded px-2 py-1 text-xs line-through ${
            editor.isActive('strike')
              ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'text-dim hover:bg-[var(--surface-strong)]'
          }`}
        >
          S
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`rounded px-2 py-1 text-xs underline ${
            editor.isActive('underline')
              ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'text-dim hover:bg-[var(--surface-strong)]'
          }`}
        >
          U
        </button>

        <span className="mx-1 h-4 w-px bg-[var(--border)]" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded px-2 py-1 text-xs ${
            editor.isActive('bulletList')
              ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'text-dim hover:bg-[var(--surface-strong)]'
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded px-2 py-1 text-xs ${
            editor.isActive('orderedList')
              ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'text-dim hover:bg-[var(--surface-strong)]'
          }`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`rounded px-2 py-1 text-xs ${
            editor.isActive('blockquote')
              ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'text-dim hover:bg-[var(--surface-strong)]'
          }`}
        >
          &ldquo; Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="rounded px-2 py-1 text-xs text-dim hover:bg-[var(--surface-strong)]"
        >
          ― Rule
        </button>

        <span className="mx-1 h-4 w-px bg-[var(--border)]" />

        <button
          type="button"
          onClick={setLink}
          className={`rounded px-2 py-1 text-xs ${
            editor.isActive('link')
              ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'text-dim hover:bg-[var(--surface-strong)]'
          }`}
        >
          Link
        </button>
        <button
          type="button"
          onClick={addImage}
          className="rounded px-2 py-1 text-xs text-dim hover:bg-[var(--surface-strong)]"
        >
          Image
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
