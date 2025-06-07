// src/controllers/news.controller.ts

import type { Request, Response } from 'express';
import newsData from '../data/news.json';
import { successResponse, internalServerErrorResponse } from '../utils/response';

// UAT Image Host (thumbnail.path จะใช้ร่วมกับอันนี้)
const BASE_IMAGE_URL = 'https://uat.techmovement.co.th/temp_uploads/news/';

// GET /news
// Supports:
// - ?search=keyword
// - ?category=category_slug
// - ?type=ไทย|ต่างประเทศ
// - ?sort=newest|oldest
// - ?limit=number&page=number
export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, limit, page, sort, type } = req.query;

    const allNews = newsData.map((news: any) => {
      const thumbnail = news.thumbnail
        ? {
            // url: `${BASE_IMAGE_URL}${news.thumbnail.path}`
            url: `http://128.199.202.159/temp_uploads/tmm/news/demo66c29b20.webp`,
            alt: news.thumbnail.alt,
          }
        : null;

      return {
        ...news,
        thumbnail,
      };
    });

    let filtered = [...allNews];

    // Filter: search by title or content
    if (typeof search === 'string') {
      const keyword = search.toLowerCase();
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(keyword) ||
          news.content.toLowerCase().includes(keyword)
      );
    }

    // Filter: category slug
    if (typeof category === 'string') {
      filtered = filtered.filter(
        (news) => news.category?.slug === category
      );
    }

    // Filter: content_type
    if (type === 'ไทย' || type === 'ต่างประเทศ') {
      filtered = filtered.filter((news) => news.content_type === type);
    }

    // Sort: by created_at
    const isOldest = sort === 'oldest';
    filtered.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return isOldest ? aTime - bTime : bTime - aTime;
    });

    // Pagination
    let result = filtered;
    const responseMeta: Record<string, any> = {};

    if (typeof limit === 'string' && typeof page === 'string') {
      const limitNum = parseInt(limit, 10);
      const pageNum = parseInt(page, 10);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;

      result = filtered.slice(startIndex, endIndex);

      responseMeta.pagination = {
        total_items: filtered.length,
        total_pages: Math.ceil(filtered.length / limitNum),
        current_page: pageNum,
        page_size: limitNum,
      };
    }

    successResponse(res, {
      message: 'News fetched successfully',
      data: result,
      pagination: responseMeta.pagination || [],
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};

// GET /news/:id
export const getNewsByPublicId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const news = newsData.find((item: any) => item.public_id === id);

    if (!news) {
      res.status(404).json({ message: 'News not found' });
      return;
    }

    const thumbnail = news.thumbnail
      ? {
          // url: `${BASE_IMAGE_URL}${news.thumbnail.path}`,
          url: `http://128.199.202.159/temp_uploads/tmm/news/demo66c29b20.webp`,
          alt: news.thumbnail.alt,
        }
      : null;

    successResponse(res, {
      message: 'News fetched successfully',
      data: {
        ...news,
        thumbnail,
      },
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};
