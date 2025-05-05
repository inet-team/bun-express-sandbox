// src/utils/response.util.ts

import type { Response } from 'express';

export const successResponse = (
  res: Response,
  data: any,
  message = 'Success',
  status = 200
): any => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const internalServerErrorResponse = (
  res: Response,
  error: unknown
): any => {
  console.error(error);
  return res.status(500).json({
    status: 500,
    message:
      error instanceof Error ? error.message : 'An unknown error occurred',
    data: null,
  });
};
