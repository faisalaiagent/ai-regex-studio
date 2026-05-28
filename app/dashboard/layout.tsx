import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — AI Regex Studio",
  description: "Manage your saved regex snippets, view usage, and access all tools.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
