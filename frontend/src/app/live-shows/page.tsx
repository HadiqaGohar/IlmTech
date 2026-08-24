'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Radio, Play, Clock, Calendar, Users, Mail, ChevronDown, Tv } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { episodes } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';

export default function LiveShowsPage() {
  const liveEpisodes = episodes.filter((e) => e.isLive);
  const upcomingEpisodes = episodes.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Breadcrumb items={[{ label: 'Live Shows' }]} />
          <div className="mt-6 flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Radio className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Web Channel / Live Shows</h1>
              <p className="mt-2 text-orange-200 max-w-2xl">
                Watch live discussions, expert panels, and interviews with Pakistan's top tech leaders, startup founders, and industry experts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Live Now Section */}
            {liveEpisodes.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                  </span>
                  Live Now
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {liveEpisodes.map((episode) => (
                    <Link key={episode.id} href={`/episode/${episode.slug}`}>
                      <Card hover className="border-red-200 dark:border-red-800">
                        <div className="aspect-video bg-gradient-to-br from-red-500 to-orange-500 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                          <Tv className="w-16 h-16 text-white/80" />
                          <div className="absolute top-3 left-3">
                            <Badge variant="red" size="sm" className="animate-pulse">LIVE</Badge>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                          {episode.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {episode.description}
                        </p>
                        <div className="mt-3 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {episode.guest}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {episode.duration}
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Latest Episodes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <Play className="w-6 h-6 text-red-600 dark:text-red-400" />
                Latest Episodes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {episodes.map((episode) => (
                  <Link key={episode.id} href={`/episode/${episode.slug}`}>
                    <Card hover className="h-full">
                      <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group">
                        <Play className="w-12 h-12 text-gray-400 dark:text-gray-500 group-hover:text-red-500 transition-colors" />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {episode.duration}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        {episode.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {episode.description}
                      </p>
                      <div className="mt-4 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {episode.guest}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {episode.duration}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                        {formatDate(episode.publishedAt)}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* Upcoming Shows */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <Calendar className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                Upcoming Shows
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEpisodes.map((episode) => (
                  <Card key={episode.id} className="border-dashed border-2 border-orange-200 dark:border-orange-800">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                        <Calendar className="w-7 h-7 text-orange-500" />
                      </div>
                      <div>
                        <Badge variant="yellow" size="sm">Upcoming</Badge>
                        <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                          {episode.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {episode.description}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(episode.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            6:00 PM PKT
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hosts */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-red-600 dark:text-red-400" />
                Hosts
              </h3>
              <div className="space-y-4">
                {['Ahmed Khan', 'Fatima Ali', 'Usman Raza'].map((name) => (
                  <div key={name} className="flex items-center gap-3">
                    <Avatar fallback={name} size="md" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Show Host</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-red-600 to-orange-600 text-white border-0">
              <Mail className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-bold">Show Alerts</h3>
              <p className="mt-2 text-sm text-orange-200">Get notified when new episodes go live.</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-4 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-orange-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <Button className="mt-3 w-full bg-white text-red-600 hover:bg-orange-50">
                Subscribe
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
