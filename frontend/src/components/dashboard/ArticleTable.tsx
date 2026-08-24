import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface ArticleTableProps {
  articles: Article[];
}

const statusConfig: Record<string, { variant: 'green' | 'yellow' | 'blue' | 'default'; label: string }> = {
  'it-news': { variant: 'blue', label: 'Published' },
  startups: { variant: 'green', label: 'Published' },
  cybersecurity: { variant: 'blue', label: 'Published' },
  'ai-cloud': { variant: 'green', label: 'Published' },
  reviews: { variant: 'yellow', label: 'Draft' },
};

const categoryLabels: Record<string, string> = {
  'it-news': 'IT News',
  startups: 'Startups',
  cybersecurity: 'Cybersecurity',
  'ai-cloud': 'AI & Cloud',
  reviews: 'Reviews',
};

const ArticleTable: React.FC<ArticleTableProps> = ({ articles }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
          <tr>
            <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Title
            </th>
            <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Category
            </th>
            <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Status
            </th>
            <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Author
            </th>
            <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Date
            </th>
            <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Views
            </th>
            <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
          {articles.map((article, index) => {
            const status = statusConfig[article.category] || {
              variant: 'default' as const,
              label: 'Published',
            };
            return (
              <tr
                key={article.id}
                className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/20'
                }`}
              >
                <td className="max-w-xs truncate px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {article.title}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                  {categoryLabels[article.category] || article.category}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={status.variant}>{status.label}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                  {article.author.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                  {formatDate(article.publishedAt)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                  {article.views.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      aria-label="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                      aria-label="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;
