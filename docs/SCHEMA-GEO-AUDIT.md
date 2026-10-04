# Structured data and AI discovery audit

Audited October 4, 2026. Scope: Astro source and 34 locally built HTML documents, including 404; generated robots.txt and llms.txt; all three editorial articles. Read-only source review. No public deployment, Search Console property, verified crawling, live rich-result test, ranking data, AI citation data, or external reputation evidence is available.

## Result

The site has sound local structured-data and text-discovery foundations. All 34 JSON-LD blocks parse. No deprecated types, manufactured reviews, fabricated credentials, or unsupported FAQ rich-result claims were found. Public discovery is **not yet validated**: the configured origin is the reserved `https://tracegate.example`, so the production domain must be supplied before publication.

## Detection and validation

Each document has one server-rendered `https://schema.org` JSON-LD graph. Microdata (`itemscope`/`itemprop`) and RDFa type/vocabulary attributes were not detected. Nested author Organization objects are additional to the top-level counts below.

| Top-level type | Count | Local validation | Notes |
| --- | ---: | --- | --- |
| Organization | 34 | Pass | Name, URL, logo, stable ID and description; description explicitly calls the platform fictional. |
| WebSite | 34 | Pass | Name, URL, description, stable ID and publisher reference. |
| WebPage | 30 | Pass | URL, name, description, stable ID and website reference. Includes 404. |
| AboutPage | 1 | Pass | Appropriate WebPage subtype. |
| ContactPage | 1 | Pass | Appropriate WebPage subtype; no nonexistent contact address/phone added. |
| CollectionPage | 2 | Pass | Resource and blog collections. |
| BreadcrumbList | 33 | Pass | At least two ListItems; names, sequential integer positions and absolute item URLs. Homepage appropriately omits breadcrumbs. |
| BlogPosting | 3 | Pass, improvements below | Headline, description, author Organization with URL, publisher reference, dates, mainEntityOfPage and image. |

URLs are absolute HTTPS URLs. All article dates are ISO 8601 `2026-10-04`, matching visible publication dates. Dates without a time are valid; no timezone was fabricated. JSON-LD author names match the visible Tracegate Editorial byline and the visible fictional-author note. The publisher's Organization description and site footer disclose portfolio status. No `Product`, `Offer`, `Review`, `AggregateRating`, `FAQPage`, `HowTo`, or retired specialized type was detected.

Google documents Article properties as recommended, with no mandatory property set in its current guidance. Breadcrumbs and articles have relevant supported search features, while a WebPage graph alone does not confer a dedicated rich result. JSON parsing and local checklist validation do not substitute for Google's live Rich Results Test, crawl accessibility, or indexing requirements. [Article guidance](https://developers.google.com/search/docs/appearance/structured-data/article), [breadcrumb guidance](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).

## Prioritized findings

| Priority | Finding | Recommended action |
| --- | --- | --- |
| Deployment requirement | All graph entity IDs, page URLs and image URLs use reserved `tracegate.example`. | Build with the actual `SITE_URL`; inspect canonical, sitemap, robots and JSON-LD origins on the deployed host. This is deliberate demo configuration, not proof of an indexed website. |
| Medium improvement | All three BlogPosting objects reference the same general campaign social-card image. It identifies the brand but is not specifically illustrative of each article. | Use crawlable topic-specific editorial artwork that represents the article. Multiple supported aspect ratios are recommended by Google when available. Do not invent an image merely to fill markup. |
| Low improvement | Breadcrumb names are derived from raw slugs, while visible final breadcrumbs sometimes use article titles or integration labels. | Derive schema names from the same label map as visible breadcrumbs for clearer entity naming. Current names remain valid. |
| Low improvement | llms.txt's core-page list omits the homepage because the data collection contains secondary routes. | Add an explicit homepage entry for completeness. The omission is not an AI-search eligibility failure. |
| Optional enrichment | Primary references appear visibly, but the BlogPosting objects do not carry citation links. | Add the existing source URLs as the schema.org `citation` property if useful. This is semantic enrichment, with no promised rich-result or ranking benefit. |

