import { motion } from 'framer-motion';
import { JSX, useEffect, useState } from 'react';
import styles from './Timeline.module.css';

interface CareerEntry {
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  icon: string;
  description: string;
  type: string;
}

export const Timeline = ({ entries }: { entries: CareerEntry[] }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={styles.timeline}>
      {[...entries].reverse().map((entry, index) => (
        <motion.div
          key={index}
          className={`${styles.entry} ${!isMobile && index % 2 === 0 ? styles.left : styles.right}`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.icon}>{entry.icon}</div>
          <div className={styles.content}>
            <h3>{entry.title}</h3>
            <h4>{entry.organization}</h4>
            <div className={styles.meta}>
              <span>{entry.location}</span>
              <span>{entry.startDate} - {entry.endDate}</span>
            </div>
            <p>{entry.description}</p>
            <span className={styles.type}>{entry.type}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
