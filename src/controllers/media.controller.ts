// src/controllers/media.controller.ts

import type { Request, Response } from 'express';
import type { MediaItem } from '../models/media.model';
import mediaData from '../models/media.json';

// GET /media
// Supports ?category=m001 | m002 | ...
export const getMedia = (req: Request, res: Response): void => {
  try {
    const { category } = req.query;
    let filtered = mediaData as MediaItem[];

    if (typeof category === 'string') {
      const categoryId = category.trim();
      filtered = filtered.filter((item) =>
        item.category.some((cat) => cat.id === categoryId)
      );
    }

    res.status(200).json(filtered);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch media' });
  }
};
