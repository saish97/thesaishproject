import type { Metadata } from 'next';
import { ThoughtCard } from '@/components';
import { thoughtPosts } from '@/data/thoughts';

export const metadata: Metadata = {
  title: 'Thoughts - The Saish Project',
  description: 'A simple archive of notes on learning design, experimentation, and building useful things.',
  alternates: {
    canonical: '/thoughts',
  },
};

export default function ThoughtsPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-neutral-300 px-4 pb-20 pt-24 dark:bg-neutral-950 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-black/10 bg-white/70 p-8 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/75 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700 dark:text-teal-300">
            thoughts.
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 md:text-5xl">
            Notes on learning design, product experiments, and making useful things.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700 dark:text-gray-300">
            A lightweight blog archive for ideas worth keeping around. These posts are short on ceremony and long on practical thinking.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {thoughtPosts.map((post) => (
            <ThoughtCard key={post.slug} post={post} />
          ))}
        </section>
      </div>
    </main>
  );
}
