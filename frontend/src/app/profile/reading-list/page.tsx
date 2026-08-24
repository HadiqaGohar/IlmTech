'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { articles } from '@/lib/mockData';
import { formatDate, truncate } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import { Bookmark, Clock, Trash2, ArrowLeft } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function ReadingListPage() {
  const [savedIds, setSavedIds] = useState(articles.slice(0, 5).map((a) => a.id));
  const savedArticles = articles.filter((a) => savedIds.includes(a.id));

  const removeArticle = (id: string) => {
    setSavedIds((prev) => prev.filter((i) => i !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Reading List' }]} />
        <div className="flex items-center gap-3 mt-4 mb-8">
          <Bookmark className="w-6 h-6 text-[#37215F]" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Reading List</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#37215F] text-white">{savedArticles.length}</span>
        </div>

        {savedArticles.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No saved articles yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Save articles to read later</p>
            <Link href="/" className="px-4 py-2 bg-[#37215F] text-white rounded-lg hover:bg-[#2a1a4a] transition-colors text-sm font-medium">Browse Articles</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedArticles.map((article) => (
              <div key={article.id} className="flex gap-4 p-4 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
                <img src={article.featuredImage} alt="" className="w-28 h-20 rounded-lg object-cover flex-shrink-0 hidden sm:block" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold" style={{ color: CATEGORIES.find(c => c.slug === article.category)?.color }}>{CATEGORIES.find(c => c.slug === article.category)?.label}</span>
                  <Link href={`/article/${article.slug}`}><h3 className="font-semibold text-gray-900 dark:text-white text-sm mt-1 hover:text-[#37215F] dark:hover:text-purple-400">{article.title}</h3></Link>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                    <span>{article.author.name}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}m</span>
                  </div>
                </div>
                <button onClick={() => removeArticle(article.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0" title="Remove from reading list">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
