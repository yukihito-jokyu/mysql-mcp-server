#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Command } from "commander";
import { connect } from "./lib/connect.js";
import { getTableData, getTableSchema, listTables } from "./lib/database.js";

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
      "MCP Server for retrieving database table lists and schema information."
  }
);

// List Tables Tool
server.registerTool(
  "list_tables",
  {
    title: "List Tables",
    description: "Get list of tables in the database",
    inputSchema: {},
    outputSchema: { tables: z.string() }
  },
  async () => {
    const tables = await listTables(connection);
    return {
      content: [{ type: "text", text: tables }],
      structuredContent: { tables }
    };
  }
);

// Get Table Schema Tool
server.registerTool(
  "get_table_schema",
  {
    title: "Get Table Schema",
    description: "Get schema information for a specific table",
    inputSchema: { tableName: z.string() },
    outputSchema: { schema: z.string() }
  },
  async ({ tableName }: { tableName: string }) => {
    const schema = await getTableSchema(connection, tableName);
    return {
      content: [{ type: "text", text: schema }],
      structuredContent: { schema }
    };
  }
);

// Get Table Data Tool
server.registerTool(
  "get_table_data",
  {
    title: "Get Table Data",
    description: "Get up to 5 rows of data from a specific table",
    inputSchema: { tableName: z.string() },
    outputSchema: { data: z.string() }
  },
  async ({ tableName }: { tableName: string }) => {
    const data = await getTableData(connection, tableName);
    return {
      content: [{ type: "text", text: data }],
      structuredContent: { data }
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