# NativelyModesSection Specification

## Overview
- **Target file:** `src/components/NativelyModesSection.tsx`
- **Source URL:** `https://natively.software/`
- **Screenshots:** `docs/design-references/natively-modes-section-desktop.png`, `docs/design-references/natively-modes-card-desktop.png`
- **Interaction model:** click-driven mode list; clicked mode updates active row, right-panel title, prompt, and powered-by copy.

## DOM Structure
White section with centered heading/subtitle, then a centered app-style card. Card has a pale sidebar and a scrollable white content panel.

## Computed Styles
### Section
- background: `rgb(255,255,255)`
- padding: `96px 0px`

### Heading
- text: `Seven modes. One AI that listens.`
- font: `"EB Garamond", serif`
- fontSize: `64px`
- lineHeight: `81.6px`
- fontWeight: `500`
- color: `rgb(0,0,0)`
- width: `900px`, centered

### Subtitle
- text: `Switch between expert personas built for every professional context. Each one rewrites the AI's instruction set — not just a prompt suggestion.`
- font: Geist
- fontSize: `18px`
- lineHeight: `29.25px`
- color: `rgb(107,114,128)`
- width: `620.562px`, centered

### Card
- width: `800px`
- height: `560px`
- border: `1px solid rgba(0,0,0,0.08)`
- borderRadius: `16px`
- background: `rgb(255,255,255)`
- boxShadow: `rgba(0,0,0,0.05) 0px 24px 64px 0px, rgba(0,0,0,0.02) 0px 0px 0px 1px`
- overflow: hidden

### Sidebar
- desktop width: `240px`
- background: `rgb(250,250,250)`
- right border: `rgba(0,0,0,0.05)`
- mode row height: `44px`, padding `10px 12px`, gap `12px`, radius `16px`
- active row background: `rgba(0,0,0,0.06)`
- inactive row background: transparent; hover `rgba(0,0,0,0.05)`

### Content Panel
- width: `558px`
- height: `558px`
- background: white
- overflow-y: auto
- padding inner: `32px 40px`
- title font: Geist `32px`, weight `700`, color `#1a202c`
- section labels: `15px`, weight `700`, color `#1a202c`
- text body: `14px`, line-height relaxed, color black at 40-50% alpha

## Per-State Content
### Co-Pilot
- prompt: `Assist me during live conversations. Summarise context, flag key points, and suggest responses based on what's being said.`
- powered: `Powered by Natively's built-in General intelligence.`

### Technical Interview
- prompt: `Break down every answer into: Problem Statement, My Approach, Edge Cases, Time & Space Complexity. Never give raw code without explaining the reasoning.`
- powered: `Powered by Natively's built-in Technical Interview intelligence.`

### Sales Mode
- prompt: `Track live signals: budget cues, pain points, objections. Surface recommended closes and next steps in real time during prospect calls.`
- powered: `Powered by Natively's built-in Sales intelligence.`

### Recruiting
- prompt: `Correlate candidate responses against the job requisition. Suggest follow-up probes for gaps and surface strong alignment signals.`
- powered: `Powered by Natively's built-in Recruiting intelligence.`

### Looking for Work
- prompt: `Coach me on behavioral interview answers using the STAR framework. Lead with business impact. Align every answer to the job description.`
- powered: `Powered by Natively's built-in Looking for Work intelligence.`

### Team Meet
- prompt: `Track action items, decisions, and blockers in real time. Assign owners and flag anything that's on the critical path.`
- powered: `Powered by Natively's built-in Team Meet intelligence.`

### Lecture Mode
- prompt: `Translate complex concepts into plain language. Generate LaTeX formulas on demand and provide intuitive analogies.`
- powered: `Powered by Natively's built-in Lecture intelligence.`

## Static Text
- `MODES`
- `BETA`
- `+ New Mode`
- `Natively Templates`
- `Set active`
- `Real-time prompt`
- `Save`
- `Reference files`
- `Add files as real-time context.`
- `Upload file`
- `Notes template`
- `Remove template`
- `Summary`
- `High-level summary of the conversation.`
- Footer caption: `Each mode hard-overrides the AI's instruction set — a complete persona rewrite, not a prompt suggestion.`

## Assets
- No image/video assets in this section.
- Icons are thin outline UI icons; use local lucide icons for document, plus, check, more, upload, and grid.

## Responsive Behavior
- Desktop: card is centered at `800px`, two columns: `240px` sidebar and flexible content panel.
- Mobile: card spans available width, sidebar stacks above content; modes become a horizontal scroll rail; right panel remains scrollable.
