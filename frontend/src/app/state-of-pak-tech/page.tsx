'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, TrendingUp, DollarSign, Building2, Users, Zap, Globe, BarChart3, ArrowUpRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

const STATS = [
  { label: 'Total Funding Raised (2026)', value: '$450M', change: '+32%', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
  { label: 'New Startups Launched', value: '120+', change: '+18%', icon: Building2, color: 'from-[#37215F] to-[#5a3d8a]' },
  { label: 'Active Tech Companies', value: '3,200+', change: '+24%', icon: Zap, color: 'from-[#0881BE] to-[#0a9fd4]' },
  { label: 'Tech Jobs Created', value: '45,000+', change: '+41%', icon: Users, color: 'from-orange-500 to-red-500' },
  { label: 'Foreign Investment', value: '$180M', change: '+56%', icon: Globe, color: 'from-purple-500 to-indigo-600' },
  { label: 'Unicorn Candidates', value: '3', change: 'New', icon: TrendingUp, color: 'from-yellow-500 to-orange-500' },
];

const SECTORS = [
  { name: 'Fintech', percentage: 28, color: '#37215F' },
  { name: 'E-Commerce', percentage: 22, color: '#0881BE' },
  { name: 'HealthTech', percentage: 15, color: '#10B981' },
  { name: 'EdTech', percentage: 12, color: '#F59E0B' },
  { name: 'Logistics', percentage: 10, color: '#EF4444' },
  { name: 'AI/ML', percentage: 8, color: '#8B5CF6' },
  { name: 'Others', percentage: 5, color: '#6B7280' },
];

const TOP_DEALS = [
  { startup: 'Bykea', round: 'Series C', amount: '$100M', investor: 'Global Ventures', date: 'Mar 2026' },
  { startup: 'SadaPay', round: 'Series B', amount: '$72M', investor: 'Indus Valley Capital', date: 'Jan 2026' },
  { startup: 'Bazaar', round: 'Series B', amount: '$65M', investor: 'Sarmayacar', date: 'Feb 2026' },
  { startup: 'TAG Innovation', round: 'Series A', amount: '$40M', investor: 'Fatima Gobi Ventures', date: 'Apr 2026' },
  { startup: 'TelloTalk', round: 'Series A', amount: '$25M', investor: 'i2i Ventures', date: 'Jun 2026' },
];

export default function StateOfPakTechPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#37215F] via-[#2a1a4a] to-[#0881BE]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'State of Pakistan Tech' }]} />
          <div className="mt-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4">
              <BarChart3 className="w-3 h-3" />
              ANNUAL REPORT 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              State of Pakistan Tech
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 mt-4 max-w-2xl">
              A comprehensive look at Pakistan&apos;s technology ecosystem — funding, growth, and the startups shaping the future.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#37215F] font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                <Download className="w-5 h-5" />
                Download PDF Report
              </button>
              <Link href="/tech-map" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                <Globe className="w-5 h-5" />
                View Ecosystem Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
              <span className="inline-flex items-center gap-0.5 mt-2 text-xs font-semibold text-green-600 dark:text-green-400">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change} YoY
              </span>
            </div>
          ))}
        </div>

        {/* Sector Breakdown */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Funding by Sector</h2>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              {SECTORS.map((sector) => (
                <div key={sector.name} className="flex items-center gap-4">
                  <span className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300">{sector.name}</span>
                  <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000 flex items-center pl-3" style={{ width: `${sector.percentage}%`, backgroundColor: sector.color }}>
                      <span className="text-xs font-bold text-white">{sector.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Deals */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Deals of 2026</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Startup</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Round</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Lead Investor</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {TOP_DEALS.map((deal) => (
                  <tr key={deal.startup} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{deal.startup}</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">{deal.round}</span></td>
                    <td className="py-3 px-4 font-bold text-green-600 dark:text-green-400">{deal.amount}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{deal.investor}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">{deal.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Want to contribute to Pakistan&apos;s tech ecosystem?</h2>
          <p className="text-purple-100 mb-6 max-w-xl mx-auto">Join thousands of founders, investors, and tech enthusiasts building the future.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/startup-directory" className="px-6 py-3 rounded-xl bg-white text-[#37215F] font-semibold hover:bg-gray-100 transition-colors">Explore Startups</Link>
            <Link href="/investors" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">View Investors</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
