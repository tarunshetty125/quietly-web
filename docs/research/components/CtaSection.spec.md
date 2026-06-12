# CtaSection Specification

## Overview
- **Target file:** `src/components/CtaSection.tsx`
- **Screenshot:** `docs/design-references/cluely-desktop-y6200.png`
- **Interaction model:** static CTA with hover-scale button

## DOM Structure
Pale blue gradient band with heading, subheading, Mac CTA, and floating command/return key assets.

## Computed Styles
- section rect: `x:0 y:6061 w:1425 h:583`
- padding desktop: `220px 0px 210px`
- background: `linear-gradient(rgb(255,255,255), rgb(221,226,238) 37.04%)`
- heading font: Geist `28px`, weight `500`, line-height `35px`, color black
- subhead color: blue-gray gradient
- CTA button: blue gradient, `45px` height, rounded `10px`, hover scale

## Assets
- `public/images/cluely/command-btn.05a11379.png`
- `public/images/cluely/command-active.83241958.png`
- `public/images/cluely/return-btn.f7f71a9d.png`
- `public/images/cluely/return-active.30ff0cd8.png`

## Text Content
Meeting AI that helps during the call, not after.

Try TeamSync on your next meeting today.

Get for Mac

## Responsive Behavior
- Desktop: key art floats on the right side of the band.
- Mobile: text and CTA stack, decorative key art hidden.
