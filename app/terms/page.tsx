import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Terms of Service — AI Regex Studio",
  description: "Terms of Service for AI Regex Studio.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">Last updated: January 2025</p>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using AI Regex Studio, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Use of Service</h2>
            <p>You agree to use AI Regex Studio only for lawful purposes. You must not:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Attempt to circumvent usage limits</li>
              <li>Use the service to generate malicious patterns intended to cause ReDoS or denial-of-service attacks</li>
              <li>Resell or redistribute the AI-generated output as your own AI service</li>
              <li>Scrape or abuse the API endpoints</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Account Responsibilities</h2>
            <p>
              You are responsible for maintaining the security of your account. You are responsible for all activity that occurs under your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Intellectual Property</h2>
            <p>
              Regex patterns you generate using AI Regex Studio are yours to use freely in your projects. The AI Regex Studio codebase, design, and branding are owned by AI Regex Studio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Disclaimers</h2>
            <p>
              AI Regex Studio is provided "as is" without warranty of any kind. AI-generated regex patterns should be reviewed before use in production systems. We are not responsible for incorrect patterns or their consequences.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Limitation of Liability</h2>
            <p>
              In no event shall AI Regex Studio be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Contact</h2>
            <p>
              Questions about these terms? Contact us at{" "}
              <a href="mailto:legal@airegexstudio.com" className="text-cyan-400 hover:underline">
                legal@airegexstudio.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
