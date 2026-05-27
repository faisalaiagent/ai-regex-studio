import Link from "next/link";
import { Code2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
              <Code2 className="h-5 w-5 text-black" />
            </div>
            <span className="font-bold text-lg gradient-text">AI Regex Studio</span>
          </Link>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-8">
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Authentication Error</h1>
          <p className="text-sm text-muted-foreground mb-6">
            There was a problem signing you in. This can happen if you denied access or the session expired.
          </p>
          <Link href="/auth/signin">
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold">
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full mt-2 text-muted-foreground">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
