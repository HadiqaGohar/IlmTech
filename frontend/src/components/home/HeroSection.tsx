'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { articles } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/constants';
import { formatDate, truncate } from '@/lib/utils';
import { Clock, ArrowRight, Zap } from 'lucide-react';

const HeroSection: React.FC = () => {
  const featuredArticle = articles.find((a) => a.isFeatured);
  const sideArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);

  const getCategoryColor = (slug: string) => {
    return CATEGORIES.find((c) => c.slug === slug)?.color || '#8B5CF6';
  };

  const getCategoryLabel = (slug: string) => {
    return CATEGORIES.find((c) => c.slug === slug)?.label || slug;
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
          <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.01] aspect-[16/10]">
            <Image
              src={featuredArticle.featuredImage}
              alt={featuredArticle.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            {/* Hover brighten effect */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />

            {/* Category badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm"
                style={{ backgroundColor: getCategoryColor(featuredArticle.category) }}
              >
                {getCategoryLabel(featuredArticle.category)}
              </span>
              {featuredArticle.isBreaking && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg animate-pulse">
                  <Zap className="w-3 h-3" />
                  Breaking
                </span>
              )}
            </div>

            {/* Text content at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 z-10">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300 leading-tight tracking-tight">
                {featuredArticle.title}
              </h1>
              <p className="text-gray-200 text-sm sm:text-base mb-4 hidden sm:block line-clamp-2 leading-relaxed">
                {truncate(featuredArticle.excerpt, 180)}
              </p>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center text-white text-sm font-bold shadow-md ring-2 ring-white/20">
                  {featuredArticle.author.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-sm">{featuredArticle.author.name}</span>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{formatDate(featuredArticle.publishedAt)}</span>
                    <span className="text-gray-600">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredArticle.readTime} min read
                    </span>
                  </div>
                </div>
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
              className="group flex gap-4 p-4 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative w-28 sm:w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="128px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-md"
                    style={{ backgroundColor: getCategoryColor(article.category) }}
                  >
                    {getCategoryLabel(article.category)}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-[#37215F] dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-1 hidden sm:block">
                    {truncate(article.excerpt, 80)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center text-white text-[9px] font-bold">
                    {article.author.name.charAt(0)}
                  </div>
                  <span className="font-medium">{article.author.name}</span>
                  <span className="text-gray-600">·</span>
                  <span>{formatDate(article.publishedAt)}</span>
                  <span className="text-gray-600">·</span>
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
