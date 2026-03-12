'use client';

import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Project } from '@/types';
import { fadeInUp, scaleOnHover, staggerChildren } from '@/utils/animations';
import { TagPill, cx, iconButtonClassName, surfaceClasses, textLinkClassName } from './ui';

export interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(projects.length > 1);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    setCanScrollPrev(track.scrollLeft > 8);
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();

    const track = trackRef.current;
    if (!track) {
      return;
    }

    const onResize = () => updateScrollState();

    track.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', onResize);
    };
  }, [projects.length, updateScrollState]);

  if (!projects.length) {
    return null;
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLElement>, project: Project) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onProjectClick(project);
    }
  };

  const scrollTrack = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const firstCard = track.querySelector<HTMLElement>('[data-project-card]');
    const scrollAmount = firstCard ? firstCard.offsetWidth + 20 : track.clientWidth * 0.9;

    track.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-dim">Use the arrows, trackpad, or touch scroll to move through the work.</p>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollTrack(-1)}
            className={cx(iconButtonClassName, 'h-11 w-11 disabled:cursor-not-allowed disabled:opacity-40')}
            disabled={!canScrollPrev}
            aria-label="Scroll projects backward"
          >
            <span aria-hidden>&larr;</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTrack(1)}
            className={cx(iconButtonClassName, 'h-11 w-11 disabled:cursor-not-allowed disabled:opacity-40')}
            disabled={!canScrollNext}
            aria-label="Scroll projects forward"
          >
            <span aria-hidden>&rarr;</span>
          </button>
        </div>
      </div>

      <m.div
        ref={trackRef}
        className="carousel-scroll -mx-1 grid auto-cols-[16.75rem] grid-flow-col gap-5 overflow-x-auto px-1 pb-2 pr-5 snap-x snap-mandatory sm:auto-cols-[18rem] md:pr-7 lg:auto-cols-[19rem] lg:pr-9 xl:auto-cols-[20rem]"
        role="grid"
        aria-label="Projects carousel"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        {projects.map((project) => (
          <m.article
            key={project.id}
            data-project-card
            role="button"
            tabIndex={0}
            aria-label={`${project.title} project. View details.`}
            onClick={() => onProjectClick(project)}
            onKeyDown={(event) => handleKeyPress(event, project)}
            className={cx(
              surfaceClasses.card,
              surfaceClasses.interactive,
              'group flex h-full min-h-[35.75rem] cursor-pointer snap-start flex-col overflow-hidden',
            )}
            variants={fadeInUp}
            whileHover="hover"
            whileTap="tap"
          >
            <m.div className="relative aspect-[5/4] overflow-hidden border-b border-[var(--border)]" variants={scaleOnHover}>
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                sizes="(max-width: 768px) 18.25rem, (max-width: 1280px) 20rem, 21rem"
                className="object-cover transition-transform duration-500"
                quality={88}
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-80"
                style={{ background: 'linear-gradient(180deg, transparent 24%, rgba(16, 24, 22, 0.18) 100%)' }}
                aria-hidden="true"
              />
            </m.div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex-1">
                <p className="eyebrow">selected work</p>
                <h3 className="mt-4 max-w-[12ch] text-[1.95rem] leading-[1.02] text-ink">{project.title}</h3>
                <p className="mt-4 text-[0.98rem] leading-7 text-dim">{project.description}</p>
              </div>

              <div className="mt-6 flex min-h-[5.5rem] flex-wrap content-start gap-2">
                {project.technologies.map((tech) => (
                  <TagPill key={tech}>{tech}</TagPill>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5 text-sm font-medium">
                <span className={textLinkClassName}>view details</span>
                <span className="text-dim transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
                  &rarr;
                </span>
              </div>
            </div>
          </m.article>
        ))}
      </m.div>
    </div>
  );
}
