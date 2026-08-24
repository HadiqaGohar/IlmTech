import { NavItem, Category } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'News',
    href: '/it-news',
    children: [
      { label: 'IT News', href: '/it-news' },
      { label: 'Cybersecurity', href: '/cybersecurity' },
      { label: 'AI & Cloud', href: '/ai-cloud' },
      { label: 'Reviews', href: '/reviews' },
    ],
  },
  { label: 'Startups', href: '/startups' },
  { label: 'Startup Directory', href: '/startup-directory' },
  { label: 'Live Show', href: '/live-shows' },
  { label: 'About', href: '/about' },
];

export const CATEGORIES: { slug: Category; label: string; description: string; color: string }[] = [
  {
    slug: 'it-news',
    label: 'IT News',
    description: 'Latest technology news and updates from Pakistan and around the world.',
    color: '#8B5CF6',
  },
  {
    slug: 'startups',
    label: 'Startups',
    description: 'Stories about Pakistani startups, funding rounds, and entrepreneurship.',
    color: '#3B82F6',
  },
  {
    slug: 'cybersecurity',
    label: 'Cybersecurity',
    description: 'Cyber threats, security frameworks, and digital protection insights.',
    color: '#EF4444',
  },
  {
    slug: 'ai-cloud',
    label: 'AI & Cloud',
    description: 'Artificial intelligence, machine learning, and cloud computing trends.',
    color: '#10B981',
  },
  {
    slug: 'reviews',
    label: 'Reviews',
    description: 'In-depth reviews of the latest tech products, software, and gadgets.',
    color: '#F59E0B',
  },
];

export const DASHBOARD_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Articles', href: '/dashboard/articles' },
  { label: 'Episodes', href: '/dashboard/episodes' },
  { label: 'Startups', href: '/dashboard/startups' },
  { label: 'Users', href: '/dashboard/users' },
  { label: 'Comments', href: '/dashboard/comments' },
  { label: 'Settings', href: '/dashboard/settings' },
];

export const BRAND_COLORS = {
  purple: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#9333EA',
    700: '#7E22CE',
    800: '#6B21A8',
    900: '#581C87',
  },
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  dark: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
};
