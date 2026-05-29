import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { Code2, MapPin, Mail, Globe, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About — AI Regex Studio",
  description: "Learn about AI Regex Studio and its creator Shah Faisal, a self-taught developer from Karachi, Pakistan who built this tool to make regex accessible for every developer.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl py-16">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-3">About AI Regex Studio</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A free, AI-powered developer tool built to make regular expressions less painful — for beginners who are just starting out and for experienced developers who are tired of Googling the same patterns over and over again.
          </p>
        </div>

        {/* Story Section */}
        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Why I Built This</h2>
            <p>
              Every developer has had that moment — you need to validate an email address, or extract a date from a string, and you end up spending 45 minutes on Stack Overflow trying to understand why <code className="bg-white/10 rounded px-1.5 py-0.5 text-cyan-300 font-mono text-xs">.*</code> is not doing what you expected. Regex is genuinely useful, but it has one of the steepest learning curves of any common programming concept.
            </p>
            <p className="mt-4">
              I built AI Regex Studio because I was tired of that frustration — both my own and watching others go through it. I wanted a tool that could meet you where you are: whether you want to just get a working pattern quickly, or you actually want to understand what each symbol means. The AI generator handles the first case. The explainer handles the second.
            </p>
            <p className="mt-4">
              The live tester came from another pain point. Most online regex testers are clunky, ad-heavy, or require you to sign up before you can do anything useful. I wanted something fast, clean, and free — no account required to get started.
            </p>
          </section>

          {/* Creator Card */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">The Creator</h2>
            <div className="rounded-xl border border-white/10 bg-card/30 p-6">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl font-bold text-black">
                  SF
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-base">Shah Faisal</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-3">Self-taught Developer &amp; Builder</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Karachi, Pakistan
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <a href="mailto:contact@airegexstudio.com" className="hover:text-foreground transition-colors">
                        contact@airegexstudio.com
                      </a>
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      <a href="https://ai-regex-studio.vercel.app" className="hover:text-foreground transition-colors">
                        ai-regex-studio.vercel.app
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">My Story</h2>
            <p>
              My name is Shah Faisal and I am a self-taught developer based in Karachi, Pakistan. I did not go through a formal computer science program. Everything I know about programming came from building things — reading documentation, watching tutorials at 2am, breaking projects and slowly figuring out why, and doing it all over again.
            </p>
            <p className="mt-4">
              That path taught me something important: the best way to learn anything in tech is to build something real that solves a real problem. Not a tutorial project. Not a todo app for the tenth time. Something you would actually use yourself.
            </p>
            <p className="mt-4">
              AI Regex Studio started as a personal tool. I was building a web scraper and needed to write a lot of regex patterns quickly. I started experimenting with AI to generate patterns from plain descriptions and realized how much faster it made my workflow. I polished it, added the tester and explainer, and decided to release it publicly so other developers could benefit from it too.
            </p>
            <p className="mt-4">
              Since launching, I have been continuously improving it based on feedback from developers around the world. Every feature in this app came from a real problem someone was trying to solve.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">What Makes This Different</h2>
            <p>There are other regex tools out there. Here is why I think AI Regex Studio is worth using:</p>
            <ul className="list-disc pl-5 mt-3 space-y-3">
              <li>
                <strong className="text-foreground">No account needed to start.</strong> Open the generator or tester and use it immediately. No email, no signup wall, no credit card.
              </li>
              <li>
                <strong className="text-foreground">AI that explains, not just generates.</strong> Getting a pattern is only half the battle. The explainer breaks down every symbol so you actually understand what you are using and can modify it confidently.
              </li>
              <li>
                <strong className="text-foreground">Built for real developers.</strong> The Monaco editor in the tester is the same editor used in VS Code. The multi-flavor support means you get the right pattern for your language, not a generic one-size-fits-all answer.
              </li>
              <li>
                <strong className="text-foreground">Made with care.</strong> This is not a side project I abandoned after the first launch. I use this tool myself every week and I keep updating it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">The Tech Behind It</h2>
            <p>
              AI Regex Studio is built with Next.js 15, TypeScript, and Tailwind CSS on the frontend. The AI features are powered by Groq's API running Llama 3.3 70B — one of the most capable open-source language models available, chosen for its speed, reliability, and quality of technical output.
            </p>
            <p className="mt-4">
              The live tester uses Monaco Editor — the same engine that powers VS Code — for a professional coding experience right in the browser. Authentication is handled by NextAuth with Google OAuth, and the database runs on PostgreSQL hosted on Neon.
            </p>
            <p className="mt-4">
              The entire stack is designed to be fast, reliable, and scalable. Pages load in under a second and the AI response time is typically under 2 seconds even for complex patterns.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Open Source</h2>
            <p>
              AI Regex Studio is open source. The full codebase is available on GitHub. If you are a developer who wants to contribute, report a bug, or fork the project for your own use, you are welcome to do so.
            </p>
            <p className="mt-4">
              I believe in building in public and giving back to the developer community that taught me everything I know. Every tutorial, Stack Overflow answer, and open-source library that helped me along the way is part of why this tool exists.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p>
              If you have feedback, found a bug, have a feature request, or just want to say hello — I would love to hear from you. I read every message personally.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="mailto:contact@airegexstudio.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-black bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                Send an Email
              </a>
              <Link
                href="/generator"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-white/15 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Code2 className="h-4 w-4" />
                Try the App
              </Link>
            </div>
          </section>

          {/* Built with love */}
          <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs text-muted-foreground">
            <Heart className="h-3 w-3 text-red-400" />
            <span>Built with care in Karachi, Pakistan — for developers everywhere.</span>
          </div>

        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
