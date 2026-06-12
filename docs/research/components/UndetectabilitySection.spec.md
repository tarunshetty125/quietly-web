# UndetectabilitySection Specification

## Overview
- **Target file:** `src/components/UndetectabilitySection.tsx`
- **Screenshot:** `docs/design-references/cluely-desktop-y3200.png`
- **Interaction model:** first card is static; second card is a draggable visible/invisible split comparison with a first-view 5-second auto sweep loop; third card auto-rotates every ~2 seconds and arrow controls switch the current preview state; horizontal scroll on mobile

## DOM Structure
Centered section heading/subtitle, then three feature cards. Cards combine real images and small UI mockups.

## Computed Styles
### Section
- rect: `x:0 y:3448 w:1425 h:790`
- position: relative, z-index `10`
- content max width `1280px`, padding `0 32px`

### Heading
- `Undetectable in every way`
- font: Geist `56px`, line-height `70px`, weight `500`, letter-spacing `-1.28px`
- gradient `#19191D` to `#626275`

### Card Grid
- rect: `x:105 y:3623 w:1216 h:466`
- desktop: 3 columns, gap `32px`
- mobile: horizontal snap scroll, card min width about viewport minus padding

## Cards
1. **Doesn't join meetings.**
   - image/UI participants list with four avatars.
   - avatars from `gina-huels`, `todd-cremin`, `holly-gleason`, `tomas-hansen`.
   - body: `TeamSync never joins your meetings, so there are no bots and no extra people on the guest list.`
2. **Invisible to screen share.**
   - layered image `public/images/cluely/invisible-tool.452f4abe.png` with the muted invisible layer underneath and a clipped visible layer on top.
   - center handle is draggable left/right; the clipped visible layer, green outline, divider line, and eye-off control all follow the same split value.
   - visible-side UI, including the AI Response card and `Visible to you` badge, is clipped by the left side of the split; `Invisible to others` is clipped by the right side of the split so it disappears at the divider as the slider moves right.
   - when the card first enters the viewport, the split begins a slow 5-second auto sweep loop; pointer dragging cancels the auto motion and leaves the user in control.
   - drag range clamps near the frame edges so both sides remain readable.
   - body: `TeamSync never shows up in shared screens, recordings, or external meeting tools.`
3. **Follows your eyes.**
   - rotating states: video lesson/up, video call/down, chat/left, file browser/right.
   - each state renders one background and one foreground asset at a time with a small AI response overlay.
   - auto-advances approximately every 2 seconds.
   - keyboard row command/up/down/left/right under image; command cycles forward, arrow buttons jump to their matching state.
   - body: `TeamSync window is fully moveable so you can position it exactly where you're looking.`

## Assets
- `public/images/cluely/gina-huels.b14409cf.png`
- `public/images/cluely/todd-cremin.9cbbdf9c.png`
- `public/images/cluely/holly-gleason.528905fb.png`
- `public/images/cluely/tomas-hansen.5f58da3e.png`
- `public/images/cluely/invisible-tool.452f4abe.png`
- `public/images/cluely/bg-purple.449cf71b.jpg`
- `public/images/cluely/bg-blue.825b2efd.jpg`
- `public/images/cluely/bg-pink.1696fade.jpg`
- `public/images/cluely/bg-purple-dark.58e0b5e1.jpg`
- `public/images/cluely/file-browser-card.8990f1d2.png`
- `public/images/cluely/messaging-card.f1bfaf57.png`
- `public/images/cluely/video-conference-card.26ec85da.png`
- `public/images/cluely/video-player-card.9b7a7f86.png`

## Text Content
Undetectable in every way

Suite of features to use TeamSync without a trace.

Doesn't join meetings. TeamSync never joins your meetings, so there are no bots and no extra people on the guest list.

Invisible to screen share. TeamSync never shows up in shared screens, recordings, or external meeting tools.

Follows your eyes. TeamSync window is fully moveable so you can position it exactly where you're looking.
