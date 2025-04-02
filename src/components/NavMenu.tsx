'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-teal-400">
              the.saish.project
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
          <Link href="/about" className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors">
          about
            </Link>
            <Link href="#projects" className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors">
              projects
            </Link>
            <Link href="#career" className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors">
              resume
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="hamburger text-gray-900 dark:text-gray-100"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className={`w-6 h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-6 h-0.5 bg-current my-1 ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden fixed inset-0 top-16 bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col items-center pt-8 space-y-4">
              <Link href="/about" onClick={toggleMenu} className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors">
                about
              </Link>
              <Link href="#projects" onClick={toggleMenu} className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors">
                projects
              </Link>
              <Link href="#career" onClick={toggleMenu} className="px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-teal-400 transition-colors">
                resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
