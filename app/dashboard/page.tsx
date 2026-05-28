"use client";

import Link from "next/link";
import { ... } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUICK_ACTIONS = [
  { href: "/generator", label: "Generate Regex", desc: "AI-powered pattern generation", icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { href: "/tester", label: "Test Pattern", desc: "Live regex testing", icon: TestTube, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { href: "/explainer", label: "Explain Regex", desc: "Understand any pattern", icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { href: "/snippets", label: "My Snippets", desc: "Saved patterns library", icon: FolderOpen, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
];

const REGEX_TEMPLATES = [
  { label: "Email Address", pattern: "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$", flags: "i" },
  { label: "URL", pattern: "https?:\\/\\/(www\\.)?[\\w.-]+\\.[a-z]{2,6}", flags: "gi" },
  { label: "Pakistani Phone", pattern: "(\\+92|0)(3[0-9]{9})", flags: "g" },
  { label: "IPv4 Address", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", flags: "g" },
  { label: "Date (YYYY-MM-DD)", pattern: "\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])", flags: "g" },
  { label: "Strong Password", pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", flags: "" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-muted-foreground text-sm">Welcome back. Start creating regex patterns.</p>
          </div>
          <Link href="/generator">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold gap-2">
              <Sparkles className="h-4 w-4" /> Generate Regex
            </Button>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {QUICK_ACTIONS.map(({ href, label, desc, icon: Icon, color, bg }) => (
            <Link key={href} href={href}>
              <div className="group rounded-xl border border-white/8 bg-card/30 p-5 hover:border-white/15 hover:bg-card/50 transition-all cursor-pointer">
                <div className={`inline-flex rounded-lg border p-2.5 mb-3 ${bg}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{label}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          {[
            { label: "AI Generations Today", value: "0 / 20", sub: "Free plan" },
            { label: "Saved Snippets", value: "0 / 25", sub: "Free plan" },
            { label: "Shared Links", value: "0", sub: "All time" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/8 bg-card/30 p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Templates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Common Regex Templates</h2>
            <span className="text-xs text-muted-foreground">Click to copy</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {REGEX_TEMPLATES.map((t) => (
              <button
                key={t.label}
                onClick={() => navigator.clipboard.writeText(`/${t.pattern}/${t.flags}`)}
                className="group text-left rounded-xl border border-white/8 bg-card/30 p-4 hover:border-white/15 hover:bg-card/50 transition-all"
              >
                <p className="text-xs font-medium text-muted-foreground mb-2">{t.label}</p>
                <code className="text-xs font-mono text-cyan-300 break-all line-clamp-2">
                  /{t.pattern}/{t.flags}
                </code>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
