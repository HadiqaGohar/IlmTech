'use client';

import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ExternalLink, Clock, Headphones } from 'lucide-react';
import { episodes } from '@/lib/mockData';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function PodcastPage() {
  const [currentEp, setCurrentEp] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const ep = episodes[currentEp];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Podcast' }]} />
          <div className="flex items-center gap-3 mt-4">
            <Headphones className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">IlmTech Podcast</h1>
          </div>
          <p className="text-gray-400 mt-2">Listen to the latest episodes — available on Spotify, Apple Podcasts, and more</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-900 mb-4 relative">
                <img src={`https://picsum.photos/seed/ep${currentEp}/400/400`} alt="" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                    {isPlaying ? <Pause className="w-8 h-8 text-gray-900" /> : <Play className="w-8 h-8 text-gray-900 ml-1" />}
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2">{ep?.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Guest: {ep?.guest}</p>
              
              {/* Progress bar mock */}
              <div className="mt-4">
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-[35%] h-full bg-gradient-to-r from-[#37215F] to-[#0881BE] rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>12:34</span>
                  <span>{ep?.duration || '45:00'}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-3">
                <button onClick={() => setCurrentEp(Math.max(0, currentEp - 1))} className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"><SkipBack className="w-5 h-5" /></button>
                <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 rounded-full bg-[#37215F] text-white hover:bg-[#2a1a4a] transition-colors">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button onClick={() => setCurrentEp(Math.min(episodes.length - 1, currentEp + 1))} className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"><SkipForward className="w-5 h-5" /></button>
              </div>

              {/* Listen on */}
              <div className="flex gap-2 mt-4">
                <a href="#" className="flex-1 py-2 rounded-lg bg-green-500 text-white text-xs font-semibold text-center hover:bg-green-600 transition-colors">Spotify</a>
                <a href="#" className="flex-1 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold text-center hover:bg-purple-700 transition-colors">Apple</a>
                <a href="#" className="flex-1 py-2 rounded-lg bg-orange-500 text-white text-xs font-semibold text-center hover:bg-orange-600 transition-colors">Google</a>
              </div>
            </div>
          </div>

          {/* Episode List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">All Episodes</h2>
            <div className="space-y-3">
              {episodes.map((ep, i) => (
                <button key={ep.id} onClick={() => { setCurrentEp(i); setIsPlaying(false); }} className={`w-full text-left p-4 rounded-xl border transition-all ${i === currentEp ? 'border-[#37215F] bg-purple-50 dark:bg-purple-900/20 shadow-md' : 'border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${i === currentEp ? 'bg-[#37215F] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                      {i === currentEp && isPlaying ? (
                        <div className="flex gap-0.5 items-end h-4"><span className="w-0.5 bg-white animate-pulse" style={{ height: '60%' }} /><span className="w-0.5 bg-white animate-pulse" style={{ height: '100%', animationDelay: '0.2s' }} /><span className="w-0.5 bg-white animate-pulse" style={{ height: '40%', animationDelay: '0.4s' }} /></div>
                      ) : <Play className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{ep.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Guest: {ep.guest}</p>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ep.duration}</span>
                        <span>{new Date(ep.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}