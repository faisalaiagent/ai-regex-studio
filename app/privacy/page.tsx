import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — AI Regex Studio",
  description: "Privacy policy for AI Regex Studio. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: January 2025</p>

        <div className="prose prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Information We Collect</h2>
            <p>
              When you sign in with Google, we collect your name, email address, and profile picture. We also collect usage data such as the number of AI generations you perform each day, patterns you save, and how you interact with the application.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Provide and improve our services</li>
              <li>Enforce usage limits per your plan</li>
              <li>Save your regex snippets and preferences</li>
              <li>Send product updates (only with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Data Storage</h2>
            <p>
              Your data is stored in a PostgreSQL database hosted on secure infrastructure. Regex patterns you mark as private are never visible to other users. Public snippets are accessible via their share link.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-foreground">Google OAuth</strong> — for authentication</li>
              <li><strong className="text-foreground">Google Gemini AI</strong> — for regex generation and explanation (your prompts are sent to Google's API)</li>
              <li><strong className="text-foreground">Vercel</strong> — for hosting and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies</h2>
            <p>
              We use session cookies for authentication. We do not use tracking cookies or sell your data to advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Data Deletion</h2>
            <p>
              You can delete your account and all associated data at any time from the Settings page. Data deletion is permanent and irreversible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Contact</h2>
            <p>
              For privacy questions, contact us at{" "}
              <a href="mailto:privacy@airegexstudio.com" className="text-cyan-400 hover:underline">
                privacy@airegexstudio.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
