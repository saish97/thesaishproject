import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const surfaceClasses = {
  panel: 'surface-panel',
  card: 'surface-card',
  interactive: 'surface-interactive',
};

export const actionClasses = {
  primary: 'btn-base btn-primary',
  secondary: 'btn-base btn-secondary',
};

export const inputClassName = 'field-input';
export const iconButtonClassName = 'icon-button';
export const eyebrowClassName = 'eyebrow';
export const textLinkClassName = 'text-link';

interface PageShellProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
}

export function PageShell({
  children,
  className,
  contentClassName,
  id = 'main-content',
}: PageShellProps) {
  return (
    <main id={id} className={cx('relative min-h-screen overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8', className)}>
      <div className={cx('relative mx-auto max-w-7xl', contentClassName)}>{children}</div>
    </main>
  );
}

type HeadingTag = 'h1' | 'h2' | 'h3';

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  titleAs?: HeadingTag;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actions?: ReactNode;
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = 'left',
  titleAs = 'h2',
  className,
  titleClassName,
  descriptionClassName,
  actions,
}: SectionIntroProps) {
  const TitleTag = titleAs;

  return (
    <div className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <p className={cx(eyebrowClassName, align === 'center' && 'justify-center')}>{eyebrow}</p> : null}
      <TitleTag className={cx('mt-5 text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl', titleClassName)}>{title}</TitleTag>
      {description ? <p className={cx('mt-5 max-w-2xl text-base leading-8 text-dim sm:text-lg', descriptionClassName)}>{description}</p> : null}
      {actions ? <div className={cx('mt-8 flex flex-wrap gap-3', align === 'center' && 'justify-center')}>{actions}</div> : null}
    </div>
  );
}

type SurfaceCardTag = 'div' | 'section' | 'article' | 'aside';

interface SurfaceCardProps extends HTMLAttributes<HTMLElement> {
  as?: SurfaceCardTag;
  tone?: 'panel' | 'card';
  interactive?: boolean;
}

export function SurfaceCard({
  as = 'div',
  tone = 'card',
  interactive = false,
  className,
  children,
  ...props
}: SurfaceCardProps) {
  const Component = as;

  return (
    <Component
      className={cx(
        tone === 'panel' ? surfaceClasses.panel : surfaceClasses.card,
        interactive && surfaceClasses.interactive,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

interface TagPillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'accent' | 'muted';
}

export function TagPill({ tone = 'accent', className, children, ...props }: TagPillProps) {
  return (
    <span className={cx(tone === 'accent' ? 'tag-pill' : 'tag-pill-muted', className)} {...props}>
      {children}
    </span>
  );
}

interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

export function PrimaryAction({ className, children, ...props }: ActionLinkProps) {
  return (
    <a className={cx(actionClasses.primary, className)} {...props}>
      {children}
    </a>
  );
}

export function SecondaryAction({ className, children, ...props }: ActionLinkProps) {
  return (
    <a className={cx(actionClasses.secondary, className)} {...props}>
      {children}
    </a>
  );
}
