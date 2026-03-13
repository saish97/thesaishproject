import './globals.css';
import { IBM_Plex_Sans, Newsreader } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

const bodyFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const displayFont = Newsreader({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const resolvedSiteUrl = (() => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;

  if (!envUrl) {
    return 'http://localhost:3000';
  }

  return envUrl.startsWith('http://') || envUrl.startsWith('https://')
    ? envUrl
    : `https://${envUrl}`;
})();

export const metadata: Metadata = {
  title: 'The Saish Project',
  description: 'Digital Learning Specialist, AI Architect Lead, and developer.',
  metadataBase: new URL(resolvedSiteUrl),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'The Saish Project',
    siteName: 'The Saish Project',
    description: 'Digital Learning Specialist, AI Architect Lead, and developer.',
    images: [
      {
        url: '/images/biz-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'The Saish Project',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Saish Project',
    description: 'Digital Learning Specialist, AI Architect Lead, and developer.',
    images: ['/images/biz-logo.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3ede4' },
    { media: '(prefers-color-scheme: dark)', color: '#101816' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} scroll-smooth`}>
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
