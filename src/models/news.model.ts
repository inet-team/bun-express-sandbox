// src/models/news.model.ts

export type ContentType = 'ไทย' | 'ต่างประเทศ';

export interface NewsThumbnail {
  type: string;
  url: string;
  alt: string;
}

// Fixed list of categories with known id-name mapping
export type NewsCategory =
  | { id: 'demo66c11b01'; slug: 'sustainability'; name: 'ความยั่งยืน' }
  | { id: 'demo66c11b02'; slug: 'healthcare'; name: 'การแพทย์' }
  | { id: 'demo66c11b03'; slug: 'economy-investment'; name: 'เศรษฐกิจ - การลงทุน' }
  | { id: 'demo66c11b04'; slug: 'social'; name: 'สังคม' }
  | { id: 'demo66c11b05'; slug: 'it-business'; name: 'ธุรกิจไอที' };

export interface NewsItem {
  id: string;
  public_id: string;
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