No additional schema is necessary for the fictional integration pages. Their vendors are integration subjects, not evidence that the vendors endorse Tracegate. Do not add `sameAs` links from Tracegate to vendor entities, fabricated certifications, purchasable offers, social profiles, or customer evidence. FAQ text is useful to readers; adding FAQPage for a commercial portfolio is not recommended for Google rich-result benefit.

## Optional generated JSON-LD enrichment

Merge this property into each existing BlogPosting node; do not create a second competing BlogPosting block. The three URLs are already visible on each article. Keep `@context: "https://schema.org"` on the containing graph, and keep URL generation tied to Astro.site for page IDs and assets.

```json
{
  "citation": [
    "https://www.nist.gov/publications/zero-trust-architecture",
    "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    "https://attack.mitre.org/techniques/T1078/004/"
  ]
}
```

This is an optional patch, not a required correction. Existing JSON-LD already implements Organization, WebSite, page subtypes, breadcrumbs and BlogPosting. Omitting additional Person or SoftwareApplication markup is appropriate while no real expert identities or functioning purchasable security application exist.

## AIO/GEO accessibility and content

- Astro's static HTML contains the marketing copy, article text, integration descriptions, navigation links and JSON-LD before client JavaScript runs. Product animation is illustrative; essential educational explanations remain text.
- robots.txt has `User-agent: *` and `Allow: /`, with the configured sitemap. There are no local disallows for Googlebot, OAI-SearchBot, GPTBot, PerplexityBot or ClaudeBot. This allows them under the generic group but does not establish public reachability or override a deployed CDN/WAF policy.
- OpenAI's OAI-SearchBot controls search crawling; GPTBot is for potential model training, and those controls are independent. ChatGPT-User represents user-initiated access, for which robots.txt rules may not apply. The skill's older table that describes GPTBot as search is superseded by [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots).
- llms.txt is generated as a public text map with absolute links, fictional-company disclosure and an explicit statement that it does not grant search eligibility or guarantee AI citations. No RSL licensing document is present; this is not a Google AI-feature requirement and should only be added if the owner defines licensing terms.
- [Google's AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features) says ordinary SEO fundamentals apply. No special AI text file or schema is required, and indexed pages eligible for a snippet may be considered; inclusion is not guaranteed.

| Article | Body words | Sections | Opening answer block | Assessment |
| --- | ---: | ---: | --- | --- |
| Attack path analysis | 1,526 | 15 | “What is an attack path?”; 104 words | Direct definition, mechanism, uncertainty and a practical review question. |
| Machine identity security | 1,527 | 15 | “What is a machine identity?”; 100 words | Direct definition, examples, ownership and review questions. |
| CSPM versus attack paths | 1,517 | 15 | “What is the difference?”; 99 words | Clear comparison of configuration assessment and relationship analysis. |

Opening blocks provide self-contained answers and distinguish possible access from observed activity. Subsequent sections cover evidence, ownership, operational review and verification. The shared reference list links to NIST, AWS and MITRE, while visible notes explicitly distinguish educational interpretation from a real evaluated security product. A fixed 134–167-word rule is not treated as a proven requirement; adding padding would not improve these clear definitions.

Authority limits remain intentional: Tracegate is fictional, the editorial identity has no real credentials, and there are no real customer results, deployed security coverage studies or third-party mentions. Do not manufacture these to improve an authority score. Original downloadable review templates and the explorable synthetic product interface add portfolio utility, but do not establish vendor effectiveness. No GEO score, platform-specific visibility score or AI-citation forecast is assigned without evidence.

## Publication follow-up

1. Set the real domain and rebuild all origin-dependent metadata and endpoints.
2. Confirm HTML, robots, sitemap, social images and source links return the expected public responses through the actual host/CDN.
3. Run Rich Results Test against a published article and representative nested page; verify Search Console ownership and URL Inspection.
4. Maintain honest publication/update dates and use article-specific image assets when available.
5. Measure actual indexed coverage, traffic and any observed referral/citation behavior after publication. Local readiness does not prove ranking or citation.
