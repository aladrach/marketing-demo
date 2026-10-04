# CSS delivery — October 4, 2026

The initial build sent the same 129,355-byte minified stylesheet (23,791 bytes gzip) to every page. The catch-all route imported all page templates, so moving rules out of the global stylesheet alone would not isolate the templates' dependencies.

## Implementation

- Individual route families import their own templates. Shared metadata and breadcrumbs live in `ContentLayout.astro`; JSON resolution lives in `page-data.ts`.
- Components import their own global CSS files under `src/styles/components/`. Shared primitives remain in `global.css`; reused patterns have small shared files. Explicit selector specificity preserves component overrides when bundling order changes.
- Removed 247 obsolete selectors that referenced classes absent from the generated site, and exact duplicate rules. Interactive state selectors remain available.
- Standard prose and enhanced editorial prose have separate entry components, so simple pages do not import inline figures or editorial CTAs.
- Font declarations include the two Latin variable faces the English site uses. Matching font preloads discover them from HTML rather than waiting for an external stylesheet.
- Astro's native `build.inlineStylesheets: 'always'` includes each route's resulting CSS in its HTML. No CSS loader, hydration framework, or extra browser JavaScript was added.

Splitting with Astro's default `auto` delivery produced five external homepage stylesheets. The user's production report showed estimated render-blocking savings rise from 80 ms to 170 ms despite smaller CSS transfer. That intermediate delivery was not the final optimization. Inlining the smaller route bundles removes those stylesheet requests.

This is page-specific CSS inlining, not automatic above-the-fold critical CSS extraction. Below-the-fold styles remain in each route's HTML. It prioritizes first-visit rendering for this portfolio site over reusing a separately cached common stylesheet across navigation. HTML grows accordingly; budgets measure the complete compressed response, not just remaining external assets.

[Astro's stylesheet inlining configuration](https://docs.astro.build/en/reference/configuration-reference/#buildinlinestylesheets).

## Payload measurements

Sizes are bytes, using Node gzip to compare consistently. Hosting compression can differ.

| Route | Total minified CSS | CSS gzip equivalent | Complete HTML gzip | External stylesheets |
| --- | ---: | ---: | ---: | ---: |
| Initial build, every route | 129,355 | 23,791 | Not captured | 1 |
| Homepage, final | 81,627 | 15,567 | 30,467 | 0 |
| Platform | 40,472 | 8,565 | 17,456 | 0 |
| Pricing | 20,425 | 4,989 | 10,031 | 0 |
| Attack path article | 30,515 | 6,872 | 17,748 | 0 |
| Platform data sheet | 22,279 | 5,293 | 11,355 | 0 |

Compared with the initial shared stylesheet, total minified CSS falls 37% on the homepage, 76% on the article, and 84% on pricing. These comparisons include all inline CSS.

## Delivery comparison

Three cold mobile Lighthouse runs per variant on the same production preview, with Lighthouse's default throttling:

| Homepage variant | CSS requests | Median FCP | Median LCP | Performance scores |
| --- | ---: | ---: | ---: | --- |
| Split CSS, default auto delivery | 5 | 1.80 s | 1.80 s | 99 / 98 / 98 |
| Split CSS, inline delivery + font preloads | 0 | 0.90 s | 1.43 s | 100 / 100 / 100 |

This comparison tests the delivery change and font preloads together. It does not isolate their individual contributions. Local preview measurements do not establish production or field improvements. A separate four-route final Lighthouse pass scored 100 in all four tested categories. The homepage forced-reflow insight had no reported entries in the final comparison; the user's unattributed production reflow cannot be diagnosed from a screenshot alone. Remaining network dependency and platform image/main-thread diagnostics are recorded in the Lighthouse artifacts.

Lighthouse's unused-CSS diagnostic does not prove inline CSS is fully used. Actual payload reduction is measured above, and rendering is compared separately.

## Regression coverage and budgets

`verify.mjs` checks all 35 generated HTML files, including the custom 404, and enforces:

- Zero external stylesheet links.
- Total CSS: 90 KB maximum on the homepage, 50 KB on other pages.
- Complete gzip HTML: 35 KB maximum on the homepage, 22 KB on other pages.
- Browser JavaScript: existing 20 KB raw / 6 KB gzip limits; unchanged at 17,498 / 5,591 bytes.

`css-visual.mjs` captures 20 desktop/light and mobile/dark screenshots with computed styles. `css-regression.mjs` compares all 34 content routes at both widths against the saved original stylesheet, including descendants' geometry, typography, colors, and layout. Run it with `CSS_BASELINE=/path/to/original-global.css`; the original working baseline is ignored under `artifacts/css-baseline/`.

The interaction suite covers normal motion separately. It includes native accordion fallback and rapid toggling, hero stages, graph inspection/tour, tabs, navigation, carousel controls, filters, TOC, and the dummy resource gate.

Reproduce after starting the production preview:

```sh
npm run build
npm run verify
npm run test:e2e
npm run test:a11y
npm run test:nav
npm run test:resources
node scripts/css-visual.mjs
CSS_BASELINE=/path/to/original-global.css node scripts/css-regression.mjs
node scripts/css-performance.mjs
node scripts/lighthouse.mjs
```

Generated measurements and screenshots are ignored under `artifacts/`. Recheck the deployed Vercel build separately after publication.
