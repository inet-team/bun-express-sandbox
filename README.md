# Bun Express Sandbox

A high-performance API simulation environment built with Bun, Express, and TypeScript. This project aims to accelerate front-end integration by providing a fast and lightweight mock API server.


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
│   │   └── news.route.ts          # API route definitions
│   └── index.ts                   # Entry point of the Express app
├── .gitignore                     # Files and folders to be ignored by Git
├── bun.lock                       # Bun lockfile for dependency resolution
├── package.json                   # Project metadata and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
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
