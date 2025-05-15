// src/utils/response.util.ts

import type { Response } from 'express';

interface SuccessResponseData {
  message: string;
  data: any;
  code?: number;
  [key: string]: any;
}

export const successResponse = (
  res: Response,
  { message, data, code = 200, ...otherFields }: SuccessResponseData
): any => {
  return res.status(code).json({
    code,
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
    code: 500,
    message:
      error instanceof Error ? error.message : 'An unknown error occurred',
    data: null,
  });
};
