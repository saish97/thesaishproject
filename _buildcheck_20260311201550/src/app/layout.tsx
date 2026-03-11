import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { Analytics } from "@vercel/analytics/react";
import { NavMenu, ScrollProgress, ScrollToTop, AnimationProvider } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Saish Project',
  description: 'Digital Learning Specialist & Developer',
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'The Saish Project',
    siteName: 'The Saish Project',
    description: 'Digital Learning Specialist & Developer',
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
    description: 'Digital Learning Specialist & Developer',
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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* Skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-teal-600 focus:text-white focus:px-3 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <AnimationProvider>
          <NavMenu />
          <ScrollProgress />
          {children}
          <Analytics />
          <ScrollToTop />
        </AnimationProvider>
      </body>
    </html>
  );
}
