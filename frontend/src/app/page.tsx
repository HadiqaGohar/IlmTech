import HeroSection from '@/components/home/HeroSection';
import LiveStreamWidget from '@/components/home/LiveStreamWidget';
import NewsGrid from '@/components/home/NewsGrid';
import StartupShowcase from '@/components/home/StartupShowcase';
import SidebarWidgets from '@/components/home/SidebarWidgets';
import AdBanner from '@/components/home/AdBanner';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section - contained */}
      <section className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <HeroSection />
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner size="leaderboard" />
      </div>

      {/* Main Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Main Content - 2/3 */}
          <div className="lg:col-span-2 space-y-10">
            <LiveStreamWidget />
            <NewsGrid />
          </div>
          {/* Sidebar - 1/3 */}
          <div className="lg:col-span-1">
            <SidebarWidgets />
          </div>
        </div>
      </div>

      {/* Startup Showcase */}
      <section className="bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <StartupShowcase />
        </div>
      </section>

      {/* Bottom Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AdBanner size="banner" />
      </div>
    </div>
  );
}
