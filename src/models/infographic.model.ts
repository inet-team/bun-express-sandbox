// src/models/infographic.model.ts

export interface InfographicItem {
  id: string;
  title: string;
  thumbnail: {
    type: string;
    url: string;
    alt: string;
  };
  tag?: string[];
  action: 'on' | 'off';
  created_at: string;
  updated_at: string;
}
