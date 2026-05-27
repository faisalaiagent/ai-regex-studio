"use client";
import { motion } from "framer-motion";
export function LandingDemo() {
  return (
    <section className="py-24 border-y border-white/5 bg-white/1" id="demo">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            See it in action
          </motion.h2>
          <p className="mt-4 text-muted-foreground">Try the live demo below — no sign up needed</p>
        </div>
        <div className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-card/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">regex-studio.app/generator</span>
          </div>
          <div className="p-8 text-center">
            <p className="text-muted-foreground text-sm mb-4">Interactive demo available in the app</p>
            <a href="/generator" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold px-6 py-2.5 text-sm hover:from-cyan-400 hover:to-blue-400 transition-all">
              Open Generator →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
