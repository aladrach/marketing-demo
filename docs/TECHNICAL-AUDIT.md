# Tracegate technical SEO audit

Audited October 4, 2026. Scope: Astro source, generated production HTML, sitemap files, and the local static-verification artifact. This is a fictional portfolio project, not a public cybersecurity service. No production crawl, Search Console index inspection, CrUX measurement, or live security-header test was available in this audit. Browser and Lighthouse results are recorded separately by the main verification workflow.

## Technical readiness

**Provisional score: 87/100.** This is a manual readiness rubric, not a search-engine score or measured performance score. Unknown hosting behavior prevents a production pass. Optional IndexNow support is not required for Google indexing.

| Category | Status | Score | Evidence and scope |
| --- | --- | ---: | --- |
| Crawlability | Pass locally | 100 | `robots.txt` allows crawling and names the sitemap index. The sitemap contains 33 content URLs and excludes the custom 404. All 33 content routes are reachable within two links from the homepage. |
| Indexability | Pass locally; launch prerequisite | 95 | Initial HTML has one canonical, unique titles/descriptions under the static verifier, and index directives. Only the 404 carries `noindex`. The reserved demonstration origin must be replaced at deployment. |
| Security | Unverified on production | 60 | No hosting security-header configuration exists in this host-agnostic static project. HTTPS, HSTS, CSP, and final response headers require deployment evidence. |
| URL structure | Pass locally | 100 | Descriptive product, solution, article, guide, and integration hierarchies; consistent trailing slashes. No content path exceeds 100 characters. Redirect behavior is hosting-dependent. |
| Mobile | Source pass; usability review advised | 80 | Every page has a viewport tag. Responsive breakpoints, focus indicators, native controls, and keyboard tab switching are implemented. Small labels inside the illustrative mobile product preview merit human review. |
| Core Web Vitals | Source favorable; field metrics unavailable | 80 | Static rendering, local fonts, explicit image dimensions, CSS animation, and visibility-aware timers reduce common risks. Browser tests and current Lighthouse evidence should determine lab findings. INP requires field evidence. |
| Structured data | Pass for source syntax and consistency | 95 | Initial HTML contains Organization, WebSite, page type, and BreadcrumbList. Journal pages add BlogPosting with dates and a disclosed fictional editorial organization. No fabricated ratings or certifications are marked up. External rich-result validation remains a deployment check. |
| JavaScript rendering | Pass | 100 | Main copy, page metadata, structured data, links, integration catalog, and article text exist in generated HTML. JavaScript enhances interactions rather than rendering the content shell. No hydrated framework components. |
| IndexNow | Optional enhancement | 70 | No key file or submission workflow exists. Add only after publishing to a controlled public origin if fast discovery by participating engines is useful. |

## Prioritized findings

### Critical

None found in the local source and generated URL architecture. This does not assert that a future deployment is secure or indexed.

### High: configure the public origin before publishing

`astro.config.mjs` deliberately defaults to `https://tracegate.example`. The current build uses that reserved demonstration origin for canonicals, sitemap URLs, schema IDs, and social assets. A published portfolio build must set `SITE_URL=https://<actual-origin>` before `npm run build` and then check the generated output. Decide whether the portfolio should be indexed; if staging should remain private, enforce that at the staging host. The local reserved domain is intentional, not a missing local implementation.

### Medium: validate hosting behavior

The static project cannot itself enforce TLS, headers, redirect responses, or a genuine 404 HTTP status. At the selected host:

- Redirect HTTP to HTTPS and alternate hostnames to the chosen origin in one hop.
- Serve unknown routes with the custom `404.html` and HTTP 404 rather than a homepage fallback.
- Set `X-Content-Type-Options: nosniff` and an appropriate `Referrer-Policy`.
- Configure `Content-Security-Policy`, including `frame-ancestors`, for the actual host. Account for the inline theme initializer and JSON-LD rather than blindly blocking inline content. A build-generated hash policy is a suitable option.
- Enable HSTS after HTTPS works reliably; include subdomains only when their behavior is known. Preloading is optional and should be deliberate.
- Give fingerprinted Astro assets long-lived immutable caching; use an update-friendly cache policy for HTML.

These are deployment recommendations, not observed missing headers on a public production origin.

### Medium: keep the JavaScript budget honest

At this audit's initial artifact snapshot, `artifacts/static-verification.json` reported 16,036 raw browser JavaScript bytes / 5,125 gzip bytes and a failure against the original 12,000-byte raw budget. That snapshot reflects the expanded interactive design. The main workflow owns the final budget decision and reruns; use the final artifact rather than treating this historical snapshot as a remaining failure. If interaction code continues to grow, separate page-specific enhancements from shared navigation and theme handling. A small gzip payload alone does not establish good INP.

### Low: improve illustrative mobile-label legibility

The mobile hero preview includes 4px node-kind labels and 6.5px node titles; graph microcopy also drops to 6–8px. These are synthetic UI details, and full explanatory text remains outside the miniature, but they are hard to read. Prefer hiding secondary decorative labels and retaining larger essential labels rather than shrinking the full interface. The header motion control's mobile dimensions are 27×30px: above the 24px WCAG 2.2 minimum target-size threshold, but increasing the touch area would improve comfort. Confirm neighboring target spacing in browser testing.

### Low: add IndexNow only if useful after deployment

Generate and host an ownership key, then submit canonical production URLs when content changes. Do not submit reserved example URLs or local previews. This is optional and does not replace XML sitemaps or Google Search Console. See the [IndexNow protocol documentation](https://www.indexnow.org/documentation).

## AIO and GEO implications

The site already provides static explanatory content, explicit fictional-project disclosure, descriptive internal links, primary references, and consistent entities. These make the material easier to parse and attribute. `llms.txt` is an optional content map, not a ranking or citation mechanism. Google states that its normal SEO requirements apply to AI features and no special AI markup or machine-readable AI file is required. See [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

All canonicals and index directives are delivered in the original HTML and are not changed by interaction scripts. This follows [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), which also recommends pre-rendered content for users and crawlers.

## Measurement limits

LCP under 2.5 seconds, INP under 200 milliseconds, and CLS under 0.1 are the good Core Web Vitals targets at the 75th percentile of real visits. Local Lighthouse can identify lab regressions, but cannot prove those field thresholds or search visibility. Performance screenshots, axe results, and lab artifacts belong to the final verification report. No Google indexing, AI citation, ranking, commercial connector, or production security claim is made here.
