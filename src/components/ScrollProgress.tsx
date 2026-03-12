'use client';

import { m, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-[0%]"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, rgba(var(--accent-rgb), 0.4), var(--accent), rgba(var(--accent-rgb), 0.5))',
      }}
    />
  );
}
