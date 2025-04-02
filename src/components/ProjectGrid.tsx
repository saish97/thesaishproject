import Image from "next/image";
import { m } from "framer-motion";
import { Project } from "@/types";
import { fadeInUp, staggerChildren, scaleOnHover } from "@/utils/animations";

export interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  if (!projects.length) return null;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onProjectClick(project);
    }
  };

  return (
    <m.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
      role="grid"
      aria-label="Projects grid"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      {projects.map((project) => (
        <m.div
          key={project.id}
          onClick={() => onProjectClick(project)}
          onKeyDown={(e) => handleKeyPress(e, project)}
          className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer max-w-sm mx-auto focus-within:ring-2 focus-within:ring-teal-500"
          role="gridcell"
          tabIndex={0}
          aria-label={`${project.title} project - Click to view details`}
          variants={fadeInUp}
          whileHover="hover"
          whileTap="tap"
        >
          <m.div 
            className="aspect-video relative overflow-hidden"
            variants={scaleOnHover}
          >
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title} project`}
              loading="lazy"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <m.div 
              className="absolute inset-0 bg-gradient-to-t from-teal-400/50 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" 
              aria-hidden="true"
            />
          </m.div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-600 dark:text-gray-300 group-hover:text-teal-400 group-focus-within:text-teal-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>
            <m.div 
              className="flex gap-2 flex-wrap" 
              role="list" 
              aria-label="Technologies used"
              variants={staggerChildren}
            >
              {project.technologies.map((tech) => (
                <m.span
                  key={tech}
                  className="px-3 py-1 text-sm bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full"
                  role="listitem"
                  variants={fadeInUp}
                >
                  {tech}
                </m.span>
              ))}
            </m.div>
          </div>
        </m.div>
      ))}
    </m.div>
  );
}