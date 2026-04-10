"use client";
import AdBanner from "@/components/AdBanner";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";
import StatsBar from "@/components/StatsBar";
import AgentList from "@/components/AgentList";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAllAgents, getStats } from "@/lib/storage";
import type { Agent, GlobeStats } from "@/types";

const GlobeView = dynamic(() => import("@/components/GlobeView"), { ssr: false, loading: () => (
  <div className="flex items-center justify-center" style={{ height: 500 }}>
    <div className="text-center">
      <div className="text-4xl mb-3 animate-float">🌍</div>
      <p className="text-primary animate-pulse">Loading globe...</p>
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
    setTimeout(() => setHighlightId(null), 5000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="px-4 pt-10 pb-4 sm:px-6 sm:pt-14 text-center">
          <div className="mx-auto max-w-3xl">
            <Badge variant="secondary" className="animate-fade-up mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-semibold">
              {stats.totalAgents} agents lighting up {stats.totalCountries} countries
            </Badge>
            <h1 className="animate-fade-up delay-1 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
              Light Up the World with{" "}
              <span className="text-primary">AI Agents</span>
            </h1>
            <p className="animate-fade-up delay-2 mt-4 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto">
              Register your AI agent. Watch it glow on the 3D globe. See the world illuminate as more agents join.
            </p>
          </div>
        </section>
        <AdBanner className="mx-auto max-w-5xl px-4 py-4" />

        {/* Stats */}
        <section className="px-4 py-4 sm:px-6">
          <StatsBar stats={stats} />
        </section>

        {/* Globe */}
        <section className="px-4 py-4 sm:px-6">
          <div className="animate-fade-in delay-3">
            <GlobeView agents={agents} highlightId={highlightId} />
          </div>
          {/* Color legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {[
              { color: "bg-cyan-400", label: "Just now" },
              { color: "bg-blue-400", label: "Today" },
              { color: "bg-purple-400", label: "This week" },
              { color: "bg-amber-400", label: "This month" },
              { color: "bg-red-400", label: "Older" },
            ].map((item) => (
              <Badge key={item.label} variant="outline" className="gap-1.5 border-border/50 text-muted-foreground font-normal">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${item.color}`} />
                {item.label}
              </Badge>
            ))}
          </div>
        </section>

        <Separator className="mx-auto max-w-5xl opacity-50" />

        {/* Register + Agent List */}
        <section id="register" className="px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-5xl grid gap-6 lg:grid-cols-2">
            <RegisterForm onRegistered={handleRegistered} />
            <div id="agents">
              <AgentList agents={agents} onHover={setHighlightId} />
            </div>
          </div>
        </section>

        <Separator className="mx-auto max-w-5xl opacity-50" />

        {/* About / SEO content */}
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="reveal text-2xl font-bold text-center mb-8 font-[family-name:var(--font-heading)]">About Agent Globe</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="reveal">
                <strong className="text-foreground">Agent Globe</strong> is an interactive 3D visualization of the global AI agent ecosystem. Every glowing point on the globe represents a registered AI agent — from autonomous coding assistants and research bots to creative AI companions and data analysis tools.
              </p>
              <p className="reveal">
                As the world of <strong className="text-foreground">AI agents</strong> expands rapidly in 2026, Agent Globe provides a unique bird&apos;s-eye view of where these digital workers are deployed around the planet. The visualization uses <strong className="text-foreground">WebGL-powered 3D rendering</strong> to create an immersive experience where you can rotate, zoom, and explore the globe to discover agents in different regions.
              </p>
              <h3 className="reveal text-lg font-bold text-foreground pt-2">How It Works</h3>
              <p className="reveal">
                When you visit Agent Globe, your location is automatically detected via your IP address (no personal data is stored). You can then register your AI agent with a name and optional description. Your agent appears as a glowing point on the globe, with colors indicating how recently it was registered — <strong className="text-primary">cyan for brand new</strong>, <strong className="text-blue-400">blue for today</strong>, <strong className="text-purple-400">purple for this week</strong>, and warmer colors for older registrations.
              </p>
              <h3 className="reveal text-lg font-bold text-foreground pt-2">The AI Agent Revolution</h3>
              <p className="reveal">
                2026 marks a turning point in AI deployment. No longer confined to chat interfaces, AI agents now autonomously handle tasks ranging from code review and content creation to supply chain optimization and scientific research. Agent Globe captures this global phenomenon in real-time, creating a living map of the AI agent ecosystem.
              </p>
              <h3 className="reveal text-lg font-bold text-foreground pt-2">Privacy First</h3>
              <p className="reveal">
                Agent Globe runs entirely in your browser. Agent registrations are stored locally in your browser&apos;s localStorage. No personal information is collected or transmitted to any server. Your IP is used only to determine approximate city-level location, and is not stored.
              </p>
            </div>
          </div>
        </section>
        <AdBanner className="mx-auto max-w-5xl px-4 py-6" />
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
