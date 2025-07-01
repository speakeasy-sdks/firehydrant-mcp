# FireHydrant MCP Server

Model Context Protocol (MCP) Server for the *FireHydrant* API.

<div align="left">
    <a href="https://www.speakeasy.com/?utm_source=mcp-server&utm_campaign=mcp-typescript"><img src="https://custom-icon-badges.demolab.com/badge/-Built%20By%20Speakeasy-212015?style=for-the-badge&logoColor=FBE331&logo=speakeasy&labelColor=545454" /></a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" style="width: 100px; height: 28px;" />
    </a>
</div>


<br /><br />
> [!IMPORTANT]
> This MCP Server is not yet ready for production use. To complete setup please follow the steps outlined in your [workspace](https://app.speakeasy.com/org/firehydrant/firehydrant). Delete this notice before publishing to a package manager.

<!-- Start Summary [summary] -->
## Summary

FireHydrant API: The FireHydrant API is based around REST. It uses Bearer token authentication and returns JSON responses. You can use the FireHydrant API to configure integrations, define incidents, and set up webhooks--anything you can do on the FireHydrant UI.

* [Dig into our API endpoints](https://developers.firehydrant.io/docs/api)
* [View your bot users](https://app.firehydrant.io/organizations/bots)

## Base API endpoint

[https://api.firehydrant.io/v1](https://api.firehydrant.io/v1)

## Current version

v1

## Authentication

All requests to the FireHydrant API require an `Authorization` header with the value set to `Bearer {token}`. FireHydrant supports bot tokens to act on behalf of a computer instead of a user's account. This prevents integrations from breaking when people leave your organization or their token is revoked. See the Bot tokens section (below) for more information on this.

An example of a header to authenticate against FireHydrant would look like:

```
Authorization: Bearer fhb-thisismytoken
```

## Bot tokens

To access the FireHydrant API, you must authenticate with a bot token. (You must have owner permissions on your organization to see bot tokens.) Bot users allow you to interact with the FireHydrant API by using token-based authentication. To create bot tokens, log in to your organization and refer to the **Bot users** [page](https://app.firehydrant.io/organizations/bots).

Bot tokens enable you to create a bot that has no ties to any user. Normally, all actions associated with an API token are associated with the user who created it. Bot tokens attribute all actions to the bot user itself. This way, all data associated with the token actions can be performed against the FireHydrant API without a user.

Every request to the API is authenticated unless specified otherwise.

### Rate Limiting

Currently, requests made with bot tokens are rate limited on a per-account level. If your account has multiple bot token then the rate limit is shared across all of them. As of February 7th, 2023, the rate limit is at least 50 requests per account every 10 seconds, or 300 requests per minute.

Rate limited responses will be served with a `429` status code and a JSON body of:

```json
{"error": "rate limit exceeded"}
```
and headers of:
```
"RateLimit-Limit" -> the maximum number of requests in the rate limit pool
"Retry-After" -> the number of seconds to wait before trying again
```

## How lists are returned

API lists are returned as arrays. A paginated entity in FireHydrant will return two top-level keys in the response object: a data key and a pagination key.

### Paginated requests

The `data` key is returned as an array. Each item in the array includes all of the entity data specified in the API endpoint. (The per-page default for the array is 20 items.)

Pagination is the second key (`pagination`) returned in the overall response body. It includes medtadata around the current page, total count of items, and options to go to the next and previous page. All of the specifications returned in the pagination object are available as URL parameters. So if you want to specify, for example, going to the second page of a response, you can send a request to the same endpoint but pass the URL parameter **page=2**.

For example, you might request **https://api.firehydrant.io/v1/environments/** to retrieve environments data. The JSON returned contains the above-mentioned data section and pagination section. The data section includes various details about an incident, such as the environment name, description, and when it was created.

```
{
  "data": [
    {
      "id": "f8125cf4-b3a7-4f88-b5ab-57a60b9ed89b",
      "name": "Production - GCP",
      "description": "",
      "created_at": "2021-02-17T20:02:10.679Z"
    },
    {
      "id": "a69f1f58-af77-4708-802d-7e73c0bf261c",
      "name": "Staging",
      "description": "",
      "created_at": "2021-04-16T13:41:59.418Z"
    }
  ],
  "pagination": {
    "count": 2,
    "page": 1,
    "items": 2,
    "pages": 1,
    "last": 1,
    "prev": null,
    "next": null
  }
}
```

To request the second page, you'd request the same endpoint with the additional query parameter of `page` in the URL:

```
GET https://api.firehydrant.io/v1/environments?page=2
```

If you need to modify the number of records coming back from FireHydrant, you can use the `per_page` parameter (max is 200):

```
GET https://api.firehydrant.io/v1/environments?per_page=50
```
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [FireHydrant MCP Server](#firehydrant-mcp-server)
  * [Base API endpoint](#base-api-endpoint)
  * [Current version](#current-version)
  * [Authentication](#authentication)
  * [Bot tokens](#bot-tokens)
  * [How lists are returned](#how-lists-are-returned)
  * [Installation](#installation)
* [Development](#development)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start Installation [installation] -->
## Installation

> [!TIP]
> To finish publishing your MCP Server to npm and others you must [run your first generation action](https://www.speakeasy.com/docs/github-setup#step-by-step-guide).

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

### Standalone Binary

Run the MCP server as a standalone binary with no additional dependencies. Pull these binaries from available Github releases:

```bash
curl -L -o mcp-server \
    https://github.com/{org}/{repo}/releases/download/{tag}/mcp-server-bun-darwin-arm64 && \
chmod +x mcp-server
```

If the repo is a private repo you must add your Github PAT to download a release `-H "Authorization: Bearer {GITHUB_PAT}"`.

```json
{
  "mcpServers": {
    "Todos": {
      "command": "./DOWNLOAD/PATH/mcp-server",
      "args": [
        "start"
      ]
    }
  }
}
```

For a full list of server arguments, run:

```bash
npx -y --package firehydrant-mcp -- mcp start --help
```

### Package Managers

The MCP Server can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

#### NPM

```bash
npm add <UNSET>
```

#### PNPM

```bash
pnpm add <UNSET>
```

#### Bun

```bash
bun add <UNSET>
```

#### Yarn

```bash
yarn add <UNSET>
```
<!-- End Installation [installation] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Contributions

While we value contributions to this MCP Server, the code is generated programmatically. Any manual changes added to internal files will be overwritten on the next generation. 
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release. 

### MCP Server Created by [Speakeasy](https://www.speakeasy.com/?utm_source=mcp-server&utm_campaign=mcp-typescript)
