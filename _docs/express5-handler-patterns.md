# Express 5 Route Handler Guidelines (TypeScript)

## Why Should Route Handlers Return `void` or `Promise<void>`?

In Express 5, route handlers and middleware that return a `Promise` will automatically call `next(value)` on rejection or thrown error. Therefore, Express handles asynchronous errors natively, and developers do not need to manually propagate errors using `next()`.

However, the TypeScript types for Express expect route handlers to return either `void` or `Promise<void>`. Returning a `Response` object directly can cause type mismatches:

```ts
// Not recommended
export const getNews = (req: Request, res: Response): Response => {
  return res.json({ message: 'Hello' });
};

// TypeScript may throw:
// Type '(req: Request, res: Response) => Response<any>' is not assignable to type '(...args: any[]) => void'
```

### Recommended Approach

Return `void` or `Promise<void>` and avoid using `return` when sending the response:

```ts
// Preferred pattern
export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const news = [{ title: 'Hello World' }];
    res.status(200).json({ statusCode: 200, message: 'Success', data: news });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
  }
};
```

## Avoid Returning `res.status().json()`

Using `return res.status().json(...)` is not necessary and might confuse readers. Express ignores the returned value from route handlers, and returning `Response` violates TypeScript's typing in Express 5.

### Example (Avoid this):

```ts
export const getNews = (req: Request, res: Response): Response => {
  // Returning Response is unnecessary
  return res.status(200).json({ message: 'Unclear Return Type' });
};
```

### Example (Use this instead):

```ts
export const getNews = (req: Request, res: Response): void => {
  const news = [{ title: 'Latest News' }];
  res.status(200).json({ statusCode: 200, message: 'Fetched news', data: news });
};
```

## Response Utilities Example

To maintain consistency, create a utility function:

```ts
// utils/response.util.ts
import type { Response } from 'express';

export const successResponse = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
): void => {
  res.status(statusCode).json({ statusCode, message, data });
};

export const internalServerErrorResponse = (res: Response, error: unknown): void => {
  console.error(error);
  res.status(500).json({
    statusCode: 500,
    message: error instanceof Error ? error.message : 'An unknown error occurred',
  });
};
```

Then use in controllers:

```ts
// controller/news.controller.ts
import { successResponse, internalServerErrorResponse } from '../utils/response.util';

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const news = [{ title: 'Express 5 is great!' }];
    successResponse(res, news, 'News loaded');
  } catch (err) {
    internalServerErrorResponse(res, err);
  }
};
```

## Summary

- Always return `void` or `Promise<void>` from route handlers.
- Avoid returning the `res.status().json(...)` expression.
- Use centralized utility functions for consistent response formatting.
- Express 5 handles async errors automatically if you `throw` inside an `async` function.
