import type { Metadata } from "next";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { SignInForm } from "@/components/auth/signin-form";

export const metadata: Metadata = {
  title: "Sign In — AI Regex Studio",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
              <Code2 className="h-5 w-5 text-black" />
            </div>
            <span className="font-bold text-lg gradient-text">AI Regex Studio</span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-white/8 bg-card/50 backdrop-blur-sm p-8">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to save snippets and access more features</p>
          </div>
          <SignInForm />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">Terms</Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
