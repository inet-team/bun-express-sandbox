# Bun Express Sandbox

A high-performance API simulation environment built with Bun, Express, and TypeScript. Inspired by community implementations and guides, this project aims to accelerate front-end integration by providing a fast and lightweight mock API server.

**References & Inspirations**   
- [Build an Express App Using Bun and Deploy It To Render With Docker](https://medium.com/@andrewshearerdev/build-an-express-app-using-bun-and-deploy-it-to-render-with-docker-c19f6bdddc0a)  
- [Anjasfedo/bun-express GitHub Repository](https://github.com/Anjasfedo/bun-express)


## API Documentation

### Banners Routes

* `GET /api/v1/banners` → Retrieve all active banners.
* `GET /api/v1/banners?visible_page=home` → Retrieve banners visible on the specified frontend page (`home`, `media`, `news`, `infographic`).

### News Routes

* `GET /api/v1/news` → Retrieve all news items.
* `GET /api/v1/news?search=keyword` → Search news by keyword in title or content.
* `GET /api/v1/news?category=demo66c11b03` → Filter news by category ID (e.g., `'demo66c11b03'` for 'สังคม').
* `GET /api/v1/news?limit=10&page=2` → Paginate results: 10 items per page, page 2.
* `GET /api/v1/news?sort=asc` → Sort news by `created_at` in ascending order.
* `GET /api/v1/news/:id` → Retrieve a single news item by its ID.

### Media Routes

* `GET /api/v1/media` → Retrieve all media items.
* `GET /api/v1/media?category=demo66c12m01` → Filter media by category ID (e.g., `'demo66c12m01'` for 'Short VDO').
* `GET /api/v1/media/:id` → Retrieve a single media item by its ID.

### Infographics Routes

* `GET /api/v1/infographics` → Retrieve all infographic items.
* `GET /api/v1/infographics?category=demo66c11b03` → Filter infographics by category ID.
* `GET /api/v1/infographics/:id` → Retrieve a single infographic item by its ID.


## Project Structure

```
bun-express-sandbox/
├── _docs/                           # Internal documentation
│   └── express5/                    # Notes or guides on Express 5
├── src/
│   ├── configs/
│   │   └── env.config.ts            # Application config (e.g., port)
│   ├── controllers/
│   │   └── news.controller.ts       # Business logic for each endpoint
│   ├── models/
│   │   └── news.model.ts            # Type definitions for news items
│   ├── routes/
│   │   └── index.ts                 # Centralized API route definitions with /api/v1 prefix
│   ├── utils/
│   │   └── response.ts              # Reusable helper for formatting HTTP responses
│   └── index.ts                     # Entry point of the Express app
│
├── .dockerignore                    # Files and folders to ignore in Docker build
├── .gitignore                       # Files and folders to be ignored by Git
├── bun.lock                         # Bun lockfile for dependency resolution
├── Dockerfile                       # Container configuration for Bun runtime
├── package.json                     # Project metadata and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```


## Docker Usage

To build and run the project in a container:

```bash
docker build -t bun-express-sandbox .
docker run -d -p 8080:8080 bun-express-sandbox
```


## Setup Instructions

### 1. Install Bun (if not installed)

```bash
npm install -g bun
```

### 2. Initialize the Project and Install Dependencies

```bash
bun init -y

bun add express
bun add -d @types/express

bun add cors
bun add -d @types/cors
```


## Running the Development Server

### Standard Run

Start the server manually

```bash
bun run src/index.ts
```

### Watch Mode

Enable auto-reload on file changes

```bash
bun --watch run src/index.ts
```
