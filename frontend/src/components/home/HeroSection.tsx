'use client';

import React from 'react';
import Link from 'next/link';
import { articles } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/constants';
import { formatDate, truncate } from '@/lib/utils';
import { Clock, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const featuredArticle = articles.find((a) => a.isFeatured);
  const sideArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);

  const getCategoryColor = (slug: string) => {
    return CATEGORIES.find((c) => c.slug === slug)?.color || '#8B5CF6';
  };

  if (!featuredArticle) return null;

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Featured Article - 60% */}
        <Link
          href={`/news/${featuredArticle.category}/${featuredArticle.slug}`}
          className="lg:col-span-3 group"
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 aspect-[16/10]">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute top-4 left-4">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white"
                style={{ backgroundColor: getCategoryColor(featuredArticle.category) }}
              >
                {CATEGORIES.find((c) => c.slug === featuredArticle.category)?.label}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {featuredArticle.title}
              </h1>
              <p className="text-gray-200 text-sm md:text-base mb-3 hidden sm:block">
                {truncate(featuredArticle.excerpt, 150)}
              </p>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <span>{featuredArticle.author.name}</span>
                <span>·</span>
                <span>{formatDate(featuredArticle.publishedAt)}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
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
              href={`/news/${article.category}/${article.slug}`}
              className="group flex gap-4 p-3 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-medium text-center px-2 opacity-80">
                  {CATEGORIES.find((c) => c.slug === article.category)?.label}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime} min
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <Link
            href="/news"
            className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
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
