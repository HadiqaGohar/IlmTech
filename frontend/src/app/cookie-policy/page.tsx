import Breadcrumb from '@/components/layout/Breadcrumb';

const sections = [
  { title: 'What Are Cookies', content: 'Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and supply information to the site owners. Cookies can be "persistent" (remaining on your device until deleted) or "session-based" (deleted when you close your browser).' },
  { title: 'How We Use Cookies', content: 'IlmTech uses cookies to remember your preferences and settings, understand how you interact with our website, improve our content and services, analyze traffic patterns, and deliver personalized advertisements. We use both first-party cookies (set by our website) and third-party cookies (set by external services we use).' },
  { title: 'Types of Cookies We Use', content: 'Essential Cookies: Required for the website to function properly, such as maintaining your session and remembering your preferences. Analytics Cookies: Help us understand how visitors interact with our website by collecting anonymous usage data. Functionality Cookies: Allow enhanced functionality and personalization, such as remembering your content preferences. Advertising Cookies: Used to deliver relevant advertisements and track campaign performance.' },
  { title: 'Managing Cookies', content: 'You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies, though this may affect your browsing experience. You can typically find cookie settings in your browser\'s "Preferences" or "Options" menu. To learn more about managing cookies, visit aboutcookies.org or your browser\'s help documentation.' },
  { title: 'Contact Us', content: 'If you have any questions about our use of cookies or this Cookie Policy, please contact us at privacy@ilmtech.pk or write to us at IlmTech, Shahrah-e-Faisal, Karachi, Pakistan.' },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Breadcrumb items={[{ label: 'Cookie Policy' }]} />
          <h1 className="mt-6 text-4xl font-bold">Cookie Policy</h1>
          <p className="mt-3 text-purple-200">Last updated: August 20, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-10">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            This Cookie Policy explains how IlmTech uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
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
