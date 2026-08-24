'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Copy, Check } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

const AI_RESPONSES: Record<string, string> = {
  'latest funding news': 'Here are the latest funding rounds in Pakistan:\n\n💰 **Bykea** raised $100M in Series C (March 2026) — led by Global Ventures\n💰 **SadaPay** closed $72M Series B (January 2026) — led by Indus Valley Capital\n💰 **Bazaar** secured $65M Series B (February 2026) — led by Sarmayacar\n\nTotal funding in Q1 2026 exceeded $237M, a 45% increase from the same period last year.',
  'trending today': 'Here\'s what\'s trending on IlmTech today:\n\n🔥 **AI Regulation in Pakistan** — New NITB guidelines announced\n📱 **iPhone 17 Pro Max vs Galaxy S26 Ultra** — Our comparison goes viral\n🚀 **SadaPay** crosses 3M users milestone\n🇵🇰 **Pakistan Tech Summit 2026** — Dates officially announced\n\nRead more on our homepage!',
  'startup directory': 'Pakistan has 3,200+ active tech startups across 6 major cities:\n\n🏙️ **Karachi** — 350+ startups (fintech, e-commerce hub)\n🏙️ **Lahore** — 280+ startups (SaaS, edtech hub)\n🏙️ **Islamabad** — 180+ startups (AI/ML, government tech)\n🏙️ **Peshawar** — 45+ startups (emerging hub)\n\nVisit our Startup Directory for the full list with filters!',
  '5g updates': '5G in Pakistan — Latest Updates:\n\n📡 **PTCL** has started 5G pilot testing in Islamabad and Karachi\n📡 **Jazz** is partnering with Huawei for 5G infrastructure rollout\n📡 **Telenor** plans 5G launch in select areas by Q4 2026\n\nPakistan is expected to have widespread 5G coverage by 2028. The government has allocated spectrum for commercial 5G services.',
};

const SUGGESTIONS = [
  'Latest funding news?',
  "What's trending today?",
  'Show me startup directory',
  '5G updates in Pakistan?',
];

export default function AskAIPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user' as const, text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const key = Object.keys(AI_RESPONSES).find((k) => text.toLowerCase().includes(k));
      const response = key ? AI_RESPONSES[key] : `I found information about "${text}" on IlmTech. Here's what I know:\n\nPakistan's tech ecosystem continues to grow rapidly. For the latest updates on this topic, check our IT News section or search for specific articles.\n\nWould you like me to help you find something more specific?`;
      setMessages((prev) => [...prev, { role: 'ai', text: response }]);
      setLoading(false);
    }, 1500);
  };

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-br from-[#37215F] to-[#0881BE]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Search
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Ask IlmTech AI</h1>
          <p className="text-purple-100 mt-2">Ask anything about Pakistan&apos;s tech ecosystem and get instant answers</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chat Area */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
          <div className="flex-1 p-5 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Hi! Ask me anything</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">I can help with tech news, startups, funding, and more.</p>
                <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => handleSend(s)} className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-400 hover:border-[#37215F] hover:text-[#37215F] dark:hover:border-purple-400 dark:hover:text-purple-400 transition-colors">{s}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'ai' && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-white" /></div>}
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#37215F] text-white rounded-br-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md'}`}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      {msg.role === 'ai' && (
                        <button onClick={() => copyText(msg.text, i)} className="mt-2 flex items-center gap-1 text-xs text-gray-400 hover:text-[#37215F] dark:hover:text-purple-400 transition-colors">
                          {copiedIdx === i ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                        </button>
                      )}
                    </div>
                    {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-gray-500" /></div>}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-white" /></div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-gray-100 dark:bg-gray-700">
                      <div className="flex gap-1"><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} /></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask about Pakistan tech news, startups, AI..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#37215F]"
                disabled={loading}
              />
              <button onClick={() => handleSend(input)} disabled={loading || !input.trim()} className="px-4 py-3 rounded-xl bg-[#37215F] text-white hover:bg-[#2a1a4a] disabled:opacity-50 transition-colors"><Send className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}