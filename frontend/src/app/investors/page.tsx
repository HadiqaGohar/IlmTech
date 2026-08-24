'use client';

import React, { useState } from 'react';
import { investors, startups } from '@/lib/mockData';
import { Search, Filter, Building2, DollarSign, ExternalLink, Briefcase } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function InvestorsPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  const types = [...new Set(investors.map((i) => i.type))];
  
  const filtered = investors.filter((i) => {
    const matchesSearch = !search || i.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'all' || i.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-br from-[#37215F] to-[#0881BE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Investors' }]} />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4">Investor Directory</h1>
          <p className="text-purple-100 mt-2 max-w-2xl">Pakistan&apos;s top VC firms, angel investors, and corporate investors — cross-linked with startups they&apos;ve funded</p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search investors..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50" />
            </div>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="px-4 py-3 rounded-xl bg-white/95 text-gray-700 focus:outline-none">
              <option value="all">All Types</option>
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((investor) => (
            <div key={investor.id} className="p-5 rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center text-white text-lg font-bold shadow-lg">
                  {investor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{investor.name}</h3>
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 mt-1">{investor.type}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4 text-sm">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Total Invested: {investor.totalInvested}</span>
              </div>
              
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Portfolio</p>
                <div className="flex flex-wrap gap-1.5">
                  {investor.portfolio.map((name) => {
                    const startup = startups.find((s) => s.name === name);
                    return (
                      <span key={name} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>
              
              <a href={investor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-[#0881BE] hover:underline">
                <ExternalLink className="w-3.5 h-3.5" />
                Website
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
