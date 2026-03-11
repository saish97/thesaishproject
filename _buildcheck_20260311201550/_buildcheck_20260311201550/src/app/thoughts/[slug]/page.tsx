import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getThoughtBySlug, thoughtPosts } from '@/data/thoughts';

const fullThoughtDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

type ThoughtPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return thoughtPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: ThoughtPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getThoughtBySlug(slug);

  if (!post) {
    return {
      title: 'Thought Not Found - The Saish Project',
    };
  }

  return {
    title: `${post.title} - The Saish Project`,
    description: post.excerpt,
    alternates: {
      canonical: `/thoughts/${post.slug}`,
    },
  };
}

export default async function ThoughtPostPage({
  params,
}: ThoughtPostPageProps) {
  const { slug } = await params;
  const post = getThoughtBySlug(slug);

  if (!post) {
    notFound();
  }

  const moreThoughts = thoughtPosts
    .filter((thought) => thought.slug !== post.slug)
    .slice(0, 2);

  return (
    <main
      id="main-content"
      className="min-h-screen bg-neutral-300 px-4 pb-20 pt-24 dark:bg-neutral-950 sm:px-6 lg:px-8"
    >
      <article className="mx-auto max-w-4xl">
        <Link
          href="/thoughts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
        >
          <span aria-hidden>&larr;</span>
          back to thoughts.
        </Link>

        <header className="mt-6 rounded-[2rem] border border-black/10 bg-white/70 p-8 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/75 md:p-12">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span>{fullThoughtDateFormatter.format(new Date(post.publishedAt))}</span>
            <span aria-hidden>/</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700 dark:text-gray-300">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-teal-700 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-10 space-y-10 rounded-[2rem] border border-black/10 bg-white/70 p-8 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/75 md:p-12">
          {post.content.map((section, index) => (
            <section key={`${post.slug}-${index}`} className="space-y-5">
              {section.heading ? (
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {section.heading}
                </h2>
              ) : null}

              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={`${post.slug}-${index}-${paragraphIndex}`}
                  className="text-lg leading-8 text-gray-700 dark:text-gray-300"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        {moreThoughts.length > 0 ? (
          <section className="mt-12 rounded-[2rem] border border-black/10 bg-white/70 p-8 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/75 md:p-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              more thoughts.
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {moreThoughts.map((thought) => (
                <Link
                  key={thought.slug}
                  href={`/thoughts/${thought.slug}`}
                  className="rounded-[1.5rem] border border-black/10 px-5 py-5 transition-colors hover:border-teal-500/30 hover:bg-teal-500/5 dark:border-white/10 dark:hover:border-teal-400/30 dark:hover:bg-teal-400/5"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {fullThoughtDateFormatter.format(new Date(thought.publishedAt))}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {thought.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                    {thought.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
