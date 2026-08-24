'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { articles, TAGS } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/constants';
import { formatDate, truncate } from '@/lib/utils';
import { Clock, Tag, ArrowLeft } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function TagPage() {
  const params = useParams();
  const tagSlug = params.tag as string;
  const tag = TAGS.find((t) => t.slug === tagSlug);

  const matchedArticles = articles.filter((a) =>
    a.tags.some((t) => t.toLowerCase().replace(/\s+/g, '-') === tagSlug)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tags' }, { label: tag?.name || tagSlug }]} />

        <div className="flex items-center gap-3 mt-4 mb-8">
          <div className="p-2.5 rounded-xl bg-[#37215F] text-white"><Tag className="w-5 h-5" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white capitalize">{tag?.name || tagSlug}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{matchedArticles.length} articles tagged</p>
          </div>
        </div>

        {matchedArticles.length === 0 ? (
          <div className="text-center py-16">
            <Tag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No articles found for this tag</h3>
            <Link href="/" className="text-[#0881BE] hover:underline">Browse all articles</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {matchedArticles.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="group rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                <img src={article.featuredImage} alt="" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <span className="text-xs font-semibold" style={{ color: CATEGORIES.find(c => c.slug === article.category)?.color }}>{CATEGORIES.find(c => c.slug === article.category)?.label}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white mt-1 group-hover:text-[#37215F] dark:group-hover:text-purple-400 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{truncate(article.excerpt, 100)}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <span>{article.author.name}</span>
                    <span>·</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
