# MeetingHelpSection Specification

## Overview
- **Target file:** `src/components/MeetingHelpSection.tsx`
- **Screenshot:** `docs/design-references/cluely-desktop-y1200.png`
- **Interaction model:** static with entrance animation

## DOM Structure
Section heading followed by two-card grid. Left card is blue recording/listening card; right card is pale gray assist card with dark assistant panel.

## Computed Styles
### Container
- rect at desktop scroll state: `x:73 y:1525 w:1280 h:700`
- display: flex column, gap `44px`, padding `0 32px`, max width `1280px`

### Heading
- text: `How Cluely helps during a meeting`
- font: Geist, `56px`, weight `500`, line-height `70px`, letter-spacing `-1.28px`
- gradient text: from `rgb(25,25,29)` to `rgb(98,98,117)`

### Grid
- rect: `x:105 y:1639 w:1216 h:586`
- desktop grid: 2 columns, gap `28px`
- mobile: 1 column

### Left Card
- blue card fill: radial/linear blue (`rgb(73,126,233)` to `rgb(116,156,255)`)
- rounded corners about `28px`
- title includes pill: `Cluely listens in to the conversation`
- timer: `00:00`, recording dot, waveform, translucent assistant dock

### Right Card
- pale card with border `#DDE2EE`, soft inset/glow
- title: `When you need help, Cluely assists you instantly`
- assistant panel dark: `rgb(24,23,28)` overlay, rounded `16px`

## Assets
- Uses generated CSS/UI mockups plus icons from `src/components/icons.tsx`.

## Text Content
How Cluely helps during a meeting

Cluely listens in to the conversation

It picks up the context of your meeting in real time, so it can help when you need it.

When you need help, Cluely assists you instantly

Hit Cmd/Ctrl + Enter and Cluely helps you with AI in the moment.
