"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { testRegex } from "@/lib/regex-utils";
import type { TestResult } from "@/types";
import { cn } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const FLAGS = [
  { flag: "g", label: "Global", desc: "Match all occurrences" },
  { flag: "i", label: "Insensitive", desc: "Case insensitive" },
  { flag: "m", label: "Multiline", desc: "^ and $ match line start/end" },
  { flag: "s", label: "Dotall", desc: ". matches newlines" },
];

const TEST_SAMPLES = [
  { label: "Emails", text: "Contact us at hello@example.com or support@company.co.uk for help." },
  { label: "URLs", text: "Visit https://github.com or http://example.org/path?q=test for resources." },
  { label: "Phone (PK)", text: "Call +923001234567 or 03331234567 to reach us." },
  { label: "Dates", text: "Meeting on 2024-01-15, deadline 2024-12-31, started 2023-06-01." },
];

export function RegexTester() {
  const [pattern, setPattern] = useState("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b");
  const [testText, setTestText] = useState("Contact us at hello@example.com or support@company.co.uk");
  const [flags, setFlags] = useState<string[]>(["g", "i"]);
  const [replaceWith, setReplaceWith] = useState("");
  const [result, setResult] = useState<TestResult | null>(null);
  const [activeTab, setActiveTab] = useState<"matches" | "replace" | "split">("matches");

  const runTest = useCallback(() => {
    if (!pattern) {
      setResult(null);
      return;
    }
    const flagStr = flags.join("");
    const res = testRegex(pattern, flagStr, testText, replaceWith || undefined);
    setResult(res);
  }, [pattern, testText, flags, replaceWith]);

  useEffect(() => {
    const timeout = setTimeout(runTest, 100);
    return () => clearTimeout(timeout);
  }, [runTest]);

  function toggleFlag(flag: string) {
    setFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
  }

  function highlightText(text: string) {
    if (!result?.matches?.length) return text;
    let html = "";
    let lastIdx = 0;
    const sorted = [...result.matches].sort((a, b) => a.index - b.index);
    for (const m of sorted) {
      html += escapeHtml(text.slice(lastIdx, m.index));
      html += `<mark style="background:rgba(34,211,238,0.25);color:#67e8f9;border-radius:2px;padding:0 1px">${escapeHtml(m.value)}</mark>`;
      lastIdx = m.end;
    }
    html += escapeHtml(text.slice(lastIdx));
    return html;
  }

  function escapeHtml(t: string) {
    return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left: Input */}
      <div className="space-y-4">
        {/* Pattern input */}
        <div className="rounded-xl border border-white/8 bg-card/50 p-4">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">PATTERN</label>
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="text-muted-foreground">/</span>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-cyan-300 placeholder:text-muted-foreground"
              placeholder="Enter regex pattern..."
              spellCheck={false}
            />
            <span className="text-muted-foreground">/{flags.join("")}</span>
          </div>
          {result && !result.isValid && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5" /> {result.error}
            </p>
          )}
        </div>

        {/* Flags */}
        <div className="rounded-xl border border-white/8 bg-card/50 p-4">
          <label className="text-xs font-medium text-muted-foreground mb-3 block">FLAGS</label>
          <div className="flex flex-wrap gap-2">
            {FLAGS.map(({ flag, label, desc }) => (
              <button
                key={flag}
                onClick={() => toggleFlag(flag)}
                title={desc}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                  flags.includes(flag)
                    ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                    : "border-white/8 bg-white/3 text-muted-foreground hover:border-white/20 hover:text-foreground"
                )}
              >
                <code className="font-mono">{flag}</code> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Test text */}
        <div className="rounded-xl border border-white/8 bg-card/50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <label className="text-xs font-medium text-muted-foreground">TEST TEXT</label>
            <div className="flex gap-2">
              {TEST_SAMPLES.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setTestText(s.text)}
                  className="text-xs text-muted-foreground hover:text-foreground border border-white/8 rounded px-2 py-0.5 hover:border-white/20 transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: 200 }}>
            <MonacoEditor
              height="200px"
              defaultLanguage="plaintext"
              value={testText}
              onChange={(v) => setTestText(v ?? "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                wordWrap: "on",
                lineNumbers: "off",
                scrollBeyondLastLine: false,
                padding: { top: 12, bottom: 12 },
                fontFamily: "var(--font-geist-mono)",
              }}
            />
          </div>
        </div>

        {/* Replace */}
        <div className="rounded-xl border border-white/8 bg-card/50 p-4">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">REPLACE WITH (optional)</label>
          <input
            value={replaceWith}
            onChange={(e) => setReplaceWith(e.target.value)}
            className="w-full bg-transparent font-mono text-sm focus:outline-none text-foreground placeholder:text-muted-foreground border-b border-white/10 pb-1"
            placeholder="Replacement string... (use $1, $2 for groups)"
          />
        </div>
      </div>

      {/* Right: Results */}
      <div className="space-y-4">
        {/* Stats bar */}
        <div className="rounded-xl border border-white/8 bg-card/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {result?.isValid ? (
              <CheckCircle className="h-4 w-4 text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-400" />
            )}
            <span className="text-sm font-medium">
              {result?.matchCount ?? 0} match{result?.matchCount !== 1 ? "es" : ""}
            </span>
          </div>
          {(result?.matches?.length ?? 0) > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText((result?.matches ?? []).map((m) => m.value).join("\n"))}
              className="h-7 text-xs gap-1.5"
            >
              <Copy className="h-3 w-3" /> Copy all
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-lg border border-white/8 bg-white/3 p-1">
          {(["matches", "replace", "split"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 rounded-md py-1.5 text-xs font-medium capitalize transition-all",
                activeTab === tab
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Match visualization */}
        <div className="rounded-xl border border-white/8 bg-card/50 p-4 min-h-[200px]">
          {activeTab === "matches" && (
            <div>
              <div
                className="font-mono text-sm leading-relaxed break-all text-foreground/90 mb-4 p-3 rounded-lg bg-background/50"
                dangerouslySetInnerHTML={{ __html: highlightText(testText) }}
              />
              {(result?.matches?.length ?? 0) > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground mb-2">Individual matches:</p>
                  {(result?.matches ?? []).map((m, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/3 p-2.5">
                      <Badge variant="outline" className="text-xs bg-cyan-500/10 border-cyan-500/30 text-cyan-400 flex-shrink-0">
                        {i + 1}
                      </Badge>
                      <div className="min-w-0">
                        <code className="text-xs text-cyan-300 font-mono block truncate">{m.value}</code>
                        <span className="text-xs text-muted-foreground">
                          pos {m.index}–{m.end}
                        </span>
                        {m.groups && Object.keys(m.groups).length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {Object.entries(m.groups).map(([k, v]) => (
                              <span key={k} className="text-xs bg-purple-500/10 text-purple-400 rounded px-1.5 py-0.5">
                                {k}: {v}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {result?.matchCount === 0 && pattern && (
                <p className="text-sm text-muted-foreground text-center py-4">No matches found</p>
              )}
            </div>
          )}

          {activeTab === "replace" && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Result after replacement:</p>
              <div className="font-mono text-sm text-foreground/90 p-3 rounded-lg bg-background/50 break-all">
                {result?.replaceResult ?? testText}
              </div>
            </div>
          )}

          {activeTab === "split" && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Split results:</p>
              {result?.splitResult ? (
                <div className="space-y-2">
                  {result.splitResult.map((part, i) => (
                    <div key={i} className="flex gap-2">
                      <Badge variant="outline" className="text-xs flex-shrink-0">{i}</Badge>
                      <code className="text-xs font-mono text-foreground/80 break-all">{part || "(empty)"}</code>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No splits — pattern not found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
