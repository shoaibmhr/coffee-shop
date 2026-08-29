import "dotenv/config";
import { createServer } from "node:http";

const port = process.env.PORT || 5000;

const server = createServer(async (req, res) => {
  // Allow your React frontend to call this API in development
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "GET" && req.url === "/api/health") {
    res.writeHead(200);
    return res.end(JSON.stringify({ message: "API is running" }));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
