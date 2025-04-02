export function ProjectSkeleton() {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
      role="progressbar"
      aria-label="Loading projects"
      aria-busy="true"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg max-w-sm mx-auto"
        >
          <div 
            className="aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
          <div className="p-6 space-y-4">
            <div 
              className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
            <div 
              className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              style={{ animationDelay: `${index * 0.3}s` }}
            />
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                  style={{ animationDelay: `${index * 0.1 + i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}