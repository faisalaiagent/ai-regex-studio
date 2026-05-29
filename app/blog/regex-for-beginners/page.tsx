import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Regex for Beginners: A Complete Guide — AI Regex Studio",
  description: "Learn regular expressions from scratch. Covers anchors, character classes, quantifiers, groups with real examples.",
};

export default function BlogPost1() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl py-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs rounded-full border px-2 py-0.5 font-medium text-cyan-400 bg-cyan-500/10 border-cyan-500/20">Tutorial</span>
            <span className="text-xs text-muted-foreground">January 15, 2025 · 8 min read</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight mb-4">Regex for Beginners: A Complete Guide</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            If you have ever stared at a wall of symbols like <code className="bg-white/10 rounded px-1.5 py-0.5 text-cyan-300 font-mono text-sm">^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$</code> and felt completely lost — you are not alone. Regular expressions look intimidating at first. But once you understand the building blocks, they become one of the most powerful tools in a developer toolkit.
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What Exactly Is a Regular Expression?</h2>
            <p>A regular expression (regex or regexp) is essentially a search pattern. You use it to find, match, extract, or replace text that follows a specific format. Think of it like a very advanced Find and Replace that understands rules rather than just exact words.</p>
            <p className="mt-3">For example, instead of searching for one specific phone number, you can write a pattern that matches any phone number. Instead of checking if a string is exactly "hello", you can check if it starts with a capital letter and ends with punctuation.</p>
            <p className="mt-3">Regex is built into almost every programming language — JavaScript, Python, Java, PHP, Ruby — and tools like VS Code, grep, and sed. Once you learn it, that knowledge applies everywhere.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">The Basic Building Blocks</h2>
            <p>Regex is made up of two types of characters. Literal characters match themselves exactly — the letter a matches the letter "a". Special characters called metacharacters have special meaning — a dot matches any single character.</p>

            <h3 className="text-base font-semibold text-foreground mt-6 mb-2">The Dot</h3>
            <p>The dot matches any single character except a newline. So <code className="bg-white/10 rounded px-1.5 py-0.5 text-cyan-300 font-mono">c.t</code> matches "cat", "cot", "cut", even "c4t". It does not care what is in the middle — just that something is there.</p>

            <h3 className="text-base font-semibold text-foreground mt-6 mb-2">Anchors: Start and End</h3>
            <p>Anchors do not match characters — they match positions. The caret <code className="bg-white/10 rounded px-1 text-cyan-300 font-mono">^</code> means start of string and the dollar sign <code className="bg-white/10 rounded px-1 text-cyan-300 font-mono">$</code> means end of string.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-1">
              <p className="text-muted-foreground"># Without anchors - matches "hello" anywhere</p>
              <p>hello matches "say hello world"</p>
              <p className="mt-2 text-muted-foreground"># With anchors - must be the entire string</p>
              <p>^hello$ only matches "hello" exactly</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Character Classes</h2>
            <p>Square brackets let you define a set of characters to match. This is where regex starts getting really useful.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p>[aeiou]      — matches any single vowel</p>
              <p>[a-z]        — matches any lowercase letter</p>
              <p>[0-9]        — matches any digit</p>
              <p>[a-zA-Z0-9]  — matches any letter or digit</p>
              <p>[^aeiou]     — matches anything EXCEPT vowels</p>
            </div>

            <h3 className="text-base font-semibold text-foreground mt-6 mb-2">Shorthand Character Classes</h3>
            <p>Because some character classes are used so often, regex provides shorthand versions:</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p>\d  — any digit (same as [0-9])</p>
              <p>\D  — any non-digit</p>
              <p>\w  — word character: letters, digits, underscore</p>
              <p>\W  — any non-word character</p>
              <p>\s  — any whitespace (space, tab, newline)</p>
              <p>\S  — any non-whitespace character</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Quantifiers — How Many Times?</h2>
            <p>Quantifiers tell the regex engine how many times a character or group should appear. This is one of the most important concepts in regex.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p>*      — zero or more times</p>
              <p>+      — one or more times</p>
              <p>?      — zero or one time (optional)</p>
              <p>{"{3}"}    — exactly 3 times</p>
              <p>{"{2,5}"}  — between 2 and 5 times</p>
              <p>{"{3,}"}   — 3 or more times</p>
            </div>
            <p className="mt-4">For example, <code className="bg-white/10 rounded px-1.5 py-0.5 text-cyan-300 font-mono">\d+</code> matches one or more digits — it matches "42", "100", "9999", but not an empty string. And <code className="bg-white/10 rounded px-1.5 py-0.5 text-cyan-300 font-mono">colou?r</code> matches both "color" and "colour" because the u is optional.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Groups and Capturing</h2>
            <p>Parentheses serve two purposes: they group patterns together, and they capture the matched text so you can use it later in your code.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p className="text-muted-foreground"># Group: apply quantifier to whole group</p>
              <p>(ab)+        — matches "ab", "abab", "ababab"</p>
              <p className="mt-2 text-muted-foreground"># Alternation: match this OR that</p>
              <p>(cat|dog)    — matches "cat" or "dog"</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Flags — Changing How a Pattern Behaves</h2>
            <p>Flags modify how the entire pattern works. The most commonly used ones are:</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p>g  — global: find all matches, not just the first</p>
              <p>i  — case insensitive: treats "Hello" and "hello" equally</p>
              <p>m  — multiline: ^ and $ match each line, not just the whole string</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Building Your First Real Regex: Email Validation</h2>
            <p>Let us put everything together and build a basic email validator step by step. An email has three parts: a local part, an @ symbol, and a domain.</p>
            <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-2">
              <p>[\w.-]+      — local part: letters, digits, dots, hyphens</p>
              <p>@            — literal @ symbol</p>
              <p>[\w.-]+      — domain name</p>
              <p>\.           — literal dot (must escape it)</p>
              <p>[a-zA-Z]{"{2,}"}  — TLD: at least 2 letters (.com, .pk, .io)</p>
            </div>
            <p className="mt-4">Final pattern:</p>
            <div className="mt-2 rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-cyan-300">
              ^[\w.-]+@[\w.-]+\.[a-zA-Z]{"{2,}"}$
            </div>
            <p className="mt-4">This matches "user@example.com" and "faisal.ai@company.pk" but rejects "notanemail" and "@missinglocal.com". Not perfect for every edge case, but solid for most real-world use.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Practical Tips for Learning Regex</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong className="text-foreground">Start small.</strong> Do not try to write one giant regex. Build it piece by piece and test each part separately before combining.</li>
              <li><strong className="text-foreground">Test in real time.</strong> Use the <Link href="/tester" className="text-cyan-400 hover:underline">Live Regex Tester</Link> so you see matches as you type. Instant feedback makes learning 10x faster.</li>
              <li><strong className="text-foreground">Read other patterns.</strong> When you see a regex in someone else's code, decode it symbol by symbol. Use the <Link href="/explainer" className="text-cyan-400 hover:underline">AI Regex Explainer</Link> if you get stuck.</li>
              <li><strong className="text-foreground">Do not memorize — understand.</strong> If you understand what each symbol means, you can always rebuild any pattern from first principles.</li>
              <li><strong className="text-foreground">Use AI to bootstrap.</strong> The <Link href="/generator" className="text-cyan-400 hover:underline">AI Regex Generator</Link> lets you describe what you want in plain English and gives you a working pattern instantly. Great for learning by example.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What to Learn Next</h2>
            <p>You now have a solid foundation. You understand literals, metacharacters, anchors, character classes, quantifiers, and groups. That covers roughly 80% of real-world regex use cases.</p>
            <p className="mt-3">From here, explore lookaheads and lookbehinds, non-greedy matching, and named capture groups. But do not rush — practice the basics on real problems first. Try writing patterns for phone numbers, URLs, dates, and passwords.</p>
            <p className="mt-3">The developers who are good at regex are not memorizing patterns. They have just written enough of them that the symbols feel natural. Start today and you will feel that same comfort sooner than you think.</p>
          </section>
        </div>

        <div className="mt-12 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
          <h3 className="font-semibold text-foreground mb-2">Practice what you just learned</h3>
          <p className="text-sm text-muted-foreground mb-4">Generate patterns from plain English, test them live, and get AI explanations of any regex.</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/generator" className="text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Try Generator</Link>
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
