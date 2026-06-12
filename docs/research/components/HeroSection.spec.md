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
- **Launch sequence:** total hero launch reads as a `4500ms` layer-by-layer reveal: message, product, proof, intelligence, action.
- **Headline:** source-matched masked word reveal. The visible chunks are `#1`, `Undetectable`, `AI`, `for`, and `Meetings`; each chunk sits in an overflow-hidden wrapper with the inner word rising from `translateY(100%)` to `0`. Stagger: `0ms`, `90ms`, `190ms`, `285ms`, `385ms`; duration `500ms`.
- **Subheadline:** starts at `350ms`, opacity/translate reveal over `600ms`.
- **Product frame:** starts at `1000ms`, opacity `0`, scale `0.92`, translateY `80px`; resolves over `1000ms` with a heavy spring-like ease.
- **Video:** video element is paused on mount, starts playback at `1950ms`, and fades in over `400ms`.
- **AI overlay:** toolbar, response panel, and input surface reveal at `2400ms`, `2700ms`, and `3000ms` respectively using opacity, scale `0.95`, translateY `12px`, and blur `8px`.
- **Live intelligence:** between `3200ms` and `4000ms`, the overlay emits a subtle glow, cursor scan, status shimmer, and send-button pulse.
- **CTA:** starts last at `3800ms` and resolves by `4500ms`.
- **Video:** muted, delayed autoplay, loop, plays inline.
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

TeamSync takes perfect meeting notes and gives real-time answers, all while completely undetectable
