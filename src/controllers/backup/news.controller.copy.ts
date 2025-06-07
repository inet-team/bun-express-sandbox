// src/controllers/news.controller.ts

import type { Request, Response } from 'express';
import newsData from '../data/news.json';
import imageData from '../data/image.json';
import categoryData from '../data/category.json';
import { successResponse, internalServerErrorResponse } from '../utils/response';

// Local server:  http://128.199.202.159/temp_uploads/tmm/news/
// UAT server:    https://uat.techmovement.co.th/temp_uploads/news/
const BASE_IMAGE_URL = 'https://uat.techmovement.co.th/temp_uploads/news/';

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

    // Join news with category[] and thumbnail
    const allNews = newsData.map((news: any) => {
      const categoryItem = categoryData.find((cat: any) => cat.id === news.category_id);
      const thumbnailItem = imageData.find((img: any) => img.id === news.thumbnail_id);

      return {
        ...news,
        category: categoryItem
          ?
            {
              id: categoryItem.id,
              slug: categoryItem.slug,
              name: categoryItem.name,
            }
          : null,
        thumbnail: thumbnailItem
          ? {
              url: `${BASE_IMAGE_URL}${thumbnailItem.path}`,
              alt: thumbnailItem.alt,
            }
          : null,
      };
    });

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
        news.category.some((cat: any) => cat.slug === category)
      );
    }

    // Content type filter
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

export const getNewsByPublicId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const news = newsData.find((item: any) => item.public_id === id);

    if (!news) {
      res.status(404).json({ message: 'News not found' });
      return;
    }

    const thumbnail = imageData.find((img: any) => img.id === news.thumbnail_id);
    const category = categoryData.find((cat: any) => cat.id === news.category_id);

    successResponse(res, {
      message: 'News fetched successfully',
      data: {
        id: news.id,
        public_id: news.public_id,
        title: news.title,
        abstract: news.abstract,
        content: news.content,
        content_type: news.content_type,
        tag: news.tag,
        action: news.action,
        page_view: news.page_view,
        created_at: news.created_at,
        updated_at: news.updated_at,
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

export const getAllNews = (_req: Request, res: Response): void => {
  const mappedNews = newsData.map((news: any) => {
    const thumbnail = imageData.find((img: any) => img.id === news.thumnailid);
    const category = categoryData.find((cat: any) => cat.id === news.categoryid);

    return {
      id: news.id,
      public_id: news.public_id,
      title: news.title,
      abstract: news.abstract,
      content: news.content,
      content_type: news.content_type,
      tag: news.tag,
      action: news.action,
      page_view: news.page_view,
      created_at: news.created_at,
      updated_at: news.updated_at,
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
    };
  });

  res.status(200).json({
    message: 'News fetched with relations',
    data: mappedNews,
  });
};
