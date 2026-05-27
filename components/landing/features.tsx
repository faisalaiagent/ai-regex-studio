"use client";

import { motion } from "framer-motion";
import { Zap, TestTube, BookOpen, Save, Shield, Code2, Sparkles, Terminal } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Pattern Generator",
    description: "Describe in plain English. Get production-ready regex with examples, edge cases, and multi-flavor support.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: TestTube,
    title: "Live Regex Tester",
    description: "Monaco editor with real-time highlighting, match counter, capture groups, replace & split preview.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: BookOpen,
    title: "AI Regex Explainer",
    description: "Paste any regex and get a color-coded, beginner-friendly explanation of every token and group.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Save,
    title: "Save & Share",
    description: "Organize snippets in folders, tag them, mark favorites. Share public links with beautiful SEO pages.",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: Code2,
    title: "Multi-Flavor Support",
    description: "JavaScript, Python, PCRE, Java — get the right pattern for your language with flavor notes.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Terminal,
    title: "Regex Templates",
    description: "50+ pre-built patterns for emails, URLs, phones, dates, IPs, and more. One click to copy.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
];

export function LandingFeatures() {
  return (
    <section className="py-24 md:py-32" id="features">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Everything you need to{" "}
            <span className="gradient-text">master regex</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            From beginner to expert — AI Regex Studio grows with your skills.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-xl border border-white/5 bg-card/30 p-6 backdrop-blur-sm hover:border-white/10 hover:bg-card/50 transition-all duration-300"
            >
              <div className={`inline-flex rounded-lg border p-2.5 mb-4 ${feature.bg}`}>
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
