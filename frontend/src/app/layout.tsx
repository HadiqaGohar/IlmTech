import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreakingTicker from "@/components/layout/BreakingTicker";
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
  title: "IlmTech - Islamic Technology News & Knowledge",
  description:
    "Your trusted source for Islamic technology news, Islamic finance, halal tech reviews, and knowledge bridging faith with innovation.",
  keywords: [
    "Islamic technology",
    "halal tech",
    "Islamic finance",
    "Muslim tech news",
    "faith and technology",
  ],
  openGraph: {
    title: "IlmTech - Islamic Technology News & Knowledge",
    description:
      "Your trusted source for Islamic technology news, Islamic finance, halal tech reviews, and knowledge bridging faith with innovation.",
    type: "website",
    locale: "en_US",
    siteName: "IlmTech",
  },
  twitter: {
    card: "summary_large_image",
    title: "IlmTech - Islamic Technology News & Knowledge",
    description:
      "Your trusted source for Islamic technology news, Islamic finance, halal tech reviews, and knowledge bridging faith with innovation.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      </body>
    </html>
  );
}
