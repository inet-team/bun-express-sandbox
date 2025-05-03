# Base image with Bun
FROM oven/bun:1 AS base
WORKDIR /app

# Development dependencies layer (cached for speed)
FROM base AS deps
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

# Copy all source files
FROM deps AS build
COPY . .
# Optional: run build if using Bun transpilation or bundling
# RUN bun run build

# Final production image
FROM base AS prod
WORKDIR /app

# Copy only production dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/src ./src

EXPOSE 8080
CMD ["bun", "run", "src/index.ts"]
