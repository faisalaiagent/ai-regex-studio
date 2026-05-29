import { GoogleGenerativeAI } from "@google/generative-ai";
import type { RegexResult, ExplainResult } from "@/types";

const MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

function getModel(modelName: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is missing.");
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: modelName,
    generationConfig: { temperature: 0.3 },
  });
}

function parseJSON<T>(text: string): T {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found in AI response.");
  return JSON.parse(text.substring(start, end + 1)) as T;
}

async function callWithFallback(prompt: string): Promise<string> {
  let lastError: Error = new Error("All models failed.");
  for (const modelName of MODELS) {
    try {
      const model = getModel(modelName);
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      // If quota exceeded, try next model
      if (lastError.message.includes("429") || lastError.message.includes("quota")) {
        console.warn(`Model ${modelName} quota exceeded, trying next...`);
        continue;
      }
      // For other errors, throw immediately
      throw lastError;
    }
  }
  throw lastError;
}

export async function generateRegex(prompt: string): Promise<RegexResult> {
  const text = await callWithFallback(
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
  return parseJSON<RegexResult>(text);
}

export async function explainRegex(
  pattern: string,
  flags: string = ""
): Promise<ExplainResult> {
  const text = await callWithFallback(
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
  return parseJSON<ExplainResult>(text);
}

export async function correctRegex(
  pattern: string,
  error: string,
  intent: string
): Promise<{ pattern: string; explanation: string }> {
  const text = await callWithFallback(
    `Fix this regex: ${pattern}. Error: ${error}. Intent: ${intent}
Return ONLY JSON: {"pattern": "fixed", "explanation": "what changed"}`
  );
  return parseJSON(text);
}
