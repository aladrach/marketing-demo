# Tracegate SEO, AIO/GEO, performance, and UX audit

**October 4, 2026.** Fictional cybersecurity SaaS portfolio. Scope: all 34 generated HTML pages, all 33 publicly linked content routes, browser interaction tests, mobile/dark accessibility, three mobile Lighthouse samples, and a public crawl of https://marketing-demo-topaz.vercel.app.

## Outcome

The site has a strong static-content foundation and the local corrections pass verification. All 33 deployed content routes return 200 and are reachable within two links from the homepage. The build has unique metadata, valid local JSON-LD, readable initial HTML, working internal links, and no orphan pages. No numerical overall SEO score is assigned: lab scores and checklist results are measurable, but search authority, field metrics, indexed coverage, and AI citations are unavailable. The specialist's provisional technical score is a manual rubric from an earlier source snapshot, not a search-engine score.

The user reported deployed submenu links closing without navigation. A regression reproduced the focus race in the previous build. The fixed local build passes all 20 submenu destinations and the pointer-blur regression. Deploy the latest source to apply the fix publicly.

## Verified checks

| Area | Evidence | Result |
| --- | --- | --- |
| Crawl and architecture | Public linked-page crawl, source and generated links | 33 content pages; depth two; zero HTTP/canonical/H1 failures; no orphans |
| On-page metadata | Static verifier | 34 unique titles/descriptions, one main H1 per page, canonicals/social metadata |
| Sitemap and robots | Generated endpoints and public responses | 33 content sitemap URLs; custom 404 excluded; generic crawl allowed |
| Structured data | 34 JSON-LD blocks | Syntax and entity consistency pass; appropriate page types/BreadcrumbList; three BlogPosting nodes; no fabricated reviews/ratings |
| Accessibility | Normal-motion settled e2e plus reduced-motion matrix | 33 route audits and 53 theme/viewport checks pass; automated WCAG A/AA coverage |
| Interaction UX | Browser suite and focused navigation regression | Hero/graph/tabs/TOC/filter/carousel/form/mobile menu pass; 20 submenu destinations verified |
| Content access | Initial HTML and no-JS browser checks | Essential text, links, resources, metadata and schema remain available |
| Images | Build optimization, static dimensions/alt/local-file checks | Explicit dimensions and local assets; original vector diagrams and locally served SVG wordmarks |

## Performance

| Mobile lab route | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| `/` | 99 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 |
| `/platform/` | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 |
| `/blog/attack-path-analysis/` | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0.038 |

The significant observed CLS issue was late mobile-nav collapse; corrected with the inline enhancement state. Residual diagnostics include unused global CSS, render-blocking CSS/font chains, and possible image-delivery savings on the platform illustration. These are opportunities, not failures of the measured healthy LCP/CLS results. TBT is a lab metric, not measured INP. The current shared enhancement script is 16,027 raw / 5,114 gzip bytes; the original raw budget was transparently revised to 20 KB raw / 6 KB gzip to accommodate the requested interactions. See [verification](docs/VERIFICATION.md) for measurement scope and sequencing.

## Search intent and content

The architecture separates commercial discovery (platform, three capabilities, team solutions, pricing, integrations) from education (attack paths, machine identities/least privilege, CSPM comparison). Articles link to capabilities, team workflows and usable downloadable review records. Native FAQs answer evaluation questions. Search/filter results do not replace indexable static content.

Three article bodies contain approximately 1,518–1,527 words; product bodies 566–583; team solutions 499–525. These are measured body counts, not quality scores or required ranking thresholds. Definitions open with direct answers and preserve the distinction between possible access and observed compromise. Sentences average roughly 12–16 words, though technical vocabulary raises approximate reading grade. Future improvements should add useful examples and contextual source references rather than word-count padding.

Integration pages are explicitly concepts. Their limited unique deployment depth is appropriate to a fictitious service; inventing API permissions or operational coverage would reduce credibility. The footer, trust page, editorial notes, pricing, form and synthetic demos consistently disclose portfolio boundaries. There are no real customer outcomes, expert credentials, or certifications to validate.

## AI discovery and schema

Static HTML, clear definitions, evidence/uncertainty language, primary references and descriptive internal links help readers and tools interpret the content. The optional llms.txt now includes the homepage and core content map. It does not grant special eligibility or promise citations. Google states that normal SEO applies to AI features and no special AI file or schema is required. [Google AI guidance](https://developers.google.com/search/docs/appearance/ai-features).

The generic robots group allows crawlers locally and the public robots endpoint responds successfully. OpenAI search crawling uses OAI-SearchBot; GPTBot concerns training and is independently controlled. CDN policies and actual indexing/citations still require separate evidence. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).

Local schema validation covers syntax, dates, absolute IDs, page identity and publisher/author boundaries. It does not guarantee Google rich results. Optional improvements: article-specific social/schema images, breadcrumb labels matching displayed names, and schema citation links to the existing references. Avoid fabricated Person credentials, review ratings, vendor endorsements or FAQ rich-result promises.

## Public hosting snapshot

The deployed homepage, platform, article, integration, robots and sitemap respond successfully. Canonicals already use the Vercel origin; no placeholder-origin problem was observed publicly. An unknown route returns the custom 404 with HTTP 404 and noindex. HSTS is present; HTML cache control is `public, max-age=0, must-revalidate`. CSP and X-Content-Type-Options were not present in the sampled responses. A host-specific header policy is optional follow-up engineering; absence alone does not demonstrate an exploit or ranking penalty. The new local default matches the known public origin while preserving SITE_URL override.

Search Console, CrUX, analytics, ranking positions, backlink authority, and measured AI citations were not available. No claim of indexation, field CWV, or external authority is made. Local SaaS business listings and ecommerce audits are not applicable.

## Findings resolved during this audit

1. Mobile first-paint navigation collapse caused large layout shifts.
2. Null-destination focus transitions could cancel submenu pointer activation.
3. Mobile pricing table's horizontal scroll region lacked keyboard focus.
4. Two metadata/headline labels benefited from more descriptive topic wording.
5. Optional llms.txt omitted the homepage.
6. Browser contrast checks needed to measure settled reveal states, with motion tested separately.

## Evidence and next steps

- [Prioritized action plan](ACTION-PLAN.md)
- [Test results and reproduction commands](docs/VERIFICATION.md)
- [Technical specialist review](docs/TECHNICAL-AUDIT.md)
- [Content specialist review](docs/CONTENT-AUDIT.md)
- [Schema/GEO specialist review](docs/SCHEMA-GEO-AUDIT.md)

Machine-readable reports and desktop/mobile screenshots are saved under `artifacts/` (git-ignored). This audit's local fixes need deployment before the public build reflects them.
