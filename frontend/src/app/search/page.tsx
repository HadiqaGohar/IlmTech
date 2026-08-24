'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, SlidersHorizontal, Clock, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { articles } from '@/lib/mockData';
import { formatDate, truncate } from '@/lib/utils';

const ITEMS_PER_PAGE = 6;
const categories = ['All', 'AI & Cloud', 'IT News', 'Cybersecurity', 'Startups', 'Reviews'];
const sortOptions = ['Newest', 'Oldest', 'Most Viewed'];

const categoryMap: Record<string, string> = {
  'All': 'all',
  'AI & Cloud': 'ai-cloud',
  'IT News': 'it-news',
  'Cybersecurity': 'cybersecurity',
  'Startups': 'startups',
  'Reviews': 'reviews',
};

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [page, setPage] = useState(1);

  const results = useMemo(() => {
    let filtered = articles;

    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== 'All') {
      filtered = filtered.filter((a) => a.category === categoryMap[category]);
    }

    if (sortBy === 'Newest') {
      filtered = [...filtered].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortBy === 'Oldest') {
      filtered = [...filtered].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else {
      filtered = [...filtered].sort((a, b) => b.views - a.views);
    }

    return filtered;
  }, [query, category, sortBy]);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const paginatedResults = results.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Breadcrumb items={[{ label: 'Search' }]} />
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search articles, topics, tags..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 text-lg focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-[#37215F] dark:text-purple-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(cat); setPage(1); }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        category === cat
                          ? 'bg-[#37215F] text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                <div className="space-y-1">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setPage(1); }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        sortBy === opt
                          ? 'bg-[#37215F] text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {results.length} result{results.length !== 1 ? 's' : ''} found
              {query && <> for &quot;<span className="font-medium text-gray-900 dark:text-white">{query}</span>&quot;</>}
            </p>

            {paginatedResults.length === 0 ? (
              <Card className="text-center py-16">
                <SearchIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No results found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search terms or filters.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedResults.map((article) => (
                  <Link key={article.id} href={`/article/${article.slug}`}>
                    <Card hover className="h-full">
                      <Badge variant="purple" size="sm">{article.category}</Badge>
                      <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-[#37215F] dark:hover:text-purple-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {truncate(article.excerpt, 120)}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar src={article.author.avatar} fallback={article.author.name} size="sm" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{article.author.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}m
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {(article.views / 1000).toFixed(1)}k
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">{formatDate(article.publishedAt)}</div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      page === p
                        ? 'bg-[#37215F] text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading search...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
