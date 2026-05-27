import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI Regex Studio — Generate, Test & Explain Regex with AI",
    template: "%s | AI Regex Studio",
  },
  description:
    "The most powerful AI-powered regex tool. Generate regex from natural language, test patterns live, and get plain-English explanations. Free forever.",
  keywords: [
    "regex generator",
    "regex tester",
    "regular expression",
    "AI regex",
    "regex explainer",
    "regex tool",
    "developer tools",
  ],
  authors: [{ name: "AI Regex Studio" }],
  creator: "AI Regex Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "AI Regex Studio — Generate, Test & Explain Regex with AI",
    description: "The most powerful AI-powered regex tool for developers.",
    siteName: "AI Regex Studio",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "AI Regex Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Regex Studio",
    description: "Generate, test, and explain regex with AI",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
