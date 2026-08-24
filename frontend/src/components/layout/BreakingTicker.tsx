'use client';

import React from 'react';
import { articles } from '@/lib/mockData';

const BreakingTicker: React.FC = () => {
  const breakingArticles = articles.filter((a) => a.isBreaking);

  if (breakingArticles.length === 0) return null;

  const tickerText = breakingArticles.map((a) => a.title).join('  •  ');

  return (
    <div className="relative w-full overflow-hidden bg-[#37215F] dark:bg-[#2a1a4a] text-white" style={{ height: '40px' }}>
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-red-600 px-3 gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          Breaking
        </span>
      </div>

      <div className="ml-[110px] flex items-center h-full overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-sm font-medium hover:[animation-play-state:paused]">
          <span>{tickerText}</span>
          <span className="mx-8">•</span>
          <span>{tickerText}</span>
        </div>
      </div>
    </div>
  );
};

export default BreakingTicker;
