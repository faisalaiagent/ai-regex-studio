import type { Metadata } from "next";
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
        <p className="text-muted-foreground mb-10">Last updated: May 2025</p>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Information We Collect</h2>
            <p>
              When you sign in with Google, we collect your name, email address, and profile picture solely for the purpose of creating and managing your account. We also collect usage data such as the number of AI generations you perform each day, regex patterns you save, and how you interact with the application. We do not collect any payment information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Provide, operate, and improve our services</li>
              <li>Enforce usage limits according to your plan (Free or Pro)</li>
              <li>Save your regex snippets and folder preferences</li>
              <li>Send important product updates (only with your explicit consent)</li>
              <li>Respond to support requests</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Data Storage and Security</h2>
            <p>
              Your account data is stored in a PostgreSQL database hosted on secure cloud infrastructure. Regex patterns you mark as private are never visible to other users. Patterns you choose to share publicly are accessible via their share link. We use industry-standard encryption for data in transit (HTTPS) and at rest.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Third-Party Services</h2>
            <p>AI Regex Studio uses the following third-party services to operate:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                <strong className="text-foreground">Google OAuth</strong> — used for user authentication only. We do not share any data with Google beyond what is required for the sign-in process.
              </li>
              <li>
                <strong className="text-foreground">Groq AI (Llama models)</strong> — used to power the AI regex generator and explainer features. When you submit a prompt or regex pattern for AI processing, that text is sent to Groq's API to generate a response. Groq's privacy policy applies to this data. We do not store your prompts after the response is returned.
              </li>
              <li>
                <strong className="text-foreground">Vercel</strong> — used for hosting the application and collecting anonymous performance analytics such as page load times and error rates. No personally identifiable information is included in these analytics.
              </li>
              <li>
                <strong className="text-foreground">Neon (PostgreSQL)</strong> — used for secure database hosting of your account and saved snippets.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies and Sessions</h2>
            <p>
              We use session cookies strictly for authentication purposes — to keep you signed in between visits. We do not use advertising cookies, third-party tracking cookies, or fingerprinting technologies. You can clear cookies at any time through your browser settings, which will sign you out of the application.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Data Retention</h2>
            <p>
              We retain your account data for as long as your account is active. If you delete your account, all associated data — including saved snippets, folders, and usage history — is permanently deleted within 7 days. This action is irreversible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Children's Privacy</h2>
            <p>
              AI Regex Studio is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and all associated data</li>
              <li>Opt out of any non-essential communications</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, contact us at the email address below.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we make significant changes, we will update the "Last updated" date at the top of this page. Continued use of the service after changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact Us</h2>
            <p>
              For any privacy-related questions, data requests, or concerns, please contact us at{" "}
              <a href="mailto:privacy@airegexstudio.com" className="text-cyan-400 hover:underline">
                privacy@airegexstudio.com
              </a>
              . We aim to respond to all requests within 5 business days.
            </p>
          </section>

        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
