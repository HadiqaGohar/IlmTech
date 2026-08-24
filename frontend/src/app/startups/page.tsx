'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Rocket, Mail, Clock, Eye, ChevronDown, Building2 } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { articles, startups } from '@/lib/mockData';
import { formatDate, truncate } from '@/lib/utils';

const FILTER_TABS = ['All', 'Funding', 'Interviews', 'Profiles'];

export default function StartupsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredArticles = articles.filter((a) => a.category === 'startups');
  const featuredStartups = startups.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0881BE] to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Breadcrumb items={[{ label: 'Startups' }]} />
          <div className="mt-6 flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Rocket className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Startups & Entrepreneurs</h1>
              <p className="mt-2 text-blue-200 max-w-2xl">
                Discover the latest startup stories, funding rounds, founder interviews, and entrepreneurship insights from Pakistan's growing tech ecosystem.
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
                      ? 'bg-[#0881BE] text-white'
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
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg mb-4 flex items-center justify-center">
                      <Rocket className="w-12 h-12 text-blue-300 dark:text-blue-600" />
                    </div>
                    <Badge variant="blue" size="sm">Startups</Badge>
                    {article.subcategory && (
                      <Badge variant="default" size="sm" className="ml-1">{article.subcategory}</Badge>
                    )}
                    <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-[#0881BE] dark:hover:text-blue-400 transition-colors">
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
            {/* Startup Showcase */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-[#0881BE] dark:text-blue-400" />
                Startup Showcase
              </h3>
              <div className="space-y-4">
                {featuredStartups.map((startup) => (
                  <div key={startup.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{startup.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{startup.sector}</p>
                      <span className="text-xs text-[#0881BE] dark:text-blue-400 font-medium">{startup.funding}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/startup-directory" className="mt-4 block text-center text-sm font-medium text-[#0881BE] dark:text-blue-400 hover:underline">
                View All Startups →
              </Link>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-[#0881BE] to-blue-700 text-white border-0">
              <Mail className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-bold">Startup Digest</h3>
              <p className="mt-2 text-sm text-blue-200">Weekly roundup of startup news, funding, and opportunities.</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-4 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <Button className="mt-3 w-full bg-white text-[#0881BE] hover:bg-blue-50">
                Subscribe
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
