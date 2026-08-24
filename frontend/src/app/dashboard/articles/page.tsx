'use client';

import React, { useState } from 'react';
import { Search, Plus, Trash2, Upload } from 'lucide-react';
import ArticleTable from '@/components/dashboard/ArticleTable';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { articles } from '@/lib/mockData';

const ArticlesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'it-news', label: 'IT News' },
    { value: 'startups', label: 'Startups' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'ai-cloud', label: 'AI & Cloud' },
    { value: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Articles</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all published and draft articles
          </p>
        </div>
        <Button variant="primary" size="md">
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>

      <Card padding="sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search articles..."
              icon={<Search className="h-4 w-4" />}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="purple">{selectedIds.length} selected</Badge>
              <Button variant="ghost" size="sm">
                <Trash2 className="mr-1 h-4 w-4" />
                Delete
              </Button>
              <Button variant="ghost" size="sm">
                <Upload className="mr-1 h-4 w-4" />
                Publish
              </Button>
            </div>
          )}
        </div>
      </Card>

      <ArticleTable articles={paginated} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              {page}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
