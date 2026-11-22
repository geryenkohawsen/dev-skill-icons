# Dev Skill Icons

A community-maintained SVG icon library for developers. The initial foundation serves an original sample icon at `/icons/sample.svg`.

## Local development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

To check the production output and serve it on local Wrangler:

```sh
npm run lint
npm run build
npx wrangler dev
```

Open `/icons/sample.svg` on the URL printed by Wrangler to check the standalone SVG response.

## Hosting

Wrangler publishes `dist/` as Workers Static Assets. Keep Cloudflare's default browser revalidation for stable icon URLs so clients can pick up revised SVG files. See [Cloudflare's static asset headers](https://developers.cloudflare.com/workers/static-assets/headers/).

Once deployment is approved, connect the GitHub repository through Workers Builds. Use the Worker name in `wrangler.jsonc`, `main` as the production branch, `npm run build` as the build command, and `npx wrangler deploy` as the deploy command. See [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).
