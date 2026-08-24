'use client';

import React, { useState } from 'react';
import { startups } from '@/lib/mockData';
import { MapPin, Building2, Users, X, DollarSign } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

const CITY_DATA = [
  { name: 'Karachi', x: 620, y: 420, startupCount: 350, color: '#37215F' },
  { name: 'Lahore', x: 540, y: 310, startupCount: 280, color: '#0881BE' },
  { name: 'Islamabad', x: 540, y: 220, startupCount: 180, color: '#10B981' },
  { name: 'Peshawar', x: 480, y: 180, startupCount: 45, color: '#F59E0B' },
  { name: 'Faisalabad', x: 520, y: 330, startupCount: 35, color: '#EF4444' },
  { name: 'Multan', x: 500, y: 380, startupCount: 20, color: '#8B5CF6' },
];

export default function TechMapPage() {
  const [selectedCity, setSelectedCity] = useState<typeof CITY_DATA[0] | null>(null);

  const cityStartups = selectedCity
    ? startups.filter((s) => s.city.toLowerCase() === selectedCity.name.toLowerCase())
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-br from-[#37215F] to-[#0881BE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tech Ecosystem Map' }]} />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4">Pakistan Tech Ecosystem Map</h1>
          <p className="text-purple-100 mt-2">Explore the thriving tech ecosystem across Pakistan — click a city to discover its startups</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map */}
          <div className="flex-1">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm overflow-hidden">
              <svg viewBox="0 0 800 600" className="w-full h-auto">
                {/* Pakistan outline (simplified) */}
                <path
                  d="M350,80 L380,70 L420,60 L460,70 L500,80 L520,100 L540,130 L560,160 L550,180 L530,200 L540,220 L560,240 L580,260 L600,280 L620,300 L640,320 L660,340 L680,360 L700,380 L680,400 L660,420 L640,440 L620,460 L600,480 L580,470 L560,460 L540,450 L520,440 L500,430 L480,420 L460,410 L440,400 L420,390 L400,380 L380,370 L360,360 L340,350 L320,340 L300,330 L280,320 L260,310 L240,300 L260,280 L280,260 L300,240 L320,220 L340,200 L360,180 L350,160 L340,140 L330,120 L340,100 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-200 dark:text-gray-700"
                />
                <path
                  d="M350,80 L380,70 L420,60 L460,70 L500,80 L520,100 L540,130 L560,160 L550,180 L530,200 L540,220 L560,240 L580,260 L600,280 L620,300 L640,320 L660,340 L680,360 L700,380 L680,400 L660,420 L640,440 L620,460 L600,480 L580,470 L560,460 L540,450 L520,440 L500,430 L480,420 L460,410 L440,400 L420,390 L400,380 L380,370 L360,360 L340,350 L320,340 L300,330 L280,320 L260,310 L240,300 L260,280 L280,260 L300,240 L320,220 L340,200 L360,180 L350,160 L340,140 L330,120 L340,100 Z"
                  fill="url(#mapGradient)"
                  opacity="0.1"
                />
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#37215F" />
                    <stop offset="100%" stopColor="#0881BE" />
                  </linearGradient>
                </defs>

                {/* City Dots */}
                {CITY_DATA.map((city) => (
                  <g key={city.name} className="cursor-pointer" onClick={() => setSelectedCity(city)}>
                    {/* Pulse ring */}
                    <circle cx={city.x} cy={city.y} r="20" fill={city.color} opacity="0.15">
                      <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.15;0.05;0.15" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {/* Main dot */}
                    <circle
                      cx={city.x} cy={city.y} r={selectedCity?.name === city.name ? 12 : 8}
                      fill={city.color}
                      className="transition-all duration-300 drop-shadow-lg"
                    />
                    <circle cx={city.x} cy={city.y} r="3" fill="white" />
                    {/* Label */}
                    <text x={city.x} y={city.y - 18} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-[11px] font-semibold">
                      {city.name}
                    </text>
                    <text x={city.x} y={city.y + 28} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-[9px]">
                      {city.startupCount}+ startups
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#37215F]" />More startups</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400" />Fewer startups</span>
                <span>Click a city to explore →</span>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="w-full lg:w-96">
            {selectedCity ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: selectedCity.color }}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900 dark:text-white text-lg">{selectedCity.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedCity.startupCount}+ startups</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedCity(null)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {cityStartups.length > 0 ? cityStartups.map((startup) => (
                    <div key={startup.id} className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <img src={startup.logo} alt="" className="w-10 h-10 rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{startup.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{startup.sector}</p>
                        </div>
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">{startup.funding}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-6">
                      <Building2 className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Explore startups in {selectedCity.name}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center shadow-sm">
                <MapPin className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Select a City</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Click on any city dot on the map to see its startup ecosystem</p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {CITY_DATA.slice(0, 4).map((city) => (
                <button key={city.name} onClick={() => setSelectedCity(city)} className={`p-3 rounded-xl border text-left transition-all ${selectedCity?.name === city.name ? 'border-[#37215F] bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'}`}>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{city.name}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{city.startupCount}+</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
