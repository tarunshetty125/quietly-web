# NativelyAssistantSection Specification

## Overview
- **Target file:** `src/components/NativelyAssistantSection.tsx`
- **Screenshot:** `docs/design-references/natively-one-assistant-section.png`
- **Source URL:** `https://natively.software/`
- **Interaction model:** scroll reveal on entrance, hover-driven card lift, time-driven ambient mock UI animation.

## DOM Structure
- Full-width white section.
- Inner max-width wrapper, centered at `1270px`, with `24px` desktop horizontal padding.
- Header block:
  - Pill eyebrow: `Versatility`.
  - Large serif headline: `One assistant for every conversation`.
  - Centered subheadline.
- Four-card grid:
  - Card 1: Job interviews, dark code mockup.
  - Card 2: Meetings, transcript/note mockup.
  - Card 3: Sales calls, objection/coaching mockup.
  - Card 4: Lectures, notebook/summary mockup.

## Computed Styles

### Section
- background: `rgb(255, 255, 255)`
- padding: `96px 0px`
- position: `relative`
- overflow: `hidden`

### Inner Wrapper
- max width: `1270px`
- horizontal padding: `24px`
- centered.

### Header
- margin bottom: `80px`
- text align: center

### Eyebrow
- display: `inline-flex`
- height: `26.5px`
- padding: `4px 12px`
- gap: `6px`
- background: `rgb(248, 250, 252)`
- border: `1px solid rgba(241, 245, 249, 0.8)`
- border radius: `9999px`
- box shadow: `rgba(0,0,0,0.02) 0px 1px 2px`
- text: `Versatility`

### Headline
- font family: `"EB Garamond", serif`
- desktop font size: `96px`
- font weight: `500`
- line height: `81.6px`
- max width: `900px`
- color: `rgb(0, 0, 0)`
- text: `One assistant for every conversation`

### Subheadline
- max width: `548.96px`
- font size: `18px`
- line height: `29.25px`
- color: `rgb(107, 114, 128)`
- text: `Natively is an AI interview copilot and a meeting assistant in one app — local, private, and real-time.`

### Card Grid
- desktop display: grid
- desktop columns: four equal columns, around `287.5px` each at `1270px` viewport
- gap: `24px`

### Cards
- height: `390px`
- border radius: `32px`
- background: `rgb(242, 244, 248)`
- border: `1px solid rgba(226, 232, 240, 0.4)`
- overflow: hidden
- display: flex column
- box shadow:
  - `rgb(255,255,255) 0px 1px 0px inset`
  - `rgba(0,0,0,0.05) 0px -2px 0px inset`
  - `rgba(255,255,255,0.8) 1px 0px 0px inset`
  - `rgba(0,0,0,0.03) -1px 0px 0px inset`
  - `rgba(0,0,0,0.04) 0px 1px 3px`
  - `rgba(0,0,0,0.04) 0px 8px 20px`
  - `rgba(0,0,0,0.05) 0px 24px 48px`

## States & Behaviors

### Scroll reveal
- Uses the local `ScrollReveal` component.
- Header remains static like the source render.
- Cards stagger in from opacity 0, translateY 32px, scale 0.985, and 10px blur.
- Transition: `1150ms cubic-bezier(.22,1,.36,1)`.
- Intersection trigger begins earlier than the default reveal to avoid a sudden row pop.

### Hover
- Card border changes to stronger slate.
- Card translates upward by `8px`.
- Overlay opacity fades from 0 to 1 over 500ms.
- Arrow translates right by 4px.

### Ambient mock UI animation
- Dark/code card has a moving scan line and gently floating response card.
- Transcript card uses full-height audio bars with scale motion.
- Sales card uses an animated confidence fill.
- Lecture card uses a moving node on the notebook graph.
- Transcript/sales/lecture cards use subtle floating note panels.
- Motion disabled under `prefers-reduced-motion: reduce`.

## Text Content
- Eyebrow: `Versatility`
- Headline: `One assistant for every conversation`
- Subheadline: `Natively is an AI interview copilot and a meeting assistant in one app — local, private, and real-time.`
- Card 1:
  - `ACTIVE`
  - `const path = (root) => {`
  - `if (!root) return [];`
  - `visited.add(root);`
  - `Copilot`
  - `Use BFS to optimize search queries.`
  - `Job interviews`
  - `Real-time coding, system design, and behavioral help on live interviews.`
  - `Explore Interview Copilot`
- Card 2:
  - `LIVE TRANSCRIBING`
  - `Alex`
  - `"We need to sync the design mockups next week."`
  - `Note`
  - `Alex to present Figma layout on Monday.`
  - `Meetings`
  - `Live transcription, instant answers, and automatic notes for any call.`
  - `Explore Meeting Assistant`
- Card 3:
  - `00:42`
  - `Prospect Objection`
  - `"The pricing model isn't clear to us."`
  - `Confidence`
  - `Coaching`
  - `Highlight 80% cost savings with local execution.`
  - `Sales calls`
  - `On-call objection handling and talk tracks, invisible to the prospect.`
  - `Explore Sales Assistant`
- Card 4:
  - `GRID`
  - `Notebook`
  - `Distributed System Design`
  - `Summary`
  - `Raft splits state machines into isolated subproblems.`
  - `Lectures`
  - `Transcribe and summarize classes offline, searchable all semester.`
  - `Explore Lecture Notes`

## Responsive Behavior
- Desktop: four-card grid, section padding `96px 0`.
- Tablet: two columns, same card height.
- Mobile: single column, headline scales down, section padding reduced.
