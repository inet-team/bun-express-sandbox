// src/controllers/media.controller.ts

import type { Request, Response } from 'express';
import mediaData from '../data/media.json';
import { successResponse, internalServerErrorResponse } from '../utils/response';

// UAT image base URL for media thumbnails
const BASE_IMAGE_URL = 'https://uat.techmovement.co.th/temp_uploads/media/';

// GET /media
// Supports:
// - ?search=keyword
// - ?category=category_slug
// - ?sort=newest|oldest
// - ?limit=number&page=number
export const getMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, sort, limit, page } = req.query;

    // Pre-format media with full thumbnail URL
    const allMedia = mediaData.map((item: any) => ({
      ...item,
      thumbnail: item.thumbnail
        ? {
            // url: `${BASE_IMAGE_URL}${item.thumbnail.path}`,
            url: `http://128.199.202.159/temp_uploads/tmm/news/demo66c29b21.webp`,
            alt: item.thumbnail.alt,
          }
        : null,
    }));

    let filtered = [...allMedia];

    // Search filter (title + content)
    if (typeof search === 'string') {
      const keyword = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(keyword) ||
          item.content.toLowerCase().includes(keyword)
      );
    }

    // Category slug filter
    if (typeof category === 'string') {
      filtered = filtered.filter((item) => item.category?.slug === category);
    }

    // Sort by date
    const isOldest = sort === 'oldest';
    filtered.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return isOldest ? aTime - bTime : bTime - aTime;
    });

    // Pagination
    let result = filtered;
    const meta: Record<string, any> = {};

    if (typeof limit === 'string' && typeof page === 'string') {
      const limitNum = parseInt(limit, 10);
      const pageNum = parseInt(page, 10);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;

      result = filtered.slice(startIndex, endIndex);

      meta.pagination = {
        total_items: filtered.length,
        total_pages: Math.ceil(filtered.length / limitNum),
        current_page: pageNum,
        page_size: limitNum,
      };
    }

    successResponse(res, {
      message: 'Media fetched successfully',
      data: result,
      pagination: meta.pagination || [],
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};

// GET /media/:id
export const getMediaByPublicId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const media = mediaData.find((item: any) => item.public_id === id);

    if (!media) {
      res.status(404).json({ message: 'Media not found' });
      return;
    }

    const thumbnail = media.thumbnail
      ? {
          // url: `${BASE_IMAGE_URL}${media.thumbnail.path}`,
          url: `http://128.199.202.159/temp_uploads/tmm/news/demo66c29b21.webp`,
          alt: media.thumbnail.alt,
        }
      : null;

    successResponse(res, {
      message: 'Media fetched successfully',
      data: {
        ...media,
        thumbnail,
      },
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};
