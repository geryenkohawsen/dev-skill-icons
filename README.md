# Dev Skill Icons

A community-maintained SVG icon library for developer portfolios and GitHub READMEs.

[Browse the icon gallery](https://dev-skill-icons.geryenkohawsen.workers.dev/)

## Example

<img src="./public/icons/react.svg" width="48" height="48" alt="React">
<img src="./public/icons/python.svg" width="48" height="48" alt="Python">
<img src="./public/icons/typescript.svg" width="48" height="48" alt="TypeScript">
<img src="./public/icons/docker.svg" width="48" height="48" alt="Docker">

Paste this into your GitHub README to show a React icon that links back to the gallery.

```markdown
[![React](https://dev-skill-icons.geryenkohawsen.workers.dev/icons/react.svg)](https://dev-skill-icons.geryenkohawsen.workers.dev/)
```

## Use the gallery

1. Search by name or filter by category.
2. Compare light and dark previews where both are available.
3. Choose **Download SVG**, **Copy URL**, **Copy HTML**, or **Copy Markdown**.

The HTML and Markdown link the icon back to the gallery. The default SVG is at `/icons/{slug}.svg`. Icons with a light variant also have a `/icons/{slug}-light.svg` URL.

## Attribution

The gallery SVGs come from [Skill Icons by tandpfun](https://github.com/tandpfun/skill-icons) and include its [MIT copyright and permission notice](public/skill-icons-license.txt). Third-party logos and trademarks belong to their respective owners. Check each brand’s terms for your intended use.

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

Open `/icons/react.svg` on the URL printed by Wrangler to check the standalone SVG response.

## Hosting

Wrangler serves `dist/` as Workers Static Assets. Stable icon URLs use [Cloudflare’s default browser revalidation](https://developers.cloudflare.com/workers/static-assets/headers/) so clients can pick up revised SVGs.

[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) builds and deploys from `main` using `npm run build` and `npx wrangler deploy`.
