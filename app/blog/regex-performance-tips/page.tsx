import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Writing High-Performance Regex: Avoiding ReDoS — AI Regex Studio",
  description: "Catastrophic backtracking can freeze your server. Learn how to write regex that is both correct and fast, and how to spot dangerous patterns before they hit production.",
};

export default function BlogPost3() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl py-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs rounded-full border px-2 py-0.5 font-medium text-purple-400 bg-purple-500/10 border-purple-500/20">Advanced</span>
            <span className="text-xs text-muted-foreground">January 5, 2025 · 6 min read</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight mb-4">Writing High-Performance Regex: Avoiding ReDoS</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A single badly written regular expression once took down Cloudflare for 27 minutes in 2019, affecting millions of websites. The culprit was not a bug in the traditional sense — it was catastrophic backtracking. Here is everything you need to know to never make the same mistake.
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What Is ReDoS?</h2>
            <p>ReDoS stands for Regular Expression Denial of Service. It happens when a regex engine takes an exponential amount of time to evaluate certain inputs against a poorly written pattern. Instead of completing in milliseconds, the match can take seconds, minutes, or effectively forever.</p>
            <p className="mt-3">In a web server context, if a user can control the input being matched against a slow regex, they can send a single crafted request that ties up a thread for minutes. Send enough of those requests and your server goes down — a denial of service attack using nothing but text.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Understanding Backtracking</h2>
            <p>To understand ReDoS, you need to understand how most regex engines work. They use a technique called backtracking. When the engine tries to match a pattern and fails partway through, it goes back to a previous decision point and tries a different path.</p>
            <p className="mt-3">This is normally fine and happens in microseconds. The problem is when a pattern has many possible paths and a specially crafted input forces the engine to explore all of them before concluding there is no match.</p>

            <h3 className="text-base font-semibold text-foreground mt-6 mb-2">A Classic Dangerous Pattern</h3>
            <p>Here is a pattern that looks innocent but is actually a ReDoS bomb:</p>
            <div className="mt-3 rounded-lg bg-red-500/10 border border-red-500/20 p-4 font-mono text-xs text-red-300">
              ^(a+)+$
            </div>
            <p className="mt-3">This pattern matches a string of one or more "a" characters. Sounds simple. But try matching it against "aaaaaaaaaaaaaaaaaaaX" — a string of a's ending with something that does not match.</p>
            <p className="mt-3">The engine has to figure out every way to divide the "a" characters between the outer + and the inner a+. For 20 a's, there are over a million combinations to try. For 30 a's, it is over a billion. The time complexity is exponential.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How to Spot Dangerous Patterns</h2>
            <p>There are specific structures that commonly lead to catastrophic backtracking. Learn to recognize them:</p>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">1. Nested Quantifiers</h3>
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 font-mono text-xs text-red-300">
              (a+)+  or  (a*)* or  (a+)*
            </div>
            <p className="mt-2">Any time you have a quantifier inside a group that also has a quantifier, you should be suspicious. The inner and outer quantifiers compete with each other and create exponential combinations.</p>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">2. Alternation with Overlapping Options</h3>
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 font-mono text-xs text-red-300">
              (a|aa)+ or (a|a?)+ or (\w|\w\w)+
            </div>
            <p className="mt-2">When the alternatives in an OR can match the same characters, the engine tries both paths at every position, multiplying the work needed.</p>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">3. Overly Broad Patterns with Long Input</h3>
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 font-mono text-xs text-red-300">
              .*foo.* applied to very long strings without foo
            </div>
            <p className="mt-2">While not always catastrophic, overly greedy patterns on long inputs can still be much slower than they need to be.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How to Fix Dangerous Patterns</h2>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Use Atomic Groups or Possessive Quantifiers</h3>
            <p>Some regex flavors (PHP PCRE, Java) support atomic groups and possessive quantifiers that tell the engine to never backtrack into that section.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p className="text-red-300">Dangerous:    (a+)+</p>
              <p className="text-green-300">Possessive:   (a++)+ (PHP/PCRE)</p>
              <p className="text-green-300">Atomic group: {"(?>"} a+ ) + (PHP/PCRE/Java)</p>
            </div>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Rewrite the Pattern Logic</h3>
            <p>In most cases, you can rewrite the dangerous pattern to achieve the same result without nested quantifiers:</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p className="text-red-300">Dangerous:  ^(a+)+$</p>
              <p className="text-green-300">Safe:       ^a+$</p>
              <p className="mt-3 text-red-300">Dangerous:  (\w+\s?)+</p>
              <p className="text-green-300">Safe:       \w+(\s\w+)*</p>
            </div>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Add Input Length Limits</h3>
            <p>One of the most practical defenses is simply limiting how long the input can be before you run the regex on it. A pattern that takes exponential time on 1000 characters might be perfectly fast on 100 characters.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-1">
              <p className="text-muted-foreground">// JavaScript — check length first</p>
              <p>if (input.length {"<"} 500 {"&&"} /your-pattern/.test(input)) {"{"}</p>
              <p className="pl-4">// safe to proceed</p>
              <p>{"}"}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">General Performance Tips</h2>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Compile Patterns Once, Reuse Them</h3>
            <p>In Python, always compile your regex if you are going to use it more than once. Compilation has overhead; reusing a compiled pattern is much faster in loops.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-1">
              <p className="text-muted-foreground"># Slow - compiles on every iteration</p>
              <p>for line in lines:</p>
              <p className="pl-4">if re.match(r"\d+", line):</p>
              <p className="mt-3 text-muted-foreground"># Fast - compile once</p>
              <p>pattern = re.compile(r"\d+")</p>
              <p>for line in lines:</p>
              <p className="pl-4">if pattern.match(line):</p>
            </div>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Be Specific, Not Greedy</h3>
            <p>Replace overly broad patterns with specific ones. Instead of matching everything and filtering later, match exactly what you need.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p className="text-red-300">Slow:  {"<.*>"} (greedy, backtracks a lot)</p>
              <p className="text-green-300">Fast:  {"<[^>]*>"} (negated class, no backtracking)</p>
            </div>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Use Anchors Where Possible</h3>
            <p>Anchors like ^ and $ tell the engine exactly where to look, eliminating unnecessary position scanning through the entire string.</p>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Fail Fast with Leading Literals</h3>
            <p>If your pattern starts with a literal string, the engine can use fast string search to find candidate positions before doing the expensive regex work. Starting with a literal is almost always faster than starting with a metacharacter.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Real World Example: The Cloudflare Incident</h2>
            <p>The 2019 Cloudflare outage was caused by a WAF (Web Application Firewall) rule with a regex that included a pattern similar to <code className="bg-white/10 rounded px-1.5 py-0.5 text-cyan-300 font-mono">.*.*=.*</code> — multiple overlapping wildcards that caused catastrophic backtracking when evaluated against certain HTTP request bodies.</p>
            <p className="mt-3">The fix was straightforward once identified — rewrite the pattern to be more specific. But the damage of 27 minutes of downtime and significant revenue loss was already done. This is why performance review of regex patterns is not optional in production systems — it is essential.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Quick Checklist Before Deploying a Regex</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Does the pattern have nested quantifiers? If yes, can you simplify?</li>
              <li>Does alternation use overlapping options? Separate them or make them mutually exclusive.</li>
              <li>Is there an input length limit before the regex runs?</li>
              <li>Have you tested the pattern against long strings that do not match?</li>
              <li>Have you compiled the pattern once if reusing it in a loop?</li>
              <li>Are you using specific character classes instead of broad wildcards?</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Conclusion</h2>
            <p>Writing fast regex is mostly about understanding how the engine works and avoiding patterns that force it to explore exponential possibilities. The rules are not complicated: avoid nested quantifiers, be specific rather than greedy, anchor where you can, and always limit input length on user-controlled data.</p>
            <p className="mt-3">The <Link href="/generator" className="text-cyan-400 hover:underline">AI Regex Generator</Link> generates patterns designed to be both correct and safe. If you are unsure about a pattern you found in existing code, paste it into the <Link href="/explainer" className="text-cyan-400 hover:underline">AI Explainer</Link> to get a breakdown and optimization suggestions.</p>
          </section>

        </div>

        <div className="mt-12 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
          <h3 className="font-semibold text-foreground mb-2">Check if your regex is safe</h3>
          <p className="text-sm text-muted-foreground mb-4">Paste any pattern into the AI Explainer to get an optimization analysis and plain-English breakdown.</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/explainer" className="text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Open Explainer</Link>
            <Link href="/tester" className="text-sm font-semibold text-foreground border border-white/15 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">Live Tester</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Back to Blog</Link>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
