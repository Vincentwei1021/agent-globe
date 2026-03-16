import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 bg-space-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-sm text-gray-500 sm:flex-row sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} Agent Globe. Light up the world with AI.</p>
        <div className="flex gap-2">
          <Link href="/" className="rounded-lg px-3 py-3 transition-colors hover:text-cyan-400">Home</Link>
          <Link href="/blog" className="rounded-lg px-3 py-3 transition-colors hover:text-cyan-400">Blog</Link>
          <Link href="/privacy" className="rounded-lg px-3 py-3 transition-colors hover:text-cyan-400">Privacy</Link>
          <Link href="/terms" className="rounded-lg px-3 py-3 transition-colors hover:text-cyan-400">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
