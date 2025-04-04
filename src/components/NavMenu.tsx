'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80; // Height of the fixed header plus some padding
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        setIsOpen(false);
      }
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors">
              the.saish.project
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/about" 
              className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors"
            >
              about.
            </Link>
            <a 
              href="#projects" 
              onClick={handleNavClick}
              className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors"
            >
              projects.
            </a>
            <a 
              href="#career" 
              onClick={handleNavClick}
              className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors"
            >
              career.
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-2 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className={`w-6 h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-6 h-0.5 bg-current my-1 ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={`
              md:hidden fixed inset-0 top-16 bg-white/95 dark:bg-gray-700/95 backdrop-blur-sm
              transition3d duration-300 ease-in-out transform 
              ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div className="flex flex-col items-center pt-8 space-y-4">
              <Link 
                href="/about" 
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors"
              >
                about.
              </Link>
              <a 
                href="#projects" 
                onClick={handleNavClick}
                className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors"
              >
                projects.
              </a>
              <a 
                href="#career" 
                onClick={handleNavClick}
                className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors"
              >
                career.
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
