import styles from './Timeline.module.css';

export function TimelineSkeleton() {
  return (
    <div 
      className={styles.timeline}
      role="progressbar"
      aria-label="Loading career timeline"
      aria-busy="true"
    >
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className={`${styles.entry} ${index % 2 === 0 ? styles.left : styles.right}`}
        >
          <div 
            className={`${styles.icon} animate-pulse bg-gray-200 dark:bg-gray-700`}
            style={{ animationDelay: `${index * 0.1}s` }}
            aria-hidden="true"
          />
          <div className={`${styles.content} animate-pulse bg-white dark:bg-gray-800`}>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" 
                style={{ animationDelay: `${index * 0.2}s` }} 
              />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"
                style={{ animationDelay: `${index * 0.3}s` }} 
              />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                </div>
              </div>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"
                style={{ animationDelay: `${index * 0.4}s` }} 
              />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"
                style={{ animationDelay: `${index * 0.5}s` }} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}