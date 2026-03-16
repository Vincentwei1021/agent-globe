import Link from "next/link";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/10 bg-space-900/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="font-[family-name:var(--font-heading)] text-xl font-bold text-cyan-400 tracking-tight">🌍 Agent Globe</Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/#register" className="rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400">Register</Link>
          <Link href="/#agents" className="rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400">Agents</Link>
          <a href="https://github.com/Vincentwei1021/agent-globe" target="_blank" rel="noopener noreferrer" className="rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400">GitHub</a>
        </div>
      </nav>
    </header>
  );
}
