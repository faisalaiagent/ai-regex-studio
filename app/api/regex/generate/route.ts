import { NextRequest, NextResponse } from "next/server";
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

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    const result = await generateRegex(prompt);

    return NextResponse.json({
      result,
      usage: { used: 1, limit: 3 },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Generate route error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
