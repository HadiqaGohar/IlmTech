'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { articles, startups, episodes, TAGS } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/constants';
import { formatDate, truncate } from '@/lib/utils';
import { Search as SearchIcon, Clock, Filter, X, Tag } from 'lucide-react';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'articles' | 'startups' | 'episodes'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const results = useMemo(() => {
    if (!query.trim()) return { articles: [], startups: [], episodes: [] };

    const q = query.toLowerCase();

    const matchedArticles = articles.filter((a) => {
      const matchesQuery = a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });

    const matchedStartups = startups.filter((s) => {
      return s.name.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.tags.some((t) => t.toLowerCase().includes(q));
    });

    const matchedEpisodes = episodes.filter((e) => {
      return e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.guest.toLowerCase().includes(q);
    });

    return { articles: matchedArticles, startups: matchedStartups, episodes: matchedEpisodes };
  }, [query, selectedCategory]);

  const totalResults = results.articles.length + results.startups.length + results.episodes.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Search IlmTech</h1>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, startups, episodes..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-[#0881BE] focus:border-transparent shadow-sm"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Filter className="w-4 h-4" />
            <span>Filter:</span>
          </div>
          {(['all', 'articles', 'startups', 'episodes'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeFilter === f ? 'bg-[#37215F] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        {query.trim() ? (
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Found <span className="font-semibold text-gray-900 dark:text-white">{totalResults}</span> results for &quot;{query}&quot;
            </p>

            {/* Articles */}
            {(activeFilter === 'all' || activeFilter === 'articles') && results.articles.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Articles</h2>
                <div className="space-y-4">
                  {results.articles.map((article) => (
                    <Link key={article.id} href={`/article/${article.slug}`} className="block p-4 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <img src={article.featuredImage} alt="" className="w-24 h-20 rounded-lg object-cover flex-shrink-0" />
                        <div>
                          <span className="text-xs font-semibold text-[#0881BE]">{CATEGORIES.find(c => c.slug === article.category)?.label}</span>
                          <h3 className="font-semibold text-gray-900 dark:text-white mt-1 hover:text-[#37215F] dark:hover:text-purple-400">{article.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{truncate(article.excerpt, 120)}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                            <span>{article.author.name}</span>
                            <span>·</span>
                            <span>{formatDate(article.publishedAt)}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}m</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Startups */}
            {(activeFilter === 'all' || activeFilter === 'startups') && results.startups.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Startups</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.startups.map((startup) => (
                    <Link key={startup.id} href="/startup-directory" className="p-4 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow flex items-center gap-3">
                      <img src={startup.logo} alt="" className="w-12 h-12 rounded-lg" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{startup.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{startup.sector} · {startup.city}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Episodes */}
            {(activeFilter === 'all' || activeFilter === 'episodes') && results.episodes.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Episodes</h2>
                <div className="space-y-4">
                  {results.episodes.map((ep) => (
                    <Link key={ep.id} href={`/episode/${ep.slug}`} className="block p-4 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{ep.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Guest: {ep.guest} · {ep.duration}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {totalResults === 0 && (
              <div className="text-center py-16">
                <SearchIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try different keywords or browse our categories</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Popular Tags */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {TAGS.slice(0, 15).map((tag) => (
                <button
                  key={tag.slug}
                  onClick={() => setQuery(tag.name)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:border-[#0881BE] hover:text-[#0881BE] transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag.name}
                  <span className="text-xs text-gray-400">({tag.count})</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#37215F] border-t-transparent rounded-full" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
