'use client';

import React from 'react';
import Link from 'next/link';
import { episodes } from '@/lib/mockData';
import { Play, Radio, Clock, Users, ArrowRight } from 'lucide-react';

const LiveStreamWidget: React.FC = () => {
  const liveEpisode = episodes.find((e) => e.isLive);
  const latestEpisode = liveEpisode || episodes[0];

  if (!latestEpisode) return null;

  return (
    <section>
      <div className="flex items-center gap-2 mb-5 sm:mb-6">
        {latestEpisode.isLive ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] sm:text-xs font-bold text-white animate-pulse">
            <Radio className="w-3 h-3" />
            LIVE NOW
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0881BE] px-3 py-1 text-[10px] sm:text-xs font-bold text-white">
            <Play className="w-3 h-3" />
            LATEST EPISODE
          </span>
        )}
        <Link
          href="/live-shows"
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#37215F] dark:text-purple-400 hover:text-[#0881BE] dark:hover:text-blue-400 transition-colors ml-auto"
        >
          All Episodes
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>

      <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {/* Video */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-0 bg-[#37215F]/20" />
          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#37215F] dark:text-purple-400 ml-0.5 sm:ml-1" />
          </div>
          {latestEpisode.isLive && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-white animate-pulse shadow-lg">
                <Radio className="w-3 h-3" />
                LIVE
              </span>
            </div>
          )}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-white backdrop-blur-sm">
              <Clock className="w-3 h-3" />
              {latestEpisode.duration}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 sm:p-5">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base lg:text-lg mb-2 leading-snug">
            {latestEpisode.title}
          </h3>
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {latestEpisode.guest && (
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {latestEpisode.guest}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {latestEpisode.duration}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamWidget;
