import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  InitializeRequest,
  InitializeRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { randomUUID } from "crypto";
import express, { NextFunction, Request, Response } from "express";
import { FireHydrantCore } from "./core.js";
import { createConsoleLogger } from "./mcp-server/console-logger.js";
import { createMCPServer } from "./mcp-server/server.js";

type Props = Record<string, string>;

// Constants
const HEADERS = {
  AUTHORIZATION: "authorization",
  SESSION_ID: "mcp-session-id",
} as const;

const DEFAULT_PORT = 3000;
const LOG_LEVEL = "debug";

const ERROR_MESSAGES = {
  AUTH_REQUIRED: "Authorization header is required",
  AUTH_EMPTY: "Authorization header cannot be empty",
  SESSION_REQUIRED: "mcp-session-id header is required",
  TRANSPORT_NOT_FOUND: "Transport not found",
  INVALID_SESSION: "Invalid session ID or method",
  INTERNAL_ERROR: "Internal server error",
} as const;

class HTTPError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HTTPError";
  }
}

// Extended Express Request interface
declare global {
  namespace Express {
    interface Request {
      ctx: Props;
      mcpServer: McpServer;
    }
  }
}

// Transport storage
type TransportMap = Map<string, StreamableHTTPServerTransport>;

const httpTransportMap: TransportMap = new Map();

/**
 * Type guard to check if request body contains an initialize request
 */
function isInitializeReq(body: unknown): body is InitializeRequest {
  const isInitial = (data: unknown): boolean =>
    InitializeRequestSchema.safeParse(data).success;

  if (Array.isArray(body)) return body.some(isInitial);
  return isInitial(body);
}

/**
 * Validates authorization header and returns it if valid
 */
function validateAuthHeader(authHeader: unknown): string {
  if (typeof authHeader !== "string") {
    console.error("Authorization header is missing or not a string");
    throw new HTTPError(401, ERROR_MESSAGES.AUTH_REQUIRED);
  }

  if (authHeader.length === 0) {
    console.error("Invalid Authorization header: empty string");
    throw new HTTPError(401, ERROR_MESSAGES.AUTH_EMPTY);
  }

  return authHeader;
}

/**
 * Creates a new MCP server instance with the provided API key
 */
function createMCPServerInstance(apiKey: string): McpServer {
  return createMCPServer({
    logger: createConsoleLogger(LOG_LEVEL),
    getSDK: () =>
      new FireHydrantCore({
        security: {
          api_key: apiKey,
        },
      }),
  });
}

/**
 * Validates session ID header and returns it if valid
 */
function validateSessionId(sessionId: unknown): string {
  if (typeof sessionId !== "string") {
    throw new HTTPError(400, ERROR_MESSAGES.SESSION_REQUIRED);
  }
  return sessionId;
}

/**
 * Gets transport for session ID or throws error if not found
 */
function getTransportForSession(
  sessionId: string,
): StreamableHTTPServerTransport {
  const httpTransport = httpTransportMap.get(sessionId);
  if (!httpTransport) {
    console.error(`No transport found for sessionId: ${sessionId}`);
    throw new HTTPError(400, ERROR_MESSAGES.TRANSPORT_NOT_FOUND);
  }
  return httpTransport;
}

/**
 * Creates a new transport and connects it to the MCP server
 */
async function createAndConnectTransport(
  mcpServer: McpServer,
  req: Request,
  res: Response,
): Promise<void> {
  const httpTransport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
  });

  await mcpServer.connect(httpTransport);
  await httpTransport.handleRequest(req, res, req.body);

  const sessionId = httpTransport.sessionId;
  if (sessionId) {
    httpTransportMap.set(sessionId, httpTransport);
  }
}

/**
 * Handles existing session requests
 */
async function handleExistingSession(
  sessionId: string,
  req: Request,
  res: Response,
): Promise<void> {
  const httpTransport = getTransportForSession(sessionId);
  await httpTransport.handleRequest(req, res, req.body);
}

const app = express();
app.use(express.json());

// Middleware to validate authorization and create MCP server
app.use((req, _res, next) => {
  try {
    const authHeader = validateAuthHeader(req.headers[HEADERS.AUTHORIZATION]);
    req.mcpServer = createMCPServerInstance(authHeader);
    next();
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err: HTTPError, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server error:", err.message);
  const status = err.status || 500;
  const message = status === 500 ? ERROR_MESSAGES.INTERNAL_ERROR : err.message;
  res.status(status).json({ error: message });
});

app.get("/mcp", async (req, res, next) => {
  try {
    const sessionId = validateSessionId(req.headers[HEADERS.SESSION_ID]);
    const httpTransport = getTransportForSession(sessionId);
    await httpTransport.handleRequest(req, res, req.body);
    // ?TODO: this.streamMessages(httpTransport)
  } catch (error) {
    next(error);
  }
});

app.post("/mcp", async (req, res, next) => {
  try {
    const sessionId = req.headers[HEADERS.SESSION_ID] as string | undefined;

    // Handle initialization requests (no session ID required)
    if (!sessionId && isInitializeReq(req.body)) {
      await createAndConnectTransport(req.mcpServer, req, res);
      return;
    }

    // Handle existing session requests
    if (sessionId) {
      await handleExistingSession(sessionId, req, res);
      return;
    }

    // Invalid request - no session ID and not an initialize request
    throw new HTTPError(400, ERROR_MESSAGES.INVALID_SESSION);
  } catch (error) {
    next(error);
  }
});

app.get("/", (_req: Request, res: Response) => {
  res.send(
    "This is the Firehydrant MCP server. Use the /mcp endpoint for MCP connections.",
  );
});

const PORT = process.env["PORT"] || DEFAULT_PORT;

app
  .listen(PORT, () => {})
  .on("error", (err) => {
    console.error(`Error starting server: "${err.message}"`);
  })
  .on("listening", () => {
    console.log(`Server is listening on port ${PORT}`);
  });
