import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { RegexGenerator } from "@/components/regex/generator";

export const metadata: Metadata = {
  title: "AI Regex Generator — Generate Regex from Plain English",
  description:
    "Describe your pattern in plain English and get a production-ready regex with explanations, examples, and multi-flavor support. Free AI regex generator.",
  keywords: ["regex generator", "AI regex", "generate regex", "regex from english"],
};

export default function GeneratorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            AI Regex <span className="gradient-text">Generator</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Describe what you want to match in plain English. Get perfect regex instantly.
          </p>
        </div>
        <RegexGenerator />
      </main>
    </div>
  );
}
