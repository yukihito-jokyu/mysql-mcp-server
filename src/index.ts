import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Command } from "commander";
import { connect } from "./lib/connect.js";

// Parse CLI Args
const program = new Command()
  .option("--host <string>", "host name", "localhost")
  .option("--port <number>", "port number", "8080")
  .option("--name <string>", "database user name", "admin")
  .option("--password <string>", "database password", "root")
  .option("--database <string>", "database name", "database")
  .parse(process.argv);

// CLI Args Type
const cliOptions = program.opts<{
  host: string;
  port: string;
  name: string;
  password: string;
  database: string;
}>();

// Database Connect
const connection = await connect(cliOptions)
if (connection === undefined) {
  console.error("can't connect database");
  process.exit(1);
}

// MCP Server Instance
const server = new McpServer(
  {
    name: "mysql-mcp-server",
    version: "1.0.0",
  },
  {
    instructions:
      "データベース内のテーブル一覧、テーブルのスキーマ情報取得用の MCP Server"
  }
);

// Tool Register Example
server.registerTool(
  "add", // Tool Name
  {
    title: 'Addition Tool',
    description: 'Add two numbers',
    inputSchema: { a: z.number(), b: z.number() },
    outputSchema: { result: z.number() }
  },
  // Impl
  async ({ a, b }: { a: number; b: number }) => {
    const output = { result: a + b };
    return {
      content: [{ type: 'text', text: JSON.stringify(output) }],
      structuredContent: output
    };
  }
);

// main
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server is running on stdio...");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});