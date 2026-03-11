import Link from 'next/link';
import { ThoughtPost } from '@/types';

const thoughtDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export interface ThoughtCardProps {
  post: ThoughtPost;
}

export function ThoughtCard({ post }: ThoughtCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(13,148,136,0.4)] dark:border-white/10 dark:bg-neutral-900/75">
      <div className="flex items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>{thoughtDateFormatter.format(new Date(post.publishedAt))}</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="mt-5 text-2xl font-semibold leading-tight text-gray-900 transition-colors group-hover:text-teal-600 dark:text-gray-100 dark:group-hover:text-teal-400">
        <Link href={`/thoughts/${post.slug}`}>{post.title}</Link>
      </h3>

      <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-300">
        {post.excerpt}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-teal-700 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <Link
          href={`/thoughts/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-teal-600 dark:text-gray-100 dark:hover:text-teal-400"
        >
          read thought.
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
