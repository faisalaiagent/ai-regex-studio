import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { LandingFooter } from "@/components/landing/footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — AI Regex Studio",
  description: "Tutorials, guides, and deep dives on regular expressions for developers.",
};

const POSTS = [
  {
    slug: "regex-for-beginners",
    title: "Regex for Beginners: A Complete Guide",
    description: "Learn regular expressions from zero — anchors, character classes, quantifiers, groups, and lookaheads explained with real examples.",
    date: "Jan 15, 2025",
    readTime: "8 min",
    tag: "Tutorial",
  },
  {
    slug: "10-regex-patterns-every-dev-should-know",
    title: "10 Regex Patterns Every Developer Should Know",
    description: "From email validation to URL parsing — the most useful regex patterns in production code, with copy-ready snippets.",
    date: "Jan 10, 2025",
    readTime: "5 min",
    tag: "Reference",
  },
  {
    slug: "regex-performance-tips",
    title: "Writing High-Performance Regex: Avoiding ReDoS",
    description: "Catastrophic backtracking can take down your server. Here's how to write regex that's both correct and fast.",
    date: "Jan 5, 2025",
    readTime: "6 min",
    tag: "Advanced",
  },
  {
    slug: "javascript-vs-python-regex",
    title: "JavaScript vs Python Regex: Key Differences",
    description: "Named groups, lookbehinds, flag syntax — a practical comparison of regex across the two most popular languages.",
    date: "Dec 28, 2024",
    readTime: "7 min",
    tag: "Comparison",
  },
];

const TAG_COLORS: Record<string, string> = {
  Tutorial: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  Reference: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Advanced: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Comparison: "text-green-400 bg-green-500/10 border-green-500/20",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground">Tutorials and guides on regular expressions for developers.</p>
        </div>

        <div className="space-y-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-white/8 bg-card/30 p-6 hover:border-white/15 hover:bg-card/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs rounded-full border px-2 py-0.5 font-medium ${TAG_COLORS[post.tag]}`}>
                      {post.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{post.readTime} read</span>
                  </div>
                  <h2 className="font-semibold text-base group-hover:text-cyan-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
