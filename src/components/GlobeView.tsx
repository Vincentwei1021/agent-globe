"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { Agent } from "@/types";

// Color by age: newest = bright cyan, oldest = warm orange
function getPointColor(createdAt: number): string {
  const age = Date.now() - createdAt;
  const hours = age / 3600000;
  if (hours < 1) return "#22d3ee";       // cyan - just registered
  if (hours < 24) return "#60a5fa";      // blue - today
  if (hours < 168) return "#a855f7";     // purple - this week
  if (hours < 720) return "#f59e0b";     // amber - this month
  return "#ef4444";                       // red - older
}

function getPointAltitude(createdAt: number): number {
  const age = Date.now() - createdAt;
  const hours = age / 3600000;
  if (hours < 1) return 0.12;
  if (hours < 24) return 0.08;
  if (hours < 168) return 0.05;
  return 0.03;
}

interface GlobeViewProps {
  agents: Agent[];
  highlightId?: string | null;
}

export default function GlobeView({ agents, highlightId }: GlobeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [tooltip, setTooltip] = useState<{ name: string; city: string; country: string; x: number; y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  // Responsive sizing
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = Math.min(w, window.innerHeight * 0.65);
        setDimensions({ width: w, height: h });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initGlobe = useCallback(async () => {
    if (!containerRef.current) return;
    const GlobeModule = await import("globe.gl");
    const GlobeClass = GlobeModule.default;

    // Clear previous
    if (globeRef.current) {
      containerRef.current.innerHTML = "";
    }

    // globe.gl exports a class constructor
    const globe = new GlobeClass(containerRef.current)
      .width(dimensions.width)
      .height(dimensions.height)
      .globeImageUrl("//unpkg.com/three-globe@2.45.1/example/img/earth-night.jpg")
      .backgroundImageUrl("//unpkg.com/three-globe@2.45.1/example/img/night-sky.png")
      .pointsData(agents)
      .pointLat((d: object) => (d as Agent).lat)
      .pointLng((d: object) => (d as Agent).lng)
      .pointColor((d: object) => {
        const agent = d as Agent;
        return agent.id === highlightId ? "#22d3ee" : getPointColor(agent.createdAt);
      })
      .pointAltitude((d: object) => {
        const agent = d as Agent;
        return agent.id === highlightId ? 0.2 : getPointAltitude(agent.createdAt);
      })
      .pointRadius((d: object) => {
        const agent = d as Agent;
        return agent.id === highlightId ? 0.8 : 0.35;
      })
      .pointsMerge(false)
      .atmosphereColor("#3b82f6")
      .atmosphereAltitude(0.2)
      .onPointHover((point: object | null) => {
        if (point) {
          const a = point as Agent;
          const el = containerRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            setTooltip({ name: a.name, city: a.city, country: a.country, x: rect.width / 2, y: rect.height / 2 });
          }
        } else {
          setTooltip(null);
        }
      })
      .enablePointerInteraction(true);

    // Auto-rotate
    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = true;
    }

    globeRef.current = globe;
  }, [agents, highlightId, dimensions]);

  useEffect(() => {
    initGlobe();
  }, [initGlobe]);

  // Focus on highlighted agent
  useEffect(() => {
    if (highlightId && globeRef.current) {
      const agent = agents.find(a => a.id === highlightId);
      if (agent) {
        globeRef.current.pointOfView({ lat: agent.lat, lng: agent.lng, altitude: 1.5 }, 1500);
      }
    }
  }, [highlightId, agents]);

  return (
    <div className="relative">
      <div ref={containerRef} className="mx-auto" style={{ width: "100%", maxWidth: 700 }} />
      {tooltip && (
        <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-lg bg-space-800/90 border border-cyan-500/30 px-4 py-2 text-sm backdrop-blur-sm">
          <p className="font-semibold text-cyan-400">{tooltip.name}</p>
          <p className="text-gray-400 text-xs">{tooltip.city}, {tooltip.country}</p>
        </div>
      )}
    </div>
  );
}
