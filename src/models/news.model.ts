// src/models/news.model.ts

export type ContentType = 'ไทย' | 'ต่างประเทศ';

export interface NewsThumbnail {
  type: string;
  url: string;
  alt: string;
}

// Fixed list of categories with known id-name mapping
export type NewsCategory =
  | { id: 'demo66c11b01'; name: 'การแพทย์' }
  | { id: 'demo66c11b02'; name: 'เศรษฐกิจ - การลงทุน' }
  | { id: 'demo66c11b03'; name: 'สังคม' }
  | { id: 'demo66c11b04'; name: 'ธุรกิจไอที' };

export interface NewsItem {
  id: string;
  title: string;
  abstract: string;
  content: string;
  content_type: ContentType;
  tag: string[];
  thumbnail: NewsThumbnail;
  category: NewsCategory[];
  page_view: number;
  action: 'on' | 'off';
  created_at: string;
  updated_at: string;
}
