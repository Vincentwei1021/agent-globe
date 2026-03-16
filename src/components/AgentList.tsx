import type { Agent } from "@/types";

interface AgentListProps {
  agents: Agent[];
  onHover: (id: string | null) => void;
}

export default function AgentList({ agents, onHover }: AgentListProps) {
  // Sort newest first, show max 10
  const recent = [...agents].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-space-800/60 p-5 backdrop-blur-sm">
      <h3 className="text-sm font-bold text-gray-300 mb-3">🕐 Recently Registered</h3>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {recent.map((agent) => {
          const age = Date.now() - agent.createdAt;
          const h = Math.floor(age / 3600000);
          const timeStr = h < 1 ? "just now" : h < 24 ? `${h}h ago` : `${Math.floor(h / 24)}d ago`;
          return (
            <div key={agent.id} onMouseEnter={() => onHover(agent.id)} onMouseLeave={() => onHover(null)}
              className="flex items-start gap-3 rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-cyan-500/20 hover:bg-cyan-500/5 cursor-pointer">
              <span className="mt-0.5 text-lg">🤖</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">{agent.name}</p>
                <p className="text-xs text-gray-500 truncate">{agent.city}, {agent.country} · {timeStr}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
