'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Sun, Moon, ChevronDown, Globe } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import MobileNav from './MobileNav';

const Header: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-xl font-bold text-[#37215F] dark:text-purple-400">
                IlmTech
              </span>
              <span className="text-[10px] font-semibold bg-[#0881BE] text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
                News
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.href} className="relative group">
                  {item.children ? (
                    <>
                      <Link
                        href={item.href}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#37215F] dark:hover:text-purple-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        {item.label}
                        <ChevronDown className="w-3.5 h-3.5" />
                      </Link>
                      <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[180px]">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#37215F] dark:hover:text-purple-400 transition-colors"
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
                      className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#37215F] dark:hover:text-purple-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/search"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-[#37215F] dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Link>

              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-[#37215F] dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-[#37215F] dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1"
                  aria-label="Change language"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-xs font-medium hidden sm:inline">EN</span>
                </button>
                {showLangMenu && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    {[
                      { code: 'EN', label: 'English', flag: '🇬🇧' },
                      { code: 'UR', label: 'اردو', flag: '🇵🇰' },
                      { code: 'HI', label: 'हिन्दी', flag: '🇮🇳' },
                      { code: 'ES', label: 'Español', flag: '🇪🇸' },
                      { code: 'ZH', label: '中文', flag: '🇨🇳' },
                    ].map((lang) => (
                      <button key={lang.code} onClick={() => setShowLangMenu(false)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                        <span className="text-[10px] text-gray-400 ml-auto">{lang.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/login"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#37215F] hover:bg-[#2a1a4a] dark:bg-purple-600 dark:hover:bg-purple-700 rounded-lg transition-colors"
              >
                Login
              </Link>

              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-[#37215F] dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" />

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
};

export default Header;
