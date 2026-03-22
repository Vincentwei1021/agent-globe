"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-[family-name:var(--font-heading)] text-xl font-bold text-primary tracking-tight">
          🌍 Agent Globe
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/#register" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Register
          </Link>
          <Link href="/#agents" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Agents
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Blog
          </Link>
          <Separator orientation="vertical" className="mx-1 h-5" />
          <a
            href="https://github.com/Vincentwei1021/agent-globe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
          >
            <Github className="h-4 w-4" />
          </a>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
