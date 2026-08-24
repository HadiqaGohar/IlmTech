import React from 'react';
import Link from 'next/link';
import { articles } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/constants';
import { formatDate, truncate } from '@/lib/utils';
import { Clock, ArrowRight, Eye } from 'lucide-react';

const NewsGrid: React.FC = () => {
  const latestArticles = articles.filter((a) => !a.isFeatured).slice(0, 6);

  const getCategoryColor = (slug: string) => {
    return CATEGORIES.find((c) => c.slug === slug)?.color || '#8B5CF6';
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Latest News</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">Stay updated with the latest in tech</p>
        </div>
        <Link
          href="/it-news"
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#37215F] dark:text-purple-400 hover:text-[#0881BE] dark:hover:text-blue-400 transition-colors"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {latestArticles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="group rounded-xl sm:rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] bg-gradient-to-br from-[#37215F] to-[#0881BE] overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              <div className="absolute top-3 left-3 z-10">
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-white shadow-md"
                  style={{ backgroundColor: getCategoryColor(article.category) }}
                >
                  {CATEGORIES.find((c) => c.slug === article.category)?.label}
                </span>
              </div>
              {article.isBreaking && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-white shadow-md animate-pulse">
                    Breaking
                  </span>
                </div>
              )}
              <div className="absolute bottom-3 right-3 z-10">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-white backdrop-blur-sm">
                  <Clock className="w-3 h-3" />
                  {article.readTime} min
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base lg:text-lg group-hover:text-[#37215F] dark:group-hover:text-purple-400 transition-colors line-clamp-2 mb-2 leading-snug">
                {article.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
                {truncate(article.excerpt, 140)}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                    {article.author.name.charAt(0)}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{article.author.name}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span className="flex items-center gap-0.5">
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {article.views.toLocaleString()}
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
