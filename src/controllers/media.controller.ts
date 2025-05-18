import type { Request, Response } from 'express';
import type { MediaItem } from '../models/media.model';
import mediaData from '../models/media.json';
import {
  successResponse,
  internalServerErrorResponse,
} from '../utils/response';

// GET /media
// Supports ?category
export const getMedia = (req: Request, res: Response): void => {
  try {
    const { category } = req.query;
    let filtered = mediaData as MediaItem[];

    if (typeof category === 'string') {
      const categoryId = category.trim();
      filtered = filtered.filter((item) =>
        item.category.some((cat) => cat.id === categoryId)
      );
    }

    successResponse(res, {
      message: 'Media fetched successfully',
      data: filtered,
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};

// GET /media/:id
export const getMediaById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const item = (mediaData as MediaItem[]).find((m) => m.id === id);

    successResponse(res, {
      message: 'Media item fetched successfully',
      data: item,
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};
