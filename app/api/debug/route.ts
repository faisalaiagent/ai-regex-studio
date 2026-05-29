import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      status: "FAIL",
      error: "GROQ_API_KEY is not set in Vercel environment variables.",
    });
  }

  if (!apiKey.startsWith("gsk_")) {
    return NextResponse.json({
      status: "FAIL",
      error: "API key format looks wrong. Groq keys start with gsk_...",
      keyPreview: apiKey.substring(0, 6) + "...",
    });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Say hello in one word." }],
        max_tokens: 10,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ status: "FAIL", error: err });
    }

    const data = await response.json();
    return NextResponse.json({
      status: "SUCCESS",
      message: "Groq API is working!",
      testResponse: data.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json({
      status: "FAIL",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
