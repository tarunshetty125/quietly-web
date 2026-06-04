# Cluely Behaviors

Source URL: https://cluely.com/

## Global Interaction Model
- Page is a vertically scrolling marketing page with a large static hero artwork at the top, scroll-revealed product sections, a fixed download CTA after the hero, a mobile bottom-sheet menu, FAQ accordions, and hover-scale CTAs.
- No smooth-scroll library was detected in the DOM class list; scrolling is native.
- Primary animations are entrance fades/translates and scroll-driven opacity for the floating CTA.
- Fresh load capture shows hero content resolving in place first, followed by the CTA and demo stage; the live headline renders as two lines, `#1 Undetectable` and `AI for Meetings`.
- Fresh scroll capture shows major lower headings start near `opacity: 0` with roughly `translateY(20px)`, then resolve to full opacity as they enter the viewport.

## Scroll Sweep
- `0px`: Header is absolute over the mountain hero. Floating top-right "Get for Mac" CTA exists but has `opacity: 0`.
- `700px`: Floating CTA reaches `opacity: 0.983979`.
- `1200px`: Floating CTA is fully visible. Meeting-help cards are visible.
- `2400px`: Instant meeting notes section is centered with note screenshot card.
- `3200px`: Undetectability cards become visible.
- `4000px`: Undetectability copy, compatible-tool row, and transcription block are visible.
- `4800px`: Stats and FAQ start are visible.
- `5500px`: FAQ and CTA gradient transition overlap in the viewport.
- `6200px`: CTA and footer are visible.

## Click Sweep
- Mobile menu trigger opens a bottom sheet: overlay `fixed inset-0 z-50 bg-black/80`, panel `fixed inset-x-0 bottom-0 z-50 h-[75dvh] rounded-t-xl bg-popover`, links "Undetectability", "Mobile", "Blog", and bottom "Get for Mac" CTA.
- FAQ buttons open one answer at a time. Open content slides under the clicked row; chevron rotates.
- Hero/App Store/Mac CTAs are links or buttons styled as gradient pills. External navigation is out of scope for the clone.

## Hover Sweep
- Primary gradient CTAs transition with `transform 0.16s ease-out` and hover scale about `1.03`.
- Footer/nav links transition color over `200ms-300ms`.
- Dark assistant controls use hover color/background transitions and some small scale changes.

## Animation References
- Live timed load: `docs/design-references/cluely-live-load-120ms.png`, `cluely-live-load-350ms.png`, `cluely-live-load-800ms.png`, `cluely-live-load-1500ms.png`, `cluely-live-load-2600ms.png`.
- Live scroll animation pass: `docs/design-references/cluely-live-scroll-y0.png`, `cluely-live-scroll-y900.png`, `cluely-live-scroll-y1350.png`, `cluely-live-scroll-y2100.png`, `cluely-live-scroll-y3000.png`, `cluely-live-scroll-y3900.png`, `cluely-live-scroll-y4850.png`, `cluely-live-scroll-y5600.png`.
- Clone verification pass after animation updates: `docs/design-references/cluely-clone-load-animated-120ms.png`, `cluely-clone-load-animated-500ms.png`, `cluely-clone-load-animated-1200ms.png`, plus `cluely-clone-scroll-animated-y0.png` through `cluely-clone-scroll-animated-y4850.png`.

## Responsive Sweep
- Desktop `1440px`: nav links visible; hero uses mountain background image-set at 1600px background size; product demo sits over a 1317x774 rounded wallpaper/video stage.
- Tablet `768px`: layout keeps stacked/narrower content; product grids compress before desktop three-column layout.
- Mobile `390px`: nav collapses to hamburger; hero has blue gradient/mountain-derived background with title at `56px/96%`; product grids become single-column and horizontally constrained; footer columns stack.

## Captured References
- Desktop full page: `docs/design-references/cluely-desktop-full.png`
- Mobile full page: `docs/design-references/cluely-mobile-full.png`
- Desktop scroll states: `docs/design-references/cluely-desktop-y0000.png` through `cluely-desktop-y6200.png`
- Mobile scroll states: `docs/design-references/cluely-mobile-y0000.png` through `cluely-mobile-y7200.png`
- Mobile menu: `docs/design-references/cluely-mobile-menu-open.png`
