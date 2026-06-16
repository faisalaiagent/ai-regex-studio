import Link from "next/link";
import { Code2 } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-cyan-400 to-blue-500">
                <Code2 className="h-3.5 w-3.5 text-black" />
              </div>
              <span className="font-bold text-sm gradient-text">AI Regex Studio</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The most powerful AI regex tool for developers. Free forever.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/generator" className="hover:text-foreground transition-colors">
                  Generator
                </Link>
              </li>
              <li>
                <Link href="/tester" className="hover:text-foreground transition-colors">
                  Tester
                </Link>
              </li>
              <li>
                <Link href="/explainer" className="hover:text-foreground transition-colors">
                  Explainer
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex items-center justify-center border-t border-white/5 pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AI Regex Studio. Open source. Built for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
