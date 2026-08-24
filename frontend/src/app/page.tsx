import HeroSection from '@/components/home/HeroSection';
import LiveStreamWidget from '@/components/home/LiveStreamWidget';
import NewsGrid from '@/components/home/NewsGrid';
import StartupShowcase from '@/components/home/StartupShowcase';
import SidebarWidgets from '@/components/home/SidebarWidgets';
import AdBanner from '@/components/home/AdBanner';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HeroSection />
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner size="leaderboard" />
      </div>

      {/* Main Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <LiveStreamWidget />
            <NewsGrid />
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SidebarWidgets />
          </div>
        </div>
      </div>

      {/* Startup Showcase */}
      <section className="bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <StartupShowcase />
        </div>
      </section>

      {/* Bottom Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdBanner size="banner" />
      </div>
    </div>
  );
}
