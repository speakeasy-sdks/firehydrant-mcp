import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express, { Request, Response } from "express";
import z from "zod/v4";
import { FireHydrantCore } from "./core.js";
import { SDKOptions } from "./lib/config.js";
import {
  consoleLoggerLevels,
  createConsoleLogger,
} from "./mcp-server/console-logger.js";
import { createMCPServer } from "./mcp-server/server.js";

const ServerConfigSchema = z.object({
  FIREHYDRANT_MCP_HTTP_PORT: z.coerce.number().default(3000),
  FIREHYDRANT_MPC_PROTOCOL: z.enum(["http", "https"]).default("http"),
  FIREHYDRANT_MCP_HOST: z.string().default("localhost"),
  FIREHYDRANT_MCP_LOG_LEVEL: z.enum(consoleLoggerLevels).default("info"),
});

const config = ServerConfigSchema.parse({
  FIREHYDRANT_MCP_HTTP_PORT: process.env["FIREHYDRANT_MCP_HTTP_PORT"],
  FIREHYDRANT_MCP_HOST: process.env["FIREHYDRANT_MCP_HOST"],
  FIREHYDRANT_MCP_LOG_LEVEL: process.env["FIREHYDRANT_MCP_LOG_LEVEL"],
});

// Extended Express Request interface
declare global {
  namespace Express {
    interface Request {
      mcpTransport: StreamableHTTPServerTransport;
    }
  }
}

const app = express();
app.use(express.json());

// Middleware to create an MCP server instance for the request
app.use(async (req, _res, next) => {
  const sdkOptions: SDKOptions = {};

  const authHeader = req.headers["authorization"];

  if (authHeader) {
    sdkOptions.security = { api_key: authHeader };
  }

  const mcpServer = createMCPServer({
    logger: createConsoleLogger(config.FIREHYDRANT_MCP_LOG_LEVEL),
    getSDK: () => new FireHydrantCore(sdkOptions),
  });

  req.mcpTransport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    onsessioninitialized(sessionId) {
      console.log(`New MCP session initialized: ${sessionId}`);
    },
    onsessionclosed(sessionId) {
      console.log(`MCP session closed: ${sessionId}`);
    },
  });

  await mcpServer.connect(req.mcpTransport);

  next();
});

app.get("/mcp", async (req, res) => {
  req.mcpTransport.handleRequest(req, res, req.query);
});

app.post("/mcp", async (req, res) => {
  await req.mcpTransport.handleRequest(req, res, req.body);
});

app.get("/", (_req: Request, res: Response) => {
  const claudeConfig = {
    FirehydrantRemote: {
      command: "npx",
      args: [
        "mcp-remote",
        "http://localhost:3000/mcp",
        "--header",
        "authorization:${FIREHYDRANT_API_KEY}",
      ],
      env: {
        FIREHYDRANT_API_KEY: "&lt;FIREHYDRANT_API_KEY&gt;",
      },
    },
  };

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Firehydrant MCP Server</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css"
        >
    </head>
    <body>
      <header>
        <h1>Firehydrant MCP Server</h1>
      </header>
      <main>
        <p>Interact with the Firehydrant MCP server using the Model Context Protocol (MCP).</p>
        <h2>Installation</h2>
        <h3>Claude</h3>
        <pre><code>${JSON.stringify(claudeConfig, null, 2)}</code></pre>
      </main>
    </body>
    </html>`;

  res.contentType("text/html");
  res.send(html);
});

app.get("/health", (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "healthy", timestamp: new Date().toISOString() });
});

const server = app
  .listen(config.FIREHYDRANT_MCP_HTTP_PORT, () => {})
  .on("error", (err) => {
    console.error(`Error starting server: "${err.message}"`);
  })
  .on("listening", () => {
    console.log(
      `Server is listening on port ${config.FIREHYDRANT_MCP_HTTP_PORT}`,
    );
  });

function onServerClose(err?: Error) {
  if (err) {
    console.error(`Error during server shutdown: "${err.message}"`);
    process.exit(1);
  }
  console.log("Server shut down gracefully.");
  process.exit(0);
}

process.on("SIGTERM", () => {
  console.log("Received SIGTERM, shutting down server...");
  server.close(onServerClose);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT, shutting down server...");
  server.close(onServerClose);
});
