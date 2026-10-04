# Tracegate brand and messaging

## Strategic idea

Tracegate connects cloud exposures, identity permissions, and critical resources so teams can see a potential attack path and agree on a next step. The category is connected cloud and identity security. The audience includes cloud security practitioners, security operations teams, and platform engineers. The brand promise is **Turn connected risk into a clear next step.**

The campaign line **See the path. Stop the breach.** is a fictional brand aspiration, not a verified prevention guarantee. Product copy uses precise statements about investigation and review rather than claiming autonomous remediation or universal protection.

## Voice

Clear, calm, technical, decisive. Start with the outcome, explain the mechanism, respect the operator, and earn every claim. Prefer short concrete statements. Avoid fear-based promises, jargon stacks, unsupported superlatives, and invented customer proof.

| Pillar | Message | Demonstration |
| --- | --- | --- |
| Connected context | Cloud and identity risks belong in the same conversation. | An inspectable path connects a principal, its permissions, and a target. |
| Focused action | Fix the path that matters first. | Explain reachability, target sensitivity, and candidate interventions. |
| Human control | Automate the handoff. Keep the decision. | Put evidence, an owner, dependencies, and verification in the change review. |

## Visual system

The gate mark combines a deliberate boundary and diagonal crossing. It avoids the familiar shield/padlock shorthand. Signal orange identifies relationships and actions. Ink provides structure. Cloud and silver establish calm backgrounds and subtle outlines. Warm peach supports campaign artwork. Small orange text uses a darker accessible variant; dark mode uses a brighter text variant. Dark surfaces use neutral charcoal, achromatic grays, and off-white text. Orange remains the brand accent; backgrounds avoid both blue and brown casts.

IBM Plex Sans Variable is the primary body typeface. IBM Plex Sans Condensed 600 provides display headings, and IBM Plex Mono 400 labels short technical evidence. All three are self-hosted. Editorial spacing, a strong campaign hero, asymmetric panels, and carefully authored product diagrams give the brand a recognizable rhythm.

Motion explains state: graph selections, workflow transitions, menu disclosures, and restrained viewport reveals. It uses native CSS and IntersectionObserver, respects reduced motion, and does not pin or hijack scrolling.

Reference websites reviewed: Wiz, Vanta, Chainguard, Socket, Cyberhaven, and SentinelOne. The redesigned direction takes inspiration from their brand presence, product storytelling, and interactive exploration. Tracegate uses original copy, art, layout, and geometry.

## Assets

The public brand page provides mark, wordmark, and brand-kit JSON downloads. The identity board is an art-directed generated concept. The implemented SVG mark is the authoritative logo geometry. `src/data/brand.json` is the source of truth for palette, voice, pillars, and disclosure; synchronize `public/brand/brand-kit.json` when editing it.

## Implementation rules

Root [DESIGN.md](../DESIGN.md) records shared typography, spacing, control states, responsive composition, and component conventions. [PRODUCT.md](../PRODUCT.md) captures the fictional product and audience constraints. Theme colors and font families live in `src/styles/global.css`; shared scales and interaction tokens live in `src/styles/tokens.css`. Run `node scripts/sync-brand-tokens.mjs` after changing these files or `src/data/brand.json` to regenerate the downloadable brand kit. The identity concept board is illustrative; the CSS tokens and vector mark govern implementation.
