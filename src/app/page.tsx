'use client';

import { useState, useCallback } from 'react';
import { m } from 'framer-motion';
import { ProjectSkeleton, ContactSection, TimelineSkeleton, ErrorMessage, BackgroundPattern } from '@/components';
import { useProjects, useCareer } from '@/hooks';
import { Project } from '@/types';
import { fadeInUp } from '@/utils/animations';
import { ProjectModal, Timeline, ProjectGrid } from '@/utils/dynamic';

export default function Home() {
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  const { entries: careerEntries, loading: careerLoading, error: careerError } = useCareer();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  return (
    <main id="main-content" className="min-h-screen bg-neutral-300 dark:bg-neutral-950 overflow-hidden">
      {/* Background Pattern (single instance for performance) */}
      <BackgroundPattern className="z-0" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Greeting Section */}
        <section className="min-h-[100vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <m.h1
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-gray-200"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="sr-only">Hello, I'm Saish — Digital Learning Specialist & Developer</span>
              <span aria-hidden>sup, i'm <span className="text-teal-600 dark:text-teal-400">saish</span>.</span>
            </m.h1>
            <m.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              a digital learning specialist passionate about creating innovative learning experiences through technology.
            </m.p>
          </div>
        </section>

        {/* Projects Section */}
        <section
          className="relative py-15 px-4 sm:px-6 lg:px-8 scroll-mt-16 backdrop-blur-xs bg-gray-300/50 dark:bg-gray-700/10"
          id="projects"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
            projects.
          </h2>

          <h4 className="text-sm font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
            click to learn more.
          </h4>

          {projectsError && (
            <div className="max-w-7xl mx-auto mb-8">
              <ErrorMessage message={projectsError} />
            </div>
          )}

          {projectsLoading ? (
            <ProjectSkeleton />
          ) : (
            <ProjectGrid
              projects={projects}
              onProjectClick={handleProjectClick}
            />
          )}
        </section>

        {/* Career Timeline Section */}
        <section
          className="relative py-15 px-4 sm:px-6 lg:px-8 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-xs scroll-mt-16"
          id="career"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
            career.
          </h2>

          {careerError && (
            <div className="max-w-7xl mx-auto mb-8">
              <ErrorMessage message={careerError} />
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            {careerLoading ? (
              <TimelineSkeleton />
            ) : (
              <Timeline entries={careerEntries} />
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative backdrop-blur-xs bg-gray-300/50 dark:bg-neutral-700/50">
          <ContactSection />
        </section>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
