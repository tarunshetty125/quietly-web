# Cluely Page Topology

## Page Order
1. **SiteHeader**: absolute over hero at top; logo left, desktop nav center-left, Mac/App Store CTAs hidden/responsive; mobile hamburger.
2. **HeroSection**: mountain artwork background, EB Garamond headline, white subhead, download CTA, product demo stage with wallpaper, overlay UI, and WebM demo.
3. **MeetingHelpSection**: heading plus two large cards explaining "listens" and "assists".
4. **NativelyModesSection**: imported from natively.software; centered heading and interactive seven-mode AI persona panel.
5. **NotesSection**: centered heading/subtitle and a large meeting-notes screenshot card.
6. **UndetectabilitySection**: centered heading/subtitle and three feature cards: no bots, invisible to screen share, follows your eyes.
7. **CompatibilityStatsSection**: app compatibility row, transcription image, and three stats: 12+ languages, 300ms response, 95% accuracy.
8. **FaqSection**: six accordion rows.
9. **CtaSection**: pale blue gradient band with headline, subhead, Mac CTA, and floating command/return key art.
10. **SiteFooter**: blue-gray footer with wordmark, resource/support/legal columns, status pill, subprocessors link, copyright, and social links.

## Fixed/Overlay Layers
- Mobile menu: fixed black overlay and bottom sheet.
- Floating CTA: fixed top-right `10px`, `149x44` desktop, fades from opacity 0 to 1 after hero scroll.
- Hero header: absolute `z-9999`, white text over hero background.

## Layout Metrics
- Body desktop scroll height: `7031px` at `1440x1100`.
- Main layout: `display: flex; flex-direction: column; gap: 128px desktop, 96px md, 48px mobile`.
- Max content width is generally `1280px` with `32px` desktop horizontal padding.

## Interaction Model by Section
- SiteHeader: scroll-driven fixed CTA visibility; click-driven mobile bottom sheet; hover link/CTA states.
- HeroSection: time/video-driven demo; entrance animation on title/subhead/CTA; static mountain background.
- MeetingHelpSection: entrance fade/translate only.
- NativelyModesSection: click-driven modes; sidebar row selection updates title, prompt, and powered-by line.
- NotesSection: entrance fade/translate only.
- UndetectabilitySection: static cards, horizontal scroll on small screens.
- CompatibilityStatsSection: static content.
- FaqSection: click-driven accordion.
- CtaSection: static with CTA hover state.
- SiteFooter: static link hover states.
