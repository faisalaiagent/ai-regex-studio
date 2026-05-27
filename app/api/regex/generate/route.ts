import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateRegex } from "@/lib/gemini";
import { checkUsageLimit, trackUsage } from "@/lib/usage";
import { z } from "zod";

const schema = z.object({
  prompt: z.string().min(3).max(500),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid prompt" },
        { status: 400 }
      );
    }

    const { prompt } = parsed.data;
    const userId = session?.user?.id ?? null;
    const plan = (session?.user as { plan?: string })?.plan ?? "GUEST";

    // Check usage limit
    const usage = await checkUsageLimit(
      userId,
      plan as "GUEST" | "FREE" | "PRO" | "TEAM",
      "AI_GENERATE"
    );

    if (!usage.allowed) {
      return NextResponse.json(
        {
          error: "Daily limit reached",
          limit: usage.limit,
          used: usage.used,
          upgradeRequired: plan === "FREE",
        },
        { status: 429 }
      );
    }

    // Generate regex with Gemini
    const result = await generateRegex(prompt);

    // Track usage if authenticated
    if (userId) {
      await trackUsage(userId, "AI_GENERATE");
    }

    return NextResponse.json({ result, usage: { used: usage.used + 1, limit: usage.limit } });
  } catch (error) {
    console.error("Regex generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate regex. Please try again." },
      { status: 500 }
    );
  }
}
