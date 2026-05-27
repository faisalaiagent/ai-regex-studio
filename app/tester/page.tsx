import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { RegexTester } from "@/components/regex/tester";

export const metadata: Metadata = {
  title: "Live Regex Tester — Test & Debug Regular Expressions",
  description:
    "Test regex patterns live with real-time match highlighting, capture groups, flags support, replace and split preview. Free online regex tester.",
};

export default function TesterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Live Regex <span className="gradient-text">Tester</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Test patterns in real-time with match highlighting, capture groups, and replace preview.
          </p>
        </div>
        <RegexTester />
      </main>
    </div>
  );
}
