"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Code2, TestTube, BookOpen, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/generator", label: "Generator", icon: Zap },
  { href: "/tester", label: "Tester", icon: TestTube },
  { href: "/explainer", label: "Explainer", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pricing", label: "Pricing", icon: null },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-500">
            <Code2 className="h-4 w-4 text-black" />
          </div>
          <span className="hidden gradient-text font-bold sm:block">AI Regex Studio</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-0 rounded-md bg-white/8 border border-white/10"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/auth/signin">
            <Button variant="ghost" size="sm" className="hidden text-sm sm:flex">
              Sign in
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button
              size="sm"
              className="hidden bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:from-cyan-400 hover:to-blue-400 font-semibold sm:flex"
            >
              Get Started Free
            </Button>
          </Link>
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/5 bg-background/95 backdrop-blur-xl md:hidden"
        >
          <div className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith(href)
                    ? "bg-white/8 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {label}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <Link href="/auth/signin" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Sign in</Button>
              </Link>
              <Link href="/auth/signin" className="flex-1">
                <Button size="sm" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold">
                  Start Free
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
