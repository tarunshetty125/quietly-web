# CtaFooter Specification

## Overview
- **Target files:** `src/components/CtaSection.tsx`, `src/components/SiteFooter.tsx`
- **Screenshot:** `docs/design-references/cluely-desktop-y6200.png`
- **Interaction model:** static CTA and footer link hover states

## DOM Structure
CTA gradient band with heading/subhead/button and floating command-key assets. Footer follows with wordmark, columns, status, legal text, and social links.

## Computed Styles
### CTA Section
- rect: `x:0 y:6061 w:1425 h:583`
- padding desktop: `220px 0px 210px`
- background gradient layer: `linear-gradient(rgb(255,255,255), rgb(221,226,238) 37.04%)`
- heading: `Meeting AI that helps during the call, not after.`, font `28px`, weight `500`, line-height `35px`, letter-spacing `-1.12px`
- subhead: `Try Cluely on your next meeting today.`, color blue-gray
- CTA button: blue gradient, `Get for Mac`
- decorative assets: `command-btn`, `command-active`, `return-btn`, `return-active`

### Footer
- rect: `x:0 y:6644 w:1425 h:388`
- background: `rgb(221,226,238)`
- padding: `40px 0px 20px`
- inner max width: `1280px`, padding `0 32px`
- columns: Resources, Support, Legal
- status pill: `All systems operational`
- copyright: `© 2026 Cluely. All rights reserved.`

## Assets
- `public/images/cluely/wordmark.svg`
- `public/images/cluely/command-btn.05a11379.png`
- `public/images/cluely/command-active.83241958.png`
- `public/images/cluely/return-btn.f7f71a9d.png`
- `public/images/cluely/return-active.30ff0cd8.png`

## Text Content
Meeting AI that helps during the call, not after.

Try Cluely on your next meeting today.

Resources: Mobile New, Manifesto, Press, Bug Bounty

Support: Help Center, Contact Us

Legal: Privacy Policy, Terms of Service, Subprocessors

All systems operational

List of subprocessors.

© 2026 Cluely. All rights reserved.
