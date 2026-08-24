'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Newspaper, TrendingUp, Mail, ArrowRight, Clock, Eye, User, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { articles } from '@/lib/mockData';
import { formatDate, truncate } from '@/lib/utils';

const FILTER_TABS = ['All', 'Industry', 'Enterprise', 'Pakistan Tech'];

export default function ITNewsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredArticles = articles.filter((a) => a.category === 'it-news');
  const trendingArticles = [...filteredArticles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#37215F] to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Breadcrumb items={[{ label: 'IT News' }]} />
          <div className="mt-6 flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Newspaper className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">IT News</h1>
              <p className="mt-2 text-purple-200 max-w-2xl">
                Stay updated with the latest technology news, industry developments, and digital transformation stories from Pakistan and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-[#37215F] text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`}>
                  <Card hover className="h-full">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg mb-4 flex items-center justify-center">
                      <Newspaper className="w-12 h-12 text-purple-300 dark:text-purple-600" />
                    </div>
                    <Badge variant="purple" size="sm">IT News</Badge>
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
                    <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                      {formatDate(article.publishedAt)}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline">
                Load More Articles
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#37215F] dark:text-purple-400" />
                Trending
              </h3>
              <div className="space-y-4">
                {trendingArticles.map((article, i) => (
                  <Link key={article.id} href={`/article/${article.slug}`} className="flex gap-3 group">
                    <span className="text-2xl font-bold text-purple-200 dark:text-purple-700">{i + 1}</span>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#37215F] dark:group-hover:text-purple-400 transition-colors">
                        {article.title}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(article.publishedAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-[#37215F] to-purple-800 text-white border-0">
              <Mail className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-bold">Newsletter</h3>
              <p className="mt-2 text-sm text-purple-200">Get the latest IT news delivered to your inbox weekly.</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-4 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <Button className="mt-3 w-full bg-white text-[#37215F] hover:bg-purple-50">
                Subscribe
              </Button>
            </Card>

            {/* Ad Banner */}
            <Card className="bg-gray-100 dark:bg-gray-800 border-dashed flex items-center justify-center min-h-[250px]">
              <span className="text-sm text-gray-400 dark:text-gray-500">Advertisement</span>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
