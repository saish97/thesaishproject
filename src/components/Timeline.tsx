'use client';

import { m, useScroll, useSpring } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CareerEntry, CareerEntryType } from '@/types';
import { fadeInUp, springTransition } from '@/utils/animations';

export interface TimelineProps {
  entries: CareerEntry[];
}

type Filters = {
  search: string;
  types: Set<CareerEntryType>;
};

// Use the same chip language as Projects (teal chip)
const chipClass = 'px-3 py-1 text-sm bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full';

export function Timeline({ entries }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end end'] });
  const progressX = useSpring(scrollYProgress, { ...springTransition, restDelta: 0.001 });

  const allTypes = useMemo(() => Array.from(new Set(entries.map(e => e.type))), [entries]);

  const [filters, setFilters] = useState<Filters>({ search: '', types: new Set(allTypes) });
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  useEffect(() => {
    // keep types in sync if data changes
    setFilters(f => ({ ...f, types: new Set(allTypes) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries.length]);

  const toggleType = (t: CareerEntryType) => {
    setFilters(prev => {
      const next = new Set(prev.types);
      if (next.has(t)) next.delete(t); else next.add(t);
      return { ...prev, types: next };
    });
  };

  const clearTypes = () => setFilters(prev => ({ ...prev, types: new Set(allTypes) }));

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return entries.filter(e =>
      filters.types.has(e.type) && (
        !query ||
        e.title.toLowerCase().includes(query) ||
        e.organization.toLowerCase().includes(query) ||
        e.location.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query)
      )
    );
  }, [entries, filters]);

  // Group by year (startDate assumed YYYY-MM)
  const grouped = useMemo(() => {
    const map = new Map<string, CareerEntry[]>();
    for (const e of filtered) {
      const year = (e.startDate || '').slice(0, 4) || 'Unknown';
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(e);
    }
    return Array.from(map.entries())
      .sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [filtered]);

  if (!entries?.length) return null;

  return (
    <div ref={containerRef} className="relative max-w-6xl mx-auto px-2 sm:px-4">
      {/* Top controls */}
      <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1">
          <label htmlFor="timeline-search" className="sr-only">Search timeline</label>
          <input
            id="timeline-search"
            type="search"
            placeholder="Search by role, organization, location..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Search career entries"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={clearTypes}
            className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Show all entry types"
          >
            All
          </button>
      {allTypes.map(t => (
            <button
              key={t}
              onClick={() => toggleType(t)}
        className={`px-3 py-1.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${filters.types.has(t) ? 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
              aria-pressed={filters.types.has(t)}
              aria-label={`Toggle type ${t}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-300" aria-live="polite">
        {filtered.length} entr{filtered.length === 1 ? 'y' : 'ies'}
      </div>

      {/* Vertical timeline rail */}
      <div className="relative">
        <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-400/60 to-teal-600/60" aria-hidden="true" />

        <div className="space-y-12">
          {grouped.map(([year, yearEntries]) => (
            <section key={year} aria-labelledby={`year-${year}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                <h3 id={`year-${year}`} className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">{year}</h3>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              </div>

              <ol className="relative space-y-12">
                {yearEntries.map((entry, idx) => {
                  const id = `${year}-${idx}`;
                  const isExpanded = expanded.has(idx + yearEntries.length); // stable-ish key
                  const side = (idx % 2 === 0) ? 'left' : 'right';
                  return (
                    <m.li
                      key={id}
                      variants={fadeInUp}
                      custom={side === 'left'}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, margin: '-10% 0px' }}
                      className="relative grid grid-cols-1 sm:grid-cols-2 gap-6"
                      role="article"
                      aria-labelledby={`timeline-entry-${id}`}
                    >
                      {/* Connector dot */}
                      <div className={`absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-3 w-3 h-3 rounded-full ring-4 ring-white dark:ring-neutral-900 bg-teal-500`} aria-hidden="true" />

                      {/* Card */}
                      <div className={`${side === 'left' ? 'sm:col-start-1' : 'sm:col-start-2'} sm:max-w-[38rem] ${side === 'left' ? 'sm:pr-8' : 'sm:pl-8'}`}>
                        <div className="group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
                          <div className="p-5">
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-300 bg-white dark:bg-neutral-900 text-xl" aria-hidden="true">{entry.icon}</div>
                              <div className="min-w-0">
                                <h4 id={`timeline-entry-${id}`} className="text-xl font-semibold text-gray-600 dark:text-gray-300 group-hover:text-teal-400 transition-colors">
                                  {entry.title}
                                  <span className="sr-only"> at {entry.organization}</span>
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{entry.organization}</p>
                              </div>
                              <span className={`ml-auto shrink-0 ${chipClass}`} role="note" aria-label={`Experience type: ${entry.type}`}>{entry.type}</span>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600 dark:text-gray-300">
                              <span className="inline-flex items-center gap-1"><CalendarIcon className="h-4 w-4" /> {entry.startDate} – {entry.endDate}</span>
                              <span className="inline-flex items-center gap-1"><LocationIcon className="h-4 w-4" /> {entry.location}</span>
                            </div>

                            <div className="relative mt-4">
                              <p className={`${isExpanded ? '' : 'max-h-20 overflow-hidden'} text-gray-600 dark:text-gray-300`}>{entry.description}</p>
                              {!isExpanded && (
                                <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-10 bg-gradient-to-t from-white dark:from-gray-800 to-transparent" aria-hidden="true" />
                              )}
                              <button
                                onClick={() => setExpanded(prev => {
                                  const next = new Set(prev);
                                  const key = idx + yearEntries.length;
                                  if (next.has(key)) next.delete(key); else next.add(key);
                                  return next;
                                })}
                                className="mt-3 text-sm font-medium text-teal-700 dark:text-teal-400 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                                aria-expanded={isExpanded}
                                aria-controls={`desc-${id}`}
                              >
                                {isExpanded ? 'Show less' : 'Show more'}
                              </button>
                              <div id={`desc-${id}`} className="sr-only">Full description toggle region</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </m.li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>

        {/* Bottom progress bar */}
        <m.div className="fixed left-0 right-0 bottom-0 h-1 bg-teal-500/30" style={{ scaleX: progressX, transformOrigin: '0%' }} aria-hidden="true" />
      </div>
    </div>
  );
}

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" d="M6.75 3a.75.75 0 0 1 .75.75V5h9V3.75a.75.75 0 1 1 1.5 0V5h.75A2.25 2.25 0 0 1 21 7.25v11.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V7.25A2.25 2.25 0 0 1 5.25 5H6V3.75A.75.75 0 0 1 6.75 3Zm-1.5 7.5a.75.75 0 0 0-.75.75v7.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-.75-.75H5.25Z" clipRule="evenodd" />
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" d="M11.47.659a.75.75 0 0 1 1.06 0l9 9a.75.75 0 1 1-1.06 1.06L12 2.309 3.53 10.72a.75.75 0 0 1-1.06-1.06l9-9ZM12 6a7.5 7.5 0 0 1 7.5 7.5v7.125a1.875 1.875 0 0 1-1.875 1.875h-11.25A1.875 1.875 0 0 1 4.5 20.625V13.5A7.5 7.5 0 0 1 12 6Z" clipRule="evenodd" />
  </svg>
);
