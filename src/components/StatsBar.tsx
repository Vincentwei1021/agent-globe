import type { GlobeStats } from "@/types";

interface StatsBarProps {
  stats: GlobeStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
      {[
        { label: "Agents", value: stats.totalAgents, icon: "🤖" },
        { label: "Cities", value: stats.totalCities, icon: "🏙️" },
        { label: "Countries", value: stats.totalCountries, icon: "🌍" },
      ].map((s) => (
        <div key={s.label} className="flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-space-800/60 px-4 py-2.5 backdrop-blur-sm">
          <span className="text-lg">{s.icon}</span>
          <div>
            <p className="text-xl font-bold text-white leading-tight">{s.value.toLocaleString()}</p>
            <p className="text-xs text-gray-400">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
