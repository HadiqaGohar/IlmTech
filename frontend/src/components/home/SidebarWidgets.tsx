import React from 'react';
import { articles } from '@/lib/mockData';
import { TrendingUp, Mail, Eye } from 'lucide-react';
import Card from '@/components/ui/Card';
import AdBanner from './AdBanner';

const TrendingWidget: React.FC = () => {
  const trendingArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h3 className="font-bold text-gray-900 dark:text-white">Trending Now</h3>
      </div>
      <ol className="space-y-3">
        {trendingArticles.map((article, index) => (
          <li key={article.id} className="flex gap-3 group">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-400">
              {index + 1}
            </span>
            <div className="min-w-0">
              <a
                href={`/news/${article.category}/${article.slug}`}
                className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2"
              >
                {article.title}
              </a>
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <Eye className="w-3 h-3" />
                {article.views.toLocaleString()} views
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
};

const NewsletterWidget: React.FC = () => {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-bold text-gray-900 dark:text-white">Stay Updated</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Get the latest tech news delivered to your inbox.
      </p>
      <form className="space-y-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </Card>
  );
};

const SidebarWidgets: React.FC = () => {
  return (
    <div className="space-y-6">
      <TrendingWidget />
      <NewsletterWidget />
      <AdBanner size="sidebar" />
    </div>
  );
};

export default SidebarWidgets;
