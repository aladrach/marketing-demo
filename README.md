# Tracegate

A fictional cybersecurity SaaS company and complete Astro marketing experience created as a portfolio project. The positioning connects cloud posture, identity permissions, and attack paths. No customers, certifications, operational connectors, or performance results are invented.

## Run

```sh
npm install
npm run dev
```

The dev server uses http://localhost:4321. Astro 7 may detach its server; use `npx astro dev stop` to stop it.

```sh
npm run build
npm run verify
npm run preview -- --port 4322
npm run test:e2e
node scripts/lighthouse.mjs
```

Browser testing needs Playwright Chromium (`npx playwright install chromium`). Set `TEST_URL` to test another preview. Lighthouse uses the production preview on port 4322. Build output is the deployable `dist/` directory.

## Experience

33 content pages plus a custom 404: homepage, platform, product hub and three product pages, solution hub and three team pages, resource library, journal and three long-form articles, two downloadable field guides, a searchable integration catalog and eight dedicated integration pages, pricing, company, contact, trust, brand system, privacy, and terms.

The homepage has an original vector product hero that cycles through Map, Trace, and Review with inspectable nodes and pause controls, a context-building evidence simulator, an interactive security graph with three scenarios, inspectable nodes, a four-step guided tour, and a proposed-scope comparison, a keyboard-accessible Discover / Understand / Intervene workflow, a team switcher, asymmetric capability cards, original editorial diagrams, and native FAQs. Megamenus include featured reading and categorized links. Tables of contents appear only on articles and field guides. Light/dark themes, responsive layouts, and reduced-motion support are included.

All content is rendered to static HTML. One small TypeScript script enhances navigation, tabs, graph interaction, resource filtering, theme selection, and local form preview. There are no hydrated framework components, third-party trackers, or animation libraries. Content remains accessible without JavaScript; tab panels expand into readable sections.

## Content and brand

- [Brand strategy](docs/BRAND.md)
- [JSON CMS and implementation](docs/CONTENT.md)
- [SEO, AIO, and GEO strategy](docs/SEARCH.md)
- [Verification](docs/VERIFICATION.md)
- [Image generation prompts](docs/IMAGE-PROMPTS.md)

The `/brand/` page contains visual guidelines, brand voice, messaging pillars, an identity board, and downloadable vector assets and JSON tokens.

## Publishing

Set `SITE_URL` to the final HTTPS origin when building. This sets canonical URLs, structured-data IDs, social images, robots sitemap references, and XML sitemaps. The default `tracegate.example` is deliberately reserved for demonstration. Deploy `dist/` to any static host with a custom 404 rule. Run the verification scripts again with the deployment origin. The contact form is intentionally a local preview and requires an actual backend if converted into a real service. Prices and integrations are illustrative and labeled on their pages.
