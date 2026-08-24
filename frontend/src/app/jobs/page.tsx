'use client';

import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Briefcase, ExternalLink, Search, Filter } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

const JOBS = [
  { id: '1', company: 'Bykea', logo: 'https://ui-avatars.com/api/?name=Bykea&background=37215F&color=fff&size=64&bold=true', title: 'Senior React Native Developer', type: 'Full-time', location: 'Karachi', salary: 'PKR 400K-600K/mo', tags: ['React Native', 'TypeScript', 'Mobile'], posted: '2 days ago', applicants: 45 },
  { id: '2', company: 'SadaPay', logo: 'https://ui-avatars.com/api/?name=SadaPay&background=0881BE&color=fff&size=64&bold=true', title: 'Backend Engineer (Go/Python)', type: 'Full-time', location: 'Remote', salary: '$4K-6K/mo', tags: ['Go', 'Python', 'Microservices'], posted: '1 day ago', applicants: 32 },
  { id: '3', company: 'Bazaar', logo: 'https://ui-avatars.com/api/?name=Bazaar&background=10B981&color=fff&size=64&bold=true', title: 'Product Manager - Growth', type: 'Full-time', location: 'Lahore', salary: 'PKR 500K-800K/mo', tags: ['Product', 'Growth', 'Analytics'], posted: '3 days ago', applicants: 28 },
  { id: '4', company: 'TAG Innovation', logo: 'https://ui-avatars.com/api/?name=TAG&background=F59E0B&color=fff&size=64&bold=true', title: 'Data Scientist (ML/AI)', type: 'Full-time', location: 'Islamabad', salary: 'PKR 350K-550K/mo', tags: ['Python', 'ML', 'TensorFlow'], posted: '5 days ago', applicants: 56 },
  { id: '5', company: 'Devsinc', logo: 'https://ui-avatars.com/api/?name=Devsinc&background=8B5CF6&color=fff&size=64&bold=true', title: 'DevOps Engineer', type: 'Full-time', location: 'Karachi', salary: 'PKR 300K-500K/mo', tags: ['AWS', 'Docker', 'Kubernetes'], posted: '1 week ago', applicants: 18 },
  { id: '6', company: 'RiskCovered', logo: 'https://ui-avatars.com/api/?name=RiskCovered&background=EF4444&color=fff&size=64&bold=true', title: 'UI/UX Designer', type: 'Contract', location: 'Lahore', salary: 'PKR 200K-350K/mo', tags: ['Figma', 'Prototyping', 'Design System'], posted: '4 days ago', applicants: 22 },
  { id: '7', company: 'TelloTalk', logo: 'https://ui-avatars.com/api/?name=TelloTalk&background=06B6D4&color=fff&size=64&bold=true', title: 'QA Automation Engineer', type: 'Full-time', location: 'Islamabad', salary: 'PKR 250K-400K/mo', tags: ['Selenium', 'Cypress', 'API Testing'], posted: '6 days ago', applicants: 14 },
  { id: '8', company: 'IlmTech', logo: 'https://ui-avatars.com/api/?name=IlmTech&background=37215F&color=fff&size=64&bold=true', title: 'Frontend Developer (Next.js)', type: 'Full-time', location: 'Remote', salary: 'PKR 300K-500K/mo', tags: ['Next.js', 'React', 'Tailwind'], posted: 'Today', applicants: 8 },
];

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const locations = [...new Set(JOBS.map((j) => j.location))];

  const filtered = JOBS.filter((j) => {
    const matchesSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = selectedType === 'all' || j.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || j.location === selectedLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-br from-[#37215F] to-[#0881BE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Jobs' }]} />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4">Tech Jobs in Pakistan</h1>
          <p className="text-purple-100 mt-2">Discover opportunities at Pakistan&apos;s top tech companies and startups</p>
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search jobs by title, company, or skill..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Filter className="w-4 h-4 text-gray-500" />
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <option value="all">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
            <option value="Part-time">Part-time</option>
          </select>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <option value="all">All Locations</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <span className="ml-auto text-sm text-gray-500">{filtered.length} jobs</span>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {filtered.map((job) => (
            <div key={job.id} className="p-5 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-200">
              <div className="flex items-start gap-4">
                <img src={job.logo} alt="" className="w-12 h-12 rounded-xl shadow-md flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{job.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex-shrink-0">{job.type}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.posted}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.applicants} applicants</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">{tag}</span>
                    ))}
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#37215F] text-white text-sm font-semibold hover:bg-[#2a1a4a] transition-colors flex items-center gap-1.5 flex-shrink-0">
                  Apply <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
