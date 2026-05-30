import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "JavaScript vs Python Regex: Key Differences — AI Regex Studio",
  description: "Named groups, lookbehinds, flag syntax — a practical side-by-side comparison of regex in JavaScript and Python with real code examples.",
};

const CODE = {
  jsLiteral: "// Regex literal (preferred)\nconst pattern = /\\d+/g;\n\n// RegExp constructor (use for dynamic patterns)\nconst pattern2 = new RegExp('\\\\d+', 'g');",
  pyRaw: "import re\n\n# Raw string (recommended — avoids double backslash)\npattern = re.compile(r'\\d+')\n\n# Without raw string — needs double backslashes\npattern2 = re.compile('\\\\d+')",
  verboseMode: "pattern = re.compile(r\"\"\"\n    \\d{4}    # year\n    -        # separator\n    \\d{2}    # month\n    -        # separator\n    \\d{2}    # day\n\"\"\", re.VERBOSE)",
  testMatch: "// JavaScript\n/\\d+/.test('abc123')  // true\n\n# Python\nbool(re.search(r'\\d+', 'abc123'))  # True\nbool(re.match(r'\\d+', 'abc123'))   # False — match() checks from start only",
  findAll: "// JavaScript — returns array\n'a1 b2 c3'.match(/\\d/g)  // ['1', '2', '3']\n\n# Python — findall returns list\nre.findall(r'\\d', 'a1 b2 c3')  # ['1', '2', '3']",
  replace: "// JavaScript\n'hello world'.replace(/\\w+/g, 'x')  // 'x x'\n\n# Python\nre.sub(r'\\w+', 'x', 'hello world')  # 'x x'",
  namedJS: "// JavaScript — uses (?<name>)\nconst m = '2025-01-15'.match(\n  /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/\n);\nm.groups.year   // '2025'\nm.groups.month  // '01'",
  namedPY: "# Python — uses (?P<name>)\nm = re.match(\n  r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})',\n  '2025-01-15'\n)\nm.group('year')   # '2025'\nm.group('month')  # '01'",
  lookbehindJS: "// JavaScript (ES2018+) — variable-length lookbehind works\n'$100 and €200'.match(/(?<=[€$])\\d+/g)  // ['100', '200']",
  lookbehindPY: "# Python — lookbehind must be fixed-width\nre.findall(r'(?<=[€$])\\d+', '$100 and €200')\n# NOTE: (?<=[€$]{1,2}) would FAIL in Python — no variable width",
  unicodeJS: "// JavaScript — needs 'u' flag for emoji\n/^.$/u.test('😀')  // true  (with u flag)\n/^.$/.test('😀')   // false (without u flag)",
  unicodePY: "# Python 3 — Unicode works naturally, no flag needed\nbool(re.match(r'^.$', '😀'))  # True",
};

