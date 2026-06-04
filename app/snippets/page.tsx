"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FolderOpen,
  Plus,
  Copy,
  Search,
  Tag,
  Zap,
  Clock,
  Star,
  Trash2,
  ExternalLink,
  Code2,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";

const SAMPLE_SNIPPETS = [
  {
    id: 1,
    title: "Email Address Validator",
    pattern: "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$",
    flags: "i",
    description: "Validates standard email addresses",
    tags: ["email", "validation"],
    favorite: true,
    createdAt: "2 days ago",
  },
  {
    id: 2,
    title: "Pakistani Mobile Number",
    pattern: "(\\+92|0)(3[0-9]{9})",
    flags: "g",
    description: "Matches Pakistani mobile numbers starting with +92 or 0",
    tags: ["phone", "pakistan"],
    favorite: false,
    createdAt: "5 days ago",
  },
  {
    id: 3,
    title: "URL Extractor",
    pattern: "https?:\\/\\/(www\\.)?[\\w.-]+\\.[a-z]{2,6}(\\/[\\w./?=%&-]*)?",
    flags: "gi",
    description: "Extracts HTTP and HTTPS URLs from text",
    tags: ["url", "web"],
    favorite: true,
    createdAt: "1 week ago",
  },
];

const TAG_COLORS: Record<string, string> = {
  email: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  validation: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  phone: "text-green-400 bg-green-500/10 border-green-500/20",
  pakistan: "text-green-400 bg-green-500/10 border-green-500/20",
  url: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  web: "text-purple-400 bg-purple-500/10 border-purple-500/20",
};

export default function SnippetsPage() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const [isSignedIn] = useState(false);

  const filtered = SAMPLE_SNIPPETS.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.pattern.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCopy = (id: number, pattern: string, flags: string) => {
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 md:py-12">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Snippets</h1>
            <p className="mt-1 text-muted-foreground text-sm">
              Save, organize, and reuse your regex patterns.
            </p>
          </div>
          <Link href="/generator">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold gap-2">
              <Plus className="h-4 w-4" /> New Snippet
            </Button>
          </Link>
        </div>

        {/* Not signed in banner */}
        {!isSignedIn && (
          <div className="mb-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20">
                <FolderOpen className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Sign in to save your snippets</p>
                <p className="text-xs text-muted-foreground">Free accounts can save up to 25 regex patterns permanently.</p>
              </div>
            </div>
            <Link href="/auth/signin">
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold text-xs">
                Sign In Free
              </Button>
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {[
            { label: "Total Snippets", value: "3", icon: Code2, color: "text-cyan-400" },
            { label: "Favorites", value: "2", icon: Star, color: "text-yellow-400" },
            { label: "Recently Added", value: "1", icon: Clock, color: "text-blue-400" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/8 bg-card/30 p-4 flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search snippets by title, pattern, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-card/30 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all"
          />
        </div>

        {/* Snippets Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 rounded-xl border border-white/8 bg-card/10">
            <FolderOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">No snippets found</p>
            <p className="text-xs text-muted-foreground mb-4">
              {search ? `No results for "${search}"` : "Generate a regex and save it to see it here."}
            </p>
            <Link href="/generator">
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold gap-1.5">
                <Zap className="h-3 w-3" /> Generate Regex
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((snippet) => (
              <div
                key={snippet.id}
                className="group rounded-xl border border-white/8 bg-card/30 p-5 hover:border-white/15 hover:bg-card/50 transition-all flex flex-col gap-3"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {snippet.favorite && (
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 shrink-0" />
                      )}
                      <h3 className="font-semibold text-sm text-foreground leading-tight">
                        {snippet.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{snippet.description}</p>
                  </div>
                </div>

                {/* Pattern */}
                <div className="rounded-lg bg-black/40 border border-white/8 px-3 py-2">
                  <code className="text-xs font-mono text-cyan-300 break-all line-clamp-2">
                    /{snippet.pattern}/{snippet.flags}
                  </code>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {snippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 text-xs rounded-full border px-2 py-0.5 ${TAG_COLORS[tag] ?? "text-muted-foreground bg-white/5 border-white/10"}`}
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {snippet.createdAt}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link href={`/tester?pattern=${encodeURIComponent(snippet.pattern)}&flags=${snippet.flags}`}>
                      <button className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/10 transition-colors" title="Test in tester">
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleCopy(snippet.id, snippet.pattern, snippet.flags)}
                      className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/10 transition-colors"
                      title="Copy pattern"
                    >
                      <Copy className={`h-3.5 w-3.5 ${copied === snippet.id ? "text-green-400" : "text-muted-foreground"}`} />
                    </button>
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-red-500/10 transition-colors"
                      title="Delete snippet"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-red-400 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upgrade CTA */}
        <div className="mt-10 rounded-xl border border-white/8 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-semibold text-sm text-foreground">Upgrade to Pro</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Save unlimited snippets, organize with folders, and share SEO-optimized public pages.
            </p>
          </div>
          <Link href="/pricing">
            <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-xs font-semibold">
              View Pro Plans →
            </Button>
          </Link>
        </div>

      </main>
      <LandingFooter />
    </div>
  );
}
