"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ProjectModal from "@/components/ProjectModal";
import NavMenu from "@/components/NavMenu";
import { Timeline } from "@/components/Timeline";
import careerData from "@/data/career.json";

type Project = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  demoLink: string;
  githubLink: string;
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NavMenu />

      {/* Greeting Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-600 dark:text-gray-300">
            sup, i'm <span className="text-teal-400">saish.</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            vibe coded into reality 😎
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-300 dark:bg-gray-700" id="projects">
        <h2 className="text-3xl font-bold text-left mb-12 text-gray-600 dark:text-gray-300 max-w-7xl mx-auto">projects.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {loading ? (
            <div>Loading projects...</div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer max-w-sm mx-auto"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-600 dark:text-gray-300 group-hover:text-teal-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-sm bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Skills Section */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-40 dark:bg-gray-500" id="skills"> */}
      {/* <h2 className="text-3xl font-bold text-left mb-12">skills.</h2> */}
      {/* <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8"> */}
      {/* Skill groups will be mapped here */}
      {/* </div> */}
      {/* </section> */}

      {/* Career Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-300" id="career">
        <h2 className="text-3xl font-bold text-left mb-12 text-gray-600 dark:text-gray-300 max-w-7xl mx-auto">career.</h2>
        <Timeline entries={careerData} />
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-300 dark:bg-gray-700" id="contact">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-600 dark:text-gray-300">let's connect.</h2>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Form */}
            <div className="flex-1">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 text-gray-600 dark:text-gray-300 focus:ring-teal-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Message</label>
                  <textarea
                    id="message"
                    placeholder="Your message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-teal-600 text-gray-50 dark:text-gray-300 hover:bg-teal-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-6 text-gray-600 dark:text-gray-300">find me on</h3>
              <div className="space-y-4">
                <a href="https://github.com/saish97" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  GitHub
                </a>
                <a href="https://linkedin.com/in/saishgaonkar/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  LinkedIn
                </a>
                <a href="mailto:saishgaonkar97@gmail.com"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </div>
  );
}
