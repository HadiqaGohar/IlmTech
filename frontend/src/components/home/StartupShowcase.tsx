'use client';

import React from 'react';
import Link from 'next/link';
import { startups } from '@/lib/mockData';
import { ArrowRight, DollarSign, Users } from 'lucide-react';

const StartupShowcase: React.FC = () => {
  const displayStartups = startups.slice(0, 6);

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Startup Showcase</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Discover Pakistan&apos;s thriving startup ecosystem</p>
        </div>
        <Link
          href="/startup-directory"
          className="flex items-center gap-1.5 text-sm font-semibold text-[#37215F] dark:text-purple-400 hover:text-[#0881BE] dark:hover:text-blue-400 transition-colors"
        >
          View Directory
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayStartups.map((startup) => (
          <div
            key={startup.id}
            className="group p-5 rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center text-white text-lg font-bold shadow-lg">
                {startup.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-[#37215F] dark:group-hover:text-purple-400 transition-colors">
                  {startup.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{startup.sector}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
              {startup.description}
            </p>
            <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1.5 text-sm">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-gray-900 dark:text-white">{startup.funding}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>{startup.employees}+</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StartupShowcase;
