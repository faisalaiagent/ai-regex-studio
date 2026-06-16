"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Clock, CheckCircle, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setErrorMsg("Please fill in all fields before sending.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (form.message.trim().length < 10) {
      setErrorMsg("Message must be at least 10 characters.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMsg(data.error ?? "Failed to send message. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-5xl py-16">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] items-start">

          {/* ── Left — Info ── */}
          <div>
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">
              Contact
            </p>
            <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
              Get in touch
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Have a question, feature request, or just want to say hello? We would love to hear
              from you.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Mail className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email us</p>
                  <a
                    href="mailto:faisalagentai@gmail.com"
                    className="text-sm font-semibold text-foreground hover:text-cyan-400 transition-colors"
                  >
                    faisalagentai@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Clock className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Response time</p>
                  <p className="text-sm font-semibold text-foreground">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right — Form ── */}
          <div className="rounded-2xl border border-white/10 bg-card/30 p-8">

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CheckCircle className="h-14 w-14 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">Message sent!</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  Thank you for reaching out. Shah Faisal will get back to you at{" "}
                  <span className="text-foreground font-medium">{form.email || "your email"}</span>{" "}
                  within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-cyan-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="space-y-5">

                {/* Name + Email row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      Your name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      Email address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Question about Pro plan"
                    className="w-full rounded-xl border border-white/10 bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className="w-full rounded-xl border border-white/10 bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all resize-none"
                  />
                </div>

                {/* Error message */}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className="w-full rounded-xl bg-foreground text-background font-semibold text-sm py-3 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground">
                  Or email directly at{" "}
                  <a
                    href="mailto:faisalagentai@gmail.com"
                    className="text-cyan-400 hover:underline"
                  >
                    faisalagentai@gmail.com
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
