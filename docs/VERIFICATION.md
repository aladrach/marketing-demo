# Verification — October 4, 2026

Testing was authorized by the user after design review. Production build served at localhost:4322; deployed site inspected at https://marketing-demo-topaz.vercel.app.

| Check | Result |
| --- | --- |
| Astro check and static build | 73 files checked; zero errors, warnings, or hints; 35 HTML pages |
| Static verification | 35 pages; unique metadata, one main H1, JSON-LD syntax, internal links/anchors, orphan detection, image attributes and local image files, required endpoints: pass |
| Browser suite | 34 routes; zero automated WCAG A/AA violations after settling scroll reveals; desktop/mobile overflow pass; no runtime errors |
| Interaction coverage | Megamenu/Escape, graph scenarios and inspection, guided tour/reset, scope review, workflow/team keyboard tabs, vector hero, context toggles, carousel and global motion pause, active TOC, search/filter, local form validation/no POST, mobile navigation: pass |
| Accessibility matrix | 56 checks: all 34 routes in dark desktop; 11 representative routes in light/dark mobile; zero violations or overflow. Reduced motion makes contrast readings stable. |
| Navigation regression | 20 distinct submenu destinations; pointer blur with null focus destination, keyboard leaving header, Escape focus return, and custom 404: pass |
| Resource enhancements | Demo form/no transmission/reset focus/PDF, eight inline figures, five CTAs, animated accordion/keyboard/rapid toggle/fallback: pass |
| No JavaScript / reduced motion | Resource cards readable, homepage visible without overflow; reduced motion disables hero entrance animation: pass |
| Public crawl | 33 pages; all 200, one main H1 and correct canonical origin; maximum link depth two; robots accessible |

The navigation regression also passed against the live Vercel origin. The public crawl describes 33 published routes before the new data-sheet page was deployed. Local verification includes the new resource, editorial figures/CTAs, and animated accordions.

## Mobile Lighthouse laboratory results

| Route | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| Homepage | 100 | 100 | 100 | 100 | 1.4 s | 0 ms | 0 |
| Platform | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 |
| Attack path article | 100 | 100 | 100 | 100 | 1.4 s | 0 ms | 0 |
| Platform data sheet | 100 | 100 | 100 | 100 | 1.3 s | 0 ms | 0 |

Lab results are local, single-run measurements and vary with machine conditions. They do not establish public field Core Web Vitals or INP. Automated accessibility checks do not certify complete WCAG conformance.

## Corrections made

- Mobile navigation now starts in its enhanced collapsed state before first paint, retaining readable native navigation when JavaScript is absent. Initial lab CLS of 0.299–0.305 fell to 0–0.038.
- Contrast checks scroll through sections and wait for entrance animations to settle. Initial reports measured near-transparent animation frames; final stable contrast checks pass. Motion remains covered separately.
- The mobile pricing comparison scroll area has a tabindex, region role, and accessible name.
- Header focus handling closes dropdowns only when focus moves to a known element outside the header. A null focus destination no longer cancels pointer activation. Regression reproduced against the prior build, then passed against the fix.
- Clearer platform engineering/attack path titles and homepage entry in llms.txt.
- Default production origin set to the actual Vercel URL; SITE_URL can override it.

## CSS delivery

Page-specific styles now ship inline, with matching font preloads and zero external stylesheet requests across 35 generated pages. The intermediate default delivery produced five blocking homepage CSS requests; the final three-run local comparison reduced median homepage LCP from 1.80 s to 1.43 s. Complete homepage HTML is 30,467 bytes gzip. HTML/CSS budgets include inline payload, and shared browser JavaScript remains unchanged. Details and caching tradeoffs are in [CSS performance](CSS-PERFORMANCE.md).

## JavaScript budget

Final shared browser script: **17,498 bytes raw / 5,591 bytes gzip**, excluding the small inline preference initializer. The original self-imposed 12 KB raw threshold predates the added interactive product demo. The verifier now enforces **20 KB raw and 6 KB gzip** limits. This is a documented budget adjustment, not an optimization claim. No frontend framework hydration or animation dependency ships to visitors. Hosting compression must be enabled to realize the gzip transfer size.

## Reproduce

```sh
npm run build
npm run verify
npm run preview -- --port 4322
npm run test:e2e
npm run test:a11y
npm run test:nav
npm run test:resources
node scripts/lighthouse.mjs
AUDIT_URL=https://marketing-demo-topaz.vercel.app node scripts/crawl.mjs
```

Generated JSON, Lighthouse HTML, and screenshots are in ignored `artifacts/`. Durable findings are in the full audit and action plan. Deployed-site checks describe the currently published build; local fixes are not deployed by these verification scripts.