export default function BlogPost4() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl py-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs rounded-full border px-2 py-0.5 font-medium text-green-400 bg-green-500/10 border-green-500/20">Comparison</span>
            <span className="text-xs text-muted-foreground">December 28, 2024 · 7 min read</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight mb-4">JavaScript vs Python Regex: Key Differences</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            If you know regex in one language and switch to another, most of your knowledge transfers directly. But there are real differences between JavaScript and Python that will catch you off guard. This guide covers every important difference with side-by-side code examples.
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Syntax: How You Write a Regex</h2>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">JavaScript</h3>
            <p>JavaScript has regex literals built into the language, written between forward slashes. You can also use the RegExp constructor for dynamic patterns.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.jsLiteral}</div>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Python</h3>
            <p>Python has no regex literals. You always use the re module. Raw strings (prefixed with r) are strongly recommended to avoid double-escaping backslashes.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.pyRaw}</div>
            <p className="mt-3">The raw string prefix r is one of Python's most important regex habits. Without it, writing patterns with backslashes quickly becomes confusing.</p>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Python Verbose Mode</h3>
            <p>Python has a unique verbose mode that lets you write regex across multiple lines with comments — very useful for complex patterns.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.verboseMode}</div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Flags: Same Concept, Different Syntax</h2>
            <div className="mt-3 rounded-lg border border-white/10 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left p-3 font-semibold text-foreground">Flag</th>
                    <th className="text-left p-3 font-semibold text-foreground">JavaScript</th>
                    <th className="text-left p-3 font-semibold text-foreground">Python</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="p-3">Case insensitive</td><td className="p-3 font-mono text-cyan-300">/pattern/i</td><td className="p-3 font-mono text-cyan-300">re.IGNORECASE</td></tr>
                  <tr><td className="p-3">Global (find all)</td><td className="p-3 font-mono text-cyan-300">/pattern/g</td><td className="p-3 font-mono text-cyan-300">re.findall()</td></tr>
                  <tr><td className="p-3">Multiline</td><td className="p-3 font-mono text-cyan-300">/pattern/m</td><td className="p-3 font-mono text-cyan-300">re.MULTILINE</td></tr>
                  <tr><td className="p-3">Dot matches newline</td><td className="p-3 font-mono text-cyan-300">/pattern/s</td><td className="p-3 font-mono text-cyan-300">re.DOTALL</td></tr>
                  <tr><td className="p-3">Verbose mode</td><td className="p-3 text-muted-foreground">Not available</td><td className="p-3 font-mono text-cyan-300">re.VERBOSE</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Finding Matches: Different Functions</h2>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Test if a Match Exists</h3>
            <div className="mt-2 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.testMatch}</div>
            <p className="mt-3">This is a critical difference. Python's re.match() only checks at the beginning of the string. re.search() checks anywhere. JavaScript's .test() works like re.search() — it finds a match anywhere in the string.</p>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Find All Matches</h3>
            <div className="mt-2 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.findAll}</div>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Replace</h3>
            <div className="mt-2 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.replace}</div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Named Capture Groups</h2>
            <p>Both languages support named groups but with slightly different syntax. JavaScript uses (?&lt;name&gt;) while Python uses (?P&lt;name&gt;).</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.namedJS}</div>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.namedPY}</div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Lookbehind Support</h2>
            <p>Lookbehinds let you match something preceded by a pattern, without including the preceding part in the match. This is where the two languages have a meaningful difference.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.lookbehindJS}</div>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.lookbehindPY}</div>
            <p className="mt-3">Python requires lookbehind patterns to be fixed-width — quantifiers like + or * are not allowed inside them. JavaScript ES2018 removed this limitation. If you need variable-length lookbehinds, JavaScript is the better option.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Unicode Handling</h2>
            <p>Python 3 strings are Unicode by default. JavaScript requires the u flag for proper Unicode support, particularly for characters outside the Basic Multilingual Plane like emoji.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.unicodeJS}</div>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground whitespace-pre-line">{CODE.unicodePY}</div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Quick Reference: Side-by-Side Summary</h2>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left p-3 font-semibold text-foreground">Task</th>
                    <th className="text-left p-3 font-semibold text-foreground">JavaScript</th>
                    <th className="text-left p-3 font-semibold text-foreground">Python</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-muted-foreground">
                  <tr><td className="p-3">Write a pattern</td><td className="p-3 font-mono text-cyan-300">/pattern/</td><td className="p-3 font-mono text-cyan-300">r"pattern"</td></tr>
                  <tr><td className="p-3">Test for match</td><td className="p-3 font-mono text-cyan-300">.test(str)</td><td className="p-3 font-mono text-cyan-300">re.search()</td></tr>
                  <tr><td className="p-3">Match from start</td><td className="p-3 font-mono text-cyan-300">/^p/.test()</td><td className="p-3 font-mono text-cyan-300">re.match()</td></tr>
                  <tr><td className="p-3">Find all matches</td><td className="p-3 font-mono text-cyan-300">.match(/p/g)</td><td className="p-3 font-mono text-cyan-300">re.findall()</td></tr>
                  <tr><td className="p-3">Replace</td><td className="p-3 font-mono text-cyan-300">.replace(/p/g, x)</td><td className="p-3 font-mono text-cyan-300">re.sub(p, x, s)</td></tr>
                  <tr><td className="p-3">Split</td><td className="p-3 font-mono text-cyan-300">.split(/p/)</td><td className="p-3 font-mono text-cyan-300">re.split(p, s)</td></tr>
                  <tr><td className="p-3">Named groups</td><td className="p-3 font-mono text-cyan-300">(?&lt;name&gt;)</td><td className="p-3 font-mono text-cyan-300">(?P&lt;name&gt;)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Which Should You Use?</h2>
            <p>Use whichever language you are already working in. The core regex knowledge transfers completely. The differences are mostly method names and a few syntax details you will memorize quickly.</p>
            <p className="mt-3">Python wins for data processing scripts where verbose mode and re.compile() make complex patterns more maintainable. JavaScript wins for browser-based validation, real-time input filtering, and cases where you need variable-length lookbehinds.</p>
            <p className="mt-3">If you are unsure about a pattern in either language, use the <Link href="/generator" className="text-cyan-400 hover:underline">AI Regex Generator</Link> — it shows you the pattern for JavaScript, Python, PCRE, and Java simultaneously.</p>
          </section>

        </div>

        <div className="mt-12 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
          <h3 className="font-semibold text-foreground mb-2">Test patterns in both languages</h3>
          <p className="text-sm text-muted-foreground mb-4">The AI Generator shows JavaScript, Python, PCRE, and Java variants for every pattern it creates.</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/generator" className="text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Try Generator</Link>
            <Link href="/explainer" className="text-sm font-semibold text-foreground border border-white/15 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">Explain a Pattern</Link>
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
