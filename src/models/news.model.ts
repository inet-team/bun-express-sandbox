// src/models/news.model.ts

export type ContentType = 'ไทย' | 'ต่างประเทศ';

export interface NewsThumbnail {
  type: string;
  url: string;
  ratio: string;
}

// Fixed list of categories with known id-name mapping
export type NewsCategory =
  | { id: '66c2e7532d6c26752e5baa01'; name: 'การแพทย์' }
  | { id: '66c2e7532d6c26752e5baa02'; name: 'เศรษฐกิจ - การลงทุน' }
  | { id: '66c2e7532d6c26752e5baa03'; name: 'สังคม' }
  | { id: '66c2e7532d6c26752e5baa04'; name: 'ธุรกิจไอที' };

export interface NewsItem {
  id: string;
  title: string;
  abstract: string;
  content: string;
  content_type: ContentType;
  status: string;
  tag: string[];
  thumbnail: NewsThumbnail;
  created_at: string;
  updated_at: string;
  category: NewsCategory[];
  page_view: number;
}
