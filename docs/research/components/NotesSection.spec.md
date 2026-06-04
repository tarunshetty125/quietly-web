# NotesSection Specification

## Overview
- **Target file:** `src/components/NotesSection.tsx`
- **Screenshot:** `docs/design-references/cluely-desktop-y2400.png`
- **Interaction model:** static with entrance animation

## DOM Structure
Centered heading/subtitle, then a single large rounded image card with meeting notes screenshot.

## Computed Styles
### Container
- rect: `x:73 y:2482 w:1280 h:709`
- display flex column, align center, gap desktop `56px`, padding `0 32px`

### Heading
- `Instant meeting notes`
- font: Geist `56px`, weight `500`, line-height `70px`, letter-spacing `-1.28px`
- gradient text from `#19191D` to `#626275`

### Subtitle
- `The easiest way to get beautiful, shareable meeting notes.`
- color: muted gray, desktop around `18px`, centered

### Card
- class from source: `card-styles aspect-auto h-fit w-full max-w-4xl px-6 pt-8 pb-0 md:px-12 md:pt-16 lg:px-28 lg:pt-28`
- card background: `radial-gradient(... rgb(221,226,238) ... rgb(187,197,221))`
- border radius around `24px`
- image desktop rect: `672x430` at `x:377 y:2801`

## Assets
- Desktop: `public/images/cluely/desktop-notes-2.8614c68b.png`
- Tablet: `public/images/cluely/tablet-notes.5560bad7.png`
- Mobile: `public/images/cluely/mobile-notes.5dc13f8d.png`

## Text Content
Instant meeting notes

The easiest way to get beautiful, shareable meeting notes.
