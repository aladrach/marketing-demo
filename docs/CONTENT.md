# JSON content and architecture

Astro builds static routes from JSON. No CMS fetch runs in the browser.

| File | Responsibility |
| --- | --- |
| `src/data/pages.json` | Route descriptors, templates, unique SEO title/description, hero text |
| `products.json` | Three capabilities, detailed sections, FAQs, related routes |
| `solutions.json` | Three team workflows, detailed sections, FAQs, related routes |
| `articles.json` | Long-form articles, visible author/date, references, related routes |
| `guides.json` | Field guides and review-template content |
| `experience.json` | Workflow tabs, team switcher, feature summaries |
| `home.json` | Homepage metadata, summary, FAQs |
| `site.json` | Megamenu taxonomy and featured resources |
| `brand.json` | Positioning, tokens, voice, messaging, disclosure |
| `pricing.json` | Illustrative plan information |
| `integrations.json` | Catalog, integration features, data objects, workflows, and detail-page content |

To add a product, create a `products.json` entry and a `pages.json` descriptor with a matching final slug segment and `template: product`. The dynamic route resolves the entry at build time. Add navigation and related links deliberately. Article and guide routes use the same pattern; only their templates enable the sticky reading TOC. Update route verification lists if introducing an entirely new route family.

`Layout.astro` owns metadata and structured data. `DetailPage.astro` owns product/solution storytelling. `SignalLab.astro`, `AttackDemo.astro`, `Workflow.astro`, and `TeamSwitcher.astro` share a small enhancement script. The resource library combines articles and guides with client-side filters while exposing every card in server HTML.

Images live in `src/assets` and use Astro image processing for responsive WebP output and dimensions. Tabler icons become static SVG server markup through `src/data/icons.ts`. The brand mark is custom SVG. There are no client-side icon packages.

The contact form uses HTML validation and previews a synthetic request locally. It does not store or submit personal information. Forms omit field names so a no-JavaScript submission does not serialize field values. Downloads are actual Markdown templates.

## Accessibility and interaction

Native details/summary provides disclosure semantics. Tab groups implement roving tabindex, arrow keys, Home/End, selected state, and correctly linked panels. Graph node buttons expose selection through aria-pressed and results through a polite live region. No-JavaScript visitors see all workflow panels. Menus close with Escape and restore focus. A skip link, visible focus styles, semantic headings, labeled controls, and reduced motion are included.

## Interactive storytelling

The vector hero previews the product through Map, Trace, and Review stages. It cycles while visible, allows manual stage and node inspection, and supports both local playback and global motion controls. SignalLab lets visitors include or omit three evidence layers, updating the connected diagram and the conclusion without inventing risk scores. The graph offers a manual four-step tour and an animated broad-versus-specific scope proposal. Reset restores the original model. These interactions use synthetic data and never change permissions. Native CSS/SVG handles signal flow, staged entrances, vector path transitions, diagram emphasis, menu motion, and proposal transitions. The global pause control and reduced-motion preference remain available.

## Integration carousel

`IntegrationBlade.astro` renders two identical logo groups for a seamless CSS transform loop. The second group is excluded from the accessibility tree and contains no links. Hover, keyboard focus, the local pause button, and the global motion setting stop the carousel. Reduced-motion visitors get a manually scrollable static strip. Hover/focus transitions reveal each SVG path’s brand color. Geometry and source references are stored in `integration-logos.json`, generated from Simple Icons 12.4.0 by `scripts/generate-integration-logos.mjs`. The logo catalog is a static build asset; no icon library is shipped to the browser. [Simple Icons source and licensing](https://github.com/simple-icons/simple-icons).

Integration pages use the `integration` route template in `pages.json` and resolve the matching `integrations.json` entry at build time. Carousel links point to individual integration routes; the catalog also links every detail page and provides category/search filtering. Integration capabilities are explicitly fictional concepts.

The homepage carousel uses complete SVG logo/wordmark artwork from the [SVG Logos collection](https://github.com/gilbarbara/logos) and [Vector Logo Zone](https://www.vectorlogo.zone/), stored in `public/integration-logos/`. Each asset’s source URL is recorded as `lockupSource`. Dark variants preserve the vector geometry and brand colors while replacing dark neutral wordmark fills with off-white. Resting logos display in monochrome; hover and keyboard focus reveal the color variant. No live Brandfetch calls or API credentials are required.

## Demo-gated data sheet and editorial enrichment

`src/data/gated-resources.json` supplies the resource card, access-page copy, on-page data sheet, and generated one-page PDF. `GatedResource.astro` keeps a readable teaser and required-field form. Its submit handler validates locally, clears inputs, reveals the overview, moves focus to the result, and offers the PDF. Nothing is transmitted or persisted. Reset returns focus to the first field. Without JavaScript, a disclosed direct download remains available. This is a portfolio access-flow demonstration, not server-side access control; the PDF is a public asset.

`src/data/editorial-enhancements.json` places eight original inline vector figures and five relevant CTAs at specific section indexes across the three articles and two guides. Figures have accessible descriptions and explanatory captions. Only long-form reading pages retain the TOC. Native accordions are progressively enhanced with Web Animations API height/opacity transitions and rotating icons; keyboard, rapid-toggle, reduced-motion, global-pause, and no-JavaScript behavior are checked.

Regenerate the data-sheet PDF with `scripts/generate-data-sheet.py` using Python with reportlab, then render and inspect it. The PDF and website share the same JSON content.
