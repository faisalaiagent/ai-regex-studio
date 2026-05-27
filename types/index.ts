export type Plan = "GUEST" | "FREE" | "PRO" | "TEAM";

export interface RegexResult {
  pattern: string;
  flags: string;
  explanation: string;
  examples: string[];
  edgeCases: string[];
  flavors: Record<string, string>;
  complexity: "simple" | "moderate" | "complex";
  title?: string;
}

export interface RegexMatch {
  value: string;
  index: number;
  end: number;
  groups: Record<string, string> | undefined;
}

export interface TestResult {
  matches: RegexMatch[];
  isValid: boolean;
  error?: string;
  matchCount: number;
  replaceResult?: string;
  splitResult?: string[];
}

export interface ExplainResult {
  overview: string;
  parts: ExplainPart[];
  simplified?: string;
  optimized?: string;
  complexity: "beginner" | "intermediate" | "advanced";
}

export interface ExplainPart {
  token: string;
  type: "anchor" | "quantifier" | "group" | "character" | "assertion" | "flag" | "alternation";
  explanation: string;
  beginner: string;
  color: string;
}

export interface Snippet {
  id: string;
  title: string;
  pattern: string;
  flags: string;
  description?: string;
  explanation?: string;
  tags: string[];
  isPublic: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  folderId?: string;
}

export interface UsageStats {
  used: number;
  limit: number;
  plan: Plan;
  resetAt: string;
}

export type RegexFlavor = "javascript" | "python" | "pcre" | "java";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  shortcut?: string[];
  action: () => void;
  group: string;
}
