import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Blog</h1>
          <p className="mt-2 text-gray-400">Guides on AI agents, agent directories, and the global AI ecosystem.</p>
          <div className="mt-10 space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-cyan-500/20 bg-white/5 p-6 shadow-sm transition-shadow hover:shadow-cyan-500/10 hover:border-cyan-500/40">
                <time className="text-xs font-medium text-gray-500">{post.date}</time>
                <h2 className="mt-2 text-xl font-bold text-white">
                  <Link href={`/blog/${post.slug}`} className="hover:text-cyan-400">{post.title}</Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-sm font-semibold text-cyan-400 hover:text-cyan-300">Read more →</Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
