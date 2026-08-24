export interface Author {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
  articlesCount: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  subcategory?: string;
  featuredImage: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  views: number;
  shares: number;
  tags: string[];
  isFeatured?: boolean;
  isBreaking?: boolean;
  sources?: { label: string; url: string }[];
}

export interface Episode {
  id: string;
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  guest: string;
  guestTitle?: string;
  duration: string;
  publishedAt: string;
  isLive?: boolean;
}

export interface Startup {
  id: string;
  name: string;
  slug: string;
  sector: string;
  city: string;
  funding: string;
  fundingStage: string;
  founder: string;
  founderTitle: string;
  logo: string;
  description: string;
  founded: string;
  website: string;
  employees: number;
  tags: string[];
  fundingRounds: FundingRound[];
  investors: string[];
}

export interface FundingRound {
  round: string;
  amount: string;
  date: string;
  leadInvestor?: string;
}

export interface Investor {
  id: string;
  name: string;
  type: string;
  logo: string;
  portfolio: string[];
  totalInvested: string;
  website: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'editor' | 'contributor' | 'subscriber';
  joinedAt: string;
  bookmarks: string[];
  readingList: string[];
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export type Category = 'it-news' | 'startups' | 'cybersecurity' | 'ai-cloud' | 'reviews';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface DashboardStat {
  title: string;
  value: string | number;
  change: number;
  icon: string;
}

export interface Tag {
  name: string;
  count: number;
  slug: string;
}
