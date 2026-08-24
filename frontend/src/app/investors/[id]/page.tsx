'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { investors, startups } from '@/lib/mockData';
import { DollarSign, ExternalLink, ArrowLeft } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function InvestorDetailPage() {
  const params = useParams();
  const investor = investors.find((i) => i.id === params.id);

  if (!investor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Investor not found</h1>
          <Link href="/investors" className="text-[#0881BE] hover:underline">View all investors</Link>
        </div>
      </div>
    );
  }

  const portfolioStartups = startups.filter((s) => investor.portfolio.includes(s.name));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Investors', href: '/investors' }, { label: investor.name }]} />
        
        <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {investor.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{investor.name}</h1>
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 mt-2">{investor.type}</span>
              <div className="flex items-center gap-2 mt-3 text-sm">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Total Invested: {investor.totalInvested}</span>
              </div>
              <a href={investor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-[#0881BE] hover:underline mt-2">
                <ExternalLink className="w-3.5 h-3.5" />
                {investor.website}
              </a>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-5">Portfolio Companies ({portfolioStartups.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {portfolioStartups.map((startup) => (
            <div key={startup.id} className="p-5 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <img src={startup.logo} alt="" className="w-12 h-12 rounded-lg" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{startup.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{startup.sector} · {startup.city}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{startup.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-green-600 dark:text-green-400">{startup.funding}</span>
                <span>·</span>
                <span>{startup.fundingStage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
