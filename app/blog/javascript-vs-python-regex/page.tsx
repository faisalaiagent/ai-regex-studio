import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "JavaScript vs Python Regex: Key Differences — AI Regex Studio",
  description: "Named groups, lookbehinds, flag syntax — a practical side-by-side comparison of regex in JavaScript and Python with real code examples.",
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
            If you know regex in one language and switch to another, most of your knowledge transfers directly. But there are some real differences between JavaScript and Python that will catch you off guard if you are not aware of them. This guide covers every important difference with side-by-side code examples.
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Syntax: How You Write a Regex</h2>
            <p>The first difference you will notice is how patterns are written in code.</p>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">JavaScript</h3>
            <p>JavaScript has regex literals built into the language, written between forward slashes. You can also create regex objects using the RegExp constructor.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-1">
              <p className="text-muted-foreground">// Regex literal (preferred)</p>
              <p>const pattern = /\d+/g;</p>
              <p className="mt-2 text-muted-foreground">// RegExp constructor (use when pattern is dynamic)</p>
              <p>const pattern = new RegExp("\\d+", "g");</p>
            </div>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Python</h3>
            <p>Python has no regex literals. You always use the re module. Raw strings (prefixed with r) are strongly recommended to avoid double-escaping backslashes.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-1">
              <p>import re</p>
              <p className="mt-2 text-muted-foreground"># Raw string (recommended)</p>
              <p>pattern = re.compile(r"\d+")</p>
              <p className="mt-2 text-muted-foreground"># Without raw string - need double backslashes</p>
              <p>pattern = re.compile("\\d+")</p>
            </div>
            <p className="mt-3">The raw string prefix r is one of Python's most important regex habits. Without it, you end up writing \\\\n when you mean \\n, and things get confusing fast.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Flags: Same Concept, Different Syntax</h2>
            <p>Both languages support the same set of core flags but write them differently.</p>

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
                  <tr><td className="p-3">Case insensitive</td><td className="p-3 font-mono text-cyan-300">/pattern/i</td><td className="p-3 font-mono text-cyan-300">re.IGNORECASE or re.I</td></tr>
                  <tr><td className="p-3">Global (find all)</td><td className="p-3 font-mono text-cyan-300">/pattern/g</td><td className="p-3 font-mono text-cyan-300">re.findall() or re.finditer()</td></tr>
                  <tr><td className="p-3">Multiline</td><td className="p-3 font-mono text-cyan-300">/pattern/m</td><td className="p-3 font-mono text-cyan-300">re.MULTILINE or re.M</td></tr>
                  <tr><td className="p-3">Dot matches newline</td><td className="p-3 font-mono text-cyan-300">/pattern/s</td><td className="p-3 font-mono text-cyan-300">re.DOTALL or re.S</td></tr>
                  <tr><td className="p-3">Verbose mode</td><td className="p-3 text-muted-foreground">Not supported</td><td className="p-3 font-mono text-cyan-300">re.VERBOSE or re.X</td></tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4">Python has a unique verbose mode (re.VERBOSE) that lets you write regex across multiple lines with comments — a huge help for complex patterns:</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-1">
              <p>pattern = re.compile(r"""</p>
              <p className="pl-4">\d{"{4}"}    # year</p>
              <p className="pl-4">-          # separator</p>
              <p className="pl-4">\d{"{2}"}    # month</p>
              <p className="pl-4">-          # separator</p>
              <p className="pl-4">\d{"{2}"}    # day</p>
              <p>""", re.VERBOSE)</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Finding Matches: Different Functions</h2>
            <p>This is where JavaScript and Python diverge the most. Python has several specialized functions while JavaScript has just a few methods on strings and RegExp objects.</p>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Test if a Match Exists</h3>
            <div className="mt-2 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p className="text-muted-foreground">// JavaScript</p>
              <p>/\d+/.test("abc123")  // true</p>
              <p className="mt-2 text-muted-foreground"># Python</p>
              <p>bool(re.search(r"\d+", "abc123"))  # True</p>
              <p>bool(re.match(r"\d+", "abc123"))   # False (match checks from start)</p>
            </div>
            <p className="mt-3">This is a critical difference. Python's re.match() only checks at the beginning of the string. re.search() checks anywhere. JavaScript's .test() works like re.search() — it finds a match anywhere in the string.</p>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Find All Matches</h3>
            <div className="mt-2 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p className="text-muted-foreground">// JavaScript - returns array of matches</p>
              <p>"a1 b2 c3".match(/\d/g)  // ["1", "2", "3"]</p>
              <p className="mt-2 text-muted-foreground"># Python - findall returns list</p>
              <p>re.findall(r"\d", "a1 b2 c3")  # ["1", "2", "3"]</p>
            </div>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Replace</h3>
            <div className="mt-2 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p className="text-muted-foreground">// JavaScript</p>
              <p>"hello world".replace(/\w+/g, "x")  // "x x"</p>
              <p className="mt-2 text-muted-foreground"># Python</p>
              <p>re.sub(r"\w+", "x", "hello world")  # "x x"</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Named Capture Groups</h2>
            <p>Both languages support named groups but with slightly different syntax.</p>

            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p className="text-muted-foreground">// JavaScript - uses ?{"<name>"}</p>
              <p>{"const m = '2025-01-15'.match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/);"}</p>
              <p>m.groups.year   // "2025"</p>
              <p>m.groups.month  // "01"</p>
              <p className="mt-3 text-muted-foreground"># Python - uses ?P{"<name>"}</p>
              <p>{"m = re.match(r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})', '2025-01-15')"}</p>
              <p>m.group("year")   # "2025"</p>
              <p>m.group("month")  # "01"</p>
            </div>
            <p className="mt-3">The pattern syntax is different — JavaScript uses {"(?<name>)"} while Python uses {"(?P<name>)"}. The P in Python's syntax is a legacy convention. When writing cross-language patterns, always check this difference first.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Lookbehind Support</h2>
            <p>This is an important difference that trips up many developers. Lookbehinds let you match something that is preceded by a pattern, without including the preceding pattern in the match.</p>

            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p className="text-muted-foreground">// JavaScript (ES2018+) - supports variable-length lookbehind</p>
              <p>{"'$100 and €200'.match(/(?<=[€$])\\d+/g)  // ['100', '200']"}</p>
              <p className="mt-2 text-muted-foreground"># Python - supports lookbehind but must be fixed-length</p>
              <p>{"re.findall(r'(?<=[€$])\\d+', '$100 and €200')"}</p>
              <p className="text-muted-foreground mt-1"># This works, but r'(?<=[$€]{1,2})\d+' would FAIL in Python</p>
            </div>
            <p className="mt-3">Python requires lookbehind patterns to be fixed-width — you cannot use quantifiers like + or * inside them. JavaScript ES2018 removed this limitation. If you need variable-length lookbehinds, JavaScript is your better option.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Unicode Handling</h2>
            <p>Python 3 strings are Unicode by default, so regex handles international characters naturally. JavaScript requires the u flag for proper Unicode support, particularly for characters outside the Basic Multilingual Plane (like emoji).</p>

            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p className="text-muted-foreground">// JavaScript - needs u flag for emoji and astral characters</p>
              <p>/^.$/u.test("😀")  // true with u flag</p>
              <p>/^.$/.test("😀")   // false without u flag (emoji = 2 code units)</p>
              <p className="mt-2 text-muted-foreground"># Python 3 - Unicode works naturally</p>
              <p>bool(re.match(r"^.$", "😀"))  # True</p>
            </div>
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
                  <tr><td className="p-3">Pattern literal</td><td className="p-3 font-mono text-cyan-300">/pattern/</td><td className="p-3 font-mono text-cyan-300">r"pattern"</td></tr>
                  <tr><td className="p-3">Test for match</td><td className="p-3 font-mono text-cyan-300">.test(str)</td><td className="p-3 font-mono text-cyan-300">re.search()</td></tr>
                  <tr><td className="p-3">Match from start</td><td className="p-3 font-mono text-cyan-300">/^pattern/.test()</td><td className="p-3 font-mono text-cyan-300">re.match()</td></tr>
                  <tr><td className="p-3">Find all matches</td><td className="p-3 font-mono text-cyan-300">.match(/p/g)</td><td className="p-3 font-mono text-cyan-300">re.findall()</td></tr>
                  <tr><td className="p-3">Replace</td><td className="p-3 font-mono text-cyan-300">.replace(/p/g, x)</td><td className="p-3 font-mono text-cyan-300">re.sub(p, x, str)</td></tr>
                  <tr><td className="p-3">Split</td><td className="p-3 font-mono text-cyan-300">.split(/pattern/)</td><td className="p-3 font-mono text-cyan-300">re.split(p, str)</td></tr>
                  <tr><td className="p-3">Named groups</td><td className="p-3 font-mono text-cyan-300">{"(?<name>)"}</td><td className="p-3 font-mono text-cyan-300">{"(?P<name>)"}</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Which Should You Use?</h2>
            <p>The honest answer is — use whichever language you are working in. The core regex knowledge transfers completely. The differences are mostly in method names and a few syntax details that you will memorize quickly.</p>
            <p className="mt-3">That said, Python wins for data processing scripts where verbose mode and re.compile() make complex patterns much more maintainable. JavaScript wins for browser-based validation, real-time input filtering, and cases where you need variable-length lookbehinds.</p>
            <p className="mt-3">If you are ever unsure about a specific pattern in either language, use the <Link href="/generator" className="text-cyan-400 hover:underline">AI Regex Generator</Link> — it shows you the pattern for all flavors at once, including JavaScript and Python, so you can see the differences immediately.</p>
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
