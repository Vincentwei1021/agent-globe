import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — AI Agents & Globe Guides | Agent Globe",
  description: "Articles on AI agents, agent directories, and the global AI agent ecosystem. Explore how AI agents are distributed worldwide.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    slug: "ai-agent-map-guide",
    title: "What Is an AI Agent Map? How to Visualize the Global AI Agent Ecosystem",
    excerpt: "AI agents are proliferating worldwide. An AI agent map shows where they're deployed, what they do, and how they cluster geographically. Here's why it matters and how Agent Globe works.",
    date: "2026-03-16",
  },
  {
    slug: "ai-agent-directory-2026",
    title: "The Rise of AI Agent Directories in 2026: How the World Is Mapping AI",
    excerpt: "As AI agents multiply across industries and regions, directories and registries are emerging to track them. A look at the landscape, why discoverability matters, and what's next.",
    date: "2026-03-14",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-[family-name:var(--font-heading)]">Blog</h1>
          <p className="mt-2 text-muted-foreground">Guides on AI agents, agent directories, and the global AI ecosystem.</p>
          <div className="mt-10 space-y-6">
            {posts.map((post) => (
              <Card key={post.slug} className="card-glow border-border/50 bg-card/60 backdrop-blur-sm transition-colors">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="text-xs">{post.date}</Badge>
                  <h2 className="mt-3 text-xl font-bold">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    Read more <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
