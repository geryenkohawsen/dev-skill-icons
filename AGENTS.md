# Dev Skill Icons

- Use React, TypeScript, Vite 8, Tailwind CSS 4, and Oxlint. Prefer semantic HTML, native browser features, and existing dependencies.
- Keep hosting on Cloudflare Workers Static Assets and target $0/month. Build everything to `dist/`. Keep the project free of runtime Worker code, SSR, backends, databases, object storage, and dynamic image generation.
- Store self-contained SVGs in `public/icons/{slug}.svg` and serve them as individual images at `/icons/{slug}.svg`. Use lowercase kebab-case slugs and preserve published URLs. Keep SVGs free of scripts and external references.
- Record the source, license, attribution, and applicable trademark terms for third-party logos before adding them. The application code license covers application code.
- Generate icon landing pages as HTML during the production build, with unique titles and descriptions. Preserve real 404s and keep SVG URLs independent of page routes. Use root-relative paths for site assets and defer canonical URLs until the public domain is chosen.
- Check current Cloudflare documentation before changing routing, caching, or deployment settings. Use GitHub integration for automatic builds once deployment is approved.
- Before handing off changes, run `npm run lint` and `npm run build`. When asset paths change, verify them against the built output served by local Wrangler.
- Get the user's approval before deploying to Cloudflare or pushing to GitHub.
