# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Screenshot:** `docs/design-references/cluely-desktop-y0000.png`, `docs/design-references/cluely-mobile-y0000.png`
- **Interaction model:** static hero artwork, time-driven video, entrance animation

## DOM Structure
Hero wrapper with an independently animated mountain background image-set, text block, CTA, and product demo stage. Demo stage uses wallpaper image, blurred duplicate, WebM video, dock, and translucent assistant overlay.

## Computed Styles
### Hero Wrapper
- class: `hero-v2 flex flex-col items-center gap-8 lg:gap-12`
- desktop rect: `1425x1268`
- background: radial white fade over `images/pages/home/background.png`, `background@2x.png`, `background@4x.png`
- background size: `1600px`, position `50% 0%`, no-repeat

### Top Content
- section padding desktop: `128px 12px 0px`
- h1 font: `"EB Garamond", "EB Garamond Fallback"`
- desktop h1: `78px`, weight `400`, line-height `74.88px`, color white
- mobile h1: `55px`, line-height `96%`, color white
- headline is forced into two lines on desktop and mobile: `#1 Undetectable` then `AI for Meetings`
- subhead desktop: `19px`, weight `500`, line-height `26.6px`, max width `560px`
- note: source uses negative letter spacing; implementation keeps letter spacing at `0` to satisfy project UI constraints
- subhead mobile: width `351px`, line-height `140%`, color white

### Demo Stage
- desktop outer rect around scroll start: `1317x774` at `x:54 y:773`
- wallpaper image: `public/images/cluely/wallpaper-2x.b7df867c.png`
- video: `public/videos/cluely/videos-home-hero-v2-pro-res-vp9-chrome.webm` with Safari fallback `public/videos/cluely/videos-home-hero-v2-pro-res-hevc-safari.mp4`, rect `991x620`
- stage border radius: `13px`
- transform initial: `matrix3d(..., 0, 200, 100, 1)` and opacity `0`; visible once scrolled into hero-demo band

## States & Behaviors
- **Entrance:** mountain background eases in first (`1200ms`). Headline appears at `430ms`, subhead at `650ms`, CTA at `900ms`. Product stage and video start at `1500ms`, dock starts at `1700ms`, and the assistant overlay starts at `2500ms`.
- **Video:** muted, autoplay, loop, plays inline.
- **Responsive:** desktop shows mountain art; mobile crops to blue gradient/mountain background, with demo lower and horizontally overflowing slightly.

## Assets
- `public/images/cluely/background.png`
- `public/images/cluely/background-2x.png`
- `public/images/cluely/background-4x.png`
- `public/images/cluely/wallpaper-2x.b7df867c.png`
- `public/videos/cluely/videos-home-hero-v2-pro-res-vp9-chrome.webm`
- `public/videos/cluely/videos-home-hero-v2-pro-res-hevc-safari.mp4`

## Text Content
#1 Undetectable
AI for Meetings

Cluely takes perfect meeting notes and gives real-time answers, all while completely undetectable
