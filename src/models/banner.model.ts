// src/models/banner.model.ts

export type FrontendPageKey = 'home' | 'media' | 'news' | 'infographic';

export interface Banner {
  id: string;
  title: string;
  desktop_image_url: string;
  mobile_image_url: string;
  visible_on_pages: Partial<Record<FrontendPageKey, boolean>>;
  link_url?: string;
  action: 'on' | 'off';
  created_at: Date;
  updated_at: Date;
}
