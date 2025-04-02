import './globals.css';
import { Inter } from 'next/font/google';
import NavMenu from '@/components/NavMenu';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ScrollToTop } from '@/components/ScrollToTop';
import { AnimationProvider } from '@/components/AnimationProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The Saish Project',
  description: 'Digital Learning Specialist & Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <AnimationProvider>
          <NavMenu />
          <ScrollProgress />
          {children}
          <ScrollToTop />
        </AnimationProvider>
      </body>
    </html>
  );
}
