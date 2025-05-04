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
// Filter by ?search, ?categoryId, ?limit
// Sorted by created_at descending
export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, categoryId, limit } = req.query;

    let filtered = [...allNews];

    if (search && typeof search === 'string') {
      const keyword = search.toLowerCase();
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(keyword) ||
          news.content.toLowerCase().includes(keyword)
      );
    }

    if (categoryId && typeof categoryId === 'string') {
      filtered = filtered.filter((news) =>
        news.category.some((cat) => cat.id === categoryId)
      );
    }

    filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const limitNum = limit ? parseInt(limit as string) : undefined;
    const limited = limitNum ? filtered.slice(0, limitNum) : filtered;

    successResponse(res, limited, 'News fetched successfully');
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};
