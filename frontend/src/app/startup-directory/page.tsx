'use client';

import React, { useState, useMemo } from 'react';
import { startups, TAGS } from '@/lib/mockData';
import { Search, Filter, MapPin, DollarSign, Users, Building2, X } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import Breadcrumb from '@/components/layout/Breadcrumb';

const SECTORS = [...new Set(startups.map((s) => s.sector))];
const FUNDING_STAGES = [...new Set(startups.map((s) => s.fundingStage))];
const CITIES = [...new Set(startups.map((s) => s.city))];

export default function StartupDirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  const filtered = useMemo(() => {
    return startups.filter((s) => {
      const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.sector.toLowerCase().includes(search.toLowerCase()) || s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesSector = selectedSector === 'all' || s.sector === selectedSector;
      const matchesStage = selectedStage === 'all' || s.fundingStage === selectedStage;
      const matchesCity = selectedCity === 'all' || s.city === selectedCity;
      return matchesSearch && matchesSector && matchesStage && matchesCity;
    });
  }, [search, selectedSector, selectedStage, selectedCity]);

  const clearFilters = () => {
    setSearch('');
    setSelectedSector('all');
    setSelectedStage('all');
    setSelectedCity('all');
  };

  const hasFilters = search || selectedSector !== 'all' || selectedStage !== 'all' || selectedCity !== 'all';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Startup Directory' }]} />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4">Startup Directory</h1>
          <p className="text-emerald-100 mt-2 max-w-2xl">Discover Pakistan&apos;s thriving startup ecosystem — from pre-seed to Series C</p>

          {/* Search */}
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search startups by name, sector, or tag..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Filter className="w-4 h-4 text-gray-500" />
          <select value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <option value="all">All Sectors</option>
            {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={selectedStage} onChange={(e) => setSelectedStage(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <option value="all">All Stages</option>
            {FUNDING_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <option value="all">All Cities</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
              <X className="w-3.5 h-3.5" />
              Clear Filters
            </button>
          )}
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{filtered.length} startups</span>
        </div>

        {/* Startup Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((startup) => (
            <div key={startup.id} className="p-5 rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <img src={startup.logo} alt={startup.name} className="w-14 h-14 rounded-xl shadow-md" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{startup.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{startup.sector}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{startup.fundingStage}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">{startup.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {startup.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1 text-sm">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">{startup.funding}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {startup.city}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Users className="w-3.5 h-3.5" />
                  {startup.employees}+
                </div>
              </div>
              {startup.fundingRounds.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Funding History</p>
                  <div className="flex flex-wrap gap-1.5">
                    {startup.fundingRounds.map((round, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        {round.round}: {round.amount}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No startups found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters</p>
            <button onClick={clearFilters} className="px-4 py-2 rounded-lg bg-[#37215F] text-white text-sm font-medium hover:bg-[#2a1a4a] transition-colors">Clear All Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
