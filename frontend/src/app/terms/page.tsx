import Breadcrumb from '@/components/layout/Breadcrumb';

const sections = [
  { title: 'Acceptance of Terms', content: 'By accessing and using the IlmTech website and its services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website. We reserve the right to modify these terms at any time, and continued use of the site constitutes acceptance of any changes.' },
  { title: 'User Accounts', content: 'When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.' },
  { title: 'Content', content: 'All articles, reviews, videos, and other content published on IlmTech are created by our editorial team and contributors. While we strive for accuracy, we do not guarantee the completeness or reliability of any content. Content is provided for informational purposes only and should not be considered professional advice. Users may share our content through social media and other channels with proper attribution.' },
  { title: 'Intellectual Property', content: 'All content, trademarks, logos, and intellectual property on the IlmTech website are owned by or licensed to IlmTech. You may not reproduce, distribute, modify, or create derivative works from our content without prior written permission. Brief quotations for commentary, news reporting, or educational purposes may be used with appropriate credit and link to the original article.' },
  { title: 'Limitation of Liability', content: 'IlmTech and its team members shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or reliance on our content. We do not warrant that our website will be uninterrupted, error-free, or free of viruses or other harmful components. Your use of our website is at your own risk.' },
  { title: 'Governing Law', content: 'These Terms of Service are governed by and construed in accordance with the laws of Pakistan. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Karachi, Sindh, Pakistan. If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.' },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Breadcrumb items={[{ label: 'Terms of Service' }]} />
          <h1 className="mt-6 text-4xl font-bold">Terms of Service</h1>
          <p className="mt-3 text-purple-200">Last updated: August 20, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-10">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Welcome to IlmTech. These Terms of Service outline the rules and regulations for the use of our website and services. Please read them carefully before using our platform.
          </p>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
