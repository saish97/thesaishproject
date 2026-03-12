'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { m } from 'framer-motion';
import {
  ContactSection,
  ErrorMessage,
  PageShell,
  ProjectSkeleton,
  SectionIntro,
  SurfaceCard,
  TagPill,
  ThoughtCard,
  TimelineSkeleton,
  actionClasses,
  cx,
} from '@/components';
import { getFeaturedThoughts } from '@/data/thoughts';
import { useCareer, useProjects } from '@/hooks';
import { Project } from '@/types';
import { fadeInUp } from '@/utils/animations';
import { ProjectGrid, ProjectModal, Timeline } from '@/utils/dynamic';

export default function Home() {
  const featuredThoughts = getFeaturedThoughts();
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  const { entries: careerEntries, loading: careerLoading, error: careerError } = useCareer();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

  const currentRole = useMemo(
    () => careerEntries.find((entry) => entry.endDate === 'Present') ?? careerEntries[careerEntries.length - 1],
    [careerEntries],
  );

  const proofItems = useMemo(
    () => [
      {
        value: careerLoading ? '--' : String(careerEntries.length).padStart(2, '0'),
        label: 'career chapters across learning, facilitation, and AI',
      },
      {
        value: projectsLoading ? '--' : String(projects.length).padStart(2, '0'),
        label: 'selected project case studies and experiments',
      },
      {
        value: String(featuredThoughts.length).padStart(2, '0'),
        label: 'published thoughts on making useful systems',
      },
    ],
    [careerEntries.length, careerLoading, featuredThoughts.length, projects.length, projectsLoading],
  );

  const projectCountLabel = projectsLoading ? 'selected projects loading' : `${String(projects.length).padStart(2, '0')} selected projects`;
  const timelineCountLabel = careerLoading ? 'career entries loading' : `${String(careerEntries.length).padStart(2, '0')} career entries`;
  const thoughtCountLabel = `${String(featuredThoughts.length).padStart(2, '0')} featured thoughts`;

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  return (
    <PageShell contentClassName="space-y-12 lg:space-y-16">
      <section>
        <SurfaceCard tone="panel" className="relative overflow-hidden p-8 md:p-12">
          {/* Portrait — top-right, width matched to the third stat card */}
          <m.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.75, delay: 0.3 }}
            className="pointer-events-none absolute right-10 top-0 hidden lg:block"
            style={{ width: 'calc((100% - 3rem - 1.5rem) / 3 + 3rem)' }}
          >
            <Image
              src="/images/saish-portrait.png"
              alt="Saish Gaonkar"
              width={1042}
              height={720}
              className="h-auto w-full rounded-tl-2xl object-cover object-top grayscale"
              style={{ borderTopRightRadius: '2rem' }}
              priority
            />
            {/* Bottom fade so it merges into the card behind the stat boxes */}
            {/* <div
              className="absolute inset-x-0 bottom-0 h-42"
              style={{ background: 'linear-gradient(to top, var(--surface-strong) 0%, transparent 100%)' }}
              aria-hidden="true"
            /> */}
          </m.div>

          <m.div variants={fadeInUp} initial="initial" animate="animate" transition={{ duration: 0.75, delay: 0.1 }} className="relative">
            <SectionIntro
              eyebrow="the saish project"
              titleAs="h1"
              title="hi, i'm saish."
              // title="learning design, product experiments, and AI systems with a human center."
              description="I build AI systems that are educational, useful in context, and grounded in real work. welcome to my portfolio of projects, career, and my thoughts that I managed to write down."
              titleClassName="max-w-[20ch] text-[clamp(2.4rem,8vw,3rem)] sm:text-[3.5rem] lg:text-[4rem]"
              descriptionClassName="max-w-3xl"
              actions={
                <>
                  <Link href="/#projects" className={actionClasses.primary}>
                    view projects
                  </Link>
                  <Link href="/thoughts" className={actionClasses.secondary}>
                    read thoughts
                  </Link>
                </>
              }
            />
          </m.div>

          <div className="relative mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {proofItems.map((item) => (
              <SurfaceCard key={item.label} className="flex h-full flex-col justify-between p-5">
                <p className="text-3xl leading-none text-ink">{item.value}</p>
                <p className="mt-3 text-sm leading-6 text-dim">{item.label}</p>
              </SurfaceCard>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <SurfaceCard className="p-6">
              <TagPill>current focus</TagPill>
              <h2 className="mt-4 text-2xl leading-tight text-ink">enterprise AI, learning products, and systems people can actually use.</h2>
              <p className="mt-3 text-sm leading-7 text-dim">
                {currentRole
                  ? `Currently working as ${currentRole.title} at ${currentRole.organization}, translating strategy into prototypes, workflows, and operational change.`
                  : 'Building the next round of practical experiments in learning design and AI operations.'}
              </p>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <TagPill>base</TagPill>
              <h2 className="mt-4 text-2xl leading-tight text-ink">dubai-based, working across digital learning, customer enablement, and AI transformation.</h2>
              <p className="mt-3 text-sm leading-7 text-dim">
                The portfolio combines selected work, a career timeline, and short writing on design, experimentation, and consistency.
              </p>
            </SurfaceCard>
          </div>
        </SurfaceCard>
      </section>

      <section id="projects" className="scroll-mt-28">
        <SurfaceCard tone="panel" className="space-y-8 p-6 md:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(18rem,0.52fr)] lg:items-end">
            <SectionIntro
              eyebrow="selected work"
              title="projects with a clear point of view."
              titleClassName="max-w-[9.25ch] text-3xl sm:text-4xl lg:text-[3.5rem]"
              className="max-w-none"
            />

            <div className="flex flex-col gap-4 lg:items-end lg:text-right">
              <p className="max-w-md text-sm leading-7 text-dim">
                A horizontal strip keeps the images, copy, and tags at stable proportions instead of compressing the work into a broken grid.
              </p>
              <TagPill tone="muted">{projectCountLabel}</TagPill>
            </div>
          </div>

          <div>
            {projectsError ? <ErrorMessage message={projectsError} className="mb-6" /> : null}
            {projectsLoading ? <ProjectSkeleton /> : <ProjectGrid projects={projects} onProjectClick={handleProjectClick} />}
          </div>
        </SurfaceCard>
      </section>

      <section id="career" className="scroll-mt-28">
        <SurfaceCard tone="panel" className="space-y-8 p-6 md:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(18rem,0.55fr)] lg:items-end">
            <SectionIntro
              eyebrow="trajectory"
              title="career built through teaching, systems, and experimentation."
              titleClassName="max-w-[10ch] text-3xl sm:text-4xl lg:text-[3.45rem]"
              className="max-w-none"
            />

            <div className="flex flex-col gap-4 lg:items-end lg:text-right">
              <p className="max-w-md text-sm leading-7 text-dim">
                Preview mode keeps the homepage compact. Expand it when you want the full timeline visible in the page.
              </p>
              <TagPill tone="muted">{timelineCountLabel}</TagPill>
              <button
                type="button"
                onClick={() => setIsTimelineExpanded((current) => !current)}
                className={actionClasses.secondary}
                aria-expanded={isTimelineExpanded}
                aria-controls="career-timeline-region"
              >
                {isTimelineExpanded ? 'collapse timeline' : 'expand timeline'}
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              id="career-timeline-region"
              className={cx(
                !isTimelineExpanded && 'surface-scroll max-h-[42rem] overflow-y-auto pr-3',
              )}
            >
              {careerError ? <ErrorMessage message={careerError} className="mb-6" /> : null}
              {careerLoading ? <TimelineSkeleton /> : <Timeline entries={careerEntries} />}
            </div>
            {!isTimelineExpanded && !careerLoading ? (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 rounded-b-[1.75rem]"
                style={{ background: 'linear-gradient(180deg, rgba(var(--surface-strong-rgb), 0), rgba(var(--surface-strong-rgb), 0.95) 74%)' }}
                aria-hidden="true"
              />
            ) : null}
          </div>
        </SurfaceCard>
      </section>

      <section id="thoughts" className="scroll-mt-28">
        <SurfaceCard tone="panel" className="p-6 md:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(18rem,0.48fr)] lg:items-end">
            <SectionIntro
              eyebrow="thoughts"
              title="short notes on learning design, product thinking, and useful momentum."
              titleClassName="max-w-[12ch] text-3xl sm:text-4xl lg:text-[3.4rem]"
              className="max-w-none"
            />

            <div className="flex flex-col gap-4 lg:items-end lg:text-right">
              <p className="max-w-md text-sm leading-7 text-dim">
                Writing is where the working principles live. These are short, practical notes rather than polished essays.
              </p>
              <TagPill tone="muted">{thoughtCountLabel}</TagPill>
              <Link href="/thoughts" className={actionClasses.secondary}>
                browse all thoughts
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredThoughts.map((post) => (
              <ThoughtCard key={post.slug} post={post} />
            ))}
          </div>
        </SurfaceCard>
      </section>

      <ContactSection />

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageShell>
  );
}
