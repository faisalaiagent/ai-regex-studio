import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { LandingPricing } from "@/components/landing/pricing";
import { LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Pricing — AI Regex Studio",
  description: "Simple, transparent pricing. Start free and upgrade when you need more.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="container pt-16 pb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Start free with 20 AI generations per day. Upgrade for unlimited power.
          </p>
        </div>
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  );
}
