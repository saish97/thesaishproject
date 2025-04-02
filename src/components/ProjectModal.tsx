import Image from 'next/image';
import { useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    longDescription?: string;
    demoLink?: string;
    githubLink?: string;
  };
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden w-full max-w-4xl h-auto max-h-[calc(100vh-2rem)] flex flex-col animate-slideUp">
        <div className="relative h-48 sm:h-64 md:h-72 lg:h-96">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent">
            {project.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
            {project.longDescription || project.description}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-center"
              >
                View Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
