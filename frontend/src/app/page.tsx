import HeroSection from '@/components/home/HeroSection';
import LiveStreamWidget from '@/components/home/LiveStreamWidget';
import NewsGrid from '@/components/home/NewsGrid';
import StartupShowcase from '@/components/home/StartupShowcase';
import SidebarWidgets from '@/components/home/SidebarWidgets';
import AdBanner from '@/components/home/AdBanner';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - full width */}
      <HeroSection />
      
      {/* Ad Banner - full width leaderboard */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AdBanner size="leaderboard" />
      </div>
      
      {/* Main Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            <LiveStreamWidget />
            <NewsGrid />
          </div>
          
          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <SidebarWidgets />
          </div>
        </div>
      </div>
      
      {/* Startup Showcase - full width */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <StartupShowcase />
      </div>
      
      {/* Bottom Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdBanner size="banner" />
      </div>
    </div>
  );
}
