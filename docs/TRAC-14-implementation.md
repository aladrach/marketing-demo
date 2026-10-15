# TRAC-14 implementation handoff

Reviewable implementation of “What would rule out this cloud attack path?” in the incumbent Astro site. Baseline: `e03beb062225df4921412801e45b632e2998d4e1`. Repository correspondence with the public portfolio does not establish authenticated live deployment provenance. This handoff authorizes neither merge nor deployment.

## Locked sources and scope

- Content attachment `01a13d80-baa9-76e2-864c-cb4e56f7d62a`; bounded approved copy fixture: `scripts/fixtures/attack-path-disconfirming-evidence.md`.
- Creative v1.0 ZIP `01a13d85-fa58-7b88-b576-31bec8dd6d4b`; exact desktop/mobile SVGs and desktop PNG in `public/illustrations/`. Asset hashes are locked in `scripts/fixtures/attack-path-asset-hashes.json`. No new artwork or derivatives.
- Web specification v1.1 attachment `01a13d8b-5f94-7363-b14e-ce3ed9741c59`.
- Approved attribution: **Tracegate Editorial**, explicitly identified as a fictional editorial identity; category: **Cloud security**. Synthetic examples remain disclosed.

## Comparison with the incumbent design

Read `PRODUCT.md`, `DESIGN.md`, and Impeccable’s documenter reference; inspected the implementation diff and saved desktop/light and mobile/dark page captures. This is an ordinary extension of the existing editorial system. Existing design documents and `.impeccable` metadata are preserved; no replacement design system is introduced.

The article retains Plex condensed headings, variable body text and mono code, neutral theme surfaces, restrained orange links and focus, the existing hero, byline note, reading navigation, 68ch prose, related links, shared CTA and footer. Existing prose and breakpoint rules remain authoritative. Typed paragraph, inline link/code/quote and table blocks extend `EditorialProse` through `EditorialBlocks`; legacy article rendering remains available. The table uses semantic column and row headers, semantic theme colors, and a focusable horizontal scrolling region instead of shrinking mobile evidence.

`ArticleFigure` is the scoped exception to themed surfaces: the approved artwork remains opaque white in both themes, with square edges and its intrinsic aspect ratio. The actual available figure container selects desktop at **800px or wider**; otherwise mobile is centered and capped at **360px**. The hidden alternate is removed from the accessibility tree, leaving one informative image. Live caption and disclaimer remain outside the image. No crop, color adaptation, decorative overlay or alternate composition is added. Desktop uses the supplied 1600×1000 SVG; mobile uses the supplied 720×1340 SVG; social metadata uses the supplied 1600×1000 PNG.

## Draft and metadata behavior

The article is a draft. UI displays “Draft · Publication date pending”; `BlogPosting` records `creativeWorkStatus: Draft` and omits publication/modification dates. Release requires explicit authorization and an actual publication date, followed by removing draft status, setting the date, and revalidating UI, schema, listings and estimate.

The current estimate is **5 minutes**, calculated from **997 visible whitespace-delimited words**, divided by 200 and rounded up. Count includes title, summary, category, attribution, draft metadata, headings, body, table and live figure text; excludes alt text, repeated TOC labels, the estimate itself and global chrome.

## Validation evidence and limits

`artifacts/article/verification.json` reports exact bounded copy, metadata, draft schema and asset hashes passing. `npm run test:article` checks links, canonical, sitemap, both listing cards, semantics, accessible image/header counts, keyboard table scrolling, no-JavaScript rendering and image failure. Its 14 viewport/theme cases span 320, 360, 390, 768, 1024 and 1440px plus landscape; recorded axe violations are zero. Container boundaries are checked at 360/799/800/801px. Figure ratios and white surfaces are checked, with no page overflow.

Saved captures include full pages and figures in both themes, image failure, 200% reflow and social crop inspection under `artifacts/article/`. Reflow checks cover a 720px CSS viewport representing 1440px at 200%, and 200% article/table/live-figure text. Native browser zoom and screen-reader speech remain manual checks. Simulated 1.91:1 social cropping clips some disclosures; actual social clients remain unverified. Preserve truthful metadata and the supplied asset; do not infer approval for new derivatives.

Completed local checks: `npm run build` (zero Astro diagnostics); `npm run verify` (39 HTML pages, zero errors); `npm run test:resources`; `npm run test:nav` (20 submenu destinations); `npm run test:design`; `npm run test:a11y` (64 cases, zero failures); `npm run test:e2e` (38 routes, zero violations or page errors); and `npm run test:article`. Browser JavaScript remains 18,331 raw bytes / 5,881 gzip bytes; no new browser script or dependency was added. The independent finish review returned **ship to reviewable PR**, with the manual limitations above. Pre-existing Impeccable font/side-border advisories and reported `PRODUCT.md` schema/design-sidecar context drift are outside this extension and remain unchanged.
