'use client';

import React from 'react';
import Link from 'next/link';
import {
  Eye,
  FileText,
  Users,
  MessageSquare,
  Plus,
  Video,
  ArrowRight,
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import ArticleTable from '@/components/dashboard/ArticleTable';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { articles, users, comments, episodes } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';

const DashboardHome: React.FC = () => {
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  const stats = [
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      change: 12.5,
      icon: <Eye className="h-6 w-6" />,
      trend: 'up' as const,
    },
    {
      title: 'Total Articles',
      value: articles.length,
      change: 8.2,
      icon: <FileText className="h-6 w-6" />,
      trend: 'up' as const,
    },
    {
      title: 'Total Users',
      value: users.length,
      change: 4.1,
      icon: <Users className="h-6 w-6" />,
      trend: 'up' as const,
    },
    {
      title: 'Pending Comments',
      value: comments.length,
      change: 2.3,
      icon: <MessageSquare className="h-6 w-6" />,
      trend: 'down' as const,
    },
  ];

  const recentArticles = articles.slice(0, 5);

  const chartData = [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 85 },
    { label: 'Wed', value: 45 },
    { label: 'Thu', value: 95 },
    { label: 'Fri', value: 75 },
    { label: 'Sat', value: 55 },
    { label: 'Sun', value: 40 },
  ];
  const maxValue = Math.max(...chartData.map((d) => d.value));

  const activityFeed = [
    { action: 'New article published', detail: 'Karachi Startup Raises $2.5M', time: '2 hours ago' },
    { action: 'New comment received', detail: 'On NITB Cybersecurity article', time: '5 hours ago' },
    { action: 'Episode uploaded', detail: 'Startup Founders Panel', time: '1 day ago' },
    { action: 'New user registered', detail: 'usman@ilmtech.pk', time: '2 days ago' },
    { action: 'Article updated', detail: 'AI Transforming Healthcare', time: '3 days ago' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card padding="sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Weekly Views
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">Last 7 days</span>
            </div>
            <div className="flex items-end gap-2 h-48">
              {chartData.map((d) => (
                <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full flex justify-center">
                    <div
                      className="w-full max-w-[40px] rounded-t-md bg-purple-500 transition-all"
                      style={{ height: `${(d.value / maxValue) * 140}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{d.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card padding="sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.action}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {item.detail}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padding="sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/articles">
            <Button variant="primary" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              New Article
            </Button>
          </Link>
          <Link href="/dashboard/episodes">
            <Button variant="secondary" size="sm">
              <Video className="mr-1.5 h-4 w-4" />
              New Episode
            </Button>
          </Link>
          <Link href="/dashboard/comments">
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-1.5 h-4 w-4" />
              View Comments
            </Button>
          </Link>
        </div>
      </Card>

      <Card padding="sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Articles
          </h2>
          <Link
            href="/dashboard/articles"
            className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ArticleTable articles={recentArticles} />
      </Card>
    </div>
  );
};

export default DashboardHome;
