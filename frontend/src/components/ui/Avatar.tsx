'use client';

import React, { useState } from 'react';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallback?: string;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

const fallbackColors = [
  'bg-purple-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-indigo-500',
  'bg-pink-500',
];

function getFallbackColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return fallbackColors[Math.abs(hash) % fallbackColors.length];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = '', size = 'md', fallback = '', className = '' }) => {
  const [imgError, setImgError] = useState(false);

  const showFallback = !src || imgError;

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full dark:border-gray-600 ${sizeStyles[size]} ${className}`}
    >
      {showFallback ? (
        <span
          className={`flex h-full w-full items-center justify-center rounded-full text-white font-medium ${getFallbackColor(fallback)}`}
        >
          {getInitials(fallback || '?')}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          className="h-full w-full rounded-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
};

export default Avatar;
