import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Snippets — AI Regex Studio",
  description: "Save, organize, and reuse your regex patterns. Free users can store up to 25 snippets.",
};

export default function SnippetsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
