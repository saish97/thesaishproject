import { redirect } from 'next/navigation';

type ThoughtPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ThoughtPage({ params }: ThoughtPageProps) {
  const { id } = await params;
  redirect(`/admin/thoughts/${id}/edit`);
}
