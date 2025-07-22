import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express, { NextFunction, Request, Response } from "express";
import { FireHydrantCore } from "../core.js";
import { createConsoleLogger } from "./console-logger.js";
import { createMCPServer } from "./server.js";

type Props = Record<string, string>;

declare global {
  namespace Express {
    interface Request {
      ctx: Props;
      mcpServer: McpServer;
    }
  }
}

const app = express();

// Middleware to extract Authorization header
app.use((req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers["authorization"];

  if (typeof authorizationHeader !== "string") {
    console.error("Authorization header is missing or not a string");
    const err = new Error("Authorization header is required");
    err.status = 401;
    throw err;
  } else if (authorizationHeader.length === 0) {
    console.error("Invalid Authorization header: empty string");
    const err = new Error("Authorization header cannot be empty");
    err.status = 401;
    throw err;
  }

  const mcpServer = createMCPServer({
    logger: createConsoleLogger("debug"),
    getSDK: () =>
      new FireHydrantCore({
        debugLogger: {
          log: (...args) => console.log(...args),
          group: (...args) => console.group(...args),
          groupEnd: (...args) => console.groupEnd(...args),
        },
        security: {
          api_key: (req.headers["authorization"] as string) || "",
        },
      }),
  });

  req.mcpServer = mcpServer;

  next();
});

const transportMap = new Map<string, SSEServerTransport>();

// Basic error handling
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.get("/sse", async (req: Request, res: Response) => {
  console.log("SSE connection established");
  res.setHeader("Content-Type", "text/event-stream");
  const transport = new SSEServerTransport("/message", res);
  transportMap.set(transport.sessionId, transport);
  await req.mcpServer.connect(transport);
});

app.post("/message", (req, res) => {
  console.log("Received message on /messages endpoint");
  const sessionId = req.query["sessionId"];

  if (!sessionId) {
    console.error("Message received without sessionId");
    res.status(400).json({ error: "sessionId is required" });
    return;
  }

  if (typeof sessionId !== "string") {
    console.error("sessionId must be a string");
    res.status(400).json({ error: "sessionId must be a string" });
    return;
  }

  const transport = transportMap.get(sessionId as string);

  if (!transport) {
    console.error(`No transport found for sessionId: ${sessionId}`);
    res.status(404).json({ error: "Transport not found" });
    return;
  }

  transport.handlePostMessage(req, res);
});

app.get("/", (_req: Request, res: Response) => {
  res.send(
    "This is the Firehydrant MCP server. Use the /sse endpoint for SSE connections.",
  );
});

const PORT = process.env["PORT"] || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
