import { NextRequest, NextResponse } from "next/server";
import { explainRegex } from "@/lib/gemini";
import { z } from "zod";

const schema = z.object({
  pattern: z.string().min(1).max(1000),
  flags: z.string().max(10).optional().default(""),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid pattern" },
        { status: 400 }
      );
    }

    const { pattern, flags } = parsed.data;

    const result = await explainRegex(pattern, flags);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Regex explain error:", error);
    return NextResponse.json(
      { error: "Failed to explain regex. Please try again." },
      { status: 500 }
    );
  }
}
