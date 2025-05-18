// src/controllers/banner.controller.ts

import type { Request, Response } from 'express';
import banners from '../models/banner.json';
import {
  successResponse,
  internalServerErrorResponse,
} from '../utils/response';

// GET /banners
// Supports ?visible_page=home
export const getBanners = async (req: Request, res: Response): Promise<any> => {
  try {
    const visible_page = req.query.visible_page as string;

    const filtered = banners.filter(
      (banner: any) =>
        banner.action === 'on' &&
        (visible_page ? banner.visible_on_pages?.[visible_page] === true : true)
    );

    return successResponse(res, {
      message: 'Banners fetched successfully',
      data: filtered,
    });
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};
