# Bun Express Sandbox

A high-performance API simulation environment built with Bun, Express, and TypeScript. Inspired by community implementations and guides, this project aims to accelerate front-end integration by providing a fast and lightweight mock API server.

**References & Inspirations**   
- [Build an Express App Using Bun and Deploy It To Render With Docker](https://medium.com/@andrewshearerdev/build-an-express-app-using-bun-and-deploy-it-to-render-with-docker-c19f6bdddc0a)  
- [Anjasfedo/bun-express GitHub Repository](https://github.com/Anjasfedo/bun-express)


## Project Structure

```
bun-express-sandbox/
├── src/
│   ├── configs/
│   │   └── env.config.ts          # Application config (e.g., port)
│   ├── controllers/
│   │   └── news.controller.ts     # Business logic for each endpoint
│   ├── models/
│   │   └── news.model.ts          # Type definitions for news items
│   ├── routes/
│   │   └── index.ts               # Centralized API route definitions with /api/v1 prefix
│   └── index.ts                   # Entry point of the Express app
│
├── .dockerignore                  # Files and folders to ignore in Docker build
├── .gitignore                     # Files and folders to be ignored by Git
├── bun.lock                       # Bun lockfile for dependency resolution
├── Dockerfile                     # Container configuration for Bun runtime
├── package.json                   # Project metadata and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
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
