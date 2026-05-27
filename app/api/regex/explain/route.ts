import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { explainRegex } from "@/lib/gemini";
import { checkUsageLimit, trackUsage } from "@/lib/usage";
import { z } from "zod";

const schema = z.object({
  pattern: z.string().min(1).max(1000),
  flags: z.string().max(10).optional().default(""),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid pattern" }, { status: 400 });
    }

    const { pattern, flags } = parsed.data;
    const userId = session?.user?.id ?? null;
    const plan = (session?.user as { plan?: string })?.plan ?? "GUEST";

    const usage = await checkUsageLimit(
      userId,
      plan as "GUEST" | "FREE" | "PRO" | "TEAM",
      "AI_EXPLAIN"
    );

    if (!usage.allowed) {
      return NextResponse.json(
        { error: "Daily limit reached", upgradeRequired: true },
        { status: 429 }
      );
    }

    const result = await explainRegex(pattern, flags);

    if (userId) {
      await trackUsage(userId, "AI_EXPLAIN");
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Regex explain error:", error);
    return NextResponse.json(
      { error: "Failed to explain regex. Please try again." },
      { status: 500 }
    );
  }
}
