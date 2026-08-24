import React from 'react';

interface AdBannerProps {
  size: 'banner' | 'leaderboard' | 'sidebar';
}

const sizeConfig = {
  banner: { width: 'w-full', height: 'h-[250px]', maxWidth: 'max-w-[468px]' },
  leaderboard: { width: 'w-full', height: 'h-[90px]', maxWidth: 'max-w-[728px]' },
  sidebar: { width: 'w-full', height: 'h-[250px]', maxWidth: 'max-w-[300px]' },
};

const AdBanner: React.FC<AdBannerProps> = ({ size }) => {
  const config = sizeConfig[size];

  return (
    <div
      className={`${config.width} ${config.height} ${config.maxWidth} mx-auto rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2`}
    >
      <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
        Advertisement
      </span>
      <span className="text-[10px] text-gray-400 dark:text-gray-500">
        {size === 'banner' && '468 × 250'}
        {size === 'leaderboard' && '728 × 90'}
        {size === 'sidebar' && '300 × 250'}
      </span>
    </div>
  );
};

export default AdBanner;
