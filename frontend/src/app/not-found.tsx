import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-black bg-gradient-to-br from-[#37215F] to-[#0881BE] bg-clip-text text-transparent select-none">
          404
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-[#37215F] to-[#0881BE] mx-auto rounded-full my-6" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Page Not Found</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Search */}
        <div className="mt-8 max-w-sm mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for articles..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <Link href="/">
          <Button size="lg" className="mt-8">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
