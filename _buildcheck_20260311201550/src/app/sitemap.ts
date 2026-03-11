import type { MetadataRoute } from 'next';
import { thoughtPosts } from '@/data/thoughts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

  const staticRoutes: MetadataRoute.Sitemap = ['', '/about', '/thoughts'].map((route) => ({
    url: baseUrl ? `${baseUrl}${route}` : route || '/',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : route === '/thoughts' ? 0.8 : 0.7,
  }));

  const thoughtRoutes: MetadataRoute.Sitemap = thoughtPosts.map((post) => ({
    url: baseUrl ? `${baseUrl}/thoughts/${post.slug}` : `/thoughts/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...thoughtRoutes];
}
