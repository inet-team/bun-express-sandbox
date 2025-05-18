# Bun Express Sandbox

A high-performance API simulation environment built with Bun, Express, and TypeScript. Inspired by community implementations and guides, this project aims to accelerate front-end integration by providing a fast and lightweight mock API server.

**References & Inspirations**   
- [Build an Express App Using Bun and Deploy It To Render With Docker](https://medium.com/@andrewshearerdev/build-an-express-app-using-bun-and-deploy-it-to-render-with-docker-c19f6bdddc0a)  
- [Anjasfedo/bun-express GitHub Repository](https://github.com/Anjasfedo/bun-express)


## API Routes

### GET - Banners

**/api/v1/banners**
- Get all banners

**/api/v1/banners?visible_page=home**
  Filter banners that are shown on the specified frontend page

### GET - News

**/api/v1/news**
- Get all news items

**/api/v1/news?search=keyword**
- Filter news by keyword in title or content

**/api/v1/news?category=demo66c11b03**
- Filter news by category name 'สังคม'

**/api/v1/news?limit=10&page=2**
- Paginate results: 10 items per page, page 2

**/api/v1/news?sort=asc**
- Sort news by `created_at` ascending (oldest first)

**/api/v1/news?search=tech&category=demo66c11b01&limit=5&page=1&sort=desc**
- Combine filters, pagination, and sorting

**/api/v1/news/:id**
- Get a single news item by ID

### GET - Media

**/api/v1/media**
- Get all media

**/api/v1/media?category=demo66c12m01**
- Filter media by category name 'Short VDO'

**/api/v1/media/:id`**
-  Get a single media item by ID


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
