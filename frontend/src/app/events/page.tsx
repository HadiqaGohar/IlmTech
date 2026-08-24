'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

const EVENTS = [
  { id: '1', title: 'Pakistan Tech Summit 2026', date: '2026-09-15', endDate: '2026-09-16', time: '9:00 AM', location: 'Islamabad', type: 'Conference', attendees: 500, color: '#37215F' },
  { id: '2', title: 'Karachi Startup Week', date: '2026-10-01', endDate: '2026-10-05', time: '10:00 AM', location: 'Karachi', type: 'Week-long', attendees: 1200, color: '#0881BE' },
  { id: '3', title: 'AI/ML Hackathon Lahore', date: '2026-09-20', endDate: '2026-09-21', time: '8:00 AM', location: 'Lahore', type: 'Hackathon', attendees: 200, color: '#10B981' },
  { id: '4', title: 'Fintech Meetup Islamabad', date: '2026-09-25', time: '6:00 PM', location: 'Islamabad', type: 'Meetup', attendees: 80, color: '#F59E0B' },
  { id: '5', title: 'Women in Tech Conference', date: '2026-10-10', endDate: '2026-10-11', time: '9:00 AM', location: 'Lahore', type: 'Conference', attendees: 350, color: '#EC4899' },
  { id: '6', title: 'Blockchain Pakistan Forum', date: '2026-10-15', time: '2:00 PM', location: 'Karachi', type: 'Forum', attendees: 150, color: '#8B5CF6' },
  { id: '7', title: 'DevOps Workshop Series', date: '2026-09-28', time: '11:00 AM', location: 'Remote', type: 'Workshop', attendees: 300, color: '#06B6D4' },
  { id: '8', title: 'Pakistan Startup Awards', date: '2026-12-01', time: '7:00 PM', location: 'Karachi', type: 'Awards', attendees: 400, color: '#EF4444' },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function EventsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [currentMonth, setCurrentMonth] = useState(8); // September = 8

  const filteredEvents = EVENTS.filter((e) => {
    const eventDate = new Date(e.date);
    return eventDate.getMonth() === currentMonth;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-br from-[#37215F] to-[#0881BE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Events' }]} />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4">Tech Events in Pakistan</h1>
          <p className="text-purple-100 mt-2">Conferences, meetups, hackathons, and more</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"><ChevronLeft className="w-5 h-5" /></button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white min-w-[160px] text-center">{MONTHS[currentMonth]} 2026</h2>
            <button onClick={() => setCurrentMonth(Math.min(11, currentMonth + 1))} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"><ChevronRight className="w-5 h-5" /></button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView('grid')} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-[#37215F] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600'}`}>Grid</button>
            <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-[#37215F] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600'}`}>List</button>
          </div>
        </div>

        {/* Events */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No events this month</h3>
            <p className="text-gray-500 dark:text-gray-400">Check other months or browse all events</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.map((event) => (
              <div key={event.id} className="p-5 rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: event.color }}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: event.color + '20', color: event.color }}>{event.type}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{event.title}</h3>
                <div className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{event.endDate ? ` - ${new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''} · {event.time}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{event.location}</p>
                  <p className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{event.attendees} expected attendees</p>
                </div>
                <button className="mt-4 w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1.5">
                  Add to Calendar <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: event.color }}>
                  <div className="text-center leading-tight"><span className="text-[10px] block">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span><span className="text-lg">{new Date(event.date).getDate()}</span></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white">{event.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    <span>{event.location}</span>
                    <span>·</span>
                    <span>{event.type}</span>
                    <span>·</span>
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 flex-shrink-0">
                  Add to Calendar <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
