export function TimelineSkeleton() {
  return (
    <div className="space-y-6" role="progressbar" aria-label="Loading career timeline" aria-busy="true">
      <div className="surface-card p-4 md:p-5">
        <div className="space-y-4 animate-pulse">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="h-11 w-full rounded-full lg:max-w-sm" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
            <div className="flex gap-2 overflow-hidden lg:flex-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-10 w-28 shrink-0 rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.1)' }} />
              ))}
            </div>
          </div>
          <div className="h-4 w-24 rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
        </div>
      </div>

      <div className="relative pl-10 sm:pl-12">
        <div className="absolute bottom-0 left-4 top-1 w-px" style={{ background: 'linear-gradient(180deg, rgba(var(--accent-rgb), 0.15), rgba(var(--accent-rgb), 0.45), rgba(var(--accent-rgb), 0.15))' }} aria-hidden="true" />
        <div className="space-y-10">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-16 rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.1)' }} />
                <div className="divider-line flex-1" />
              </div>
              <div className="relative pl-4">
                <div className="absolute top-8 h-3 w-3 rounded-full" style={{ left: '-1.6rem', background: 'var(--accent)', boxShadow: '0 0 0 8px rgba(var(--bg-rgb), 0.85)' }} aria-hidden="true" />
                <div className="surface-card p-6 animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.14)' }} />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-28 rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
                      <div className="h-12 w-3/4 rounded-2xl" style={{ background: 'rgba(var(--accent-rgb), 0.08)' }} />
                      <div className="h-3 w-1/2 rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.08)' }} />
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <div className="h-8 w-32 rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.1)' }} />
                    <div className="h-8 w-24 rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.08)' }} />
                  </div>
                  <div className="mt-5 space-y-2">
                    <div className="h-3 w-full rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.08)' }} />
                    <div className="h-3 w-11/12 rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.08)' }} />
                    <div className="h-3 w-10/12 rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.08)' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
