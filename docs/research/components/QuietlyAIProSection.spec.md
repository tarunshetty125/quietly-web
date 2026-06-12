# QuietlyAIProSection Specification

## Source
- URL: `https://natively.software/`
- Source section: Pro block inside `#pricing`, immediately after the managed API pricing cards.
- Local extraction: `/tmp/natively-pro-only.html`

## Requested Changes
- Replace `Natively Pro` with `Quietly AI Pro`.
- Keep the `Built to get / the offer.` headline.
- Do not include the `Yearly License` card:
  - `Yearly License`
  - `All Pro features. Renews annually.`
  - `Get Yearly →`

## Structure
- Outer section uses the Natively Pro background:
  - white-slate surface: `#F8FAFC`
  - top border: slate `100`
  - subtle noise overlay
  - bottom indigo hairline glow
- Header:
  - indigo gradient pill: `Quietly AI Pro`
  - serif headline: `Built to get` and italic gradient `the offer.`
  - copy: `Connect your own API keys. One payment unlocks all 7 modes — no subscription, no metering.`
  - right CTA: `See Pro in action`
- Content:
  - left grid of 8 feature tiles, 2 columns on desktop/tablet, 1 column on mobile.
  - right column contains only the Lifetime License card.

## Feature Cards
- Modes Manager
- Resume Intelligence
- Custom Context Intelligence
- Negotiation Assistance
- System Design, with `New` badge
- Mock Interviews, with `Soon` badge
- JD Intelligence
- Company Research

## Lifetime Card
- Title: `Lifetime License`
- Subtitle: `One payment. All future updates included.`
- Badge: `Best value`
- Bullets:
  - `Resume & JD context awareness`
  - `Live negotiation coaching`
  - `7 expert interview modes`
  - `All future updates`
- CTA: `Get Lifetime →`
- Footer: `One-time purchase · No subscription · yours forever`

## Motion
- Uses local `ScrollReveal` for source-like reveal.
- Feature card preview animations:
  - modes list scroll
  - resume scan line
  - context node drift
- Motion disables under `prefers-reduced-motion: reduce`.
