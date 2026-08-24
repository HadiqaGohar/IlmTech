'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { authors, articles } from '@/lib/mockData';
import { formatDate, truncate } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import { Clock, Mail, BookOpen } from 'lucide-react';

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function AuthorProfilePage() {
  const params = useParams();
  const author = authors.find((a) => a.id === params.id);

  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Author not found</h1>
          <Link href="/" className="text-[#0881BE] hover:underline">Go Home</Link>
        </div>
      </div>
    );
  }

  const authorArticles = articles.filter((a) => a.author.id === author.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Author Header */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Authors' }, { label: author.name }]} />
          <div className="flex flex-col sm:flex-row items-start gap-6 mt-6">
            <img src={author.avatar} alt={author.name} className="w-24 h-24 rounded-full ring-4 ring-[#37215F]/20" />
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{author.name}</h1>
              <p className="text-[#0881BE] font-medium mt-1">{author.role}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl leading-relaxed">{author.bio}</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <BookOpen className="w-4 h-4" />
                  {author.articlesCount} articles
                </div>
                {author.socialLinks?.twitter && (
                  <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors">
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                )}
                {author.socialLinks?.linkedin && (
                  <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                )}
                <a href={`mailto:${author.email}`} className="text-gray-400 hover:text-[#37215F] transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Articles */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Articles by {author.name}</h2>
        <div className="space-y-5">
          {authorArticles.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="block p-5 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <img src={article.featuredImage} alt="" className="w-32 h-24 rounded-lg object-cover flex-shrink-0 hidden sm:block" />
                <div className="flex-1">
                  <span className="text-xs font-semibold" style={{ color: CATEGORIES.find(c => c.slug === article.category)?.color }}>{CATEGORIES.find(c => c.slug === article.category)?.label}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mt-1 hover:text-[#37215F] dark:hover:text-purple-400">{article.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{truncate(article.excerpt, 150)}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <span>{formatDate(article.publishedAt)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime} min read</span>
                    <span>·</span>
                    <span>{article.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
