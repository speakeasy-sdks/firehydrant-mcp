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

class HTTPError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HTTPError";
  }
}

declare global {
  namespace Express {
    interface Request {
      ctx: Props;
      mcpServer: McpServer;
    }
  }
}

const httpTransportMap = new Map<string, StreamableHTTPServerTransport>();

function isInitializeReq(body: unknown): body is InitializeRequest {
  const isInitial = (data: unknown): boolean =>
    InitializeRequestSchema.safeParse(data).success;

  if (Array.isArray(body)) return body.some(isInitial);
  return isInitial(body);
}

const app = express();
app.use(express.json());

// Middleware to extract Authorization header
app.use((req, _res, next) => {
  const authorizationHeader = req.headers["authorization"];

  if (typeof authorizationHeader !== "string") {
    console.error("Authorization header is missing or not a string");
    const err = new HTTPError(401, "Authorization header is required");
    return next(err);
  } else if (authorizationHeader.length === 0) {
    console.error("Invalid Authorization header: empty string");
    const err = new HTTPError(401, "Authorization header cannot be empty");
    return next(err);
  }

  const mcpServer = createMCPServer({
    logger: createConsoleLogger("debug"),
    getSDK: () =>
      new FireHydrantCore({
        security: {
          api_key: (req.headers["authorization"] as string) || "",
        },
      }),
  });

  req.mcpServer = mcpServer;

  next();
});

// Error handling middleware
app.use((err: HTTPError, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server error:", err.message);
  const status = err.status || 500;
  const message = status === 500 ? "Internal server error" : err.message;
  res.status(status).json({ error: message });
});

app.get("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;

  if (!sessionId) {
    console.error("mcp-session-id header is required");
    res.status(400).json({ error: "mcp-session-id header is required" });
    return;
  }

  const transport = httpTransportMap.get(sessionId);
  if (!transport) {
    console.error(`No transport found for sessionId: ${sessionId}`);
    res.status(400).json({ error: "Transport not found" });
    return;
  }

  await transport.handleRequest(req, res, req.body);
  // ?TODO: this.streamMessages(transport)
});

app.post("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;

  if (!sessionId && isInitializeReq(req.body)) {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });

    await req.mcpServer.connect(transport);
    await transport.handleRequest(req, res, req.body);

    const sessionId = transport.sessionId;
    if (sessionId) {
      httpTransportMap.set(sessionId, transport);
    }
    return;
  }

  const transport = sessionId ? httpTransportMap.get(sessionId) : undefined;
  if (transport) {
    await transport.handleRequest(req, res, req.body);
    return;
  }

  res.status(400).json({ error: "Invalid session ID or method" });
});

app.get("/", (_req: Request, res: Response) => {
  res.send(
    "This is the Firehydrant MCP server. Use the /sse endpoint for SSE connections.",
  );
});

const PORT = process.env["PORT"] || 3000;

app
  .listen(PORT, () => {})
  .on("error", (err) => {
    console.error(`Error starting server: "${err.message}"`);
  })
  .on("listening", () => {
    console.log(`Server is listening on port ${PORT}`);
  });
