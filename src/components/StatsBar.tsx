import { Card, CardContent } from "@/components/ui/card";
import { Bot, Building2, Globe } from "lucide-react";
import type { GlobeStats } from "@/types";

interface StatsBarProps {
  stats: GlobeStats;
}

const items = [
  { key: "totalAgents" as const, label: "Agents", icon: Bot },
  { key: "totalCities" as const, label: "Cities", icon: Building2 },
  { key: "totalCountries" as const, label: "Countries", icon: Globe },
];

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mx-auto max-w-xl">
      {items.map((s, i) => (
        <Card key={s.label} className="card-glow animate-fade-up border-border/50 bg-card/60 backdrop-blur-sm" style={{ animationDelay: `${i * 0.1}s` }}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary leading-tight">{stats[s.key].toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
