'use client';

import React from 'react';
import Link from 'next/link';
import { episodes } from '@/lib/mockData';
import { Play, Radio, Clock, Users } from 'lucide-react';

const LiveStreamWidget: React.FC = () => {
  const liveEpisode = episodes.find((e) => e.isLive);
  const latestEpisode = liveEpisode || episodes[0];

  if (!latestEpisode) return null;

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        {latestEpisode.isLive ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white animate-pulse">
            <Radio className="w-3 h-3" />
            LIVE NOW
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0881BE] px-3 py-1 text-xs font-bold text-white">
            <Play className="w-3 h-3" />
            LATEST EPISODE
          </span>
        )}
        <Link
          href="/live-shows"
          className="text-sm font-semibold text-[#37215F] dark:text-purple-400 hover:text-[#0881BE] dark:hover:text-blue-400 transition-colors ml-auto"
        >
          View All Episodes →
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        {/* Video Placeholder */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-0 bg-[#37215F]/20" />
          <div className="relative z-10 w-20 h-20 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <Play className="w-10 h-10 text-[#37215F] dark:text-purple-400 ml-1" />
          </div>
          {latestEpisode.isLive && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white animate-pulse shadow-lg">
                <Radio className="w-3 h-3" />
                LIVE
              </span>
            </div>
          )}
          <div className="absolute bottom-4 right-4 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <Clock className="w-3 h-3" />
              {latestEpisode.duration}
            </span>
          </div>
        </div>

        {/* Episode Info */}
        <div className="p-5">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-[#37215F] dark:group-hover:text-purple-400 transition-colors">
            {latestEpisode.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {latestEpisode.guest && (
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {latestEpisode.guest}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {latestEpisode.duration}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamWidget;
