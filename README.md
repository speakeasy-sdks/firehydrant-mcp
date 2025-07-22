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

<details>
<summary>Claude</summary>

Add the following server definition to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "FireHydrant": {
      "type": "sse",
      "url": "https://example-cloudflare-worker.com/sse",
      "headers": {
        "Authorization": "${FIREHYDRANT-MCP_API_KEY}"
      }
    }
  }
}
```

> [!NOTE]
> To use Cloudflare deployment, set the `cloudflareURL` in your gen.yaml configuration to your Worker URL (e.g., https://my-mcp-server.my-account.workers.dev).

</details>

<details>
<summary>Cursor</summary>

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=FireHydrant&config=eyJtY3BTZXJ2ZXJzIjp7IkZpcmVIeWRyYW50Ijp7InR5cGUiOiJzc2UiLCJ1cmwiOiJodHRwczovL2V4YW1wbGUtY2xvdWRmbGFyZS13b3JrZXIuY29tL3NzZSIsImhlYWRlcnMiOnsiQXV0aG9yaXphdGlvbiI6IiR7RklSRUhZRFJBTlQtTUNQX0FQSV9LRVl9In19fX0=)

Or manually:

1. Open Cursor Settings
2. Select Tools and Integrations
3. Select New MCP Server
4. Paste the following JSON into the MCP Server Configuration field:

```json
{
  "mcpServers": {
    "FireHydrant": {
      "type": "sse",
      "url": "https://example-cloudflare-worker.com/sse",
      "headers": {
        "Authorization": "${FIREHYDRANT-MCP_API_KEY}"
      }
    }
  }
}
```

</details>

<details>
<summary>Claude Code CLI</summary>

```bash
claude mcp add --transport sse FireHydrant undefined/sse --header "Authorization: ..."
```

</details>

<details>
<summary>Manual installation</summary>




To start the MCP server, run:

```bash
npx -y --package firehydrant-mcp -- mcp start --api-key ...
```

For a full list of server arguments, run:

```bash
npx -y --package firehydrant-mcp -- mcp start --help
```

</details>
<!-- End Installation [installation] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Contributions

While we value contributions to this MCP Server, the code is generated programmatically. Any manual changes added to internal files will be overwritten on the next generation. 
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release. 

### MCP Server Created by [Speakeasy](https://www.speakeasy.com/?utm_source=mcp-server&utm_campaign=mcp-typescript)
