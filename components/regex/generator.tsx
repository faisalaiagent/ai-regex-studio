"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Copy, RefreshCw, Save, Share2, Download,
  CheckCircle, AlertCircle, Loader2, ChevronDown, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { RegexResult } from "@/types";
import { cn } from "@/lib/utils";

const PROMPT_EXAMPLES = [
  "Match email addresses",
  "Validate Pakistani phone numbers starting with +92",
  "Extract URLs from text",
  "Match dates in YYYY-MM-DD format",
  "Find HTML tags",
  "Match IPv4 addresses",
  "Validate strong passwords (8+ chars, uppercase, number, symbol)",
];

const COMPLEXITY_COLORS = {
  simple: "text-green-400 bg-green-500/10 border-green-500/20",
  moderate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  complex: "text-red-400 bg-red-500/10 border-red-500/20",
};

export function RegexGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RegexResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showFlavors, setShowFlavors] = useState(false);
  const { toast } = useToast();

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/regex/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError(`Daily limit reached (${data.used}/${data.limit}). ${data.upgradeRequired ? "Upgrade to Pro for unlimited generations." : ""}`);
        } else {
          setError(data.error ?? "Something went wrong");
        }
        return;
      }

      setResult(data.result);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyPattern() {
    if (!result) return;
    await navigator.clipboard.writeText(`/${result.pattern}/${result.flags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Pattern copied to clipboard." });
  }

  function downloadResult() {
    if (!result) return;
    const json = JSON.stringify(result, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "regex-pattern.json";
    a.click();
  }

  function useExample(example: string) {
    setPrompt(example);
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="rounded-xl border border-white/8 bg-card/50 backdrop-blur-sm p-6">
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Describe your pattern</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generate();
            }}
            placeholder="e.g. Match email addresses that end with .pk or .com..."
            className="min-h-[100px] resize-none bg-background/50 border-white/10 font-mono text-sm focus:border-cyan-500/50 transition-colors"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Press <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">⌘ Enter</kbd> to generate
          </p>
        </div>

        {/* Examples */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-muted-foreground self-center">Try:</span>
          {PROMPT_EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => useExample(ex)}
              className="text-xs rounded-md border border-white/8 bg-white/4 px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/8 transition-all"
            >
              {ex}
            </button>
          ))}
        </div>

        <Button
          onClick={generate}
          disabled={!prompt.trim() || loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold hover:from-cyan-400 hover:to-blue-400 h-11"
        >
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating with AI...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> Generate Regex</>
          )}
        </Button>
      </div>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4"
          >
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-400">Generation failed</p>
              <p className="text-sm text-red-400/80 mt-0.5">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Pattern Card */}
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-sm">{result.title ?? "Generated Pattern"}</h3>
                    {result.complexity && (
                      <Badge
                        variant="outline"
                        className={cn("text-xs capitalize", COMPLEXITY_COLORS[result.complexity])}
                      >
                        {result.complexity}
                      </Badge>
                    )}
                    {result.flags && (
                      <Badge variant="outline" className="text-xs border-white/10 bg-white/5">
                        flags: {result.flags}
                      </Badge>
                    )}
                  </div>
                  <code className="block font-mono text-lg text-cyan-300 break-all">
                    /{result.pattern}/{result.flags}
                  </code>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyPattern}
                    className="h-8 gap-1.5 text-xs"
                  >
                    {copied ? (
                      <><CheckCircle className="h-3.5 w-3.5 text-green-400" /> Copied</>
                    ) : (
                      <><Copy className="h-3.5 w-3.5" /> Copy</>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={generate}
                    className="h-8 gap-1.5 text-xs"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Retry
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm" className="h-8 text-xs border-white/10 gap-1.5">
                  <Save className="h-3.5 w-3.5" /> Save
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs border-white/10 gap-1.5">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadResult}
                  className="h-8 text-xs border-white/10 gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" /> Export JSON
                </Button>
              </div>
            </div>

            {/* Examples & Edge Cases */}
            <div className="grid gap-4 md:grid-cols-2">
              {result.examples?.length > 0 && (
                <div className="rounded-xl border border-white/8 bg-card/30 p-4">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400 inline-block" />
                    Matches
                  </h4>
                  <ul className="space-y-1.5">
                    {result.examples.map((ex, i) => (
                      <li key={i} className="font-mono text-xs text-green-400 bg-green-500/5 rounded px-3 py-1.5 border border-green-500/10">
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.edgeCases?.length > 0 && (
                <div className="rounded-xl border border-white/8 bg-card/30 p-4">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-400 inline-block" />
                    Edge Cases
                  </h4>
                  <ul className="space-y-1.5">
                    {result.edgeCases.map((ec, i) => (
                      <li key={i} className="text-xs text-yellow-400/80 bg-yellow-500/5 rounded px-3 py-1.5 border border-yellow-500/10">
                        {ec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Flavor Support */}
            {result.flavors && (
              <div className="rounded-xl border border-white/8 bg-card/30 overflow-hidden">
                <button
                  onClick={() => setShowFlavors(!showFlavors)}
                  className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-medium hover:bg-white/3 transition-colors"
                >
                  <span>Multi-Flavor Support</span>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", showFlavors && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {showFlavors && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-3 p-4 md:grid-cols-2">
                        {Object.entries(result.flavors).map(([flavor, pattern]) => (
                          <div key={flavor} className="rounded-lg border border-white/5 bg-white/3 p-3">
                            <div className="text-xs font-medium text-muted-foreground capitalize mb-1.5">{flavor}</div>
                            <code className="text-xs font-mono text-cyan-300 break-all">{pattern}</code>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
