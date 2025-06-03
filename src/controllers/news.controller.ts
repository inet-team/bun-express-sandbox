// src/controllers/news.controller.ts

import type { Request, Response } from 'express';
import newsData from '../models/news.json';
import type { NewsItem } from '../models/news.model';
import {
  successResponse,
  internalServerErrorResponse,
} from '../utils/response';

const allNews = newsData as NewsItem[];

// GET /news
// Supports:
// - ?search=keyword               → filter by title or content
// - ?category=category_slug       → filter by category slug (e.g., it-business)
// - ?type=ไทย|ต่างประเทศ           → filter by content type
// - ?sort=newest|oldest           → sort by created_at date
// - ?limit=number&page=number     → pagination
export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, limit, page, sort, type } = req.query;

    let filtered = [...allNews];

    // Search filter
    if (typeof search === 'string') {
      const keyword = search.toLowerCase();
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(keyword) ||
          news.content.toLowerCase().includes(keyword)
      );
    }

    // Category filter by slug
    if (typeof category === 'string') {
      filtered = filtered.filter((news) =>
        news.category.some((cat) => cat.slug === category)
      );
    }

    // ContentType filter
    if (type === 'ไทย' || type === 'ต่างประเทศ') {
      filtered = filtered.filter((news) => news.content_type === type);
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
      message: 'News fetched successfully',
      data: result,
      pagination: data.pagination || [],
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};

// GET /news/:id
export const getNewsByPublicId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find the news item by public_id
    const newsItem = allNews.find((news) => news.public_id === id);

    if (!newsItem) {
      res.status(404).json({
        message: 'News not found',
      });
      return;
    }

    successResponse(res, {
      message: 'News fetched successfully',
      data: newsItem,
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};
