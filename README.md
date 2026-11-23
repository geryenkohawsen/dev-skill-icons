# Dev Skill Icons

A community-maintained SVG icon library for developer portfolios and GitHub READMEs.

[Browse the icon gallery](https://dev-skill-icons.geryenkohawsen.workers.dev/)

## Example

<img src="./public/icons/sample.svg" width="48" height="48" alt="Code Brackets">
<img src="./public/icons/terminal.svg" width="48" height="48" alt="Terminal">
<img src="./public/icons/database.svg" width="48" height="48" alt="Database">
<img src="./public/icons/branch.svg" width="48" height="48" alt="Branch">

Paste this into your GitHub README to show a Terminal icon that links back to the gallery.

```markdown
[![Terminal](https://dev-skill-icons.geryenkohawsen.workers.dev/icons/terminal.svg)](https://dev-skill-icons.geryenkohawsen.workers.dev/)
```

## Use the gallery

1. Search by name or filter by category.
2. Compare the light and dark previews.
3. Choose **Download SVG**, **Copy URL**, **Copy HTML**, or **Copy Markdown**.

The HTML and Markdown link the icon back to the gallery.

## Contribute

Request an icon or report a problem through [GitHub Issues](https://github.com/geryenkohawsen/dev-skill-icons/issues). For SVG and logo sourcing conventions, see [AGENTS.md](AGENTS.md).

## Local development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Build and preview the production site with local Wrangler.

```sh
npm run lint
npm run build
npx wrangler dev
```

Open `/icons/sample.svg` on the URL printed by Wrangler to check the standalone SVG response.

## Hosting

Wrangler serves `dist/` as Workers Static Assets. Stable icon URLs use [Cloudflare’s default browser revalidation](https://developers.cloudflare.com/workers/static-assets/headers/) so clients can pick up revised SVGs.

[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) builds and deploys from `main` using `npm run build` and `npx wrangler deploy`.
