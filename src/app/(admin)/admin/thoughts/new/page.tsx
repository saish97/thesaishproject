import { redirect } from 'next/navigation';
import { createDraftThought } from '../../_actions/thoughts';

export default async function NewThoughtPage() {
  const id = await createDraftThought();
  redirect(`/admin/thoughts/${id}/edit`);
}
