import { notFound } from 'next/navigation';
import { getThought } from '../../../_actions/thoughts';
import { EditThoughtForm } from './EditThoughtForm';
import type { ThoughtSection } from '@/types';

type EditThoughtPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditThoughtPage({ params }: EditThoughtPageProps) {
  const { id } = await params;
  const thought = await getThought(Number(id));

  if (!thought) notFound();

  const isDraft = thought.status === 'draft';

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold text-ink">
        {isDraft ? 'New Thought' : 'Edit Thought'}
      </h1>
      <EditThoughtForm
        id={Number(id)}
        thought={{
          ...thought,
          content: thought.content as ThoughtSection[],
          status: thought.status ?? 'published',
        }}
      />
    </div>
  );
}
