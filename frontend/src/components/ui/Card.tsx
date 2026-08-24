'use client';

import React from 'react';

type CardPadding = 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: CardPadding;
}

const paddingStyles: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card: React.FC<CardProps> = ({ children, className = '', hover = false, padding = 'md' }) => {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 ${paddingStyles[padding]} ${hover ? 'hover:shadow-lg transition-shadow' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
