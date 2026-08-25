'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';

const AI_RESPONSES: Record<string, string> = {
  'latest funding news?': '💰 Recent funding in Pakistan:\n\n• Bykea — $100M Series C (Mar 2026)\n• SadaPay — $72M Series B (Jan 2026)\n• Bazaar — $65M Series B (Feb 2026)\n\nTotal: $450M raised in 2026 so far!',
  "what's trending today?": "🔥 Trending on IlmTech:\n\n1. AI Regulation guidelines by NITB\n2. iPhone 17 vs Galaxy S26 comparison\n3. SadaPay hits 3M users\n4. Tech Summit 2026 dates announced",
  'show me startup directory': '🏙️ Pakistan has 3,200+ startups:\n\n• Karachi — 350+\n• Lahore — 280+\n• Islamabad — 180+\n\nVisit /startup-directory for the full filterable list!',
  '5g updates in pakistan?': '📡 5G in Pakistan:\n\n• PTCL pilot testing in Islamabad/Karachi\n• Jazz partnering with Huawei\n• Widespread coverage expected by 2028\n\nRead more in our AI & Cloud section.',
};

const SUGGESTIONS = [
  'Latest funding news?',
  "What's trending today?",
  'Show me startup directory',
  '5G updates in Pakistan?',
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: text.trim() }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const key = Object.keys(AI_RESPONSES).find((k) => text.toLowerCase().includes(k.toLowerCase().replace('?', '')));
      const response = key ? AI_RESPONSES[key] : `I can help with Pakistan tech news, startups, and more. Try asking about:\n\n• Funding news\n• Trending topics\n• Startup directory\n• 5G updates`;
      setMessages((prev) => [...prev, { role: 'ai', text: response }]);
      setLoading(false);
    }, 1200);
  };

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    );
  }

  const width = isExpanded ? 'w-[500px]' : 'w-[380px]';
  const height = isExpanded ? 'h-[600px]' : 'h-[520px]';

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${width} ${height} rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 origin-bottom-right`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#37215F] to-[#0881BE] rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
          <span className="text-white font-semibold text-sm">IlmTech Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors">
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button onClick={() => { setIsOpen(false); setIsExpanded(false); }} className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Hi! Ask me about latest tech news, startups, or anything on IlmTech.</p>
            <div className="space-y-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => handleSend(s)} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:border-[#37215F] hover:text-[#37215F] dark:hover:border-purple-400 dark:hover:text-purple-400 transition-colors text-left">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'ai' && <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center flex-shrink-0"><Sparkles className="w-3 h-3 text-white" /></div>}
                <div className={`max-w-[85%] px-3 py-2.5 rounded-xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-[#37215F] text-white rounded-br-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm'}`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.role === 'ai' && (
                    <button onClick={() => copyText(msg.text, i)} className="mt-1.5 flex items-center gap-1 text-[10px] text-gray-400 hover:text-[#37215F] dark:hover:text-purple-400">
                      {copiedIdx === i ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#37215F] to-[#0881BE] flex items-center justify-center flex-shrink-0"><Sparkles className="w-3 h-3 text-white" /></div>
                <div className="px-3 py-2.5 rounded-xl rounded-bl-sm bg-gray-100 dark:bg-gray-800">
                  <div className="flex gap-1"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} /><span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} /></div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#37215F]"
            disabled={loading}
          />
          <button onClick={() => handleSend(input)} disabled={loading || !input.trim()} className="px-3 py-2.5 rounded-xl bg-[#37215F] text-white hover:bg-[#2a1a4a] disabled:opacity-50 transition-colors"><Send className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
}
