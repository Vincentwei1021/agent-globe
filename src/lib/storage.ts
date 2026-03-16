import type { Agent, GlobeStats } from "@/types";

const STORAGE_KEY = "agent_globe_agents";

// Seed agents so the globe isn't empty on first visit
const SEED_AGENTS: Agent[] = [
  { id: "seed-1", name: "GPT-4 Navigator", description: "Autonomous research assistant", city: "San Francisco", country: "United States", countryCode: "US", lat: 37.78, lng: -122.42, createdAt: Date.now() - 86400000 * 30 },
  { id: "seed-2", name: "Claude Sentinel", description: "Safety-focused coding agent", city: "London", country: "United Kingdom", countryCode: "GB", lat: 51.51, lng: -0.13, createdAt: Date.now() - 86400000 * 25 },
  { id: "seed-3", name: "DeepSeek Miner", description: "Data analysis agent", city: "Beijing", country: "China", countryCode: "CN", lat: 39.91, lng: 116.40, createdAt: Date.now() - 86400000 * 20 },
  { id: "seed-4", name: "Gemini Scout", description: "Multi-modal explorer", city: "Tokyo", country: "Japan", countryCode: "JP", lat: 35.68, lng: 139.69, createdAt: Date.now() - 86400000 * 18 },
  { id: "seed-5", name: "Mistral Wind", description: "European language model agent", city: "Paris", country: "France", countryCode: "FR", lat: 48.86, lng: 2.35, createdAt: Date.now() - 86400000 * 15 },
  { id: "seed-6", name: "LLaMA Runner", description: "Open-source inference agent", city: "New York", country: "United States", countryCode: "US", lat: 40.71, lng: -74.01, createdAt: Date.now() - 86400000 * 12 },
  { id: "seed-7", name: "Qwen Oracle", description: "Multilingual Q&A agent", city: "Hangzhou", country: "China", countryCode: "CN", lat: 30.27, lng: 120.15, createdAt: Date.now() - 86400000 * 10 },
  { id: "seed-8", name: "Falcon Eye", description: "Vision recognition agent", city: "Dubai", country: "UAE", countryCode: "AE", lat: 25.20, lng: 55.27, createdAt: Date.now() - 86400000 * 8 },
  { id: "seed-9", name: "Cohere Link", description: "Enterprise RAG agent", city: "Toronto", country: "Canada", countryCode: "CA", lat: 43.65, lng: -79.38, createdAt: Date.now() - 86400000 * 6 },
  { id: "seed-10", name: "Stability Pixel", description: "Image generation agent", city: "Berlin", country: "Germany", countryCode: "DE", lat: 52.52, lng: 13.41, createdAt: Date.now() - 86400000 * 4 },
  { id: "seed-11", name: "Anthropic Shield", description: "AI alignment research agent", city: "Sydney", country: "Australia", countryCode: "AU", lat: -33.87, lng: 151.21, createdAt: Date.now() - 86400000 * 3 },
  { id: "seed-12", name: "Perplexity Searcher", description: "Real-time search agent", city: "Seoul", country: "South Korea", countryCode: "KR", lat: 37.57, lng: 126.98, createdAt: Date.now() - 86400000 * 2 },
  { id: "seed-13", name: "Groq Flash", description: "Ultra-fast inference agent", city: "Singapore", country: "Singapore", countryCode: "SG", lat: 1.35, lng: 103.82, createdAt: Date.now() - 86400000 * 1 },
  { id: "seed-14", name: "Inflection Companion", description: "Personal AI companion", city: "São Paulo", country: "Brazil", countryCode: "BR", lat: -23.55, lng: -46.63, createdAt: Date.now() - 86400000 * 1.5 },
  { id: "seed-15", name: "Baichuan Scholar", description: "Chinese NLP specialist", city: "Shanghai", country: "China", countryCode: "CN", lat: 31.23, lng: 121.47, createdAt: Date.now() - 43200000 },
  { id: "seed-16", name: "Aleph Zero", description: "Blockchain AI agent", city: "Zurich", country: "Switzerland", countryCode: "CH", lat: 47.38, lng: 8.54, createdAt: Date.now() - 36000000 },
  { id: "seed-17", name: "Viking AI", description: "Nordic language agent", city: "Stockholm", country: "Sweden", countryCode: "SE", lat: 59.33, lng: 18.07, createdAt: Date.now() - 28800000 },
  { id: "seed-18", name: "Bharati Bot", description: "Multilingual Indic agent", city: "Mumbai", country: "India", countryCode: "IN", lat: 19.08, lng: 72.88, createdAt: Date.now() - 21600000 },
  { id: "seed-19", name: "Nile Navigator", description: "Arabic NLP agent", city: "Cairo", country: "Egypt", countryCode: "EG", lat: 30.04, lng: 31.24, createdAt: Date.now() - 14400000 },
  { id: "seed-20", name: "Kiwi Coder", description: "Code generation agent", city: "Auckland", country: "New Zealand", countryCode: "NZ", lat: -36.85, lng: 174.76, createdAt: Date.now() - 7200000 },
];

function getStoredAgents(): Agent[] {
  if (typeof window === "undefined") return SEED_AGENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_AGENTS));
      return SEED_AGENTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_AGENTS;
  }
}

export function getAllAgents(): Agent[] {
  return getStoredAgents();
}

export function addAgent(agent: Omit<Agent, "id" | "createdAt">): Agent {
  const agents = getStoredAgents();
  const newAgent: Agent = {
    ...agent,
    id: `agent-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
  };
  agents.push(newAgent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
  return newAgent;
}

export function getStats(agents: Agent[]): GlobeStats {
  const cities = new Set(agents.map(a => `${a.city},${a.countryCode}`));
  const countries = new Set(agents.map(a => a.countryCode));
  return { totalAgents: agents.length, totalCities: cities.size, totalCountries: countries.size };
}
