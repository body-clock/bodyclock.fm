# bodyclock.fm

Personal website and blog for Patrick Perkins.

Built with [Astro](https://astro.build).

## Development

```bash
npm install
npm run dev
```

## Publishing

Push to `main` to publish automatically through Cloudflare Workers Builds.
The production Worker is `bodyclockfm`, which serves `https://bodyclock.fm`.
Its database, session storage, and sender address are configured in
`wrangler.jsonc`; `RESEND_API_KEY` stays in Cloudflare Secrets.

To publish the current checkout manually without another push:

```bash
npm run build
npx wrangler deploy
```

To rebuild the latest `main` commit in Cloudflare without a push:

```bash
cf builds create 22a7060e5c36456686f5a674dff7e44f --branch main
```

## Writing

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Post title"
date: 2026-06-14
tags: ['personal', 'tech']
description: "Optional description"
---

Your content here.
```

## Design system

Start with [DESIGN.md](DESIGN.md) for rules, component contracts, and token usage.
Visit `/design-system` during local development for live examples of typography,
colors, buttons, fields, tags, spacing, and prose in your system theme.

```bash
npm run design:check  # validate contracts and generated catalogs
npm run design:index  # regenerate catalogs after contract changes
npm run build
```
