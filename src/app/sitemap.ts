import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

  const routes: MetadataRoute.Sitemap = ['', '/about'].map((route) => ({
    url: baseUrl ? `${baseUrl}${route}` : route || '/',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));

  return routes;
}
