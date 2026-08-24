'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { startups } from '@/lib/mockData';
import { ArrowRight, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';

const StartupShowcase: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayStartups = startups.slice(0, 6);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Startup Showcase</h2>
        <div className="flex items-center gap-3">
          {/* Scroll Arrows - Mobile */}
          <div className="flex gap-1 lg:hidden">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <Link
            href="/startups"
            className="flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            View Directory
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
      >
        {displayStartups.map((startup) => (
          <Link
            key={startup.id}
            href={`/startups/${startup.id}`}
            className="flex-shrink-0 w-[260px] lg:w-auto group p-4 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            {/* Logo Placeholder */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-3">
              <Building2 className="w-6 h-6 text-white" />
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
              {startup.name}
            </h3>
            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">
              {startup.sector}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600 dark:text-green-400 font-semibold">
                {startup.funding}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                {startup.founder}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default StartupShowcase;
