// lib/types.ts

export interface Idea {
  id: string;
  external_id: string;
  title: string;
  description: string;
  category: 'mikro' | 'b2b' | 'mimarlik';
  tags: string[];
  score: number;
  revenue_potential: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  time_to_mvp: string;
  germany_fit: number;
  market_size: string;
  pain_model: string;
  monetization: string;
  tools: string[];
  steps: string[];
  risks: string[];
  competitors: string;
  generated_at: string;
  isSaved?: boolean; // client-side computed
}

export interface SavedIdea {
  id: string;
  user_id: string;
  idea_id: string;
  saved_at: string;
  idea: Idea;
}

export type FilterCategory = 'all' | 'mikro' | 'b2b' | 'mimarlik';
export type SortOption = 'score' | 'difficulty' | 'germany_fit';
