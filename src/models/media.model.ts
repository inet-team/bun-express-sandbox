// src/models/media.model.ts

export interface MediaThumbnail {
  type: string;
  url: string;
  alt: string;
}

export type MediaCategory =
  | { id: 'demo66c12m01'; slug: 'short-vdo'; name: 'Short VDO' }
  | { id: 'demo66c12m02'; slug: 'the-next-move'; name: 'The next move' }
  | { id: 'demo66c12m03'; slug: 'the-next-move-talk'; name: 'The next move (Talk)' }
  | { id: 'demo66c12m04'; slug: 'vision-in-action'; name: 'Vision in Action' }
  | { id: 'demo66c12m05'; slug: 'tech-of-time'; name: 'Tech of Time' }
  | { id: 'demo66c12m06'; slug: 'quality-of-life'; name: 'Quality of Life' };

export interface MediaItem {
  id: string;
  public_id: string;
  title: string;
  content: string;
  video_url: string;
  thumbnail: MediaThumbnail;
  category: MediaCategory[];
  tags: string[];
  page_view: number;
  action: 'on' | 'off';
  created_at: string;
  updated_at: string;
}
