// src/utils/response.util.ts

import type { Response } from 'express';

interface SuccessResponseData {
  message: string;
  data: any;
  status?: number;
  [key: string]: any;
}

export const successResponse = (
  res: Response,
  { message, data, status = 200, ...otherFields }: SuccessResponseData
): any => {
  return res.status(status).json({
    status,
    message,
    data,
    ...otherFields,
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
