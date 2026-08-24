'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Video,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Layers,
} from 'lucide-react';
import { DASHBOARD_NAV } from '@/lib/constants';
import Avatar from '@/components/ui/Avatar';

const iconMap: Record<string, React.ElementType> = {
  Dashboard: LayoutDashboard,
  Articles: FileText,
  Episodes: Video,
  Startups: Layers,
  Users: Users,
  Comments: MessageSquare,
  Settings: Settings,
};

const DashboardSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const currentUser = {
    name: 'Admin User',
    avatar: '/avatars/admin.jpg',
    role: 'Administrator',
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-gray-900 p-2 text-white lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gray-900 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
              <span className="text-sm font-bold text-white">I</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">IlmTech</span>
              <span className="rounded-md bg-purple-600/20 px-2 py-0.5 text-xs font-medium text-purple-400">
                Admin
              </span>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {DASHBOARD_NAV.map((item) => {
              const Icon = iconMap[item.label] || LayoutDashboard;
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <Avatar src={currentUser.avatar} fallback={currentUser.name} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-400 truncate">{currentUser.role}</p>
            </div>
            <button
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
