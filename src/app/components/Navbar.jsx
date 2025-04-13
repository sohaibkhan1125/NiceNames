'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-orange-500">
                ToolsHub
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
          <Link
              href="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-orange-500"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-orange-500"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-orange-500"
            >
              Contact
            </Link>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-orange-500"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-orange-500"
            >
              Terms
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
          <Link
              href="/"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-orange-500"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-orange-500"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-orange-500"
            >
              Contact
            </Link>
            <Link
              href="/privacy-policy"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-orange-500"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-orange-500"
            >
              Terms
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
