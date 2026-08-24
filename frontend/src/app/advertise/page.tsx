'use client';

import { useState } from 'react';
import { Megaphone, Monitor, FileText, Mail, Video, Users, Eye, Send, CheckCircle } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const adFormats = [
  { icon: Monitor, title: 'Banner Ads', description: 'Eye-catching display banners across our website with premium placement on homepage and category pages.', specs: 'Leaderboard (728x90), Sidebar (300x250), Mobile (320x50)' },
  { icon: FileText, title: 'Sponsored Content', description: 'Native articles written by our editorial team that seamlessly blend with our editorial content.', specs: '500-800 words, 1 featured image, social media promotion' },
  { icon: Mail, title: 'Newsletter Sponsorship', description: 'Reach our engaged subscriber base directly in their inbox with targeted newsletter placements.', specs: 'Header, body, or dedicated email blast' },
  { icon: Video, title: 'Video Ads', description: 'Pre-roll and mid-roll video ad placements on our YouTube live shows and video content.', specs: '15s or 30s spots, skippable and non-skippable options' },
];

const stats = [
  { icon: Users, value: '500K+', label: 'Monthly Readers' },
  { icon: Eye, value: '2M+', label: 'Monthly Page Views' },
  { icon: Mail, value: '50K+', label: 'Newsletter Subscribers' },
  { icon: Megaphone, value: '85%', label: 'Audience in Pakistan' },
];

export default function AdvertisePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Breadcrumb items={[{ label: 'Advertise' }]} />
          <h1 className="mt-6 text-5xl font-bold">Advertise with IlmTech</h1>
          <p className="mt-4 text-xl text-purple-100 max-w-2xl mx-auto">
            Reach Pakistan&apos;s largest tech-savvy audience through our multi-platform advertising solutions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Audience Stats */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Our Audience</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} hover className="text-center">
                <stat.icon className="w-8 h-8 text-[#37215F] dark:text-purple-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Ad Formats */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Ad Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adFormats.map((format) => (
              <Card key={format.title} hover>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 shrink-0">
                    <format.icon className="w-6 h-6 text-[#37215F] dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{format.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{format.description}</p>
                    <p className="mt-2 text-xs text-[#0881BE] dark:text-blue-400 font-medium">{format.specs}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Rate Card Placeholder */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Rate Card</h2>
          <Card className="overflow-hidden !p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="text-left px-6 py-4 font-semibold text-gray-900 dark:text-white">Ad Format</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900 dark:text-white">Placement</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900 dark:text-white">Starting Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">Banner Ads</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Homepage / Category Pages</td>
                  <td className="px-6 py-4 font-medium text-[#37215F] dark:text-purple-400">PKR 50,000/mo</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">Sponsored Content</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Featured Article</td>
                  <td className="px-6 py-4 font-medium text-[#37215F] dark:text-purple-400">PKR 100,000/article</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">Newsletter</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Header / Body / Dedicated</td>
                  <td className="px-6 py-4 font-medium text-[#37215F] dark:text-purple-400">PKR 75,000/send</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">Video Ads</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Pre-roll / Mid-roll</td>
                  <td className="px-6 py-4 font-medium text-[#37215F] dark:text-purple-400">PKR 60,000/campaign</td>
                </tr>
              </tbody>
            </table>
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 dark:text-gray-400">
              * Rates are indicative. Custom packages available. Contact us for a detailed proposal.
            </div>
          </Card>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Get a Quote</h2>
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <Card className="text-center py-16">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Thank You!</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Our advertising team will contact you within 24 hours with a custom proposal.
                </p>
                <Button className="mt-6" onClick={() => setSubmitted(false)}>Send Another Inquiry</Button>
              </Card>
            ) : (
              <Card>
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Name" placeholder="Your name" required />
                    <Input label="Company" placeholder="Company name" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Email" type="email" placeholder="you@company.com" required />
                    <Input label="Phone" type="tel" placeholder="+92 300 1234567" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Interested In</label>
                    <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <option>Banner Ads</option>
                      <option>Sponsored Content</option>
                      <option>Newsletter Sponsorship</option>
                      <option>Video Ads</option>
                      <option>Custom Package</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your advertising goals..."
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                    />
                  </div>
                  <Button type="submit" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Request Quote
                  </Button>
                </form>
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
