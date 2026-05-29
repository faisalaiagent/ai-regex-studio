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
        { error: "Invalid pattern." },
        { status: 400 }
      );
    }

    const { pattern, flags } = parsed.data;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    const result = await explainRegex(pattern, flags);

    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Explain route error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
