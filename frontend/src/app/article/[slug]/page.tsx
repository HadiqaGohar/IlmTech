'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { articles, comments as allComments, authors, TAGS } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/constants';
import { formatDate, truncate } from '@/lib/utils';
import { Clock, Eye, Share2, Heart, Bookmark, MessageSquare, ExternalLink, Send, AlertCircle, CheckCircle, Tag, ChevronRight } from 'lucide-react';

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function ArticlePage() {
  const params = useParams();
  const article = articles.find((a) => a.slug === params.slug);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">404</h1>
          <p className="text-gray-500 mb-4">Article not found</p>
          <Link href="/" className="px-4 py-2 bg-[#37215F] text-white rounded-lg hover:bg-[#2a1a4a] transition-colors">Go Home</Link>
        </div>
      </div>
    );
  }

  const articleComments = allComments.filter((c) => c.articleId === article.id);
  const relatedArticles = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);
  const categoryColor = CATEGORIES.find((c) => c.slug === article.category)?.color || '#8B5CF6';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative">
        <div className="h-[300px] sm:h-[400px] overflow-hidden">
          <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white mb-3" style={{ backgroundColor: categoryColor }}>
              {CATEGORIES.find((c) => c.slug === article.category)?.label}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">{article.title}</h1>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: CATEGORIES.find((c) => c.slug === article.category)?.label || '', href: `/${article.category}` }, { label: article.title }]} />

        {/* Article Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-b border-gray-200 dark:border-gray-800 mt-4">
          <div className="flex items-center gap-3">
            <Link href={`/author/${article.author.id}`}>
              <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-gray-800" />
            </Link>
            <div>
              <Link href={`/author/${article.author.id}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#37215F] dark:hover:text-purple-400">{article.author.name}</Link>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{formatDate(article.publishedAt)}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime} min read</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'bg-[#37215F] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`} title="Save for later">
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button onClick={() => setLiked(!liked)} className={`p-2 rounded-lg transition-colors ${liked ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`} title="Like">
              <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Updated Badge */}
        {article.updatedAt && (
          <div className="flex items-center gap-2 mt-4 px-4 py-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <span className="text-sm text-amber-700 dark:text-amber-400">This article was updated on {formatDate(article.updatedAt)} to reflect corrections.</span>
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mt-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{article.excerpt}</p>
          <div className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>{article.content}</p>
            <p>Pakistan&apos;s technology sector continues to grow at an unprecedented pace. With government initiatives like the Digital Pakistan Vision and increasing private sector investment, the ecosystem is maturing rapidly. Industry experts believe this momentum will only accelerate in the coming years.</p>
            <p>The implications for local businesses and consumers are significant. From improved digital infrastructure to new startup opportunities, the ripple effects are being felt across the economy.</p>
            <blockquote className="border-l-4 border-[#37215F] pl-4 py-2 my-6 text-gray-600 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
              &quot;Pakistan&apos;s tech ecosystem has evolved from a emerging market to a formidable player in the global innovation landscape.&quot;
            </blockquote>
            <p>As the sector matures, challenges remain — from infrastructure gaps to talent retention. But the overall trajectory is undeniably positive, with stakeholders across the ecosystem working together to address these hurdles.</p>
          </div>
        </article>

        {/* Source Citations */}
        {article.sources && article.sources.length > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Sources & References</h4>
            <ul className="space-y-1">
              {article.sources.map((source, i) => (
                <li key={i} className="text-sm">
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Tag className="w-4 h-4 text-gray-400" />
          {article.tags.map((tag) => (
            <Link key={tag} href={`/search?q=${tag}`} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-[#37215F] hover:text-white transition-colors">
              {tag}
            </Link>
          ))}
        </div>

        {/* Share Bar */}
        <div className="flex items-center gap-3 mt-6 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <Share2 className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Share this article</span>
          <div className="flex items-center gap-2 ml-auto">
            <a href={`https://twitter.com/intent/tweet?url=https://ilmtech.16.jugaar.ai/article/${article.slug}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-[#1DA1F2] hover:text-white transition-colors"><TwitterIcon className="w-4 h-4" /></a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://ilmtech.16.jugaar.ai/article/${article.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-[#1877F2] hover:text-white transition-colors"><FacebookIcon className="w-4 h-4" /></a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://ilmtech.16.jugaar.ai/article/${article.slug}&title=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-colors"><LinkedinIcon className="w-4 h-4" /></a>
          </div>
          <div className="flex items-center gap-1.5 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
            <Share2 className="w-3.5 h-3.5" />
            {article.shares.toLocaleString()} shares
          </div>
        </div>

        {/* Author Card */}
        <div className="mt-8 p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-4">
            <Link href={`/author/${article.author.id}`}>
              <img src={article.author.avatar} alt={article.author.name} className="w-16 h-16 rounded-full" />
            </Link>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Written by</p>
              <Link href={`/author/${article.author.id}`} className="font-bold text-gray-900 dark:text-white text-lg hover:text-[#37215F] dark:hover:text-purple-400">{article.author.name}</Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{article.author.bio}</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5" />
            Comments ({articleComments.length})
          </h3>

          {/* Comment Form */}
          <div className="mb-8 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Leave a comment..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0881BE] resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#37215F] text-white text-sm font-medium hover:bg-[#2a1a4a] transition-colors">
                <Send className="w-4 h-4" />
                Post Comment
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {articleComments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <img src={comment.userAvatar} alt="" className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{comment.userName}</span>
                  <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed ml-11">{comment.content}</p>
                <div className="flex items-center gap-3 ml-11 mt-2">
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-3.5 h-3.5" /> {comment.likes}
                  </button>
                  <button className="text-xs text-gray-400 hover:text-[#0881BE] transition-colors">Reply</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedArticles.map((ra) => (
                <Link key={ra.id} href={`/article/${ra.slug}`} className="group rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                  <img src={ra.featuredImage} alt="" className="w-full h-36 object-cover" />
                  <div className="p-4">
                    <span className="text-[10px] font-semibold" style={{ color: categoryColor }}>{CATEGORIES.find(c => c.slug === ra.category)?.label}</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mt-1 group-hover:text-[#37215F] dark:group-hover:text-purple-400 line-clamp-2">{ra.title}</h4>
                    <span className="text-xs text-gray-400 mt-2 block">{formatDate(ra.publishedAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
