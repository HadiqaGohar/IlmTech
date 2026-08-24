import React from 'react';
import Link from 'next/link';
import { articles } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/constants';
import { formatDate, truncate } from '@/lib/utils';
import { Clock, ArrowRight } from 'lucide-react';

const NewsGrid: React.FC = () => {
  const latestArticles = articles.slice(0, 6);

  const getCategoryColor = (slug: string) => {
    return CATEGORIES.find((c) => c.slug === slug)?.color || '#8B5CF6';
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest News</h2>
        <Link
          href="/news"
          className="flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestArticles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.category}/${article.slug}`}
            className="group rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image Placeholder */}
            <div className="relative aspect-[16/10] bg-gradient-to-br from-purple-500 to-blue-500 overflow-hidden">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute top-3 left-3">
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: getCategoryColor(article.category) }}
                >
                  {CATEGORIES.find((c) => c.slug === article.category)?.label}
                </span>
              </div>
              {article.isBreaking && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white animate-pulse">
                    Breaking
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                {truncate(article.excerpt, 120)}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <span>{article.author.name}</span>
                <div className="flex items-center gap-2">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}m
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;
