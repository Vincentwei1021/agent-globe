"use client";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";
import StatsBar from "@/components/StatsBar";
import AgentList from "@/components/AgentList";
import Footer from "@/components/Footer";
import { getAllAgents, getStats } from "@/lib/storage";
import type { Agent, GlobeStats } from "@/types";

const GlobeView = dynamic(() => import("@/components/GlobeView"), { ssr: false, loading: () => (
  <div className="flex items-center justify-center" style={{ height: 500 }}>
    <div className="text-center">
      <div className="text-4xl mb-3 animate-float">🌍</div>
      <p className="text-cyan-400 animate-pulse">Loading globe...</p>
    </div>
  </div>
) });

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [stats, setStats] = useState<GlobeStats>({ totalAgents: 0, totalCities: 0, totalCountries: 0 });
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const refresh = useCallback(() => {
    const all = getAllAgents();
    setAgents(all);
    setStats(getStats(all));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleRegistered = (id: string) => {
    refresh();
    setHighlightId(id);
    // Auto-clear highlight after 5s
    setTimeout(() => setHighlightId(null), 5000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="px-4 pt-8 pb-4 sm:px-6 sm:pt-12 text-center">
          <div className="mx-auto max-w-3xl animate-fade-in">
            <div className="mb-3 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm font-semibold text-cyan-400">
              {stats.totalAgents} agents lighting up {stats.totalCountries} countries
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Light Up the World with<br />
              <span className="text-cyan-400">AI Agents</span>
            </h1>
            <p className="mt-3 text-base text-gray-400 sm:text-lg">
              Register your AI agent. Watch it glow on the 3D globe. See the world illuminate as more agents join.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 py-4 sm:px-6">
          <StatsBar stats={stats} />
        </section>

        {/* Globe */}
        <section className="px-4 py-4 sm:px-6">
          <GlobeView agents={agents} highlightId={highlightId} />
          {/* Color legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-400">
            <span><span className="inline-block w-3 h-3 rounded-full bg-cyan-400 mr-1" />Just now</span>
            <span><span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-1" />Today</span>
            <span><span className="inline-block w-3 h-3 rounded-full bg-purple-400 mr-1" />This week</span>
            <span><span className="inline-block w-3 h-3 rounded-full bg-amber-400 mr-1" />This month</span>
            <span><span className="inline-block w-3 h-3 rounded-full bg-red-400 mr-1" />Older</span>
          </div>
        </section>

        {/* Register + Agent List */}
        <section id="register" className="px-4 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-5xl grid gap-6 lg:grid-cols-2">
            <RegisterForm onRegistered={handleRegistered} />
            <div id="agents">
              <AgentList agents={agents} onHover={setHighlightId} />
            </div>
          </div>
        </section>

        {/* About / SEO content */}
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white text-center mb-6">About Agent Globe</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                <strong className="text-white">Agent Globe</strong> is an interactive 3D visualization of the global AI agent ecosystem. Every glowing point on the globe represents a registered AI agent — from autonomous coding assistants and research bots to creative AI companions and data analysis tools.
              </p>
              <p>
                As the world of <strong className="text-white">AI agents</strong> expands rapidly in 2026, Agent Globe provides a unique bird&apos;s-eye view of where these digital workers are deployed around the planet. The visualization uses <strong className="text-white">WebGL-powered 3D rendering</strong> to create an immersive experience where you can rotate, zoom, and explore the globe to discover agents in different regions.
              </p>
              <h3 className="text-lg font-bold text-white pt-2">How It Works</h3>
              <p>
                When you visit Agent Globe, your location is automatically detected via your IP address (no personal data is stored). You can then register your AI agent with a name and optional description. Your agent appears as a glowing point on the globe, with colors indicating how recently it was registered — <strong className="text-cyan-400">cyan for brand new</strong>, <strong className="text-blue-400">blue for today</strong>, <strong className="text-purple-400">purple for this week</strong>, and warmer colors for older registrations.
              </p>
              <h3 className="text-lg font-bold text-white pt-2">The AI Agent Revolution</h3>
              <p>
                2026 marks a turning point in AI deployment. No longer confined to chat interfaces, AI agents now autonomously handle tasks ranging from code review and content creation to supply chain optimization and scientific research. Agent Globe captures this global phenomenon in real-time, creating a living map of the AI agent ecosystem.
              </p>
              <h3 className="text-lg font-bold text-white pt-2">Privacy First</h3>
              <p>
                Agent Globe runs entirely in your browser. Agent registrations are stored locally in your browser&apos;s localStorage. No personal information is collected or transmitted to any server. Your IP is used only to determine approximate city-level location, and is not stored.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Agent Globe", url: "https://globe.toolboxlite.com",
        description: "An interactive 3D globe where AI agents light up the Earth. Register your agent, see it glow on the map, and watch the world illuminate as more agents join.",
        applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is Agent Globe?", acceptedAnswer: { "@type": "Answer", text: "Agent Globe is an interactive 3D world map where AI agents register and appear as glowing points of light. It's a visual directory showing the global distribution of AI agents." } },
          { "@type": "Question", name: "How do I register my AI agent?", acceptedAnswer: { "@type": "Answer", text: "Click the Register button, enter your agent's name, type, location, and description. Your agent will appear on the 3D globe immediately after registration." } },
          { "@type": "Question", name: "Is Agent Globe free?", acceptedAnswer: { "@type": "Answer", text: "Yes, Agent Globe is completely free. Register as many agents as you need with no account required." } },
          { "@type": "Question", name: "What types of AI agents can be registered?", acceptedAnswer: { "@type": "Answer", text: "Any AI agent can be registered — assistants, coding agents, research agents, automation bots, creative agents, and more. The globe shows the full diversity of AI agents worldwide." } },
        ],
      }) }} />
    </>
  );
}
