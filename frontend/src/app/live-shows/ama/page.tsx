'use client';

import React, { useState } from 'react';
import { Radio, ThumbsUp, MessageSquare, Clock, Send, ChevronUp } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

const MOCK_QUESTIONS = [
  { id: '1', user: 'TechFan_PK', text: 'What are the biggest challenges for Pakistani startups in 2026?', votes: 142, time: '2 min ago', status: 'answered' },
  { id: '2', user: 'Investor_Lahore', text: 'How do you see AI changing the fintech landscape in Pakistan?', votes: 98, time: '5 min ago', status: 'live' },
  { id: '3', user: 'StartupFounder', text: 'What advice would you give to first-time founders raising a seed round?', votes: 87, time: '8 min ago', status: 'answered' },
  { id: '4', user: 'DevCommunity', text: 'Is the Pakistan tech talent pool ready for AI/ML roles globally?', votes: 76, time: '12 min ago', status: 'pending' },
  { id: '5', user: 'CryptoNerd', text: 'What\'s the regulatory outlook for crypto and blockchain in Pakistan?', votes: 64, time: '15 min ago', status: 'pending' },
  { id: '6', user: 'WomenInTech', text: 'How can we increase female participation in Pakistan\'s tech ecosystem?', votes: 58, time: '18 min ago', status: 'pending' },
  { id: '7', user: 'LahoreDev', text: 'Will Pakistan ever have a unicorn startup? Which sector is closest?', votes: 52, time: '22 min ago', status: 'answered' },
  { id: '8', user: 'EduTechFan', text: 'How is edtech evolving in rural Pakistan?', votes: 41, time: '25 min ago', status: 'pending' },
];

export default function AMAPage() {
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sortBy, setSortBy] = useState<'votes' | 'recent'>('votes');

  const sorted = [...MOCK_QUESTIONS].sort((a, b) => sortBy === 'votes' ? b.votes - a.votes : 0);

  const handleSubmit = () => {
    if (!question.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setQuestion('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Live Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-red-600 text-xs font-bold animate-pulse">
              <Radio className="w-3 h-3" /> LIVE
            </span>
            <span className="text-red-100 text-sm">1,247 viewers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Live Q&A: Pakistan Tech Ecosystem 2026</h1>
          <p className="text-red-100 mt-2">Ask questions to our panel of founders and investors. Top voted questions get answered live!</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ask Question */}
        <div className="mb-8 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="font-bold text-gray-900 dark:text-white mb-3">Ask a Question</h2>
          {submitted ? (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
              <p className="text-green-700 dark:text-green-400 font-medium">✅ Question submitted! It will appear after review.</p>
            </div>
          ) : (
            <div className="flex gap-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Type your question here..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button onClick={handleSubmit} className="px-5 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit
              </button>
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
          <button onClick={() => setSortBy('votes')} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${sortBy === 'votes' ? 'bg-[#37215F] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>Top Voted</button>
          <button onClick={() => setSortBy('recent')} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${sortBy === 'recent' ? 'bg-[#37215F] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>Most Recent</button>
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {sorted.map((q) => (
            <div key={q.id} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-400 hover:text-[#37215F] transition-colors">
                  <ChevronUp className="w-5 h-5" />
                </button>
                <span className="font-bold text-gray-900 dark:text-white text-sm">{q.votes}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-[#37215F]">{q.user}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{q.time}</span>
                  {q.status === 'answered' && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">ANSWERED</span>}
                  {q.status === 'live' && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse">LIVE</span>}
                </div>
                <p className="text-sm text-gray-900 dark:text-white font-medium">{q.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
