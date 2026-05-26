export type CaseDomain =
  | "art"
  | "politics"
  | "ethics"
  | "media"
  | "economics"
  | "philosophy"
  | "culture"
  | "technology";

export interface OpeningStatements {
  prosecution: string;
  defense: string;
}

export type EvidenceType =
  | "historical"
  | "quote"
  | "example"
  | "policy"
  | "counterexample"
  | "edge_case";

export type EvidenceSide = "prosecution" | "defense" | "neutral";

export interface EvidenceItem {
  id: string;
  type: EvidenceType;
  side: EvidenceSide;
  title: string;
  body: string;
  sourceNote?: string;
  weight?: number;
}

export interface CrossExamOption {
  id: string;
  label: string;
  rationale: string;
}

export interface CrossExamPrompt {
  id: string;
  prompt: string;
  options: CrossExamOption[];
}

export interface VerdictAxis {
  id: string;
  axisName: string;
  lowLabel: string;
  highLabel: string;
}

export interface DebriefContent {
  summary: string;
  defenseTraditions: string[];
  critiqueTraditions: string[];
  contextNotes: string;
  transferNotes?: string;
  relatedCases: string[];
}

export type CaseDifficulty = "easy" | "medium" | "hard";

export interface CourtroomCase {
  id: string;
  slug: string;
  title: string;
  defendantIdea: string;
  charge: string;
  whyItMattersNow: string;
  domains: CaseDomain[];
  difficulty: CaseDifficulty;
  estimatedMinutes: number;
  openingStatements: OpeningStatements;
  evidence: EvidenceItem[];
  crossExam: CrossExamPrompt[];
  verdictAxes: VerdictAxis[];
  debrief: DebriefContent;
}

export type EvidenceMark =
  | "strong"
  | "weak"
  | "emotional"
  | "unclear"
  | null;

export interface TrialState {
  evidenceMarks: Record<string, EvidenceMark>;
  crossExamChoices: Record<string, string>;
  verdictValues: Record<string, number>;
  rulingText: string;
}
