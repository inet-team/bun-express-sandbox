// src/models/media.model.ts

export interface MediaThumbnail {
  type: string;
  url: string;
  alt: string;
}

// Fixed list of media categories
export type MediaCategory =
  | { id: 'demo66c12m01'; name: 'Short VDO' }
  | { id: 'demo66c12m02'; name: 'The next move' }
  | { id: 'demo66c12m03'; name: 'The next move (Talk)' }
  | { id: 'demo66c12m04'; name: 'Vision in Action' }
  | { id: 'demo66c12m05'; name: 'Quality of Life' };

export interface MediaItem {
  id: string;
  title: string;
  content: string;
  video_url: string;
  thumbnail: MediaThumbnail;
  category: MediaCategory[];
  tag: string[];
  action: 'on' | 'off';
  page_view: number;
  created_at: string;
  updated_at: string;
}
