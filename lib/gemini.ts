import { GoogleGenerativeAI } from "@google/generative-ai";
import type { RegexResult, ExplainResult } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function getModel() {
  return genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.3,
    },
  });
}

export async function generateRegex(prompt: string): Promise<RegexResult> {
  const model = getModel();

  const systemPrompt = `You are an expert regex engineer. Generate a precise regex pattern for the user's requirement.
Return ONLY valid JSON with this exact structure:
{
  "pattern": "regex pattern without delimiters",
  "flags": "flags like gi or empty string",
  "title": "short descriptive title",
  "explanation": "clear explanation of what this regex does",
  "examples": ["example1 that matches", "example2 that matches"],
  "edgeCases": ["edge case 1 to be aware of", "edge case 2"],
  "flavors": {
    "javascript": "pattern with JS notes if any",
    "python": "pattern with Python notes if any", 
    "pcre": "pattern with PCRE notes if any",
    "java": "pattern with Java notes if any"
  },
  "complexity": "simple|moderate|complex"
}`;

  const result = await model.generateContent([
    systemPrompt,
    `Generate a regex pattern for: ${prompt}`,
  ]);

  const text = result.response.text();
  const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(cleaned) as RegexResult;
}

export async function explainRegex(pattern: string, flags: string = ""): Promise<ExplainResult> {
  const model = getModel();

  const systemPrompt = `You are a regex teacher. Explain the regex pattern in detail.
Return ONLY valid JSON with this exact structure:
{
  "overview": "one-sentence summary of what this regex does",
  "complexity": "beginner|intermediate|advanced",
  "parts": [
    {
      "token": "the actual token/character from the regex",
      "type": "anchor|quantifier|group|character|assertion|flag|alternation",
      "explanation": "technical explanation",
      "beginner": "simple plain English explanation",
      "color": "one of: blue|green|yellow|red|purple|orange|teal"
    }
  ],
  "simplified": "simplified version of the regex if possible, null if already simple",
  "optimized": "optimized version for performance if possible, null if already optimal"
}`;

  const result = await model.generateContent([
    systemPrompt,
    `Explain this regex pattern: /${pattern}/${flags}`,
  ]);

  const text = result.response.text();
  const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(cleaned) as ExplainResult;
}

export async function correctRegex(
  pattern: string,
  error: string,
  intent: string
): Promise<{ pattern: string; explanation: string }> {
  const model = getModel();

  const result = await model.generateContent([
    `Fix this broken regex pattern. Return ONLY JSON: {"pattern": "fixed pattern", "explanation": "what was wrong and what was fixed"}`,
    `Pattern: ${pattern}\nError: ${error}\nIntent: ${intent}`,
  ]);

  const text = result.response.text();
  const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(cleaned);
}
