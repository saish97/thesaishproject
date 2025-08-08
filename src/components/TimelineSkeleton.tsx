export function TimelineSkeleton() {
  return (
    <div className="relative max-w-6xl mx-auto px-2 sm:px-4" role="progressbar" aria-label="Loading career timeline" aria-busy="true">
      <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-400/60 to-teal-600/60" aria-hidden="true" />
      <div className="space-y-12">
        {[1,2,3].map((_, i) => (
          <div key={i} className="relative grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-3 w-3 h-3 rounded-full ring-4 ring-white dark:ring-neutral-900 bg-teal-500" aria-hidden />
            <div className={`${i % 2 === 0 ? 'sm:col-start-1 sm:pr-8' : 'sm:col-start-2 sm:pl-8'} sm:max-w-[38rem]`}>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur shadow-sm">
                <div className="p-5 animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  </div>
                  <div className="mt-3 flex gap-3">
                    <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-10/12 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}