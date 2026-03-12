'use client';

import { m } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { CareerEntry, CareerEntryType } from '@/types';
import { fadeInUp } from '@/utils/animations';
import { TagPill, cx, inputClassName, surfaceClasses, textLinkClassName } from './ui';

export interface TimelineProps {
  entries: CareerEntry[];
}

type Filters = {
  search: string;
  types: Set<CareerEntryType>;
};

const normalizeEndDate = (value: string) => (value === 'Present' ? '9999-12' : value);
const buildEntryKey = (entry: CareerEntry) => `${entry.organization}-${entry.title}-${entry.startDate}`;
const sortEntriesByStartDateDesc = (firstEntry: CareerEntry, secondEntry: CareerEntry) =>
  secondEntry.startDate.localeCompare(firstEntry.startDate) || normalizeEndDate(secondEntry.endDate).localeCompare(normalizeEndDate(firstEntry.endDate));

export function Timeline({ entries }: TimelineProps) {
  const allTypes = useMemo(() => Array.from(new Set(entries.map((entry) => entry.type))), [entries]);
  const [filters, setFilters] = useState<Filters>({ search: '', types: new Set(allTypes) });
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFilters((current) => ({ ...current, types: new Set(allTypes) }));
  }, [allTypes]);

  const filteredEntries = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return entries.filter((entry) => {
      const matchesType = filters.types.has(entry.type);
      const matchesSearch =
        !query ||
        entry.title.toLowerCase().includes(query) ||
        entry.organization.toLowerCase().includes(query) ||
        entry.location.toLowerCase().includes(query) ||
        entry.description.toLowerCase().includes(query);

      return matchesType && matchesSearch;
    });
  }, [entries, filters]);

  const groupedEntries = useMemo(() => {
    const groupedMap = new Map<string, CareerEntry[]>();

    for (const entry of filteredEntries) {
      const year = entry.startDate.slice(0, 4) || 'Unknown';
      const currentEntries = groupedMap.get(year) ?? [];
      currentEntries.push(entry);
      groupedMap.set(year, currentEntries);
    }

    return Array.from(groupedMap.entries())
      .map(([year, yearEntries]) => [year, [...yearEntries].sort(sortEntriesByStartDateDesc)] as [string, CareerEntry[]])
      .sort((firstYear, secondYear) => Number(secondYear[0]) - Number(firstYear[0]));
  }, [filteredEntries]);

  if (!entries.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className={cx(surfaceClasses.card, 'p-4 md:p-5')}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="w-full lg:max-w-sm">
              <label htmlFor="timeline-search" className="sr-only">
                Search career entries
              </label>
              <input
                id="timeline-search"
                type="search"
                placeholder="Search by role, organization, or location"
                value={filters.search}
                onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
                className={inputClassName}
                aria-label="Search career entries"
              />
            </div>

            <div className="surface-scroll -mx-1 flex flex-nowrap gap-2 overflow-x-auto px-1 pb-1 lg:flex-1">
              <button
                type="button"
                onClick={() => setFilters((current) => ({ ...current, types: new Set(allTypes) }))}
                className={cx(filters.types.size === allTypes.length ? 'tag-pill' : 'tag-pill-muted', 'shrink-0 transition-colors')}
              >
                all
              </button>
              {allTypes.map((type) => {
                const active = filters.types.has(type);

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setFilters((current) => {
                        const nextTypes = new Set(current.types);
                        if (nextTypes.has(type)) {
                          nextTypes.delete(type);
                        } else {
                          nextTypes.add(type);
                        }
                        return { ...current, types: nextTypes };
                      });
                    }}
                    aria-pressed={active}
                    className={cx(active ? 'tag-pill' : 'tag-pill-muted', 'shrink-0 transition-colors')}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dim" aria-live="polite">
            {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>
      </div>

      <div className="relative pl-9 sm:pl-11">
        <div
          className="absolute bottom-0 left-4 top-1 w-px"
          style={{ background: 'linear-gradient(180deg, rgba(var(--accent-rgb), 0.12), rgba(var(--accent-rgb), 0.5), rgba(var(--accent-rgb), 0.12))' }}
          aria-hidden="true"
        />

        <div className="space-y-10">
          {groupedEntries.map(([year, yearEntries]) => (
            <section key={year} aria-labelledby={`year-${year}`} className="space-y-4">
              <div className="flex items-center gap-3">
                <TagPill tone="muted" id={`year-${year}`} className="text-[0.7rem] tracking-[0.22em]">
                  {year}
                </TagPill>
                <div className="divider-line flex-1" />
              </div>

              <ol className="space-y-5">
                {yearEntries.map((entry) => {
                  const key = buildEntryKey(entry);
                  const isExpanded = expanded.has(key);

                  return (
                    <m.li
                      key={key}
                      variants={fadeInUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, margin: '-10% 0px' }}
                      className="relative pl-4"
                    >
                      <div
                        className="absolute top-8 h-3 w-3 rounded-full"
                        style={{ left: '-1.45rem', background: 'var(--accent)', boxShadow: '0 0 0 8px rgba(var(--bg-rgb), 0.9)' }}
                        aria-hidden="true"
                      />

                      <m.article className={cx(surfaceClasses.card, surfaceClasses.interactive, 'p-5 md:p-6 lg:p-7')}>
                        <div className="flex flex-wrap items-start gap-4">
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(var(--accent-rgb),0.16)] text-xl"
                            style={{ background: 'rgba(var(--accent-rgb), 0.08)' }}
                            aria-hidden="true"
                          >
                            {entry.icon}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="eyebrow">career note</p>
                              <TagPill className="ml-auto hidden md:inline-flex">{entry.type}</TagPill>
                            </div>
                            <h4 className="mt-3 max-w-[18ch] text-[1.85rem] leading-[1.03] text-ink md:text-[2rem]">{entry.title}</h4>
                            <p className="mt-2 text-base font-medium text-dim">{entry.organization}</p>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          <TagPill tone="muted">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            {entry.startDate} - {entry.endDate}
                          </TagPill>
                          <TagPill tone="muted">
                            <LocationIcon className="h-3.5 w-3.5" />
                            {entry.location}
                          </TagPill>
                          <TagPill className="md:hidden">{entry.type}</TagPill>
                        </div>

                        <div className="relative mt-5">
                          <p id={`desc-${key}`} className={cx('text-sm leading-7 text-dim md:text-base', !isExpanded && 'max-h-24 overflow-hidden')}>
                            {entry.description}
                          </p>
                          {!isExpanded ? (
                            <div
                              className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
                              style={{ background: 'linear-gradient(180deg, rgba(var(--surface-rgb), 0), rgba(var(--surface-rgb), 0.92))' }}
                              aria-hidden="true"
                            />
                          ) : null}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setExpanded((current) => {
                              const next = new Set(current);
                              if (next.has(key)) {
                                next.delete(key);
                              } else {
                                next.add(key);
                              }
                              return next;
                            });
                          }}
                          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${textLinkClassName}`}
                          aria-expanded={isExpanded}
                          aria-controls={`desc-${key}`}
                        >
                          {isExpanded ? 'show less' : 'show more'}
                          <span aria-hidden>{isExpanded ? '\u2191' : '\u2192'}</span>
                        </button>
                      </m.article>
                    </m.li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M6.75 3a.75.75 0 0 1 .75.75V5h9V3.75a.75.75 0 1 1 1.5 0V5h.75A2.25 2.25 0 0 1 21 7.25v11.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V7.25A2.25 2.25 0 0 1 5.25 5H6V3.75A.75.75 0 0 1 6.75 3Zm-1.5 7.5a.75.75 0 0 0-.75.75v7.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-.75-.75H5.25Z"
      clipRule="evenodd"
    />
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M11.54 22.351a.75.75 0 0 0 .92 0c4.392-3.598 6.79-7.011 6.79-10.102a7.25 7.25 0 1 0-14.5 0c0 3.091 2.398 6.504 6.79 10.102ZM12 9a2.25 2.25 0 1 0 0 4.5A2.25 2.25 0 0 0 12 9Z"
      clipRule="evenodd"
    />
  </svg>
);
