###
# This Dockerfile builds the Express wrapper for the MCP server, and then runs
# it. It uses bun's build system to compile the TypeScript code into a small,
# efficient executable.
##

# Use a multi-stage build to keep the final image small
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Copy package files for better layer caching
COPY package.json package-lock.json ./

# Copy source code
COPY . .

RUN <<EOF
# Clean install dependencies using npm
npm ci
# Bundle to a single executable using bun
npm exec bun build ./src/express-server.ts -- --compile --outfile=express-server
EOF

# Use a minimal base image for the final stage
# The executable does not require node/bun to run
FROM debian:bookworm-slim AS runner

# Create non-root user for security
RUN groupadd -r mcp && useradd -r -g mcp mcp
USER mcp

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/express-server ./express-server

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["./express-server"]
