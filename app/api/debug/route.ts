import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;

  // Check 1: Is the key present?
  if (!apiKey) {
    return NextResponse.json({
      status: "FAIL",
      step: "ENV_CHECK",
      error: "GEMINI_API_KEY is not set in environment variables",
    });
  }

  // Check 2: Is the key format correct?
  if (!apiKey.startsWith("AIza")) {
    return NextResponse.json({
      status: "FAIL",
      step: "KEY_FORMAT",
      error: "API key format looks wrong. Should start with AIza...",
      keyPreview: apiKey.substring(0, 6) + "...",
    });
  }

  // Check 3: Try calling Gemini API
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Say hello in one word.");
    const text = result.response.text();

    return NextResponse.json({
      status: "SUCCESS",
      message: "Gemini API is working correctly!",
      testResponse: text,
      keyPreview: apiKey.substring(0, 8) + "...",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      status: "FAIL",
      step: "API_CALL",
      error: message,
      keyPreview: apiKey.substring(0, 8) + "...",
    });
  }
}
