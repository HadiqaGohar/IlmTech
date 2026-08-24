'use client';

import React from 'react';
import { episodes } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import { Play, Clock, Radio } from 'lucide-react';
import Button from '@/components/ui/Button';

const LiveStreamWidget: React.FC = () => {
  const liveEpisode = episodes.find((e) => e.isLive);
  const latestEpisode = liveEpisode || episodes[0];

  if (!latestEpisode) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      {/* Badge */}
      <div className="px-4 pt-4">
        {liveEpisode ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-900/30 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-xs font-semibold text-red-700 dark:text-red-400">LIVE</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1">
            <Radio className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-semibold text-purple-700 dark:text-purple-400">Latest Episode</span>
          </div>
        )}
      </div>

      {/* Video Embed Placeholder */}
      <div className="mx-4 mt-3 relative aspect-video bg-gray-900 rounded-lg overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-2">
          {latestEpisode.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {latestEpisode.description}
        </p>
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{latestEpisode.guest}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {latestEpisode.duration}
          </span>
        </div>
        <Button variant="primary" size="md" className="w-full">
          <Play className="w-4 h-4 mr-2" fill="currentColor" />
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default LiveStreamWidget;
