import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { RegexExplainer } from "@/components/regex/explainer";

export const metadata: Metadata = {
  title: "AI Regex Explainer — Understand Any Regular Expression",
  description: "Paste any regex and get a plain-English, color-coded explanation of every token, group, and assertion.",
};

export default function ExplainerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            AI Regex <span className="gradient-text">Explainer</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Paste any regex pattern and get a beginner-friendly, color-coded explanation.
          </p>
        </div>
        <RegexExplainer />
      </main>
    </div>
  );
}
