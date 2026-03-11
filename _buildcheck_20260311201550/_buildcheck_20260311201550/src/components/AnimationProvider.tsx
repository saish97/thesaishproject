'use client';

import { LazyMotion } from 'framer-motion';
import { PropsWithChildren } from 'react';

// Pass the import promise directly instead of a function
const loadFeatures = () => import('@/utils/animationFeatures').then(res => res.default);

export function AnimationProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}