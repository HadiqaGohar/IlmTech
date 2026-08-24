'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#37215F] dark:text-purple-400">IlmTech</span>
            <span className="text-[9px] font-semibold bg-[#0881BE] text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
              News
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#37215F] dark:focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-2 py-2 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <div key={item.href} className="mb-1">
              {item.children ? (
                <>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex-1 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() => toggleExpanded(item.href)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      aria-label={`Expand ${item.label}`}
                    >
                      {expandedItems.includes(item.href) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      expandedItems.includes(item.href) ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="ml-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#37215F] dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer buttons */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <Link
            href="/login"
            onClick={onClose}
            className="block w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-[#37215F] hover:bg-[#2a1a4a] dark:bg-purple-600 dark:hover:bg-purple-700 rounded-lg transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            onClick={onClose}
            className="block w-full text-center px-4 py-2.5 text-sm font-medium text-[#37215F] dark:text-purple-400 border border-[#37215F] dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-400/10 rounded-lg transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
