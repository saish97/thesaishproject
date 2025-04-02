import dynamic from 'next/dynamic';
import { ProjectModalProps } from '@/components/ProjectModal';
import { TimelineProps } from '@/components/Timeline';
import { ProjectGridProps } from '@/components/ProjectGrid';

export const ProjectModal = dynamic<ProjectModalProps>(() => 
  import('@/components/ProjectModal').then(mod => ({ default: mod.ProjectModal })), {
  loading: () => null,
  ssr: false
});

export const Timeline = dynamic<TimelineProps>(() => 
  import('@/components/Timeline').then(mod => ({ default: mod.Timeline })), {
  loading: () => null
});

export const ProjectGrid = dynamic<ProjectGridProps>(() => 
  import('@/components/ProjectGrid').then(mod => ({ default: mod.ProjectGrid })), {
  loading: () => null
});