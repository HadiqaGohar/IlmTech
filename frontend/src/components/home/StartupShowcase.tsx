'use client';

import React from 'react';
import Link from 'next/link';
import { startups } from '@/lib/mockData';
import { ArrowRight, DollarSign, Users } from 'lucide-react';

const SECTOR_COLORS: Record<string, string> = {
  'Fintech': '#37215F',
  'HealthTech': '#0881BE',
  'EdTech': '#10B981',
  'E-Commerce': '#F59E0B',
  'Logistics': '#EF4444',
  'AgriTech': '#10B981',
  'SaaS': '#8B5CF6',
  'AI': '#3B82F6',
};

const STAGE_LABELS: Record<string, string> = {
  'seed': 'Seed',
  'pre-seed': 'Pre-Seed',
  'series-a': 'Series A',
  'series-b': 'Series B',
  'series-c': 'Series C',
  'growth': 'Growth',
};

const StartupShowcase: React.FC = () => {
  const displayStartups = startups.slice(0, 6);

  const getSectorColor = (sector: string) => SECTOR_COLORS[sector] || '#37215F';

  return (
    <section>
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Startup Showcase</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">Discover Pakistan&apos;s thriving startup ecosystem</p>
        </div>
        <Link
          href="/startup-directory"
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#37215F] dark:text-purple-400 hover:text-[#0881BE] dark:hover:text-blue-400 transition-colors"
        >
          View Directory
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {displayStartups.map((startup) => (
          <div
            key={startup.id}
            className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-800 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg flex-shrink-0">
                {startup.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base group-hover:text-[#37215F] dark:group-hover:text-purple-400 transition-colors">
                  {startup.name}
                </h3>
                <span
                  className="inline-flex items-center rounded-full px-2 py-px mt-1 text-[10px] sm:text-xs font-semibold text-white"
                  style={{ backgroundColor: getSectorColor(startup.sector) }}
                >
                  {startup.sector}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
              {startup.description}
            </p>

            {/* Funding round timeline */}
            {startup.fundingRounds && startup.fundingRounds.length > 0 && (
              <div className="mb-3 sm:mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#37215F] to-[#0881BE] rounded-full" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {startup.fundingRounds.map((round, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    >
                      <span className="font-bold text-[#37215F] dark:text-purple-400">
                        {STAGE_LABELS[round.round] || round.round}
                      </span>
                      <span className="text-gray-400">·</span>
                      <span>{round.amount}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 sm:gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                <span className="font-semibold text-gray-900 dark:text-white">{startup.funding}</span>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{startup.employees}+</span>
              </div>
              <span
                className="ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                style={{ backgroundColor: getSectorColor(startup.sector) }}
              >
                {startup.fundingStage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StartupShowcase;
