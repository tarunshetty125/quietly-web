# SiteFooter Specification

## Overview
- **Target file:** `src/components/SiteFooter.tsx`
- **Screenshot:** `docs/design-references/cluely-desktop-y6200.png`
- **Interaction model:** static footer with link hover states

## DOM Structure
Blue-gray footer with wordmark, resources/support/legal columns, status pill, subprocessors line, copyright, and social links.

## Computed Styles
- footer rect: `x:0 y:6644 w:1425 h:388`
- background: `rgb(221,226,238)`
- padding: `40px 0px 20px`
- inner max width: `1280px`, padding `0 32px`
- status pill: height `34px`, translucent blue-gray fill, green dot

## Assets
- `public/images/cluely/wordmark.svg`

## Text Content
Resources: Mobile New, Manifesto, Press, Bug Bounty

Support: Help Center, Contact Us

Legal: Privacy Policy, Terms of Service, Subprocessors

All systems operational

List of subprocessors.

© 2026 TeamSync. All rights reserved.

## Responsive Behavior
- Desktop: wordmark left, columns right, social links bottom right.
- Mobile: columns stack below wordmark, footer metadata stacks.
