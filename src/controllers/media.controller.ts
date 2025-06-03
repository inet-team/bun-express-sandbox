// src/controllers/media.controller.ts

import type { Request, Response } from 'express';
import type { MediaItem } from '../models/media.model';
import mediaData from '../models/media.json';
import {
  successResponse,
  internalServerErrorResponse,
} from '../utils/response';

const allMedia = mediaData as MediaItem[];

// GET /media
// Supports:
// - ?search=keyword           → filter by title or content
// - ?category=slug            → filter by category slug (e.g., 'tech-of-time')
// - ?sort=newest|oldest       → sort by created_at date
// - ?limit=number&page=number → pagination
export const getMedia = (req: Request, res: Response): void => {
  try {
    const { search, category, limit, page, sort } = req.query;

    let filtered = [...allMedia];

    // Search filter
    if (typeof search === 'string') {
      const keyword = search.toLowerCase();
      filtered = filtered.filter(
        (media) =>
          media.title.toLowerCase().includes(keyword) ||
          media.content.toLowerCase().includes(keyword)
      );
    }

    // Category filter
    if (typeof category === 'string') {
      filtered = filtered.filter((item) =>
        item.category.some((cat) => cat.slug === category)
      );
    }

    // Sort
    const isOldest = sort === 'oldest';
    filtered.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return isOldest ? aTime - bTime : bTime - aTime;
    });

    // Pagination
    let result = filtered;
    const data: Record<string, any> = {};
    if (typeof limit === 'string' && typeof page === 'string') {
      const limitNum = parseInt(limit, 10);
      const pageNum = parseInt(page, 10);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;

      result = filtered.slice(startIndex, endIndex);
      data.pagination = {
        total_items: filtered.length,
        total_pages: Math.ceil(filtered.length / limitNum),
        current_page: pageNum,
        page_size: limitNum,
      };
    }

    successResponse(res, {
      message: 'Media fetched successfully',
      data: result,
      pagination: data.pagination || [],
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};

// GET /media/:id
export const getMediaByPublicId = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;

    const item = allMedia.find((media) => media.public_id === id);

    if (!item) {
      res.status(404).json({ message: 'Media not found' });
      return;
    }

    successResponse(res, {
      message: 'Media item fetched successfully',
      data: item,
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};