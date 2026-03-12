export function ProjectSkeleton() {
  return (
    <div className="space-y-5" role="progressbar" aria-label="Loading projects" aria-busy="true">
      <div className="flex items-center justify-between gap-3">
        <div className="h-4 w-48 rounded-full animate-pulse" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
        <div className="hidden gap-2 sm:flex">
          <div className="h-11 w-11 rounded-full animate-pulse" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
          <div className="h-11 w-11 rounded-full animate-pulse" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
        </div>
      </div>

      <div className="surface-scroll -mx-1 grid auto-cols-[18.25rem] grid-flow-col gap-5 overflow-x-auto px-1 pb-4 sm:auto-cols-[20rem] xl:auto-cols-[21rem]">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="surface-card min-h-[39rem] overflow-hidden p-0">
            <div className="aspect-[4/3] animate-pulse" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
            <div className="space-y-4 p-6">
              <div className="h-4 w-24 rounded-full animate-pulse" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
              <div className="h-16 w-3/4 rounded-2xl animate-pulse" style={{ background: 'rgba(var(--accent-rgb), 0.08)' }} />
              <div className="space-y-2">
                <div className="h-3 w-full rounded-full animate-pulse" style={{ background: 'rgba(var(--accent-rgb), 0.08)' }} />
                <div className="h-3 w-11/12 rounded-full animate-pulse" style={{ background: 'rgba(var(--accent-rgb), 0.08)' }} />
                <div className="h-3 w-10/12 rounded-full animate-pulse" style={{ background: 'rgba(var(--accent-rgb), 0.08)' }} />
              </div>
              <div className="flex min-h-[6.5rem] flex-wrap gap-2">
                {Array.from({ length: 3 }).map((__, pillIndex) => (
                  <div
                    key={pillIndex}
                    className="h-8 w-20 rounded-full animate-pulse"
                    style={{ background: 'rgba(var(--accent-rgb), 0.1)', animationDelay: `${pillIndex * 70}ms` }}
                  />
                ))}
              </div>
              <div className="h-px w-full" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 rounded-full animate-pulse" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
                <div className="h-4 w-4 rounded-full animate-pulse" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
