import React from 'react';
import { articles } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import { TrendingUp, Mail, ArrowRight } from 'lucide-react';

const SidebarWidgets: React.FC = () => {
  const trendingArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Trending */}
      <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#37215F] dark:text-purple-400" />
          <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">Trending Now</h3>
        </div>
        <div className="space-y-2.5">
          {trendingArticles.map((article, index) => (
            <a
              key={article.id}
              href={`/article/${article.slug}`}
              className="flex gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#37215F] dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-0.5 sm:mt-1 block">
                  {formatDate(article.publishedAt)}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#0881BE]" />
          <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">Stay Updated</h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
          Get the latest tech news delivered to your inbox.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0881BE] focus:border-transparent min-w-0"
          />
          <button className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#37215F] hover:bg-[#2a1a4a] dark:bg-purple-600 dark:hover:bg-purple-700 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1 shadow-md hover:shadow-lg flex-shrink-0">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ad */}
      <div className="rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 h-[200px] sm:h-[250px] flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm font-medium">Advertisement</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarWidgets;
