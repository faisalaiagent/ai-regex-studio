"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What AI model powers the generator?",
    a: "AI Regex Studio uses Google's Gemini 1.5 Flash model, which is fast, accurate, and free to use at generous quotas.",
  },
  {
    q: "Do I need an account to use it?",
    a: "No! You can use the regex generator, tester, and explainer without signing up. Free accounts unlock more daily generations and the ability to save snippets.",
  },
  {
    q: "What regex flavors are supported?",
    a: "We support JavaScript, Python (re module), PCRE, and Java regex flavors, with notes on any differences between them.",
  },
  {
    q: "Can I share my regex patterns?",
    a: "Yes! Free users can share via public links. Pro users get SEO-optimized public pages for their snippets.",
  },
  {
    q: "Is there an API?",
    a: "Pro users get REST API access to generate and explain regex patterns programmatically.",
  },
  {
    q: "How do I get Google AdSense approval?",
    a: "This question is outside our scope — but AI Regex Studio is a great example of a utility app that qualifies for AdSense approval due to high developer traffic and organic search value.",
  },
];

export function LandingFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24" id="faq">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
        </div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/8 bg-card/30 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-white/3 transition-colors"
              >
                {faq.q}
                <ChevronDown
                  className={cn("h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ml-4", open === i && "rotate-180")}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
