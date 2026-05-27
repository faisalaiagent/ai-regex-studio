import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { LandingFooter } from "@/components/landing/footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation — AI Regex Studio",
  description: "Learn how to use AI Regex Studio. Guides for the generator, tester, explainer, and API.",
};

const SECTIONS = [
  {
    title: "Getting Started",
    items: [
      { label: "What is AI Regex Studio?", anchor: "intro" },
      { label: "Quick Start Guide", anchor: "quickstart" },
      { label: "Creating an Account", anchor: "account" },
    ],
  },
  {
    title: "Features",
    items: [
      { label: "AI Regex Generator", anchor: "generator" },
      { label: "Live Regex Tester", anchor: "tester" },
      { label: "AI Regex Explainer", anchor: "explainer" },
      { label: "Save & Share Snippets", anchor: "snippets" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { label: "Authentication", anchor: "api-auth" },
      { label: "Generate Regex", anchor: "api-generate" },
      { label: "Explain Regex", anchor: "api-explain" },
      { label: "Rate Limits", anchor: "api-limits" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Documentation</h1>
          <p className="text-muted-foreground mb-12">Everything you need to know about AI Regex Studio.</p>

          <div className="grid gap-8 md:grid-cols-[240px_1fr]">
            {/* Sidebar */}
            <nav className="space-y-6">
              {SECTIONS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.anchor}>
                        <a
                          href={`#${item.anchor}`}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-0.5"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Content */}
            <div className="space-y-12 text-sm text-muted-foreground leading-relaxed">
              <section id="intro">
                <h2 className="text-xl font-bold text-foreground mb-4">What is AI Regex Studio?</h2>
                <p>
                  AI Regex Studio is a developer utility platform that uses Google's Gemini AI to help you generate, test, explain, and manage regular expressions. Whether you're a beginner learning regex or an expert who just wants to move faster, AI Regex Studio has tools for you.
                </p>
              </section>

              <section id="quickstart">
                <h2 className="text-xl font-bold text-foreground mb-4">Quick Start</h2>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>Go to the <Link href="/generator" className="text-cyan-400 hover:underline">Generator</Link> page.</li>
                  <li>Type a description of what you want to match — e.g. <code className="bg-white/5 rounded px-1.5 py-0.5 font-mono text-xs">Match email addresses ending in .pk or .com</code></li>
                  <li>Click <strong className="text-foreground">Generate Regex</strong> or press <kbd className="bg-white/10 rounded px-1.5 py-0.5 font-mono text-xs">⌘ Enter</kbd>.</li>
                  <li>Copy, test, or save the generated pattern.</li>
                </ol>
              </section>

              <section id="account">
                <h2 className="text-xl font-bold text-foreground mb-4">Creating an Account</h2>
                <p>
                  You don't need an account to use the generator, tester, or explainer. Guest users get 3 AI generations per day. Sign in with Google to unlock 20 daily generations and the ability to save unlimited snippets (up to 25 on the Free plan).
                </p>
              </section>

              <section id="generator">
                <h2 className="text-xl font-bold text-foreground mb-4">AI Regex Generator</h2>
                <p className="mb-4">The generator accepts natural language prompts and returns:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The regex pattern with flags</li>
                  <li>A plain-English explanation</li>
                  <li>Example matching strings</li>
                  <li>Edge cases to be aware of</li>
                  <li>Pattern variants for JavaScript, Python, PCRE, and Java</li>
                  <li>A complexity rating (simple / moderate / complex)</li>
                </ul>
              </section>

              <section id="tester">
                <h2 className="text-xl font-bold text-foreground mb-4">Live Regex Tester</h2>
                <p>
                  The tester provides a Monaco editor for your test text with real-time match highlighting. Supported features:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>Regex flags: g, i, m, s</li>
                  <li>Individual match list with positions</li>
                  <li>Named capture group display</li>
                  <li>Replace preview (with $1, $2 backreferences)</li>
                  <li>Split preview</li>
                </ul>
              </section>

              <section id="explainer">
                <h2 className="text-xl font-bold text-foreground mb-4">AI Regex Explainer</h2>
                <p>
                  Paste any regex pattern and the AI will break it down token by token, color-coded by type (anchors, quantifiers, groups, character classes, assertions). Toggle between Beginner and Technical mode.
                </p>
                <p className="mt-3">
                  The explainer also offers a <strong className="text-foreground">Simplified</strong> version (if the pattern can be written more concisely) and an <strong className="text-foreground">Optimized</strong> version for better runtime performance.
                </p>
              </section>

              <section id="snippets">
                <h2 className="text-xl font-bold text-foreground mb-4">Save & Share Snippets</h2>
                <p>
                  Authenticated users can save regex patterns as snippets. Each snippet can have a title, description, tags, and be organized into folders. Free users can save up to 25 snippets; Pro users get unlimited storage.
                </p>
                <p className="mt-3">
                  Mark a snippet as Public to generate a shareable link. Pro users get SEO-optimized public pages.
                </p>
              </section>

              <section id="api-auth">
                <h2 className="text-xl font-bold text-foreground mb-4">API Authentication</h2>
                <p>
                  Pro users can access the API using a Bearer token. Generate your API key from the Dashboard → Settings → API Keys section.
                </p>
                <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground">
                  <p className="text-muted-foreground mb-1"># Example request</p>
                  <p>curl -X POST https://airegexstudio.com/api/regex/generate \</p>
                  <p className="pl-4">-H "Authorization: Bearer YOUR_API_KEY" \</p>
                  <p className="pl-4">-H "Content-Type: application/json" \</p>
                  <p className="pl-4">-d {"'"}{"{"}"prompt":"Match ISO 8601 dates"{"}"}{"'"}</p>
                </div>
              </section>

              <section id="api-generate">
                <h2 className="text-xl font-bold text-foreground mb-4">POST /api/regex/generate</h2>
                <p className="mb-3">Generate a regex pattern from a natural language prompt.</p>
                <div className="rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-1">
                  <p className="text-muted-foreground">// Request body</p>
                  <p>{"{"}</p>
                  <p className="pl-4">"prompt": string  // 3-500 characters</p>
                  <p>{"}"}</p>
                  <p className="mt-3 text-muted-foreground">// Response</p>
                  <p>{"{"}</p>
                  <p className="pl-4">"result": RegexResult,</p>
                  <p className="pl-4">"usage": {"{"} "used": number, "limit": number {"}"}</p>
                  <p>{"}"}</p>
                </div>
              </section>

              <section id="api-limits">
                <h2 className="text-xl font-bold text-foreground mb-4">Rate Limits</h2>
                <div className="rounded-lg border border-white/10 overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="text-left p-3 font-semibold text-foreground">Plan</th>
                        <th className="text-left p-3 font-semibold text-foreground">Generations/day</th>
                        <th className="text-left p-3 font-semibold text-foreground">Explanations/day</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr><td className="p-3">Guest</td><td className="p-3">3</td><td className="p-3">3</td></tr>
                      <tr><td className="p-3">Free</td><td className="p-3">20</td><td className="p-3">20</td></tr>
                      <tr><td className="p-3">Pro</td><td className="p-3">Unlimited</td><td className="p-3">Unlimited</td></tr>
                      <tr><td className="p-3">Team</td><td className="p-3">Unlimited</td><td className="p-3">Unlimited</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
