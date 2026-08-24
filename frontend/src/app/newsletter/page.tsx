'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Zap, Shield, Clock, Newspaper, Send } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { articles } from '@/lib/mockData';
import { formatDate, truncate } from '@/lib/utils';

const benefits = [
  { icon: Zap, title: 'Weekly Digest', description: 'Get the top tech stories delivered every Monday morning.' },
  { icon: Shield, title: 'Exclusive Insights', description: 'Access analysis and opinions not available on our website.' },
  { icon: Clock, title: 'Save Time', description: 'Curated content means you only read what matters most.' },
  { icon: Newspaper, title: 'Stay Informed', description: 'Never miss breaking news or important industry developments.' },
];

const categoryPrefs = [
  'AI & Cloud Computing',
  'IT News & Industry',
  'Cybersecurity',
  'Startups & Funding',
  'Product Reviews',
  'Live Shows & Events',
];

export default function NewsletterPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['AI & Cloud Computing', 'IT News & Industry']);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const previewArticles = articles.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Breadcrumb items={[{ label: 'Newsletter' }]} />
          <h1 className="mt-6 text-5xl font-bold">Stay Updated</h1>
          <p className="mt-4 text-xl text-purple-100 max-w-2xl mx-auto">
            Join thousands of tech enthusiasts who get the best of IlmTech delivered straight to their inbox.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Signup Form */}
        <section className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
            {subscribed ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">You&apos;re Subscribed!</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Check your inbox for a confirmation email. Welcome to the IlmTech community!
                </p>
              </div>
            ) : (
              <div className="text-center">
                <Mail className="w-10 h-10 text-[#37215F] dark:text-purple-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subscribe to Our Newsletter</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Free, weekly, and packed with value. No spam, ever.</p>
                <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
                  <Input type="email" placeholder="Enter your email address" className="flex-1" required />
                  <Button type="submit">
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </form>
              </div>
            )}
          </Card>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Why Subscribe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} hover className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <b.icon className="w-7 h-7 text-[#37215F] dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{b.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{b.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Preferences */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">Customize Your Preferences</h2>
          <Card>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select the topics you&apos;re interested in:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoryPrefs.map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedCategories.includes(cat)
                      ? 'border-[#37215F] dark:border-purple-400 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{cat}</span>
                </label>
              ))}
            </div>
          </Card>
        </section>

        {/* Previous Issues */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Recent Newsletters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewArticles.map((article) => (
              <Card key={article.id} hover>
                <Badge variant="purple" size="sm">Weekly Digest</Badge>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {truncate(article.excerpt, 150)}
                </p>
                <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                  {formatDate(article.publishedAt)}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
