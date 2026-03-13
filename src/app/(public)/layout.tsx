import type { ReactNode } from 'react';
import { AnimationProvider, BackgroundPattern, NavMenu, ScrollProgress, ScrollToTop } from '@/components';

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AnimationProvider>
      <BackgroundPattern />
      <NavMenu />
      <ScrollProgress />
      {children}
      <ScrollToTop />
    </AnimationProvider>
  );
}
