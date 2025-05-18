# Controller Return Types in Express with TypeScript

In a Bun + Express + TypeScript project, properly typing controller return values is essential for maintaining type safety, clarity, and reliable tooling support.

## ✅ Recommended

```ts
export const getBanners = async (req: Request, res: Response): Promise<Response> => {
  // ...
};
```

This explicitly states that the function returns an Express `Response` object wrapped in a Promise.

## ⚠️ Not Recommended

```ts
export const getBanners = async (req: Request, res: Response): Promise<any> => {
  // ...
};
```

### Why `Promise<any>` Should Be Avoided

* **Loss of Type Safety**: TypeScript can no longer ensure that the returned value is an Express `Response`.
* **Poor Developer Experience**: Autocomplete and IntelliSense will be less accurate.
* **Misleading Semantics**: It suggests that the function might return any type, which is not true for Express route handlers.

## Optional: Use Non-Async If Await Isn't Needed

If your function doesn't use `await`, there's no need for `async`. You can return `Response` directly:

```ts
export const getBanners = (req: Request, res: Response): Response => {
  // ...
};
```

## Summary

| Return Type         | Recommended | Notes                      |
| ------------------- | ----------- | -------------------------- |
| `Promise<any>`      | ❌ No        | Avoid — loses type safety  |
| `Promise<Response>` | ✅ Yes       | Best for `async` handlers  |
| `Response`          | ✅ Yes       | Use when not using `await` |

## Best Practice

Always prefer the most specific and descriptive return type available. Use `Promise<Response>` for async handlers, and `Response` for sync ones. Avoid `any` to ensure TypeScript can protect you from bugs and provide a better developer experience.
