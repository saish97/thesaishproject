'use client';
import { m, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { CareerEntry } from '@/types';
import { slideIn, springTransition } from '@/utils/animations';
import styles from './Timeline.module.css';

export interface TimelineProps {
  entries: CareerEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scaleX = useSpring(scrollYProgress, {
    ...springTransition,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted || !entries?.length) return null;

  return (
    <m.div 
      ref={ref} 
      className={styles.timeline}
      style={{ y }}
      role="region"
      aria-label="Career Timeline"
    >
      <m.div
        className="fixed left-0 right-0 h-1 bg-teal-500/30 bottom-0"
        style={{ scaleX, transformOrigin: "0%" }}
        aria-hidden="true"
      />
      {[...entries].reverse().map((entry, index) => (
        <m.div
          key={index}
          className={`${styles.entry} ${!isMobile && index % 2 === 0 ? styles.left : styles.right}`}
          variants={slideIn}
          custom={index % 2 === 0}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-20% 0px" }}
          role="article"
          aria-labelledby={`timeline-entry-${index}`}
        >
          <m.div 
            className={styles.icon}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
            aria-hidden="true"
          >
            {entry.icon}
          </m.div>
          <m.div 
            className={`${styles.content} dark:bg-gray-800`}
            whileHover={{ y: -5 }}
            transition={springTransition}
          >
            <h3 id={`timeline-entry-${index}`}>
              {entry.title}
              <span className="sr-only"> at {entry.organization}</span>
            </h3>
            <h4>{entry.organization}</h4>
            <div className={styles.meta}>
              <span>{entry.location}</span>
              <span>{entry.startDate} - {entry.endDate}</span>
            </div>
            <p className="text-gray-300 dark:text-gray-300">{entry.description}</p>
            <span 
              className={styles.type}
              role="note"
              aria-label={`Experience type: ${entry.type}`}
            >
              {entry.type}
            </span>
          </m.div>
        </m.div>
      ))}
    </m.div>
  );
}
