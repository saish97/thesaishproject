import Link from 'next/link';
import { PageShell, SurfaceCard, actionClasses } from '@/components';

export default function NotFound() {
  return (
    <PageShell contentClassName="flex min-h-[70vh] items-center justify-center">
      <SurfaceCard tone="panel" className="max-w-2xl p-8 text-center md:p-10">
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-5 text-4xl leading-tight text-ink">page not found.</h1>
        <p className="mt-4 text-base leading-8 text-dim">
          Sorry, this page is missing. The easiest reset is to head back home or jump straight to the project section.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={actionClasses.primary}>
            go back home
          </Link>
          <Link href="/#projects" className={actionClasses.secondary}>
            see projects
          </Link>
        </div>
      </SurfaceCard>
    </PageShell>
  );
}
