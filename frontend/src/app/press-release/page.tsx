'use client';

import { useState } from 'react';
import { FileText, Upload, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const guidelines = [
  'Press releases should be relevant to the technology industry in Pakistan.',
  'Content must be factual, well-written, and free of promotional language.',
  'Include a clear headline, dateline, and contact information.',
  'Images and attachments should be high-resolution and properly attributed.',
  'IlmTech reserves the right to edit submissions for clarity and style.',
  'Submissions are typically reviewed within 24-48 business hours.',
];

const categories = ['Product Launch', 'Funding', 'Partnership', 'Event', 'Awards', 'Other'];

export default function PressReleasePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Breadcrumb items={[{ label: 'Press Release' }]} />
          <h1 className="mt-6 text-5xl font-bold">Submit Press Release</h1>
          <p className="mt-4 text-xl text-purple-100 max-w-2xl mx-auto">
            Share your news with Pakistan&apos;s tech community. Submit your press release for editorial review.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {submitted ? (
              <Card className="text-center py-16">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Submission Received!</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Thank you for your press release. Our editorial team will review it and get back to you within 24-48 hours.
                </p>
                <Button className="mt-6" onClick={() => setSubmitted(false)}>Submit Another</Button>
              </Card>
            ) : (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Press Release Details</h2>
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Company Name" placeholder="Your company name" required />
                    <Input label="Contact Person" placeholder="Full name" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Email" type="email" placeholder="you@company.com" required />
                    <Input label="Phone" type="tel" placeholder="+92 300 1234567" />
                  </div>
                  <Input label="Headline" placeholder="Press release headline" required />
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                    <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      {categories.map((cat) => (
                        <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                    <textarea
                      rows={8}
                      placeholder="Write or paste your press release content here..."
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Attachments</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload images or documents</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>
                  <Button type="submit" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Submit for Review
                  </Button>
                </form>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-[#37215F] dark:text-purple-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Submission Guidelines</h3>
              </div>
              <ul className="space-y-3">
                {guidelines.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {g}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-gradient-to-br from-[#37215F] to-purple-800 text-white border-0">
              <FileText className="w-8 h-8 mb-3 opacity-80" />
              <h3 className="text-lg font-bold">Need Help?</h3>
              <p className="mt-2 text-sm text-purple-200">
                Contact our editorial team at press@ilmtech.pk for any questions about your submission.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
