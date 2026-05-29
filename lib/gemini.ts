import type { RegexResult, ExplainResult } from "@/types";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

async function callGroq(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set in environment variables.");

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert regex engineer. Always respond with valid JSON only. No markdown, no explanation outside the JSON object.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content as string;
}

function parseJSON<T>(text: string): T {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found in AI response.");
  return JSON.parse(text.substring(start, end + 1)) as T;
}

export async function generateRegex(prompt: string): Promise<RegexResult> {
  const text = await callGroq(
    `Generate a regex pattern for this requirement: "${prompt}"

Return ONLY this JSON object:
{
  "pattern": "the regex pattern without delimiters",
  "flags": "gi",
  "title": "short descriptive title",
  "explanation": "clear explanation of what this regex matches",
  "examples": ["example string that matches", "another example"],
  "edgeCases": ["edge case to be aware of"],
  "flavors": {
    "javascript": "pattern for JS",
    "python": "pattern for Python",
    "pcre": "pattern for PCRE",
    "java": "pattern for Java"
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
  const text = await callGroq(
    `Explain this regex pattern in detail: /${pattern}/${flags}

Return ONLY this JSON object:
{
  "overview": "one sentence describing what this regex does",
  "complexity": "beginner",
  "parts": [
    {
      "token": "actual token from regex",
      "type": "anchor",
      "explanation": "technical explanation",
      "beginner": "simple plain English explanation",
      "color": "blue"
    }
  ],
  "simplified": null,
  "optimized": null
}

Note: "type" must be one of: anchor, quantifier, group, character, assertion, flag, alternation
Note: "color" must be one of: blue, green, yellow, red, purple, orange, teal`
  );
  return parseJSON<ExplainResult>(text);
}

export async function correctRegex(
  pattern: string,
  error: string,
  intent: string
): Promise<{ pattern: string; explanation: string }> {
  const text = await callGroq(
    `Fix this broken regex: ${pattern}
Error: ${error}
Intent: ${intent}

Return ONLY JSON: {"pattern": "fixed pattern", "explanation": "what was fixed"}`
  );
  return parseJSON(text);
}
