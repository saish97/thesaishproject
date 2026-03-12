import Link from 'next/link';
import { ThoughtPost } from '@/types';
import { SurfaceCard, TagPill, textLinkClassName } from './ui';

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
    <SurfaceCard as="article" interactive className="group flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-4 text-sm text-dim">
        <span>{thoughtDateFormatter.format(new Date(post.publishedAt))}</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="mt-5 text-2xl leading-tight text-ink transition-colors group-hover:text-accent">
        <Link href={`/thoughts/${post.slug}`}>{post.title}</Link>
      </h3>

      <p className="mt-4 text-base leading-7 text-dim">{post.excerpt}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagPill key={tag}>{tag}</TagPill>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <Link href={`/thoughts/${post.slug}`} className={`inline-flex items-center gap-2 text-sm font-semibold ${textLinkClassName}`}>
          read thought.
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </SurfaceCard>
  );
}
