import type { TestResult, RegexMatch } from "@/types";

export function testRegex(
  pattern: string,
  flags: string,
  testText: string,
  replaceWith?: string
): TestResult {
  if (!pattern) {
    return { matches: [], isValid: true, matchCount: 0 };
  }

  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];

    if (flags.includes("g")) {
      let match;
      const globalRegex = new RegExp(pattern, flags);
      while ((match = globalRegex.exec(testText)) !== null) {
        matches.push({
          value: match[0],
          index: match.index,
          end: match.index + match[0].length,
          groups: match.groups,
        });
        if (match[0].length === 0) globalRegex.lastIndex++;
      }
    } else {
      const match = regex.exec(testText);
      if (match) {
        matches.push({
          value: match[0],
          index: match.index,
          end: match.index + match[0].length,
          groups: match.groups,
        });
      }
    }

    const replaceResult =
      replaceWith !== undefined
        ? testText.replace(new RegExp(pattern, flags), replaceWith)
        : undefined;

    const splitResult = testText.split(new RegExp(pattern, flags));

    return {
      matches,
      isValid: true,
      matchCount: matches.length,
      replaceResult,
      splitResult: splitResult.length > 1 ? splitResult : undefined,
    };
  } catch (error) {
    return {
      matches: [],
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid regex",
      matchCount: 0,
    };
  }
}

export function highlightMatches(text: string, matches: RegexMatch[]): string {
  if (!matches.length) return escapeHtml(text);

  let result = "";
  let lastIndex = 0;
  const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

  for (const match of sortedMatches) {
    result += escapeHtml(text.slice(lastIndex, match.index));
    result += `<mark class="regex-match">${escapeHtml(match.value)}</mark>`;
    lastIndex = match.end;
  }

  result += escapeHtml(text.slice(lastIndex));
  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getRegexComplexityScore(pattern: string): number {
  let score = 0;
  score += (pattern.match(/\([^)]*\)/g) || []).length * 10; // groups
  score += (pattern.match(/[+*?{]/g) || []).length * 5; // quantifiers
  score += (pattern.match(/(?:\(\?[=!<])/g) || []).length * 15; // lookahead/behind
  score += (pattern.match(/\[/g) || []).length * 3; // character classes
  score += pattern.length;
  return Math.min(score, 100);
}

export function generateSlug(length = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}
