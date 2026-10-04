# apps/web/Dockerfile
FROM node:20-alpine

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Copy workspace manifests first for caching
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the web app source
COPY apps/web ./apps/web

WORKDIR /app/apps/web

# Expose port
EXPOSE 3000

# Start Next.js dev server, binding to all interfaces
CMD ["pnpm", "dev", "--hostname", "0.0.0.0"]