# MySQL MCP Server

A Model Context Protocol (MCP) server for MySQL databases that provides **read-only** access to database schema information and sample data.

## Background

While existing MySQL MCP servers (such as [designcomputer/mysql_mcp_server](https://github.com/designcomputer/mysql_mcp_server)) allow LLMs to generate and execute arbitrary SQL queries—including INSERT, UPDATE, and DELETE operations—this approach poses risks when working on backend implementations.

**This MCP server takes a different, safer approach:**

- ✅ **Read-only operations**: Retrieves table lists, schema information, and sample data
- ❌ **No write operations**: Cannot modify, add, or delete data
- 🎯 **Backend development focused**: Provides exactly what's needed for backend implementation without the risk of data corruption

When developing backend applications, you typically only need to understand the database structure. This server provides:

1. **Table List**: Get all tables in the database
2. **Schema Information**: Retrieve detailed schema for specific tables
3. **Sample Data**: Fetch the first 5 rows from any table for validation

## Features

- 🔒 **Safe by design**: Read-only operations prevent accidental data modification
- 🚀 **Simple setup**: Easy configuration via CLI arguments
- 📊 **Three essential tools**:
  - `list_tables`: Get a list of all tables in the database
  - `get_table_schema`: Retrieve schema information for a specific table
  - `get_table_data`: Fetch up to 5 sample rows from a table

## Installation

```bash
npm install @yukihito/mysql-mcp-server
```

or

```bash
pnpm add @yukihito/mysql-mcp-server
```

## Usage

### As an MCP Server

Configure your MCP client (e.g., Claude Desktop, Cline) to use this server:

```json
{
  "mcpServers": {
    "mysql-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@yukihito/mysql-mcp-server@latest",
        "--host", "localhost",
        "--port", "3306",
        "--name", "your_username",
        "--password", "your_password",
        "--database", "your_database"
      ]
    }
  }
}
```

### CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--host` | MySQL host | `localhost` |
| `--port` | MySQL port | `8080` |
| `--name` | Database username | `admin` |
| `--password` | Database password | `root` |
| `--database` | Database name | `database` |

### Example Configuration for Claude Desktop

Edit your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mysql-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@yukihito/mysql-mcp-server@latest",
        "--host", "localhost",
        "--port", "3306",
        "--name", "myuser",
        "--password", "mypassword",
        "--database", "mydb"
      ]
    }
  }
}
```

## Available Tools

### 1. list_tables

Retrieves a list of all tables in the connected database.

**Input**: None

**Output**: JSON array of table names

**Example**:
```json
["users", "products", "orders", "categories"]
```

### 2. get_table_schema

Gets detailed schema information for a specific table.

**Input**:
- `tableName` (string): Name of the table

**Output**: JSON array containing column information (name, type, nullable, key, default, extra)

**Example**:
```json
[
  {
    "Field": "id",
    "Type": "int",
    "Null": "NO",
    "Key": "PRI",
    "Default": null,
    "Extra": "auto_increment"
  },
  {
    "Field": "name",
    "Type": "varchar(255)",
    "Null": "NO",
    "Key": "",
    "Default": null,
    "Extra": ""
  }
]
```

### 3. get_table_data

Retrieves up to 5 rows from a specific table for validation purposes.

**Input**:
- `tableName` (string): Name of the table

**Output**: JSON array of row objects (limited to 5 rows)

**Example**:
```json
[
  {"id": 1, "name": "John Doe", "email": "john@example.com"},
  {"id": 2, "name": "Jane Smith", "email": "jane@example.com"}
]
```

## Development

For development environment setup and contribution guidelines, see [DEVELOPMENT.md](./DEVELOPMENT.md).

## License

MIT

## Author

Yukihito

## Related Projects

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [designcomputer/mysql_mcp_server](https://github.com/designcomputer/mysql_mcp_server) - Alternative MySQL MCP server with full query execution capabilities
