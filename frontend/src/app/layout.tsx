import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreakingTicker from "@/components/layout/BreakingTicker";
import AIAssistant from '@/components/ui/AIAssistant';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "IlmTech — Pakistan's #1 Tech News & Startup Portal",
    template: '%s | IlmTech',
  },
  description: "Pakistan's leading technology news, startup stories, AI insights, and digital ecosystem coverage.",
  keywords: ['Pakistan tech', 'startups', 'AI', 'cybersecurity', 'funding', 'IT news'],
  openGraph: {
    title: "IlmTech — Pakistan's #1 Tech News & Startup Portal",
    description: "Pakistan's leading technology news, startup stories, AI insights, and digital ecosystem coverage.",
    url: 'https://ilmtech.pk',
    siteName: 'IlmTech',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "IlmTech — Pakistan's #1 Tech News",
    description: "Pakistan's leading technology news, startup stories, and digital ecosystem coverage.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${geistSans.className} min-h-screen`}>
        <Header />
        <BreakingTicker />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AIAssistant />
      </body>
    </html>
  );
}
