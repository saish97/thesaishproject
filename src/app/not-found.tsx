import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] grid place-items-center px-6 py-24 text-center">
      <div>
        <p className="text-sm font-semibold text-teal-600">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Page not found
        </h1>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Go back home
          </Link>
          <a href="#projects" className="text-sm font-semibold text-teal-600 dark:text-teal-400">
            See projects <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
