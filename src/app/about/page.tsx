export const metadata = {
  title: 'About — The Saish Project',
  description: 'About Saish: Digital Learning Specialist & Developer',
};

export default function AboutPage() {
  return (
    <main className="min-h-[70vh] px-6 py-24 mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">about.</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        I’m Saish, a digital learning specialist and developer focused on building engaging learning experiences.
        I combine pedagogy, UX, and modern web tech to deliver measurable outcomes.
      </p>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        This site showcases selected projects and a career timeline. If you’d like to collaborate,
        drop a note in the contact section.
      </p>
    </main>
  );
}
