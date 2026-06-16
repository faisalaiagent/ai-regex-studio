import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — AI Regex Studio",
  description:
    "Get in touch with AI Regex Studio. Send a message for questions, feature requests, or feedback. Response within 24 hours.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
