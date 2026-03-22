import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Agent Globe. Light up the world with AI.</p>
          <div className="flex items-center gap-1">
            <Link href="/" className="rounded-md px-2.5 py-1.5 transition-colors hover:text-primary">Home</Link>
            <Separator orientation="vertical" className="h-4" />
            <Link href="/blog" className="rounded-md px-2.5 py-1.5 transition-colors hover:text-primary">Blog</Link>
            <Separator orientation="vertical" className="h-4" />
            <Link href="/privacy" className="rounded-md px-2.5 py-1.5 transition-colors hover:text-primary">Privacy</Link>
            <Separator orientation="vertical" className="h-4" />
            <Link href="/terms" className="rounded-md px-2.5 py-1.5 transition-colors hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
