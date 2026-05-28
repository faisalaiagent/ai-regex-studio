import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateRegex } from "@/lib/gemini";
import { z } from "zod";

const schema = z.object({
  prompt: z.string().min(3).max(500),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid prompt. Must be 3-500 characters." },
        { status: 400 }
      );
    }

    const { prompt } = parsed.data;

    // Generate regex with Gemini AI
    const result = await generateRegex(prompt);

    return NextResponse.json({
      result,
      usage: { used: 1, limit: 3 },
    });
  } catch (error) {
    console.error("Regex generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate regex. Please try again." },
      { status: 500 }
    );
  }
}
