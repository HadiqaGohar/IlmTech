'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { episodes } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import {
  Play,
  Clock,
  Calendar,
  User,
  ArrowLeft,
  Radio,
  Tv,
  Mail,
} from 'lucide-react';

export default function EpisodePage() {
  const params = useParams();
  const slug = params.slug as string;

  const episode = episodes.find((e) => e.slug === slug);

  if (!episode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center max-w-md">
          <Tv className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Episode Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The episode you are looking for does not exist or has been removed.
          </p>
          <Link href="/">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const relatedEpisodes = episodes
    .filter((e) => e.id !== episode.id)
    .slice(0, 3);

  const upcomingEpisodes = episodes.slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: 'Live Shows', href: '/live' },
            { label: episode.title },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Embed */}
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative mb-6 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-[#37215F]/80 to-[#0881BE]/80 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <Badge variant="default" size="sm">{episode.duration}</Badge>
              </div>
            </div>

            {/* Episode Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                {episode.isLive ? (
                  <Badge variant="red" size="md">
                    <Radio className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                ) : (
                  <Badge variant="blue" size="md">
                    <Tv className="w-3 h-3 mr-1" />
                    Recorded
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                {episode.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {episode.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(episode.publishedAt)}
                </div>
                {episode.guest && (
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {episode.guest}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <Card className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About this Episode</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{episode.description}</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                In this episode, our hosts and guests dive deep into the topic, exploring various
                perspectives and sharing insights from their experience. Whether you are a tech
                enthusiast, startup founder, or industry professional, this discussion offers valuable
                takeaways for everyone interested in Pakistan&apos;s growing technology landscape.
              </p>
            </Card>

            {/* Guest Info */}
            {episode.guest && (
              <Card className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Featured Guests</h2>
                <div className="flex flex-wrap gap-4">
                  {episode.guest.split(', ').map((guestName, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center text-white font-bold text-sm">
                        {guestName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{guestName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Guest Speaker</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Related Episodes */}
            {relatedEpisodes.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">More Episodes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedEpisodes.map((related) => (
                    <Link key={related.id} href={`/episode/${related.slug}`}>
                      <Card hover className="h-full">
                        <div className="aspect-video bg-gradient-to-br from-[#37215F] to-[#0881BE] rounded-lg mb-3 flex items-center justify-center relative">
                          <Play className="w-8 h-8 text-white opacity-70" />
                          <div className="absolute bottom-2 right-2">
                            <Badge variant="default" size="sm">
                              {related.duration}
                            </Badge>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mt-2 line-clamp-2 text-sm">
                          {related.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatDate(related.publishedAt)}
                        </p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Upcoming Shows */}
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <Radio className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Upcoming Shows</h3>
                </div>
                <div className="space-y-3">
                  {upcomingEpisodes.map((upcoming) => (
                    <Link
                      key={upcoming.id}
                      href={`/episode/${upcoming.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center shrink-0">
                          <Play className="w-4 h-4 text-white opacity-70" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#37215F] dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                            {upcoming.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            {upcoming.duration}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>

              {/* Newsletter Widget */}
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5 text-[#0881BE] dark:text-blue-400" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Stay Updated</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Never miss a live show. Get notified about upcoming episodes.
                </p>
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-[#37215F] rounded-lg hover:bg-purple-800 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
