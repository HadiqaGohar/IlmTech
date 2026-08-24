import Breadcrumb from '@/components/layout/Breadcrumb';

const sections = [
  { title: 'Information We Collect', content: 'We collect information you provide directly, such as your name, email address, and any other details you submit through our forms, comments, or newsletter subscriptions. We also automatically collect certain information about your device, browsing actions, and patterns when you visit our website, including IP address, browser type, operating system, referring URLs, and pages visited.' },
  { title: 'How We Use Your Information', content: 'We use the information we collect to operate and improve our website, deliver the content and services you request, send you newsletters and promotional materials (with your consent), respond to your comments and inquiries, monitor and analyze usage trends and preferences, and ensure the security and integrity of our platform.' },
  { title: 'Information Sharing', content: 'We do not sell your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, as required by law, or to protect our rights and safety. We may also share aggregated or de-identified information that cannot reasonably be used to identify you.' },
  { title: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.' },
  { title: 'Cookies', content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings. For more details, please refer to our Cookie Policy.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information. You may also opt out of receiving promotional communications from us at any time by following the unsubscribe instructions in our emails or contacting us directly. To exercise these rights, please contact us at privacy@ilmtech.pk.' },
  { title: 'Contact Us', content: 'If you have any questions or concerns about this Privacy Policy, please contact us at privacy@ilmtech.pk or write to us at IlmTech, Shahrah-e-Faisal, Karachi, Pakistan.' },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
          <h1 className="mt-6 text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-3 text-purple-200">Last updated: August 20, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-10">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            At IlmTech, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the information you provide when using our website and services.
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
