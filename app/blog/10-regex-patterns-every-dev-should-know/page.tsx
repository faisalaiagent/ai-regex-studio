import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "10 Regex Patterns Every Developer Should Know — AI Regex Studio",
  description: "The most useful regex patterns for production code — email, URL, phone, password, dates, IPs, and more. Copy-ready snippets for JavaScript and Python.",
};

const PATTERNS = [
  { n: 1, title: "Email Address Validation", pattern: `^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$`, flags: "i", matches: ["user@example.com", "faisal.ai@company.pk"], fails: ["notanemail", "@missing.com"] },
  { n: 2, title: "URL Matching", pattern: `https?:\\/\\/(www\\.)?[\\w.-]+\\.[a-z]{2,6}(\\/[\\w./?=%&-]*)?`, flags: "gi", matches: ["https://example.com", "http://www.site.pk/page"], fails: ["ftp://wrong.com", "not a url"] },
  { n: 3, title: "Pakistani Mobile Number", pattern: `(\\+92|0)(3[0-9]{9})`, flags: "g", matches: ["+923001234567", "03001234567"], fails: ["+910001234567", "12345"] },
  { n: 4, title: "Strong Password", pattern: `^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$`, flags: "", matches: ["Hello@123", "Secure#99Pass"], fails: ["weakpass", "NoSymbol1"] },
  { n: 5, title: "IPv4 Address", pattern: `\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b`, flags: "g", matches: ["192.168.1.1", "255.255.255.0"], fails: ["999.1.1.1", "192.168.1"] },
  { n: 6, title: "Date: YYYY-MM-DD Format", pattern: `\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])`, flags: "g", matches: ["2025-01-15", "1999-12-31"], fails: ["2025-13-01", "25-1-1"] },
  { n: 7, title: "HTML Tag Removal", pattern: `<[^>]*>`, flags: "g", matches: ["<p>", "<div class='x'>", "</span>"], fails: [] },
  { n: 8, title: "Hex Color Code", pattern: `#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})`, flags: "gi", matches: ["#ff5733", "#FFF", "#a1b2c3"], fails: ["#GGGGGG", "#12345"] },
  { n: 9, title: "Credit Card Number (Basic)", pattern: `\\b(?:\\d{4}[- ]?){3}\\d{4}\\b`, flags: "g", matches: ["4111111111111111", "4111-1111-1111-1111"], fails: ["123456", "abcd-efgh-ijkl-mnop"] },
  { n: 10, title: "Slug (URL-Friendly String)", pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$`, flags: "", matches: ["my-blog-post", "regex-guide-2025"], fails: ["My Blog Post", "has_underscore"] },
];

export default function BlogPost2() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl py-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs rounded-full border px-2 py-0.5 font-medium text-blue-400 bg-blue-500/10 border-blue-500/20">Reference</span>
            <span className="text-xs text-muted-foreground">January 10, 2025 · 5 min read</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight mb-4">10 Regex Patterns Every Developer Should Know</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            There are certain regex patterns you will write again and again throughout your career. Instead of Googling them every time, here they are — all 10 in one place, explained clearly with copy-ready snippets and notes on what to watch out for.
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <p>Whether you are building form validation, scraping data, writing a CLI tool, or processing logs — these patterns will save you hours of trial and error. Each one is production-tested and explained so you actually understand what it does, not just how to copy it.</p>
          </section>

          {PATTERNS.map((p) => (
            <section key={p.n} className="border border-white/8 rounded-xl p-6 bg-card/20">
              <h2 className="text-base font-bold text-foreground mb-3">{p.n}. {p.title}</h2>
              <div className="rounded-lg bg-black/40 border border-white/10 p-3 font-mono text-xs text-cyan-300 mb-3 break-all">
                /{p.pattern}/{p.flags}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-green-400 font-semibold mb-1">Matches</p>
                  {p.matches.map((m) => (
                    <p key={m} className="font-mono text-muted-foreground">✓ {m}</p>
                  ))}
                </div>
                {p.fails.length > 0 && (
                  <div>
                    <p className="text-red-400 font-semibold mb-1">Does not match</p>
                    {p.fails.map((f) => (
                      <p key={f} className="font-mono text-muted-foreground">✗ {f}</p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Important Notes When Using These Patterns</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong className="text-foreground">Email validation is harder than it looks.</strong> The pattern above handles 99% of real-world cases but technically valid emails like user+tag@subdomain.example.co.uk need more complex patterns. For critical apps, consider a dedicated validation library after the regex pre-check.</li>
              <li><strong className="text-foreground">Password regex is a minimum bar, not a maximum.</strong> The strong password pattern enforces basic complexity but does not prevent dictionary words or common sequences like "Password@1". Combine it with a strength score library for better UX.</li>
              <li><strong className="text-foreground">Credit card regex is not security.</strong> The pattern detects the format only. Never validate, store, or transmit credit card numbers without PCI-compliant infrastructure.</li>
              <li><strong className="text-foreground">Always use the global flag when extracting multiple matches.</strong> Without the g flag, most regex functions stop at the first match.</li>
              <li><strong className="text-foreground">Escape backslashes in strings.</strong> In JavaScript strings, you need double backslashes: new RegExp("\\d+") but in regex literals /\d+/ single backslashes work fine.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How to Use These in JavaScript</h2>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-1">
              <p className="text-muted-foreground">// Test if a string matches</p>
              <p>const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{"{2,}"}$/i;</p>
              <p>emailRegex.test("user@example.com"); // true</p>
              <p className="mt-3 text-muted-foreground">// Find all matches in a string</p>
              <p>const urls = text.match(/https?:\/\/[\w.-]+\.[a-z]{"{2,6}"}/gi);</p>
              <p className="mt-3 text-muted-foreground">// Replace matched text</p>
              <p>const clean = html.replace(/{"<[^>]*>"}/g, "");</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How to Use These in Python</h2>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4 font-mono text-xs text-foreground space-y-1">
              <p>import re</p>
              <p className="mt-2 text-muted-foreground"># Test a pattern</p>
              <p>pattern = r"^[\w.-]+@[\w.-]+\.[a-zA-Z]{"{2,}"}$"</p>
              <p>re.match(pattern, "user@example.com", re.IGNORECASE)</p>
              <p className="mt-2 text-muted-foreground"># Find all matches</p>
              <p>urls = re.findall(r"https?://[\w.-]+\.[a-z]{"{2,6}"}", text)</p>
              <p className="mt-2 text-muted-foreground"># Replace</p>
              <p>clean = re.sub(r"{"<[^>]*>"}", "", html)</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Need a Custom Pattern?</h2>
            <p>These 10 patterns cover the most common cases but every project has unique requirements. If you need a regex for something specific — like matching your company's internal ID format, a specific date range, or a custom phone number format for any country — the <Link href="/generator" className="text-cyan-400 hover:underline">AI Regex Generator</Link> can build it for you in seconds from a plain English description.</p>
          </section>

        </div>

        <div className="mt-12 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
          <h3 className="font-semibold text-foreground mb-2">Test any of these patterns right now</h3>
          <p className="text-sm text-muted-foreground mb-4">Paste a pattern into the live tester and see exactly what it matches in your own text.</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/tester" className="text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Open Tester</Link>
            <Link href="/generator" className="text-sm font-semibold text-foreground border border-white/15 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">Generate Custom Pattern</Link>
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
