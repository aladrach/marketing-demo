# Tracegate prioritized action plan

October 4, 2026. Implementation findings are corrected locally; deployment is separate.

| Priority | Action | Status | Effort / validation |
| --- | --- | --- | --- |
| Resolved | Navigation focus-race fix | Verified publicly | Live Vercel regression passed all 20 submenu destinations and null-focus pointer activation |
| High | Publish data-sheet, inline editorial figures/CTAs, and accordion enhancements | Ready locally | Deploy current source; verify the new access flow and PDF |
| Medium | Verify the deployed update | Pending deployment | Rerun TEST_URL against Vercel for navigation; recrawl all 33 routes and compare origin-dependent metadata |
| Medium | Add contextual primary references and a worked comparison table | Editorial opportunity | Reference relevant AWS/MITRE/NIST material near claims; keep hypothetical examples explicit |
| Medium | Create article-specific social images | Enhancement | Accurate editorial diagrams; fixed dimensions; update BlogPosting/OG together |
| Low | Improve very small secondary mobile product-preview labels | UX opportunity | Hide secondary decorative text or enlarge essential labels while retaining inspectable text summaries |
| Low | Split page-specific enhancement/CSS as the site grows | Performance opportunity | Preserve the 20 KB raw / 6 KB gzip script budget; measure savings before adding tooling |
| Low | Align schema breadcrumb labels and optionally add existing citation URLs | Semantic polish | Maintain a single coherent graph; no promised ranking effect |
| Low | Consider host-specific response headers | Hosting follow-up | HSTS is already present; evaluate CSP and nosniff against actual assets without breaking inline preference handling |
| After publication | Inspect indexing and collect field performance | External measurement | Verify Search Console; use actual CrUX/field data when available; measure INP separately from lab TBT |

Do not invent product capabilities, expert credentials, testimonials, certifications, connector permissions, or customer results to fill authority gaps. Integration concepts should gain technical deployment depth only if real connectors are built and evaluated. No special AI schema or llms.txt expansion is needed for Google AI eligibility.
