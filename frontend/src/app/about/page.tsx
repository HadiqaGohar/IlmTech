import Link from 'next/link';
import { Target, Shield, Lightbulb, Globe, Mail, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { users } from '@/lib/mockData';

const teamMembers = [
  { ...users[1], bio: 'Ahmed leads our editorial team with over a decade of experience covering the Pakistani tech ecosystem. He has a passion for uncovering stories of innovation.' },
  { ...users[2], bio: 'Fatima specializes in cybersecurity and emerging technologies. Her analytical approach helps readers understand complex security topics in simple terms.' },
  { ...users[3], bio: 'Usman is a dedicated tech reporter covering the latest developments in IT infrastructure and digital transformation across Pakistan.' },
  { ...users[4], bio: 'Sara reviews the latest consumer tech products, providing honest and thorough assessments to help readers make informed purchasing decisions.' },
];

const values = [
  { icon: Target, title: 'Innovation First', description: 'We believe in the power of technology to transform lives and are committed to highlighting innovations that make a difference.' },
  { icon: Shield, title: 'Integrity', description: 'Our reporting is independent, factual, and free from bias. We uphold the highest standards of journalistic ethics.' },
  { icon: Lightbulb, title: 'Empowering Readers', description: 'We aim to educate and inform our audience, helping them navigate the ever-changing technology landscape.' },
  { icon: Globe, title: 'Community Impact', description: 'We are dedicated to fostering a thriving tech community in Pakistan by amplifying local voices and success stories.' },
];

const milestones = [
  { year: '2024', title: 'IlmTech Founded', description: 'IlmTech was launched as a dedicated tech news platform covering the Pakistani IT industry.' },
  { year: '2024', title: 'Team Expansion', description: 'Grew from 2 to 5 core team members, expanding coverage to AI, Cloud, and Cybersecurity.' },
  { year: '2025', title: 'Live Shows Launch', description: 'Introduced weekly live shows featuring industry leaders and startup founders.' },
  { year: '2026', title: 'Startup Directory', description: 'Launched a comprehensive directory of Pakistani startups to connect founders with investors and talent.' },
  { year: '2026', title: '500K Readers', description: 'Reached a milestone of 500,000 monthly readers across our platforms.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#37215F] to-[#0881BE] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Breadcrumb items={[{ label: 'About' }]} />
          <h1 className="mt-6 text-5xl font-bold">About IlmTech</h1>
          <p className="mt-4 text-xl text-purple-100 max-w-3xl mx-auto">
            Illuminating Pakistan&apos;s technology landscape through independent journalism, in-depth analysis, and community-driven stories.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
        {/* Mission */}
        <section className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            At IlmTech, our mission is to be Pakistan&apos;s most trusted source for technology news and insights. We strive to bridge the gap between
            global tech trends and local innovation, empowering individuals and organizations with the knowledge they need to thrive in the digital age.
            We are committed to telling the stories of Pakistan&apos;s growing tech ecosystem, from groundbreaking startups to enterprise digital transformations.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} hover className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-[#37215F] dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} hover className="text-center">
                <Avatar src={member.avatar} fallback={member.name} size="lg" className="mx-auto" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm font-medium text-[#0881BE] dark:text-blue-400 capitalize">{member.role}</p>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Our Journey</h2>
          <div className="relative border-l-2 border-purple-200 dark:border-purple-800 ml-4 space-y-10">
            {milestones.map((m, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute -left-[1.3rem] top-1 w-5 h-5 rounded-full bg-[#37215F] dark:bg-purple-500 border-4 border-gray-50 dark:border-gray-900" />
                <span className="text-sm font-bold text-[#0881BE] dark:text-blue-400">{m.year}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{m.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{m.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#37215F] to-[#0881BE] rounded-2xl p-10 text-center text-white">
          <Mail className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="mt-4 text-purple-100 max-w-xl mx-auto">
            Have a question, story tip, or want to collaborate? We&apos;d love to hear from you.
          </p>
          <Link href="/contact">
            <Button className="mt-6 bg-white text-[#37215F] hover:bg-purple-50">
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
