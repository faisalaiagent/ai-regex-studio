import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { LandingHero } from "@/components/landing/hero";
import { LandingFeatures } from "@/components/landing/features";
import { LandingDemo } from "@/components/landing/demo";
import { LandingPricing } from "@/components/landing/pricing";
import { LandingFaq } from "@/components/landing/faq";
import { LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "AI Regex Studio — Generate, Test & Explain Regex with AI",
  description:
    "Transform plain English into perfect regex patterns. Test live, get AI explanations, save & share. The ultimate regex tool for developers.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingDemo />
        <LandingPricing />
        <LandingFaq />
      </main>
      <LandingFooter />
    </div>
  );
}
