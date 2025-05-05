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
// Supports ?search, ?categoryId, ?limit, ?page
// Sorted by created_at descending
export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, categoryId, limit, page } = req.query;

    let filtered = [...allNews];

    // Apply search filter
    if (typeof search === 'string') {
      const keyword = search.toLowerCase();
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(keyword) ||
          news.content.toLowerCase().includes(keyword)
      );
    }

    // Apply category filter
    if (typeof categoryId === 'string') {
      filtered = filtered.filter((news) =>
        news.category.some((cat) => cat.id === categoryId)
      );
    }

    // Sort by created_at descending
    filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    let result = filtered;

    // Apply pagination only if both limit and page are provided
    if (typeof limit === 'string' && typeof page === 'string') {
      const limitNum = parseInt(limit, 10);
      const pageNum = parseInt(page, 10);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;
      result = filtered.slice(startIndex, endIndex);

      return successResponse(res, {
        items: result,
        pagination: {
          totalItems: filtered.length,
          totalPages: Math.ceil(filtered.length / limitNum),
          currentPage: pageNum,
          pageSize: limitNum,
        },
      }, 'News fetched with pagination');
    }

    successResponse(res, result, 'News fetched successfully');
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};
