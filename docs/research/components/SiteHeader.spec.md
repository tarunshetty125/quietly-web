# SiteHeader Specification

## Overview
- **Target file:** `src/components/SiteHeader.tsx`
- **Screenshot:** `docs/design-references/cluely-desktop-y0000.png`, `docs/design-references/cluely-mobile-menu-open.png`
- **Interaction model:** scroll-driven fixed CTA, click-driven mobile menu, hover links

## DOM Structure
Header contains wordmark link, desktop nav links, responsive CTA controls, and mobile menu trigger. Mobile trigger opens overlay plus bottom sheet with nav links and CTA.

## Computed Styles
### Header
- class: `absolute z-9999 flex w-full pt-2.5`
- desktop rect: `x:0 y:0 w:1425 h:65`
- mobile rect: `x:0 y:0 w:375 h:40`
- container: `max-width: 72rem`, `justify-content: space-between`, text color white

### Logo
- image: `public/images/cluely/wordmark-light.svg`
- desktop rect: `84x22` at `149,23`
- mobile rect: `84x22` at `12,16`

### Desktop Links
- text: `Undetectability`, `Mobile`, `Blog`
- font: Geist, `14px`, `font-weight: 500`, `line-height: 20px`
- color: `rgb(255, 255, 255)`
- padding: `8px 14px`

### Floating CTA
- text: `Get for Mac`
- fixed rect desktop: `149x44` at `x:1266 y:10`
- state at scroll `0px`: `opacity: 0`
- state at scroll `700px`: `opacity: 0.983979`
- state at scroll `1200px+`: `opacity: 1`
- gradient: radial/rich blue; box shadow blue-gray glow; hover scale `1.03`

### Mobile Sheet
- overlay: `fixed inset-0 z-50 bg-black/80`
- panel: `fixed inset-x-0 bottom-0 z-50 h-[75dvh] rounded-t-xl bg-popover`, rect `390x675` at `y:225`
- sheet links: `font-size: 16px`, `font-weight: 500`, row height `36px`
- CTA anchored near bottom left, `Get for Mac`, `113x44`

## States & Behaviors
- **Scroll CTA:** trigger after hero/product top scroll; implementation via scroll listener comparing `window.scrollY > 480`.
- **Mobile menu:** hamburger toggles sheet. Overlay click or close button closes.
- **Hover:** links soften; CTAs scale and brighten.

## Assets
- `public/images/cluely/wordmark-light.svg`
- `public/images/cluely/wordmark.svg`

## Text Content
TeamSync, Undetectability, Mobile, Blog, Get for Mac

## Responsive Behavior
- Desktop: full nav visible, floating CTA top-right after scroll.
- Mobile: wordmark + hamburger only; bottom sheet opens to full width.
