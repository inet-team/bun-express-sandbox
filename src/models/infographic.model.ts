// src/models/infographic.model.ts

// Fixed list of categories with known id-name mapping
export type NewsCategory =
  | { id: 'demo66c11b01'; name: 'การแพทย์' }
  | { id: 'demo66c11b02'; name: 'เศรษฐกิจ - การลงทุน' }
  | { id: 'demo66c11b03'; name: 'สังคม' }
  | { id: 'demo66c11b04'; name: 'ธุรกิจไอที' };

export interface InfographicItem {
  id: string;
  title: string;
  thumbnail: {
    type: string;
    url: string;
    alt: string;
  };
  tag?: string[];
  category: NewsCategory;
  action: 'on' | 'off';
  created_at: string;
  updated_at: string;
}
