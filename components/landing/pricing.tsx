"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out AI Regex Studio",
    features: [
      "20 AI generations/day",
      "Live regex tester",
      "Save up to 25 snippets",
      "Basic explainer",
      "Community templates",
    ],
    cta: "Start for Free",
    href: "/auth/signin",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For developers who use regex daily",
    features: [
      "Unlimited AI generations",
      "Advanced AI explanations",
      "Unlimited snippets & folders",
      "Regex optimizer",
      "Share public links",
      "Export JSON/TXT/CSV",
      "API access",
      "Regex history",
    ],
    cta: "Upgrade to Pro",
    href: "/pricing",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "per month",
    description: "For teams that collaborate on patterns",
    features: [
      "Everything in Pro",
      "5 team members",
      "Shared workspace",
      "Team snippets library",
      "Admin dashboard",
      "Priority support",
    ],
    cta: "Start Team Trial",
    href: "/pricing",
    highlighted: false,
  },
];

export function LandingPricing() {
  return (
    <section className="py-24 md:py-32" id="pricing">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Simple, transparent pricing
          </motion.h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative rounded-xl border p-6 flex flex-col",
                plan.highlighted
                  ? "border-cyan-500/50 bg-cyan-500/5 shadow-lg shadow-cyan-500/10"
                  : "border-white/10 bg-card/30"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold px-3 py-1">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-semibold text-lg">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  className={cn(
                    "w-full",
                    plan.highlighted
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold hover:from-cyan-400 hover:to-blue-400"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  )}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.highlighted && <Zap className="mr-2 h-4 w-4" />}
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
