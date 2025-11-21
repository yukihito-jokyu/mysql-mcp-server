# Development Guide

This document provides information about the development environment and contribution guidelines for the MySQL MCP Server project.

## Development Environment

This project uses VS Code DevContainers to provide a consistent development environment.

### Environment Overview

- **Base Image**: `node:24-slim`
- **Package Manager**: `pnpm`
- **Task Runner**: `task` (go-task)
- **Shell**: `zsh` (with Oh My Zsh, autosuggestions, and syntax-highlighting)

### Setup Instructions

1. **Prerequisites**:

   - Docker Desktop
   - Visual Studio Code
   - VS Code Extension: [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. **Getting Started**:

   - Open this project folder in VS Code
   - Click the green icon in the bottom-left corner, or open the Command Palette (`Cmd+Shift+P`) and select "Dev Containers: Reopen in Container"
   - The first startup may take a few minutes as the container is built

3. **Extension Installation (for Antigravity)**:
   - Install extensions using the following commands:
   - `chmod +x .devcontainer/scripts/install_extensions.sh`
   - `./.devcontainer/scripts/install_extensions.sh`

### Available Scripts

The main scripts defined in `package.json`:

- `pnpm build`: Compile TypeScript code
- `pnpm dev`: Watch for changes and automatically recompile
- `pnpm start`: Start the compiled server

### Task Runner (Taskfile)

This project uses `task` (go-task) as a task runner. You can execute tasks with the following commands:

- `task init`: Initialize the development environment (install VS Code extensions, etc.)
- `task dev`: Launch MCP Inspector to verify server operation
- `task run`: Start the MCP Server

### VS Code Extensions

The following extensions are automatically installed to improve development efficiency:

- **ESLint / Prettier**: Code quality checking and formatting
- **Git Graph**: Git history visualization
- **ErrorLens**: Inline error display
- **Pretty TypeScript Errors**: Display TypeScript errors in a readable format
- **Others**: Spell checking, indent visualization, etc.

## Project Structure

```
mysql-mcp-server/
├── src/
│   ├── index.ts           # Main server entry point
│   └── lib/
│       ├── connect.ts     # Database connection logic
│       └── database.ts    # Database operation functions
├── dist/                  # Compiled output
├── .devcontainer/         # DevContainer configuration
├── package.json
├── tsconfig.json
└── Taskfile.yml
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

To test the MCP server locally:

1. Build the project: `pnpm build`
2. Use the MCP Inspector: `task dev`
3. Test the three available tools:
   - `list_tables`
   - `get_table_schema`
   - `get_table_data`

## Publishing

This package is published to npm. To publish a new version:

1. Update the version in `package.json`
2. Build the project: `pnpm build`
3. Publish: `pnpm publish`

The `prepublishOnly` script will automatically run the build before publishing.

## License

MIT
