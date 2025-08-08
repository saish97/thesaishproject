'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    // Check if localStorage is available
    const hasLocalStorage = typeof window !== 'undefined' && window.localStorage;
    
    if (hasLocalStorage) {
      // Check if theme is stored in localStorage
      const storedTheme = localStorage.getItem('theme');
      
      if (storedTheme) {
        setIsDarkMode(storedTheme === 'dark');
      } else {
        // If no stored theme, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    }
  }, []);

  // Update HTML class when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Enable/disable scroll when menu is opened/closed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const handleThemeToggle = () => {
    setIsDarkMode(prev => !prev);
  };

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

  // Handle keyboard navigation in menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors"
              aria-current="page"
              title="The Saish Project home"
            >
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
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu with Theme Toggle and Hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            <button 
              className="p-2 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <div className={`w-6 h-0.5 bg-current transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-6 h-0.5 bg-current my-1 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-current transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div 
            id="mobile-menu"
            className={`
              md:hidden fixed inset-0 top-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm
              transition-all duration-500 ease-in-out transform 
              ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
            `}
            aria-hidden={!isOpen}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col items-center pt-8 space-y-4 w-full px-6">
              <Link 
                href="/about" 
                onClick={() => setIsOpen(false)}
                className={`
                  w-full py-3 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 
                  text-center text-gray-900 dark:text-gray-100 
                  hover:bg-teal-50 dark:hover:bg-teal-900/30 
                  hover:text-teal-600 dark:hover:text-teal-400 
                  transition-all duration-300 ease-in-out
                  transform ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
                  delay-[100ms]
                `}
                tabIndex={isOpen ? 0 : -1}
                aria-label="About page"
              >
                about.
              </Link>
              <a 
                href="#projects" 
                onClick={handleNavClick}
                className={`
                  w-full py-3 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 
                  text-center text-gray-900 dark:text-gray-100 
                  hover:bg-teal-50 dark:hover:bg-teal-900/30 
                  hover:text-teal-600 dark:hover:text-teal-400 
                  transition-all duration-300 ease-in-out
                  transform ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
                  delay-[200ms]
                `}
                tabIndex={isOpen ? 0 : -1}
                aria-label="Projects section"
              >
                projects.
              </a>
              <a 
                href="#career" 
                onClick={handleNavClick}
                className={`
                  w-full py-3 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 
                  text-center text-gray-900 dark:text-gray-100 
                  hover:bg-teal-50 dark:hover:bg-teal-900/30 
                  hover:text-teal-600 dark:hover:text-teal-400 
                  transition-all duration-300 ease-in-out
                  transform ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
                  delay-[300ms]
                `}
                tabIndex={isOpen ? 0 : -1}
                aria-label="Career section"
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

function SunIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" 
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" 
      />
    </svg>
  );
}
