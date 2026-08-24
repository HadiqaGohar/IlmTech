'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { articles, comments, users } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import {
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Send,
  ArrowLeft,
  Newspaper,
  Tag,
  TrendingUp,
  Mail,
  MessageSquare,
} from 'lucide-react';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [commentText, setCommentText] = useState('');

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center max-w-md">
          <Newspaper className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Article Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The article you are looking for does not exist or has been moved.
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

  const category = CATEGORIES.find((c) => c.slug === article.category);
  const articleComments = comments.filter((c) => c.articleId === article.id);
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);
  const trendingArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  function getUserForComment(commentUserId: string) {
    return users.find((u) => u.id === commentUserId);
  }

  const categoryBadgeVariant =
    article.category === 'startups'
      ? 'blue'
      : article.category === 'cybersecurity'
      ? 'red'
      : article.category === 'ai-cloud'
      ? 'green'
      : article.category === 'reviews'
      ? 'yellow'
      : 'purple';

  const simulatedContent = [
    { type: 'paragraph' as const, text: article.content },
    { type: 'heading' as const, text: 'Key Developments' },
    {
      type: 'paragraph' as const,
      text: 'The implications of this development extend beyond the immediate sector. Industry analysts predict that this move will create a ripple effect across the technology landscape in Pakistan, potentially attracting more international investment and talent to the region.',
    },
    {
      type: 'blockquote' as const,
      text: "This represents a pivotal moment for Pakistan's technology sector. We are seeing the convergence of local innovation and global recognition that has been building for years.",
    },
    { type: 'heading' as const, text: 'Expert Analysis' },
    {
      type: 'paragraph' as const,
      text: 'According to industry experts, the success of this initiative could serve as a blueprint for other developing nations looking to strengthen their technology infrastructure. The combination of government support, private sector innovation, and a growing pool of tech talent has created an ideal environment for growth.',
    },
    {
      type: 'list' as const,
      items: [
        "Increased foreign direct investment in Pakistan's tech sector",
        'Creation of high-skilled employment opportunities',
        'Enhancement of digital infrastructure across major cities',
        "Strengthening of Pakistan's position in the global tech supply chain",
      ],
    },
    {
      type: 'paragraph' as const,
      text: "As Pakistan continues to develop its technology ecosystem, developments like these underscore the country's potential to become a major player in the regional and global technology landscape. The coming months will be crucial in determining the long-term impact of these changes.",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: category?.label || article.category, href: `/news/${article.category}` },
            { label: article.title },
          ]}
        />
      </div>

      {/* Hero Image */}
      <div className="w-full h-64 md:h-96 bg-gradient-to-br from-[#37215F] to-[#0881BE] relative">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <Newspaper className="w-20 h-20 mx-auto mb-4 opacity-50" />
            <p className="text-lg opacity-70">Featured Image</p>
          </div>
        </div>
        {category && (
          <div className="absolute top-6 left-6">
            <Badge variant={categoryBadgeVariant}>{category.label}</Badge>
          </div>
        )}
      </div>

      {/* Article Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Avatar src={article.author.avatar} fallback={article.author.name} size="sm" />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">{article.author.name}</span>
                    <span className="block text-xs">{article.author.role}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDate(article.publishedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min read
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {article.views.toLocaleString()} views
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="mb-8">
              {simulatedContent.map((block, index) => {
                if (block.type === 'paragraph') {
                  return (
                    <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'heading') {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'blockquote') {
                  return (
                    <blockquote
                      key={index}
                      className="border-l-4 border-[#37215F] pl-4 italic text-gray-600 dark:text-gray-400 my-6 bg-purple-50 dark:bg-purple-900/10 py-3 pr-3 rounded-r-lg"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <ul key={index} className="space-y-2 mb-4">
                      {block.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#37215F] dark:bg-[#0881BE] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap mb-6">
              <Tag className="w-4 h-4 text-gray-400" />
              {article.tags.map((tag) => (
                <Badge key={tag} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Share:</span>
              <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Author Card */}
            <Card className="mb-8">
              <div className="flex items-start gap-4">
                <Avatar src={article.author.avatar} fallback={article.author.name} size="lg" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{article.author.name}</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">{article.author.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Passionate technology journalist covering the latest developments in Pakistan&apos;s
                    growing tech ecosystem. With years of experience in the industry,{' '}
                    {article.author.name.split(' ')[0]} brings deep insights and analysis to every story.
                  </p>
                </div>
              </div>
            </Card>

            {/* Comments Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                Comments ({articleComments.length})
              </h2>

              {/* Comment Form */}
              <Card className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Leave a Comment</h3>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-purple-400 resize-none"
                  rows={4}
                />
                <div className="mt-3 flex justify-end">
                  <Button variant="primary" size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </Card>

              {/* Comment List */}
              <div className="space-y-4">
                {articleComments.map((comment) => {
                  const commentUser = getUserForComment(comment.userId);
                  return (
                    <Card key={comment.id} padding="sm">
                      <div className="flex items-start gap-3">
                        <Avatar
                          src={commentUser?.avatar}
                          fallback={commentUser?.name || 'User'}
                          size="sm"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-900 dark:text-white">
                              {commentUser?.name || 'Anonymous'}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{comment.content}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
                              <Heart className="w-3.5 h-3.5" />
                              {comment.likes}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
                {articleComments.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                )}
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((related) => (
                    <Link key={related.id} href={`/article/${related.slug}`}>
                      <Card hover className="h-full">
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-3 flex items-center justify-center">
                          <Newspaper className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        <Badge
                          variant={
                            related.category === 'startups'
                              ? 'blue'
                              : related.category === 'cybersecurity'
                              ? 'red'
                              : related.category === 'ai-cloud'
                              ? 'green'
                              : related.category === 'reviews'
                              ? 'yellow'
                              : 'purple'
                          }
                          size="sm"
                        >
                          {CATEGORIES.find((c) => c.slug === related.category)?.label}
                        </Badge>
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
              {/* Trending Widget */}
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#37215F] dark:text-purple-400" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Trending Now</h3>
                </div>
                <ol className="space-y-3">
                  {trendingArticles.map((trending, index) => (
                    <li key={trending.id} className="flex gap-3 group">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-400">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <Link
                          href={`/article/${trending.slug}`}
                          className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#37215F] dark:group-hover:text-purple-400 transition-colors line-clamp-2"
                        >
                          {trending.title}
                        </Link>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <Eye className="w-3 h-3" />
                          {trending.views.toLocaleString()} views
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>

              {/* Newsletter Widget */}
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5 text-[#0881BE] dark:text-blue-400" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Stay Updated</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Get the latest tech news delivered to your inbox.
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
