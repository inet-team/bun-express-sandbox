// src/utils/response.util.ts

import type { Response } from 'express';

interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message = 'Success',
  status = 200
): Response<ApiResponse<T>> => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const internalServerErrorResponse = (
  res: Response,
  error: unknown
): Response<ApiResponse<null>> => {
  console.error(error);
  return res.status(500).json({
    status: 500,
    message:
      error instanceof Error ? error.message : 'An unknown error occurred',
    data: null,
  });
};
