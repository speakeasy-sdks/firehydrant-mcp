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
  FIREHYDRANT_MCP_LOG_LEVEL: z.enum(consoleLoggerLevels).default("info"),
});

const config = ServerConfigSchema.parse({
  FIREHYDRANT_MCP_HTTP_PORT: process.env["FIREHYDRANT_MCP_HTTP_PORT"],
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
  res.send(
    "This is the Firehydrant MCP server. Use the /mcp endpoint for MCP connections.",
  );
});

app
  .listen(config.FIREHYDRANT_MCP_HTTP_PORT, () => {})
  .on("error", (err) => {
    console.error(`Error starting server: "${err.message}"`);
  })
  .on("listening", () => {
    console.log(
      `Server is listening on port ${config.FIREHYDRANT_MCP_HTTP_PORT}`,
    );
  });
