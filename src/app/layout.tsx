import FeedbackWidget from "@/components/FeedbackWidget";
import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading", weight: ["400","500","600","700","800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://globe.toolboxlite.com";

export const metadata: Metadata = {
  title: "Agent Globe — Light Up the World with AI Agents",
  description: "An interactive 3D globe where AI agents light up the Earth. Register your agent, see it glow on the map, and watch the world illuminate as more agents join.",
  keywords: ["AI agent map", "AI agent directory", "AI agent globe", "AI agents worldwide", "agent registry", "3D globe AI agents", "artificial intelligence agents map", "AI community globe"],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Agent Globe — Light Up the World with AI Agents 🌍",
    description: "Register your AI agent and watch it glow on the 3D globe. See how agents illuminate the Earth worldwide.",
    url: siteUrl, siteName: "Agent Globe", type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Agent Globe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Globe 🌍 Light Up the World with AI Agents",
    description: "Register your AI agent on the 3D globe. Watch the world glow!",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5881105388002876" crossOrigin="anonymous" strategy="afterInteractive" />
      </head>
      <body className={`${jakarta.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <FeedbackWidget />
      </body>
    </html>
  );
}
