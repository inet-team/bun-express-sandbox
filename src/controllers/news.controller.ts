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
// Supports ?search, ?categoryId, ?limit, ?page, ?sort=asc|desc
export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, categoryId, limit, page, sort } = req.query;

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

    // Sorting
    const isAsc = sort === 'asc';
    filtered.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return isAsc ? aTime - bTime : bTime - aTime;
    });

    // Default result = all
    let result = filtered;
    const data: Record<string, any> = {};

    // Apply pagination if limit & page exist
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
export const getNewsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find the news item by ID
    const newsItem = allNews.find((news) => news.id === id);

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
