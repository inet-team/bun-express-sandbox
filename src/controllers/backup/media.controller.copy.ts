// src/controllers/media.controller.ts

import type { Request, Response } from 'express';
import mediaData from '../data/media.json';
import imageData from '../data/image.json';
import categoryData from '../data/category.json';
import { successResponse, internalServerErrorResponse } from '../utils/response';

const BASE_IMAGE_URL = 'https://uat.techmovement.co.th/temp_uploads/media/';

// GET /media
// Supports:
// - ?search=keyword
// - ?category=category_slug
// - ?type=ไทย|ต่างประเทศ
// - ?sort=newest|oldest
// - ?limit=number&page=number
export const getMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, type, sort, limit, page } = req.query;

    const allMedia = mediaData.map((item: any) => {
      const thumbnail = imageData.find((img: any) => img.id === item.thumbnail_id);
      const categoryItem = categoryData.find((cat: any) => cat.id === item.category_id);

      return {
        ...item,
        thumbnail: thumbnail
          ? {
              url: `${BASE_IMAGE_URL}${thumbnail.path}`,
              alt: thumbnail.alt,
            }
          : null,
        category: categoryItem
          ?
            {
              id: categoryItem.id,
              slug: categoryItem.slug,
              name: categoryItem.name,
            }
          : null,
      };
    });

    let filtered = [...allMedia];

    if (typeof search === 'string') {
      const keyword = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(keyword) ||
          item.content.toLowerCase().includes(keyword)
      );
    }

    if (typeof category === 'string') {
      filtered = filtered.filter((item) =>
        item.category.some((cat: any) => cat.slug === category)
      );
    }

    if (type === 'ไทย' || type === 'ต่างประเทศ') {
      filtered = filtered.filter((item) => item.content_type === type);
    }

    const isOldest = sort === 'oldest';
    filtered.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return isOldest ? aTime - bTime : bTime - aTime;
    });

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

    const thumbnail = imageData.find((img: any) => img.id === media.thumbnail_id);
    const category = categoryData.find((cat: any) => cat.id === media.category_id);

    successResponse(res, {
      message: 'Media fetched successfully',
      data: {
        id: media.id,
        public_id: media.public_id,
        title: media.title,
        abstract: media.content,
        content: media.content,
        tags: media.tags,
        action: media.action,
        page_view: media.page_view,
        created_at: media.created_at,
        updated_at: media.updated_at,
        thumbnail: thumbnail
          ? {
              url: `${BASE_IMAGE_URL}${thumbnail.path}`,
              alt: thumbnail.alt,
            }
          : null,
        category: category
          ? {
              id: category.id,
              slug: category.slug,
              name: category.name,
            }
          : null,
      },
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};
