'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Mail, Building2, Users, Globe, ChevronDown, MapPin, Filter } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { startups } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/constants';

const SECTORS = ['All', 'Fintech', 'E-Commerce', 'Transportation', 'SaaS', 'Communications', 'Logistics'];
const FUNDING_STAGES = ['All', 'Seed', 'Series A', 'Series B'];
const LOCATIONS = ['All', 'Karachi', 'Lahore', 'Islamabad', 'Peshawar'];

export default function StartupDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedFunding, setSelectedFunding] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredStartups = startups.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || s.sector === selectedSector;
    const matchesFunding = selectedFunding === 'All' || s.funding.includes(selectedFunding);
    return matchesSearch && matchesSector && matchesFunding;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Breadcrumb items={[{ label: 'Startup Directory' }]} />
          <div className="mt-6 flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Building2 className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Startup Directory</h1>
              <p className="mt-2 text-green-200 max-w-2xl">
                Explore Pakistan's top startups. Filter by sector, funding stage, and location to find the companies shaping the future.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                icon={<Search className="w-4 h-4" />}
                placeholder="Search startups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {SECTORS.map((s) => (
                  <option key={s} value={s}>{s === 'All' ? 'All Sectors' : s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedFunding}
                onChange={(e) => setSelectedFunding(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {FUNDING_STAGES.map((s) => (
                  <option key={s} value={s}>{s === 'All' ? 'All Funding' : s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Showing {filteredStartups.length} startup{filteredStartups.length !== 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStartups.map((startup) => (
                <Link key={startup.id} href={`/startup-directory/${startup.id}`}>
                  <Card hover className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                        <Building2 className="w-7 h-7 text-emerald-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          {startup.name}
                        </h3>
                        <Badge variant="green" size="sm">{startup.sector}</Badge>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {startup.description}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">{startup.funding}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        {startup.employees} employees
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Globe className="w-4 h-4" />
                        Founded {startup.founded}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {startup.founder}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredStartups.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No startups found matching your criteria.</p>
                <Button variant="ghost" className="mt-4" onClick={() => { setSearchQuery(''); setSelectedSector('All'); setSelectedFunding('All'); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Categories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {cat.label}
                    </span>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-emerald-600 to-green-700 text-white border-0">
              <Mail className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-bold">Startup Updates</h3>
              <p className="mt-2 text-sm text-green-200">Get weekly startup news and funding alerts.</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-4 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <Button className="mt-3 w-full bg-white text-emerald-700 hover:bg-green-50">
                Subscribe
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
