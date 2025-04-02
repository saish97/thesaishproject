'use client';

import { useState } from 'react';
import { motion, m } from 'framer-motion';
import { ProjectSkeleton } from '@/components/ProjectSkeleton';
import { ContactSection } from '@/components/ContactSection';
import { TimelineSkeleton } from '@/components/TimelineSkeleton';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ParallaxSection } from '@/components/ParallaxSection';
import { BackgroundPattern } from '@/components/BackgroundPattern';
import { useProjects } from '@/hooks/useProjects';
import { useCareer } from '@/hooks/useCareer';
import { Project } from '@/types';
import { fadeInUp } from '@/utils/animations';
import { ProjectModal, Timeline, ProjectGrid } from '@/utils/dynamic';

export default function Home() {
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  const { entries: careerEntries, loading: careerLoading, error: careerError } = useCareer();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-300 dark:bg-gray-700 overflow-hidden">
      {/* Background Patterns */}
      <BackgroundPattern variant="dots" className="z-0" />
      <BackgroundPattern variant="grid" className="z-0 translate-x-1/2" />
      <BackgroundPattern variant="waves" className="z-0 -translate-x-1/2" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Greeting Section */}
        <ParallaxSection className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <m.h1
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-gray-200"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              sup, i'm <span className="text-teal-400">saish</span>.
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
        </ParallaxSection>

        {/* Projects Section */}
        <section
          className="relative py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16 backdrop-blur-sm bg-gray-300/50 dark:bg-gray-700/50"
          id="projects"
        >
          <ParallaxSection offset={30}>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
              my projects.
            </h2>

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
          </ParallaxSection>
        </section>

        {/* Career Timeline Section */}
        <section
          className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm scroll-mt-16"
          id="career"
        >
          <ParallaxSection offset={30}>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
              my journey.
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
          </ParallaxSection>
        </section>

        {/* Contact Section */}
        <div className="relative backdrop-blur-sm bg-gray-300/50 dark:bg-gray-700/50">
          <ParallaxSection>
            <ContactSection />
          </ParallaxSection>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
