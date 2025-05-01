# Bun Express Sandbox

A high-performance API simulation environment built with Bun, Express, and TypeScript. This project aims to accelerate front-end integration by providing a fast and lightweight mock API server.


## Prerequisites

Ensure you have Bun installed globally

```bash
npm install -g bun
```


## Project Initialization

Create a new project and install the required dependencies

```bash
bun init -y

bun add express
bun add -d @types/express
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
