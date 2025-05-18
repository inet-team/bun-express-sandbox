// src/controllers/infographic.controller.ts

import type { Request, Response } from 'express';
import infographicData from '../models/infographic.json';
import {
  successResponse,
  internalServerErrorResponse,
} from '../utils/response';

// GET /infographics
// Supports ?limit
export const getInfographics = (req: Request, res: Response): void => {
  try {
    const { limit } = req.query;
    let result = infographicData;

    if (typeof limit === 'string') {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        result = infographicData.slice(0, limitNum);
      }
    }

    successResponse(res, {
      message: 'Infographics fetched successfully',
      data: result,
    });
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};
