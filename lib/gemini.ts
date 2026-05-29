import { GoogleGenerativeAI } from "@google/generative-ai";
import type { RegexResult, ExplainResult } from "@/types";

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set in environment variables.");
  return new GoogleGenerativeAI(apiKey);
}

function getModel() {
  return getClient().getGenerativeModel({
    model: "gemini-2.5-flash-preview-04-17",
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
    },
  });
}

function extractJSON(text: string): string {
  // Remove markdown code blocks if present
  let cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  // Find first { and last } to extract pure JSON
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1) {
    cleaned = cleaned.substring(start, end + 1);
  }
  return cleaned;
}

export async function generateRegex(prompt: string): Promise<RegexResult> {
  const model = getModel();

  const fullPrompt = `You are an expert regex engineer. Generate a precise regex pattern for the user's requirement.
Return ONLY valid JSON (no markdown, no explanation outside JSON) with this EXACT structure:
{
  "pattern": "regex pattern without delimiters",
  "flags": "flags like gi or empty string",
  "title": "short descriptive title",
  "explanation": "clear explanation of what this regex does",
  "examples": ["example1 that matches", "example2 that matches"],
  "edgeCases": ["edge case 1", "edge case 2"],
  "flavors": {
    "javascript": "same pattern or notes for JS",
    "python": "same pattern or notes for Python",
    "pcre": "same pattern or notes for PCRE",
    "java": "same pattern or notes for Java"
  },
  "complexity": "simple"
}

User requirement: ${prompt}

IMPORTANT: Return ONLY the JSON object. No text before or after it.`;

  try {
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();
    const cleaned = extractJSON(text);
    return JSON.parse(cleaned) as RegexResult;
  } catch (error) {
    console.error("Gemini generateRegex error:", error);
    throw new Error("AI generation failed. Please try again.");
  }
}

export async function explainRegex(
  pattern: string,
  flags: string = ""
): Promise<ExplainResult> {
  const model = getModel();

  const fullPrompt = `You are a regex teacher. Explain the regex pattern in detail.
Return ONLY valid JSON (no markdown, no explanation outside JSON) with this EXACT structure:
{
  "overview": "one-sentence summary of what this regex does",
  "complexity": "beginner",
  "parts": [
    {
      "token": "the actual token from the regex",
      "type": "anchor",
      "explanation": "technical explanation",
      "beginner": "simple plain English explanation",
      "color": "blue"
    }
  ],
  "simplified": null,
  "optimized": null
}

The "type" must be one of: anchor, quantifier, group, character, assertion, flag, alternation
The "color" must be one of: blue, green, yellow, red, purple, orange, teal

Regex to explain: /${pattern}/${flags}

IMPORTANT: Return ONLY the JSON object. No text before or after it.`;

  try {
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();
    const cleaned = extractJSON(text);
    return JSON.parse(cleaned) as ExplainResult;
  } catch (error) {
    console.error("Gemini explainRegex error:", error);
    throw new Error("AI explanation failed. Please try again.");
  }
}

export async function correctRegex(
  pattern: string,
  error: string,
  intent: string
): Promise<{ pattern: string; explanation: string }> {
  const model = getModel();

  const fullPrompt = `Fix this broken regex pattern.
Return ONLY valid JSON: {"pattern": "fixed pattern", "explanation": "what was fixed"}

Pattern: ${pattern}
Error: ${error}
Intent: ${intent}

IMPORTANT: Return ONLY the JSON object.`;

  try {
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();
    const cleaned = extractJSON(text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini correctRegex error:", error);
    throw new Error("AI correction failed. Please try again.");
  }
}
