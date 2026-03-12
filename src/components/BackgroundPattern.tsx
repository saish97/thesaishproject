interface BackgroundPatternProps {
  className?: string;
}

export function BackgroundPattern({ className = '' }: BackgroundPatternProps) {
  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true" style={{ willChange: 'transform' }}>
      <div
        className="absolute left-[-14rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.18) 0%, transparent 72%)' }}
      />
      <div
        className="absolute right-[-8rem] top-[10rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.12) 0%, transparent 74%)' }}
      />
      <div
        className="absolute bottom-[-12rem] left-[12%] h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.08) 0%, transparent 76%)' }}
      />
    </div>
  );
}
