import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Bot } from "lucide-react";
import type { Agent } from "@/types";

interface AgentListProps {
  agents: Agent[];
  onHover: (id: string | null) => void;
}

export default function AgentList({ agents, onHover }: AgentListProps) {
  const recent = [...agents].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);

  return (
    <Card className="card-glow animate-fade-up delay-1 border-border/50 bg-card/60 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Clock className="h-4 w-4" />
          Recently Registered
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
          {recent.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No agents yet. Be the first!
            </p>
          )}
          {recent.map((agent) => {
            const age = Date.now() - agent.createdAt;
            const h = Math.floor(age / 3600000);
            const timeStr = h < 1 ? "just now" : h < 24 ? `${h}h ago` : `${Math.floor(h / 24)}d ago`;
            return (
              <div
                key={agent.id}
                onMouseEnter={() => onHover(agent.id)}
                onMouseLeave={() => onHover(null)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent cursor-pointer"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{agent.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{agent.city}, {agent.country}</p>
                </div>
                <Badge variant="secondary" className="shrink-0 text-xs">
                  {timeStr}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
