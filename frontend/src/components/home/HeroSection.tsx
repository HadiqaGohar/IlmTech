'use client';

import React from 'react';
import Link from 'next/link';
import { articles } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/constants';
import { formatDate, truncate } from '@/lib/utils';
import { Clock, ArrowRight, TrendingUp } from 'lucide-react';

const HeroSection: React.FC = () => {
  const featuredArticle = articles.find((a) => a.isFeatured);
  const sideArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);

  const getCategoryColor = (slug: string) => {
    return CATEGORIES.find((c) => c.slug === slug)?.color || '#8B5CF6';
  };

  if (!featuredArticle) return null;

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
        {/* Featured Article - 60% */}
        <Link
          href={`/article/${featuredArticle.slug}`}
          className="lg:col-span-3 group block"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#37215F] to-[#0881BE] aspect-[16/10] shadow-lg hover:shadow-xl transition-shadow">
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute top-4 left-4 z-10">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-md"
                style={{ backgroundColor: getCategoryColor(featuredArticle.category) }}
              >
                <TrendingUp className="w-3 h-3" />
                {CATEGORIES.find((c) => c.slug === featuredArticle.category)?.label}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                {featuredArticle.title}
              </h1>
              <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-3 hidden sm:block line-clamp-2">
                {truncate(featuredArticle.excerpt, 160)}
              </p>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-300 text-xs sm:text-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                  {featuredArticle.author.name.charAt(0)}
                </div>
                <span className="font-medium">{featuredArticle.author.name}</span>
                <span className="text-gray-500">·</span>
                <span>{formatDate(featuredArticle.publishedAt)}</span>
                <span className="text-gray-500 hidden sm:inline">·</span>
                <span className="hidden sm:flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredArticle.readTime} min
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Side Articles - 40% */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {sideArticles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-200"
            >
              <div className="w-24 sm:w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center shadow-inner">
                <span className="text-white text-[10px] sm:text-xs font-semibold text-center px-1.5 sm:px-2 opacity-90">
                  {CATEGORIES.find((c) => c.slug === article.category)?.label}
                </span>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm group-hover:text-[#37215F] dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 hidden sm:block">
                    {truncate(article.excerpt, 80)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {article.readTime}m
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <Link
            href="/it-news"
            className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-[#37215F] dark:text-purple-400 hover:text-[#0881BE] dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            View All News
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
