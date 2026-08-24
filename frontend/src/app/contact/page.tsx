'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const contactInfo = [
  { icon: Mail, title: 'Email', detail: 'contact@ilmtech.pk', link: 'mailto:contact@ilmtech.pk' },
  { icon: Phone, title: 'Phone', detail: '+92 21 1234 5678', link: 'tel:+92212345678' },
  { icon: MapPin, title: 'Address', detail: 'Shahrah-e-Faisal, Karachi, Pakistan', link: '#' },
];

const faqs = [
  { q: 'How can I submit a press release?', a: 'You can submit your press release through our Press Release submission page. Our editorial team will review it and publish it within 24-48 hours if it meets our guidelines.' },
  { q: 'How can I advertise with IlmTech?', a: 'Visit our Advertise page to view our ad formats, audience stats, and pricing. You can also fill out the contact form and our sales team will reach out to you.' },
  { q: 'How do I subscribe to the newsletter?', a: 'You can sign up for our newsletter from the Newsletter page. You can customize your preferences to receive only the topics that interest you.' },
  { q: 'Can I contribute as a writer?', a: 'Yes! We welcome contributors. Send your writing samples and a brief bio to contributors@ilmtech.pk and we will get back to you.' },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Breadcrumb items={[{ label: 'Contact' }]} />
          <h1 className="mt-6 text-5xl font-bold">Get in Touch</h1>
          <p className="mt-4 text-xl text-purple-100 max-w-2xl mx-auto">
            Have a question or want to work together? We&apos;re here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input label="Name" placeholder="Your full name" />
                  <Input label="Email" type="email" placeholder="you@example.com" />
                </div>
                <Input label="Subject" placeholder="How can we help?" />
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  />
                </div>
                <Button size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <Card key={info.title} hover className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <info.icon className="w-5 h-5 text-[#37215F] dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{info.title}</h3>
                  <a href={info.link} className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#0881BE] transition-colors">
                    {info.detail}
                  </a>
                </div>
              </Card>
            ))}

            {/* Map Placeholder */}
            <Card className="overflow-hidden p-0 h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="text-center text-gray-400">
                <MapPin className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm">Interactive Map</p>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="!p-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                    {faq.a}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
