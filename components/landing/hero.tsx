"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-cyan-500/30 bg-cyan-500/5 text-cyan-400 px-4 py-1.5 text-sm font-medium gap-1.5"
            >
              <Sparkles className="h-3 w-3" />
              Powered by Gemini AI
              <span className="ml-1 rounded bg-cyan-500/20 px-1.5 py-0.5 text-xs">New</span>
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Regex, finally{" "}
            <span className="gradient-text">made simple</span>
            <br />
            with AI
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl md:text-xl"
          >
            Describe what you want to match in plain English. Get perfect regex instantly. 
            Test live, understand every symbol, save & share your patterns.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link href="/generator">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold hover:from-cyan-400 hover:to-blue-400 text-base px-8 h-12 group"
              >
                <Zap className="mr-2 h-4 w-4" />
                Generate Regex Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/tester">
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 bg-white/5 hover:bg-white/10 text-base px-8 h-12"
              >
                Live Tester
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-3"
          >
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-black"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>Loved by <span className="text-foreground font-medium">10,000+</span> developers</span>
            </div>
          </motion.div>

          {/* Preview card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 w-full max-w-3xl"
          >
            <div className="relative rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4">
                  <div className="h-5 rounded bg-white/5 text-xs text-center text-muted-foreground flex items-center justify-center">
                    AI Regex Studio — Generator
                  </div>
                </div>
              </div>
              {/* Content preview */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-muted-foreground font-mono">
                    Match Pakistani mobile numbers starting with +92...
                  </div>
                  <div className="h-9 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-sm font-bold flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    Generate
                  </div>
                </div>
                <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-3">
                  <div className="text-xs text-cyan-400 mb-1 font-medium">Generated Pattern</div>
                  <code className="text-sm font-mono text-cyan-300">
                    (\+92|0)(3[0-9]&#123;9&#125;)
                  </code>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="rounded-lg border border-white/5 bg-white/3 p-3">
                    <div className="font-medium text-foreground mb-1">✓ Matches</div>
                    <div className="font-mono">+923001234567</div>
                    <div className="font-mono">03001234567</div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-white/3 p-3">
                    <div className="font-medium text-foreground mb-1">✗ Edge Cases</div>
                    <div className="font-mono">+920001234567</div>
                    <div className="font-mono">923001234</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
