# Build stage
FROM node:slim AS builder

WORKDIR /app

# Copy package files for better layer caching
COPY . .

# Install all dependencies (including dev dependencies for building)
RUN npm ci

# Build the application
RUN npm run build

# Production stage
FROM node:slim AS production

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/bin ./bin

# Create non-root user for security
RUN groupadd -r mcp && useradd -r -g mcp mcp
USER mcp

EXPOSE 2718

# CMD ["node", "bin/mcp-server.js", "start", "--transport", "sse", "--port", "2718"]
