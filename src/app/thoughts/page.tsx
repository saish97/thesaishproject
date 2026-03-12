import Link from 'next/link';
import type { Metadata } from 'next';
import { PageShell, SectionIntro, SurfaceCard, TagPill, ThoughtCard, actionClasses } from '@/components';
import { thoughtPosts } from '@/data/thoughts';

export const metadata: Metadata = {
  title: 'Thoughts - The Saish Project',
  description: 'A simple archive of notes on learning design, experimentation, and building useful things.',
  alternates: {
    canonical: '/thoughts',
  },
};

export default function ThoughtsPage() {
  const [featuredThought, ...archiveThoughts] = thoughtPosts;

  return (
    <PageShell contentClassName="space-y-8">
      <SurfaceCard tone="panel" className="p-8 md:p-12">
        <SectionIntro
          eyebrow="thoughts"
          titleAs="h1"
          title="notes on learning design, product experiments, and making useful things."
          description="A lightweight archive for ideas worth keeping around. The writing is short on ceremony and long on practical thinking."
        />
      </SurfaceCard>

      {featuredThought ? (
        <SurfaceCard tone="panel" className="grid gap-8 p-8 md:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
          <div>
            <TagPill>latest note</TagPill>
            <h2 className="mt-5 text-4xl leading-tight text-ink md:text-5xl">{featuredThought.title}</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-dim md:text-lg">{featuredThought.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featuredThought.tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dim">{featuredThought.readingTime}</p>
            <p className="text-sm leading-7 text-dim">Published {featuredThought.publishedAt}</p>
            <Link href={`/thoughts/${featuredThought.slug}`} className={actionClasses.primary}>
              read the latest
            </Link>
          </div>
        </SurfaceCard>
      ) : null}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {archiveThoughts.map((post) => (
          <ThoughtCard key={post.slug} post={post} />
        ))}
      </section>
    </PageShell>
  );
}
