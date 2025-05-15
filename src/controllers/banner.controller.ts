// src/controllers/banner.controller.ts

import type { Request, Response } from 'express';
import banners from '../models/banner.json';

// GET /banners
// Supports ?page
export const getBanners = async (req: Request, res: Response): Promise<void> => {
  const page = req.query.page as string;

  if (!page) {
    res.status(400).json({ error: 'Missing page query' });
    return;
  }

  const filtered = banners.filter(
    (banner: any) => banner.page_status?.[page] === true
  );

  res.json(filtered);
};
