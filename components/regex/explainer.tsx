"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Loader2, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ExplainResult } from "@/types";
import { cn } from "@/lib/utils";

const COLOR_MAP: Record<string, string> = {
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  green: "text-green-400 bg-green-500/10 border-green-500/20",
  yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  red: "text-red-400 bg-red-500/10 border-red-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  teal: "text-teal-400 bg-teal-500/10 border-teal-500/20",
};

const TYPE_COLORS: Record<string, string> = {
  anchor: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  quantifier: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  group: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  character: "border-green-500/30 bg-green-500/10 text-green-400",
  assertion: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  flag: "border-teal-500/30 bg-teal-500/10 text-teal-400",
  alternation: "border-red-500/30 bg-red-500/10 text-red-400",
};

const EXAMPLE_PATTERNS = [
  { label: "Email", pattern: "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$", flags: "i" },
  { label: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_+.~#?&/=]*)", flags: "" },
  { label: "Phone", pattern: "(\\+92|0)(3[0-9]{9})", flags: "g" },
  { label: "IP Address", pattern: "\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b", flags: "g" },
];

export function RegexExplainer() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExplainResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"beginner" | "technical">("beginner");

  async function explain() {
    if (!pattern.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/regex/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pattern, flags }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to explain");
        return;
      }
      setResult(data.result);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Input */}
      <div className="rounded-xl border border-white/8 bg-card/50 p-6">
        <label className="text-sm font-medium mb-3 block">Paste your regex pattern</label>
        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2 flex-1 font-mono text-sm rounded-lg border border-white/10 bg-background/50 px-4 py-2.5">
            <span className="text-muted-foreground">/</span>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && explain()}
              className="flex-1 bg-transparent focus:outline-none text-cyan-300 placeholder:text-muted-foreground"
              placeholder="[a-z]+@[a-z]+\\.com"
              spellCheck={false}
            />
            <span className="text-muted-foreground">/</span>
            <input
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-10 bg-transparent focus:outline-none text-muted-foreground"
              placeholder="gi"
              maxLength={6}
              spellCheck={false}
            />
          </div>
          <Button
            onClick={explain}
            disabled={!pattern.trim() || loading}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold hover:from-cyan-400 hover:to-blue-400 whitespace-nowrap"
          >
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Explaining...</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Explain</>
            )}
          </Button>
        </div>

        {/* Examples */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          {EXAMPLE_PATTERNS.map((ex) => (
            <button
              key={ex.label}
              onClick={() => { setPattern(ex.pattern); setFlags(ex.flags); }}
              className="text-xs rounded border border-white/8 bg-white/4 px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-white/20 transition-all"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">{error}</div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Overview */}
            <div className="rounded-xl border border-white/8 bg-card/50 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-cyan-400" />
                  Overview
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs capitalize">
                    {result.complexity}
                  </Badge>
                  <div className="flex rounded-lg border border-white/8 bg-white/3 p-0.5">
                    {(["beginner", "technical"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={cn(
                          "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-all",
                          mode === m ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.overview}</p>
            </div>

            {/* Token breakdown */}
            <div className="rounded-xl border border-white/8 bg-card/50 p-5">
              <h3 className="font-semibold text-sm mb-4">Token Breakdown</h3>
              <div className="space-y-3">
                {result.parts.map((part, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4 rounded-lg border border-white/5 bg-white/2 p-3"
                  >
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <code className={cn(
                        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-sm font-bold min-w-[2.5rem] justify-center",
                        COLOR_MAP[part.color] ?? "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
                      )}>
                        {part.token}
                      </code>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] capitalize hidden sm:flex", TYPE_COLORS[part.type] ?? "")}
                      >
                        {part.type}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {mode === "beginner" ? part.beginner : part.explanation}
                      </p>
                      {mode === "beginner" && part.explanation !== part.beginner && (
                        <p className="text-xs text-muted-foreground mt-0.5">{part.explanation}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Simplified / Optimized */}
            {(result.simplified || result.optimized) && (
              <div className="grid gap-4 md:grid-cols-2">
                {result.simplified && (
                  <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                    <h4 className="text-sm font-semibold text-green-400 mb-2">✦ Simplified Version</h4>
                    <code className="font-mono text-sm text-green-300 break-all">/{result.simplified}/</code>
                  </div>
                )}
                {result.optimized && (
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">⚡ Optimized Version</h4>
                    <code className="font-mono text-sm text-blue-300 break-all">/{result.optimized}/</code>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
