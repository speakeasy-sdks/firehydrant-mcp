# FireHydrant MCP Server

Model Context Protocol (MCP) Server for the *FireHydrant* API.

<div align="left">
    <a href="https://www.speakeasy.com/?utm_source=mcp-server&utm_campaign=mcp-typescript"><img src="https://custom-icon-badges.demolab.com/badge/-Built%20By%20Speakeasy-212015?style=for-the-badge&logoColor=FBE331&logo=speakeasy&labelColor=545454" /></a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" style="width: 100px; height: 28px;" />
    </a>
</div>

<!-- Start Summary [summary] -->
## Summary

FireHydrant MCP Server: An MCP server for interacting with FireHydrant's API.
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [FireHydrant MCP Server](#firehydrant-mcp-server)
  * [Installation](#installation)
* [Development](#development)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start Installation [installation] -->
## Installation

### Claude

Add the following server definition to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "FireHydrant": {
      "command": "npx",
      "args": [
        "-y", "--package", "firehydrant-mcp",
        "--",
        "mcp", "start",
        "--api-key", "..."
      ]
    }
  }
}
```

### Cursor

Create a `.cursor/mcp.json` file in your project root with the following content:

```json
{
  "mcpServers": {
    "FireHydrant": {
      "command": "npx",
      "args": [
        "-y", "--package", "firehydrant-mcp",
        "--",
        "mcp", "start",
        "--api-key", "..."
      ]
    }
  }
}
```

### Package Managers

The MCP Server can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

#### NPM

```bash
npm add firehydrant-mcp
```

#### PNPM

```bash
pnpm add firehydrant-mcp
```

#### Bun

```bash
bun add firehydrant-mcp
```

#### Yarn

```bash
yarn add firehydrant-mcp
```
<!-- End Installation [installation] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Contributions

While we value contributions to this MCP Server, the code is generated programmatically. Any manual changes added to internal files will be overwritten on the next generation. 
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release. 

### MCP Server Created by [Speakeasy](https://www.speakeasy.com/?utm_source=mcp-server&utm_campaign=mcp-typescript)
