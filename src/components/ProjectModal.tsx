import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { useKeyboardShortcut } from '@/hooks';
import { TagPill, actionClasses, cx, surfaceClasses } from './ui';

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useKeyboardShortcut('Escape', onClose, { enabled: isOpen });

  if (!project) {
    return null;
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[70]" onClose={onClose} aria-labelledby="project-modal-title">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/35 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-250"
              enterFrom="opacity-0 translate-y-4 scale-[0.98]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-[0.98]"
            >
              <Dialog.Panel className={cx(surfaceClasses.panel, 'w-full max-w-4xl overflow-hidden p-6 md:p-8')}>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-start">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
                      <Image
                        src={project.image}
                        alt={`${project.title} project screenshot`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        priority
                      />
                    </div>
                  </div>

                  <div>
                    <p className="eyebrow">project detail</p>
                    <Dialog.Title id="project-modal-title" className="mt-4 text-4xl leading-tight text-ink md:text-5xl">
                      {project.title}
                    </Dialog.Title>
                    <p className="mt-5 text-base leading-8 text-dim">{project.longDescription}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <TagPill key={tech}>{tech}</TagPill>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {project.demoLink ? (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={actionClasses.primary}
                          aria-label={`Open live demo for ${project.title}`}
                        >
                          view demo
                        </a>
                      ) : null}
                      {project.githubLink ? (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={actionClasses.secondary}
                          aria-label={`Open source code for ${project.title}`}
                        >
                          view source
                        </a>
                      ) : null}
                      <button type="button" onClick={onClose} className={cx(actionClasses.secondary, 'ml-auto')}>
                        close
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
