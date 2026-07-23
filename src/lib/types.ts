export type Relevance = "Alta" | "Média" | "Baixa";
export type Division = "aviation" | "education";

export type BriefingArticle = {
  id: string;
  division: Division;
  headline: string;
  imagePrompt: string;
  imageUrl?: string;
  sourceName: string;
  publicationDate: string;
  factDate?: string;
  sourceUrl: string;
  summary: string[];
  impact: string;
  action: string;
  relevance: Relevance;
  relevanceReason: string;
};

export type ExecutiveBriefing = {
  title: string;
  generatedAt: string;
  windowHours: 24 | 48 | 72;
  transparencyNote: string;
  articles: BriefingArticle[];
  radar: string[];
};
