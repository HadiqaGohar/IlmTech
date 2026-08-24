'use client';

import Link from 'next/link';
import { Star, TrendingUp, Mail, Clock, Eye, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { articles } from '@/lib/mockData';
import { formatDate, truncate } from '@/lib/utils';

export default function ReviewsPage() {
  const filteredArticles = articles.filter((a) => a.category === 'reviews');
  const trendingArticles = [...filteredArticles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Breadcrumb items={[{ label: 'Reviews' }]} />
          <div className="mt-6 flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Star className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Reviews</h1>
              <p className="mt-2 text-amber-200 max-w-2xl">
                In-depth reviews and hands-on analysis of the latest tech products, software, gadgets, and services.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <Link key={article.id} href={`/article/${article.slug}`}>
                    <Card hover className="h-full">
                      <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg mb-4 flex items-center justify-center">
                        <Star className="w-12 h-12 text-amber-300 dark:text-amber-600" />
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="yellow" size="sm">Reviews</Badge>
                        {article.isBreaking && (
                          <Badge variant="yellow" size="sm" className="animate-pulse">Breaking</Badge>
                        )}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
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
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <Star className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No reviews available yet. Check back soon!</p>
                </div>
              )}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline">
                Load More Reviews
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                Trending
              </h3>
              <div className="space-y-4">
                {trendingArticles.length > 0 ? (
                  trendingArticles.map((article, i) => (
                    <Link key={article.id} href={`/article/${article.slug}`} className="flex gap-3 group">
                      <span className="text-2xl font-bold text-amber-200 dark:text-amber-700">{i + 1}</span>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {article.title}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(article.publishedAt)}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No trending reviews yet.</p>
                )}
              </div>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0">
              <Mail className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-bold">Review Updates</h3>
              <p className="mt-2 text-sm text-amber-200">Get the latest product reviews and tech insights delivered to your inbox.</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-4 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <Button className="mt-3 w-full bg-white text-amber-600 hover:bg-amber-50">
                Subscribe
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
