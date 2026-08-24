'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

const STORIES = {
  'sadapay-founder-journey': {
    title: 'From Banker to Founder: The SadaPay Story',
    subtitle: 'How Mishal Rizvi left a cushy banking career to build Pakistan\'s first digital-first neobank',
    heroImage: 'https://picsum.photos/seed/sadapay-founder/1200/600',
    author: 'Ahmed Khan',
    authorAvatar: 'https://i.pravatar.cc/150?u=ahmed',
    readTime: '12 min read',
    publishDate: 'August 2026',
    content: [
      { type: 'intro', text: 'In the bustling streets of Karachi, where traditional banks have ruled for decades, one woman dared to reimagine what banking could look like for 220 million Pakistanis. Mishal Rizvi, a former VP at Standard Chartered, left behind a six-figure salary and a corner office to chase a vision that most considered impossible.' },
      { type: 'pullquote', text: '"Everyone told me I was crazy. Why leave a secure banking job in London to start a fintech in Pakistan? But I saw something they didn\'t — 100 million unbanked Pakistanis who deserved better."', attribution: 'Mishal Rizvi, CEO & Co-founder, SadaPay' },
      { type: 'text', text: 'The journey began in 2019, when Mishal and co-founder Brandon Timinsky noticed a massive gap in Pakistan\'s financial landscape. While the rest of the world was moving toward digital banking, Pakistan still relied heavily on brick-and-mortar branches, paperwork-heavy account openings, and high transaction fees.' },
      { type: 'timeline', events: [
        { date: 'Jan 2019', title: 'The Idea', desc: 'Mishal and Brandon identify the gap in Pakistan\'s banking sector during a chance meeting at a fintech conference in Singapore.' },
        { date: 'Jun 2019', title: 'Company Founded', desc: 'SadaPay is incorporated in Singapore with plans to launch in Pakistan. Initial bootstrapping of $200K.' },
        { date: 'Mar 2020', title: 'SECP Approval', desc: 'After months of regulatory hurdles, SadaPay receives In-Principle Approval from the State Bank of Pakistan.' },
        { date: 'Sep 2020', title: 'Seed Round', desc: 'Raises $5.2M seed round led by Indus Valley Capital, one of Pakistan\'s largest fintech seed rounds at the time.' },
        { date: 'May 2021', title: 'Beta Launch', desc: 'SadaPay launches its beta app with 5,000 early adopters. The waitlist grows to 50,000 within weeks.' },
        { date: 'Jan 2023', title: 'Public Launch', desc: 'Full public launch with zero-fee international debit cards. 100,000 users in the first month.' },
        { date: 'Jan 2026', title: 'Series B', desc: 'Raises $72M Series B led by Global Ventures, becoming one of Pakistan\'s largest fintech raises.' },
      ]},
      { type: 'pullquote', text: '"Fintech in Pakistan isn\'t just about convenience — it\'s about financial inclusion. Every digital account opened is a family brought into the formal economy."', attribution: 'Brandon Timinsky, Co-founder, SadaPay' },
      { type: 'text', text: 'The challenges were immense. Pakistan\'s regulatory environment for fintech is complex, the infrastructure is still developing, and trust in digital financial services is slowly building. But SadaPay\'s approach — offering a sleek, Instagram-worthy app with zero fees on international transactions — struck a chord with Pakistan\'s young, digitally-native population.' },
      { type: 'text', text: 'Today, SadaPay processes over $2 billion in annual transactions, serves 3 million users, and has become the poster child for Pakistan\'s fintech revolution. The journey from a napkin sketch to a $200M+ valuation is a testament to what happens when vision meets relentless execution.' },
    ],
  },
  'bazaar-b2b-revolution': {
    title: 'Bazaar: Rewriting B2B Commerce in Pakistan',
    subtitle: 'How Saad Jangda and Hamza Pervez are digitizing Pakistan\'s $100B informal retail market',
    heroImage: 'https://picsum.photos/seed/bazaar-founder/1200/600',
    author: 'Fatima Ali',
    authorAvatar: 'https://i.pravatar.cc/150?u=fatima',
    readTime: '10 min read',
    publishDate: 'July 2026',
    content: [
      { type: 'intro', text: 'Pakistan\'s retail market is worth over $100 billion, yet 95% of it operates through informal channels — small kiryana stores that rely on handwritten ledgers and phone calls to distributors. Bazaar is changing that, one store at a time.' },
      { type: 'pullquote', text: '"We didn\'t just want to build an app. We wanted to fundamentally transform how commerce works in Pakistan\'s heartland."', attribution: 'Saad Jangda, CEO, Bazaar' },
      { type: 'timeline', events: [
        { date: 'Feb 2020', title: 'Founded', desc: 'Saad and Hamza leave their corporate jobs to start Bazaar from a small office in Karachi.' },
        { date: 'Aug 2020', title: 'Seed Round', desc: 'Raises $1.3M seed round from Y Combinator, Fatima Gobi Ventures, and others.' },
        { date: 'Jun 2021', title: 'Series A', desc: 'Closes $30M Series A led by Tiger Global, the largest Series A for a Pakistani B2B startup.' },
        { date: 'Feb 2024', title: 'Series B', desc: 'Raises $65M Series B, reaching 100,000+ stores on the platform.' },
        { date: '2026', title: 'Expansion', desc: 'Expands into 50+ cities across Pakistan with 150,000+ registered stores.' },
      ]},
      { type: 'text', text: 'The insight was simple but powerful: Pakistan\'s millions of small retailers were being underserved by traditional distribution channels. Bazaar built a mobile-first platform that lets shop owners order inventory directly from brands and manufacturers, eliminating middlemen and reducing costs by 15-20%.' },
      { type: 'pullquote', text: '"Every kiryana store in Pakistan is a small business owner with dreams bigger than their shop. We\'re giving them the tools to compete with the big players."', attribution: 'Hamza Pervez, Co-founder, Bazaar' },
      { type: 'text', text: 'With over 150,000 stores on the platform and partnerships with 500+ brands, Bazaar has become the backbone of Pakistan\'s digital retail revolution. The company is now eyeing expansion into Bangladesh and Southeast Asia, where similar dynamics exist.' },
    ],
  },
};

