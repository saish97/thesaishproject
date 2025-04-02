'use client';

import { m, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  offset?: number;
}

export function ParallaxSection({ 
  children, 
  className = '', 
  offset = 50 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset], {
    clamp: false
  });

  return (
    <m.div
      ref={ref}
      style={{ 
        y,
        willChange: 'transform'
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}