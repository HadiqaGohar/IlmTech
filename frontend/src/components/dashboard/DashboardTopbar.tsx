'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, Bell, ChevronRight, Menu } from 'lucide-react';
import Input from '@/components/ui/Input';
import Avatar from '@/components/ui/Avatar';

interface DashboardTopbarProps {
  onToggleSidebar?: () => void;
}

const pageTitleMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/articles': 'Articles',
  '/dashboard/episodes': 'Episodes',
  '/dashboard/startups': 'Startups',
  '/dashboard/users': 'Users',
  '/dashboard/comments': 'Comments',
  '/dashboard/settings': 'Settings',
};

const DashboardTopbar: React.FC<DashboardTopbarProps> = ({ onToggleSidebar }) => {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const pageTitle = pageTitleMap[pathname] || 'Dashboard';
  const segments = pathname.split('/').filter(Boolean);

  const notificationCount = 3;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{pageTitle}</h1>
          <nav className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Link href="/dashboard" className="hover:text-purple-600">
              Home
            </Link>
            {segments.map((segment, index) => {
              const path = '/' + segments.slice(0, index + 1).join('/');
              const label = pageTitleMap[path] || segment.charAt(0).toUpperCase() + segment.slice(1);
              return (
                <React.Fragment key={path}>
                  <ChevronRight className="h-3 w-3" />
                  <Link href={path} className="hover:text-purple-600">
                    {label}
                  </Link>
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:block">
          <Input
            placeholder="Search..."
            icon={<Search className="h-4 w-4" />}
            className="w-64"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-700/50">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    New comment on &quot;Karachi Startup Raises $2.5M&quot;
                  </p>
                  <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                </div>
                <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-700/50">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Article &quot;NITB Cybersecurity Framework&quot; published
                  </p>
                  <p className="mt-1 text-xs text-gray-400">5 hours ago</p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    New user registered: Usman Raza
                  </p>
                  <p className="mt-1 text-xs text-gray-400">1 day ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Avatar src="/avatars/admin.jpg" fallback="Admin User" size="sm" />
            <span className="hidden text-sm font-medium text-gray-700 md:block dark:text-gray-300">
              Admin
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="p-1">
                <Link
                  href="/dashboard/settings"
                  className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  Settings
                </Link>
                <button
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;