const STORY_SLUGS = Object.keys(STORIES);

export default function FounderDiaryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const story = STORIES[slug as keyof typeof STORIES];

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Story not found</h1>
          <Link href="/" className="text-[#0881BE] hover:underline">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
        <img src={story.heroImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#37215F] text-white text-xs font-bold mb-4">FOUNDER DIARIES</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{story.title}</h1>
            <p className="text-lg text-gray-200 mt-3">{story.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Meta */}
        <div className="flex items-center justify-between pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <img src={story.authorAvatar} alt="" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{story.author}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />{story.publishDate}
                <span>·</span>
                <Clock className="w-3 h-3" />{story.readTime}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"><Bookmark className="w-4 h-4" /></button>
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"><Share2 className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-10 space-y-8">
          {story.content.map((block, i) => {
            if (block.type === 'intro') {
              return <p key={i} className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{block.text}</p>;
            }
            if (block.type === 'text') {
              return <p key={i} className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{block.text}</p>;
            }
            if (block.type === 'pullquote') {
              return (
                <blockquote key={i} className="my-10 pl-6 border-l-4 border-[#37215F]">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug italic">{block.text}</p>
                  {block.attribution && (
                    <cite className="block mt-3 text-sm text-gray-500 dark:text-gray-400 not-italic">— {block.attribution}</cite>
                  )}
                </blockquote>
              );
            }
            if (block.type === 'timeline') {
              return (
                <div key={i} className="my-10 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">The Journey</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#37215F] to-[#0881BE]" />
                    <div className="space-y-6">
                      {block.events?.map((event, j) => (
                        <div key={j} className="relative pl-10">
                          <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-[#37215F] ring-4 ring-white dark:ring-gray-900" />
                          <span className="text-xs font-bold text-[#0881BE]">{event.date}</span>
                          <h4 className="font-bold text-gray-900 dark:text-white mt-0.5">{event.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{event.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* More Stories */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">More Founder Diaries</h3>
          <div className="space-y-3">
            {STORY_SLUGS.filter((s) => s !== slug).map((s) => {
              const otherStory = STORIES[s as keyof typeof STORIES];
              return (
                <Link key={s} href={`/founder-diaries/${s}`} className="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 dark:text-white hover:text-[#37215F]">{otherStory.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{otherStory.subtitle}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
