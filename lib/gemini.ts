import { GoogleGenerativeAI } from "@google/generative-ai";
import type { RegexResult, ExplainResult } from "@/types";

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is missing.");
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { temperature: 0.3 },
  });
}

function parseJSON<T>(text: string): T {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found in AI response.");
  const jsonStr = text.substring(start, end + 1);
  return JSON.parse(jsonStr) as T;
}

export async function generateRegex(prompt: string): Promise<RegexResult> {
  const model = getModel();

  const result = await model.generateContent(
    `You are a regex expert. Generate regex for: "${prompt}"
    
Return ONLY this JSON, nothing else:
{
  "pattern": "the regex pattern",
  "flags": "gi",
  "title": "short title",
  "explanation": "what it matches",
  "examples": ["match1", "match2"],
  "edgeCases": ["edge case 1"],
  "flavors": {
    "javascript": "pattern",
    "python": "pattern",
    "pcre": "pattern",
    "java": "pattern"
  },
  "complexity": "simple"
}`
  );

  const text = result.response.text();
  return parseJSON<RegexResult>(text);
}

export async function explainRegex(
  pattern: string,
  flags: string = ""
): Promise<ExplainResult> {
  const model = getModel();

  const result = await model.generateContent(
    `You are a regex teacher. Explain this regex: /${pattern}/${flags}
    
Return ONLY this JSON, nothing else:
{
  "overview": "what this regex does in one sentence",
  "complexity": "beginner",
  "parts": [
    {
      "token": "^",
      "type": "anchor",
      "explanation": "matches start of string",
      "beginner": "starts at beginning",
      "color": "blue"
    }
  ],
  "simplified": null,
  "optimized": null
}`
  );

  const text = result.response.text();
  return parseJSON<ExplainResult>(text);
}

export async function correctRegex(
  pattern: string,
  error: string,
  intent: string
): Promise<{ pattern: string; explanation: string }> {
  const model = getModel();

  const result = await model.generateContent(
    `Fix this regex: ${pattern}. Error: ${error}. Intent: ${intent}
Return ONLY JSON: {"pattern": "fixed", "explanation": "what changed"}`
  );

  const text = result.response.text();
  return parseJSON(text);
}
