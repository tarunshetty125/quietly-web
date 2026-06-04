# CompatibilityStatsSection Specification

## Overview
- **Target file:** `src/components/CompatibilityStatsSection.tsx`
- **Screenshot:** `docs/design-references/cluely-desktop-y4000.png`, `docs/design-references/cluely-desktop-y4800.png`
- **Interaction model:** static

## DOM Structure
Compatibility tool row followed by transcription/stat two-column block.

## Computed Styles
### Transcription Section
- outer rect: `x:0 y:4495 w:1425 h:674`
- padding top: `80px`
- inner max width: `1152px`, display flex row on desktop, column on mobile

### Heading
- `Real-time transcription`
- font: Geist `48px`, weight `500`, line-height `60px`, letter-spacing `-1.28px`
- gradient text from `rgb(25,25,29)` to `rgb(49,52,62)`

### Compatibility Row
- label: `Compatible with every tool`
- app labels: Zoom, Slack, Webex, Microsoft Teams, Google Meet
- icons are `28x28` desktop

### Stats
- `12+ Languages`
- `300ms Response time`
- `95% Transcription accuracy`
- stat numbers use large Geist (`48px`-`56px`) with gray copy.

## Assets
- `public/images/cluely/zoom.398e9568.png`
- `public/images/cluely/slack.0e754017.png`
- `public/images/cluely/webex.6e65e4a4.png`
- `public/images/cluely/teams.845b90a5.png`
- `public/images/cluely/meet.7640c976.png`
- `public/images/cluely/transcript-tab.1c48d5b2.png`

## Text Content
Compatible with every tool

Zoom, Slack, Webex, Microsoft Teams, Google Meet

Real-time transcription

We support over 12 different languages, including English, Chinese, Spanish, and more.

We have the fastest live transcription available. Test us against any other competitor.

Trusted by many teams for reliable transcription. All processed with industry-leading accuracy.
