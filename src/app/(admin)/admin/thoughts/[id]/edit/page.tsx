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
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="eyebrow">Thoughts</p>
        <h1 className="mt-3 text-2xl leading-[0.95] text-ink sm:text-3xl">
          {isDraft ? 'New Thought' : 'Edit Thought'}
        </h1>
      </div>
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
