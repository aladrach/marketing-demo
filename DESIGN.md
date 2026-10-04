---
name: Tracegate
description: Connected cloud and identity risk with a clear next step
colors:
  ink: "#171b20"
  signal: "#f2693a"
  cloud: "#f6f7f8"
  surface: "#fcfcfd"
  button-text-light: "#fafbfc"
  muted: "#59616b"
  line: "#d9dde1"
  signal-text: "#ae3915"
  signal-text-dark: "#ffa47a"
  dark-bg: "#181818"
  dark-surface: "#222222"
  dark-subtle: "#2b2b2b"
  dark-text: "#f4f4f2"
  dark-muted: "#b7b7b4"
  dark-line: "#414141"
  accent-soft: "#fae9e1"
  dark-accent-soft: "#303030"
typography:
  display:
    fontFamily: "IBM Plex Sans Condensed"
    fontSize: "clamp(44px,5.2vw,76px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "IBM Plex Sans Variable"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  secondary:
    fontFamily: "IBM Plex Sans Variable"
    fontSize: "14px"
  supporting:
    fontFamily: "IBM Plex Sans Variable"
    fontSize: "18px"
  component-title:
    fontFamily: "IBM Plex Sans Variable"
    fontSize: "25px"
    fontWeight: 600
  section:
    fontFamily: "IBM Plex Sans Condensed"
    fontSize: "clamp(34px,3.5vw,50px)"
    fontWeight: 600
  label:
    fontFamily: "IBM Plex Mono"
    fontSize: "12px"
    fontWeight: 400
rounded:
  control: "4px"
  surface: "8px"
  preview: "12px"
spacing:
  tight: "8px"
  group: "16px"
  panel: "24px"
  wide: "40px"
  section: "104px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.button-text-light}"
    rounded: "{rounded.control}"
    padding: "15px 22px"
  button-primary-hover:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
---

# Tracegate design system

## Overview

Preserve the existing calm, technical editorial identity. The gate mark represents a boundary crossed by a connection. Orange highlights the relationship or action that changes a decision. Product demonstrations use inspectable, explicitly synthetic evidence rather than decorative metrics or invented customer proof.

CSS is the rendering authority: src/styles/global.css owns theme colors and font families; src/styles/tokens.css owns shared scales and states; component files own composition. This document records the implemented conventions. The downloadable brand kit includes the actual CSS tokens and theme overrides.

## Colors

Use --bg, --surface, and --subtle for page, panel, and secondary surfaces. Use --text and --muted for foreground hierarchy; --line for boundaries. Use --accent for paths and emphasis, --accent-ink for readable accent text, and --accent-soft for selected surfaces. Dark theme replaces neutral surfaces and foregrounds while preserving signal orange.

Use --button and --button-text for default buttons, and --button-hover-bg and --button-hover-text for hover. Do not force a button foreground from a prose component. Campaign palette swatches are identity colors; --line is the implementation's semantic border color, distinct from the Silver swatch.

## Typography

Self-host IBM Plex Sans Condensed 600 for display headings, IBM Plex Sans Variable for body and controls, and IBM Plex Mono 400 for short technical evidence. Use --text-display and --text-section for shared headings, --text-title for component titles, --text-body for reading, --text-sm for secondary copy, and --text-xs for readable labels. The shared small scale is 12px, not permission to shrink functional text below it.

The body uses 1.65 leading; long-form prose uses a 68ch measure and 1.8 leading. Headings use balanced wrapping and restrained negative tracking. Individual campaign headings retain their larger authored sizes. Legacy editorial and diagram components also retain their local 13/15/17px copy sizes, 19–43px titles, 44–96px campaign headings, and 6–11px decorative metadata; these are preserved composition exceptions, not additions to the shared ramp. Static detector advisories on those literal rules require rendered-context review, since some are overridden by later accessible preview rules. Diagram geometry and decorative metadata may have component-specific rules, but interactive names, instructions, and evidence must remain readable at mobile widths.

## Layout

The container is 1280px maximum with 40px horizontal padding, reduced to 28px below 1100px and 20px below 640px. Shared spacing uses --space-1/2/3/4/5/6/8/10/12/16/20 (4/8/12/16/20/24/32/40/48/64/80px) and --space-section (104px).

Use the scale for repeated groups, controls, and panels. Preserve diagram coordinates and purposeful one-off campaign geometry. Component breakpoints remain 1100, 850/800, and 640/600px according to content fit; CSS variables cannot substitute into media conditions. Mobile compositions simplify information rather than proportionally shrinking all text.

## Elevation & Depth

Most sections use tone and subtle borders. --shadow provides restrained elevation for navigation and product surfaces. The hero preview retains its authored perspective on desktop and becomes a flat sequence on mobile. Avoid adding decoration that competes with evidence.

## Shapes

Use --radius-control (4px), --radius-surface (8px), and --radius-preview (12px) for shared controls, containers, and product windows. Circles and specialized graph shapes are geometry exceptions. Existing 2/3/5/6/7/10px small diagram and badge corners, 14/20px illustration surfaces, and asymmetric editorial callout corners remain component-owned exceptions. --radius remains an alias for surface radius for existing components.

## Components

Primary buttons use the shared .button primitive and a minimum 44px height. Secondary buttons retain neutral backgrounds. Icon controls use --control-min for both dimensions while icons stay visually compact. Hover, focus, selected, and disabled states belong to the shared primitive; component copy styles must not override them.

Keyboard focus uses --focus-width, --focus-offset, and --accent-ink. Tour controls return focus to their trigger when dismissed. Tabs support arrows, Home, and End. Native details preserve keyboard semantics and work without JavaScript.

Forms use visible labels, required markers, autocomplete, and browser validation. Sample requests render with textContent, preserve the input for editing, and stay page-local; no storage or transmission. Required fields and disabled states remain native semantics.

The homepage has an introductory hero preview and an operational path explorer, followed by team outcomes and capabilities. Product pages distinguish attack-path inspection, identity access review, and configuration review. Shared visual grammar does not require identical demonstrations.

## Do's and Don'ts

- Do retain the gate mark, Plex pairing, neutral surfaces, orange relationships, and explicit synthetic disclosures.
- Do use semantic tokens and existing components before adding another literal or pattern.
- Do verify readable text, touch targets, keyboard focus, both themes, and no-JavaScript behavior.
- Do route walkthrough actions to /platform/#explorer and label local request previews accurately.
- Don't invent customers, certifications, prevention guarantees, live integrations, or numerical proof.
- Don't shrink interactive mobile evidence to fit a desktop diagram.
- Don't animate or hide the information needed to understand a state when reduced motion is requested.
