'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Check, X, Trophy, Star, ArrowLeft } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

const COMPARISONS: Record<string, any> = {
  'iphone-17-pro-max-vs-samsung-galaxy-s26-ultra': {
    title: 'iPhone 17 Pro Max vs Samsung Galaxy S26 Ultra',
    category: 'Smartphones',
    heroImage: 'https://picsum.photos/seed/iphone-vs-samsung/1200/500',
    productA: { name: 'iPhone 17 Pro Max', brand: 'Apple', image: 'https://picsum.photos/seed/iphone17/300/300', price: '$1,199' },
    productB: { name: 'Samsung Galaxy S26 Ultra', brand: 'Samsung', image: 'https://picsum.photos/seed/galaxys26/300/300', price: '$1,299' },
    specs: [
      { label: 'Display', a: '6.9" ProMotion OLED', b: '6.9" Dynamic AMOLED 2X', winner: 'tie' },
      { label: 'Processor', a: 'A21 Bionic', b: 'Snapdragon 8 Elite', winner: 'a' },
      { label: 'RAM', a: '12GB', b: '16GB', winner: 'b' },
      { label: 'Storage', a: '256GB / 512GB / 1TB', b: '256GB / 512GB / 1TB', winner: 'tie' },
      { label: 'Main Camera', a: '48MP (Main) + 12MP (Ultra) + 12MP (Tele)', b: '200MP (Main) + 50MP (Ultra) + 50MP (Tele)', winner: 'b' },
      { label: 'Battery', a: '4,685 mAh', b: '5,000 mAh', winner: 'b' },
      { label: 'Charging', a: '45W Wired, 25W MagSafe', b: '65W Wired, 15W Wireless', winner: 'b' },
      { label: 'OS', a: 'iOS 19', b: 'Android 16 (One UI 8)', winner: 'tie' },
      { label: 'AI Features', a: 'Apple Intelligence 3.0', b: 'Galaxy AI 2.0', winner: 'a' },
      { label: 'S Pen', a: 'Not included', b: 'Built-in', winner: 'b' },
      { label: 'Weight', a: '227g', b: '233g', winner: 'a' },
      { label: 'Water Resistance', a: 'IP68', b: 'IP68', winner: 'tie' },
    ],
    verdict: { winner: 'b', summary: 'The Samsung Galaxy S26 Ultra edges ahead with its superior camera system, larger battery, and built-in S Pen. However, the iPhone 17 Pro Max counters with better AI integration and the seamless Apple ecosystem. Choose Samsung for hardware versatility, iPhone for software elegance.' },
    ratingA: 9.0,
    ratingB: 9.2,
  },
};

export default function ComparePage() {
  const params = useParams();
  const slug = params.slug as string;
  const comparison = COMPARISONS[slug];

  if (!comparison) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Comparison not found</h1>
          <Link href="/reviews" className="text-[#0881BE] hover:underline">Browse Reviews</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="relative h-[300px] overflow-hidden">
        <img src={comparison.heroImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-5xl mx-auto px-4 pb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold mb-3">VS COMPARISON</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{comparison.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <img src={comparison.productA.image} alt="" className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl mx-auto mb-3 bg-white dark:bg-gray-800 p-2 shadow-md" />
            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{comparison.productA.name}</h3>
            <p className="text-sm text-gray-500">{comparison.productA.price}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-gray-900 dark:text-white">{comparison.ratingA}/10</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-300 dark:text-gray-600">VS</span>
          </div>
          <div className="text-center">
            <img src={comparison.productB.image} alt="" className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl mx-auto mb-3 bg-white dark:bg-gray-800 p-2 shadow-md" />
            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{comparison.productB.name}</h3>
            <p className="text-sm text-gray-500">{comparison.productB.price}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-gray-900 dark:text-white">{comparison.ratingB}/10</span>
            </div>
          </div>
        </div>

        {/* Spec Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h2 className="font-bold text-gray-900 dark:text-white">Specifications</h2>
          </div>
          {comparison.specs.map((spec: any, i: number) => (
            <div key={i} className={`grid grid-cols-3 gap-4 px-5 py-3.5 ${i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'} ${i < comparison.specs.length - 1 ? 'border-b border-gray-100 dark:border-gray-700/50' : ''}`}>
              <div className={`text-sm ${spec.winner === 'a' ? 'font-bold text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                {spec.a}
                {spec.winner === 'a' && <Check className="w-4 h-4 inline ml-1 text-green-500" />}
              </div>
              <div className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase py-1">{spec.label}</div>
              <div className={`text-sm text-right ${spec.winner === 'b' ? 'font-bold text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                {spec.winner === 'b' && <Check className="w-4 h-4 inline mr-1 text-green-500" />}
                {spec.b}
              </div>
            </div>
          ))}
        </div>

        {/* Verdict */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-6 h-6 text-yellow-300" />
            <h2 className="text-xl font-bold">Our Verdict</h2>
          </div>
          <p className="text-purple-100 leading-relaxed">{comparison.verdict.summary}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-yellow-400 text-gray-900 text-sm font-bold">
              Winner: {comparison.verdict.winner === 'a' ? comparison.productA.name : comparison.productB.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
