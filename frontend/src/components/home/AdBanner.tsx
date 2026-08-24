import React from 'react';

interface AdBannerProps {
  size?: 'banner' | 'leaderboard' | 'sidebar';
}

const AdBanner: React.FC<AdBannerProps> = ({ size = 'leaderboard' }) => {
  const heightClass = {
    banner: 'h-[250px]',
    leaderboard: 'h-[90px]',
    sidebar: 'h-[250px]',
  }[size];

  return (
    <div className={`w-full ${heightClass} rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center overflow-hidden`}>
      <span className="text-gray-400 dark:text-gray-500 text-sm font-medium tracking-wide uppercase">
        Advertisement
      </span>
    </div>
  );
};

export default AdBanner;
