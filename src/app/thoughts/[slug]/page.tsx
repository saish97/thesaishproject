import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageShell, SurfaceCard, TagPill, ThoughtCard, actionClasses, textLinkClassName } from '@/components';
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

export async function generateMetadata({ params }: ThoughtPostPageProps): Promise<Metadata> {
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

export default async function ThoughtPostPage({ params }: ThoughtPostPageProps) {
  const { slug } = await params;
  const post = getThoughtBySlug(slug);

  if (!post) {
    notFound();
  }

  const moreThoughts = thoughtPosts.filter((thought) => thought.slug !== post.slug).slice(0, 2);

  return (
    <PageShell contentClassName="max-w-5xl space-y-8">
      <Link href="/thoughts" className={`inline-flex items-center gap-2 text-sm font-semibold ${textLinkClassName}`}>
        <span aria-hidden>&larr;</span>
        back to thoughts.
      </Link>

      <SurfaceCard tone="panel" className="p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-dim">
          <span>{fullThoughtDateFormatter.format(new Date(post.publishedAt))}</span>
          <span aria-hidden>/</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="mt-5 text-4xl leading-tight text-ink md:text-5xl">{post.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-dim">{post.excerpt}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard tone="panel" className="space-y-10 p-8 md:p-12">
        {post.content.map((section, index) => (
          <section key={`${post.slug}-${index}`} className="space-y-5">
            {section.heading ? <h2 className="text-2xl leading-tight text-ink">{section.heading}</h2> : null}
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={`${post.slug}-${index}-${paragraphIndex}`} className="text-base leading-8 text-dim md:text-lg">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </SurfaceCard>

      {moreThoughts.length ? (
        <SurfaceCard tone="panel" className="p-8 md:p-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">more thoughts</p>
              <h2 className="mt-4 text-3xl leading-tight text-ink">keep reading.</h2>
            </div>
            <Link href="/thoughts" className={actionClasses.secondary}>
              view archive
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {moreThoughts.map((thought) => (
              <ThoughtCard key={thought.slug} post={thought} />
            ))}
          </div>
        </SurfaceCard>
      ) : null}
    </PageShell>
  );
}
