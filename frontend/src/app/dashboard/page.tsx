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
  TrendingUp,
  DollarSign,
  UserPlus,
  BarChart3,
  Play,
  Rocket,
} from 'lucide-react';

const DashboardHome: React.FC = () => {
  const statCards = [
    { title: 'Articles', value: '14', change: 8.2, icon: <FileText className="h-5 w-5" />, color: '#37215F', trend: 'up' as const },
    { title: 'Episodes', value: '7', change: 12.0, icon: <Play className="h-5 w-5" />, color: '#0881BE', trend: 'up' as const },
    { title: 'Startups', value: '8', change: 5.5, icon: <Rocket className="h-5 w-5" />, color: '#8B5CF6', trend: 'up' as const },
    { title: 'Users', value: '5', change: 4.1, icon: <Users className="h-5 w-5" />, color: '#3B82F6', trend: 'up' as const },
    { title: 'Comments', value: '10', change: 2.3, icon: <MessageSquare className="h-5 w-5" />, color: '#10B981', trend: 'down' as const },
    { title: 'Views', value: '45.2K', change: 12.5, icon: <Eye className="h-5 w-5" />, color: '#F59E0B', trend: 'up' as const },
    { title: 'Revenue', value: '$2.4K', change: 18.3, icon: <DollarSign className="h-5 w-5" />, color: '#EF4444', trend: 'up' as const },
    { title: 'Subscribers', value: '1.2K', change: 9.7, icon: <UserPlus className="h-5 w-5" />, color: '#EC4899', trend: 'up' as const },
  ];

  const categoryData = [
    { label: 'IT News', value: 45, color: '#8B5CF6' },
    { label: 'Startups', value: 38, color: '#3B82F6' },
    { label: 'Cybersecurity', value: 28, color: '#EF4444' },
    { label: 'AI & Cloud', value: 35, color: '#10B981' },
    { label: 'Reviews', value: 20, color: '#F59E0B' },
  ];
  const maxCatValue = Math.max(...categoryData.map((d) => d.value));

  const recentArticles = [
    { title: 'Karachi Startup Raises $2.5M in Seed Round', author: 'Hadiqa', category: 'Startups', categoryColor: '#3B82F6', views: 1240, date: 'Aug 25, 2026' },
    { title: 'NITB Launches National Cybersecurity Framework', author: 'Admin', category: 'Cybersecurity', categoryColor: '#EF4444', views: 980, date: 'Aug 24, 2026' },
    { title: 'AI Transforming Healthcare in Pakistan', author: 'Hadiqa', category: 'AI & Cloud', categoryColor: '#10B981', views: 2100, date: 'Aug 23, 2026' },
    { title: 'Top 10 Laptops for Developers in 2026', author: 'Admin', category: 'Reviews', categoryColor: '#F59E0B', views: 1560, date: 'Aug 22, 2026' },
    { title: 'Pakistan IT Exports Hit Record $3.2B', author: 'Hadiqa', category: 'IT News', categoryColor: '#8B5CF6', views: 3200, date: 'Aug 21, 2026' },
  ];

  return (
    <div className="space-y-8">
      {/* 8 Stat Cards Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}15` }}>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                {stat.trend === 'up' ? '+' : ''}{stat.change}%
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Chart + Quick Actions Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Views by Category Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Views by Category</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Performance breakdown</p>
            </div>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {categoryData.map((cat) => (
              <div key={cat.label} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-28 shrink-0">{cat.label}</span>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                    style={{ width: `${(cat.value / maxCatValue) * 100}%`, backgroundColor: cat.color }}
                  >
                    <span className="text-xs font-bold text-white">{cat.value}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/dashboard/articles" className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-[#37215F] hover:border-[#37215F] hover:text-white group transition-all">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 group-hover:bg-white/20">
                <Plus className="h-4 w-4 text-[#37215F] dark:text-purple-400 group-hover:text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-white">Write Article</span>
            </Link>
            <Link href="/dashboard/episodes" className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-[#0881BE] hover:border-[#0881BE] hover:text-white group transition-all">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 group-hover:bg-white/20">
                <Play className="h-4 w-4 text-[#0881BE] dark:text-blue-400 group-hover:text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-white">Upload Episode</span>
            </Link>
            <Link href="/dashboard/startups" className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-[#10B981] hover:border-[#10B981] hover:text-white group transition-all">
              <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 group-hover:bg-white/20">
                <Rocket className="h-4 w-4 text-[#10B981] dark:text-green-400 group-hover:text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-white">Manage Startups</span>
            </Link>
            <Link href="/dashboard/analytics" className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-white group transition-all">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/30 group-hover:bg-white/20">
                <TrendingUp className="h-4 w-4 text-[#F59E0B] dark:text-amber-400 group-hover:text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-white">View Analytics</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Articles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Articles</h2>
          <Link
            href="/dashboard/articles"
            className="flex items-center gap-1 text-sm font-medium text-[#37215F] dark:text-purple-400 hover:text-[#2a1a4a] dark:hover:text-purple-300"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3">Title</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3">Author</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3">Views</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {recentArticles.map((article, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 pr-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{article.title}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{article.author}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: article.categoryColor }}
                    >
                      {article.category}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{article.views.toLocaleString()}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{article.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
