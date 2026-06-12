# FaqSection Specification

## Overview
- **Target file:** `src/components/FaqSection.tsx`
- **Screenshot:** `docs/design-references/cluely-desktop-y4800.png`
- **Interaction model:** click-driven accordion

## DOM Structure
Heading followed by six bordered rows. Each row has a button text and chevron; open row shows answer below.

## Computed Styles
### Section
- rect: `x:0 y:5426 w:1425 h:507`
- inner max width: `1280px`, padding `0 32px`, gap `20px`

### Heading
- `Frequently asked questions`
- font: Geist `40px`, weight `500`, line-height `50px`, letter-spacing `-1.6px`
- color `rgb(0,0,0)`

### Buttons
- rect first row: `x:105 y:5520 w:1216 h:68`
- font: Geist `14px`, weight `500`, text black
- padding desktop: `20px 0`, border-bottom `1px solid rgb(229,231,235)`
- hover color: foreground at `80%`

## States & Behaviors
- Default: all rows closed.
- Open: clicked row expands answer paragraph, chevron rotates 180deg, only one row should stay open.

## FAQ Content
- Why real-time vs. a regular AI notetaker? Unlike regular AI notetakers like Otter or Granola that work after your meeting ends, TeamSync provides real-time meeting intelligence during your calls. While other AI meeting assistants create meeting summaries afterward, TeamSync helps you answer technical questions, handle objections, and perform better during high-stakes conversations.
- Who is TeamSync for? TeamSync is perfect for students, professionals, sales teams, recruiters, consultants, executives, and anyone who needs to perform well in meetings. If you're in back-to-back sales calls, lectures, or client meetings where you can't afford to look unprepared, TeamSync delivers you answers at moments when you most need them.
- Is TeamSync free? Yes, you can use TeamSync's AI meeting assistant for free, and you will have limited access to all core TeamSync features. The pro plan gives you access to unlimited meeting notes and unlimited AI responses with TeamSync.
- How is it undetectable in meetings? Unlike other meeting AI tools, it never joins your calls as a participant, doesn't appear in meeting recordings, and won't show up in screen shares (limitations here). It captures meeting audio in the background and provides a discreet, translucent overlay that only you can see--making it completely undetectable to other meeting participants.
- What languages and apps are supported? TeamSync's AI meeting assistant works with all major meeting platforms including Zoom, Microsoft Teams, Webex, and Slack calls. It supports English and major international languages for meeting transcription and real-time insights.
- Can I talk to customer support? Yes, our support team is available to help you get the most out of your AI meeting assistant. You can reach out via live chat, email, or through the support center. We provide technical support and help with optimizing TeamSync for your specific meeting and sales workflows.
