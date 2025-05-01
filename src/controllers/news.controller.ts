// src/controllers/news.controller.ts

import type { Request, Response } from 'express';
import newsData from '../models/news.json';
import type { NewsItem } from '../models/news.model';

const allNews = newsData as NewsItem[];

// GET /news — return all news with count
export const getAllNews = (_req: Request, res: Response) => {
  res.json({ total: allNews.length, data: allNews });
};

// GET /news/latest — sorted by created_at descending, limited to 5
export const getLatestNews = (_req: Request, res: Response) => {
  const sorted = [...allNews]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  res.json({ total: sorted.length, data: sorted });
};

// GET /news/technology — filter by category name "ธุรกิจไอที", limited to 5
export const getTechnologyNews = (_req: Request, res: Response) => {
  const filtered = allNews
    .filter(news => news.category.some(cat => cat.name === 'ธุรกิจไอที'))
    .slice(0, 5);

  res.json({ total: filtered.length, data: filtered });
};
