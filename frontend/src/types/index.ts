export interface Author {
  name: string;
  avatar: string;
  role: string;
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
  readTime: number;
  views: number;
  tags: string[];
  isFeatured?: boolean;
  isBreaking?: boolean;
}

export interface Episode {
  id: string;
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  guest: string;
  duration: string;
  publishedAt: string;
  isLive?: boolean;
}

export interface Startup {
  id: string;
  name: string;
  sector: string;
  funding: string;
  founder: string;
  founderTitle: string;
  logo: string;
  description: string;
  founded: string;
  website: string;
  employees: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'editor' | 'contributor' | 'subscriber';
  joinedAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: number;
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
