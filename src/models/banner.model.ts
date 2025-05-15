// src/models/banner.model.ts

type BannerPage = 'home' | 'media' | 'news' | 'infographic';

export interface Banner {
  id: string;
  desktop_image_url: string;
  mobile_image_url: string;
  page_status: Partial<Record<BannerPage, boolean>>;
  link_url?: string;
  created_at: Date;
  updated_at: Date;
}
