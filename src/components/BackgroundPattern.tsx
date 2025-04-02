'use client';

import { LazyMotion, m, useScroll, useTransform, domAnimation } from 'framer-motion';
import { useRef } from 'react';
import { PatternVariant } from '@/types';

interface BackgroundPatternProps {
  className?: string;
  variant?: PatternVariant;
}

export function BackgroundPattern({ 
  className = '', 
  variant = 'dots' 
}: BackgroundPatternProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.2, 0.15]);

  const getPattern = () => {
    switch (variant) {
      case 'grid':
        return (
          <svg className="w-24 h-24 transform rotate-45" viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="M0 0h2v2H0zM8 8h2v2H8zM16 16h2v2h-2zM24 24h2v2h-2z"
            />
          </svg>
        );
      case 'waves':
        return (
          <svg className="w-48 h-48" viewBox="0 0 64 64">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              d="M0 32c8.89-8.89 17.78-8.89 26.67 0C35.55 40.89 44.44 40.89 53.33 32"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-12 h-12" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="1.5" fill="currentColor" />
          </svg>
        );
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        style={{ 
          y, 
          opacity,
          willChange: 'transform, opacity' 
        }}
        className={`fixed inset-0 pointer-events-none text-gray-900/10 dark:text-gray-100/10 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0">
          <div className="w-full h-full flex flex-wrap gap-8 transform rotate-12">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="flex-none">
                {getPattern()}
              </div>
            ))}
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
}