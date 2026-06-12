# ContentRoutePage Route Template Spec

Target reference: Natively route/detail pages such as `/ai-meeting-assistant`, `/ai-interview-assistant`, and `/blog/ai-interview-assistant-guide`.

Scope: update only the generated resource, meeting AI, and blog route pages. Do not change the homepage sections, global header component, global footer component, hero, dock, undetectability, pricing/pro pages, or route definitions.

Visual model:
- White/very-light page with a centered article column.
- Sticky top route header with brand at left and compact nav links centered/right.
- Main column max width around 896px with top padding around 128px on desktop.
- H1 uses a serif stack, very large on desktop, tight line height, dark slate text.
- Body copy uses Geist/system sans, muted slate, generous line height.
- Article sections are not separate floating cards. Headings and paragraphs flow in the article.
- CTA block appears after the article, followed by related reading cards in a simple two-column grid.
- Related cards are rounded 16px, translucent white, thin border, subtle hover.

Interaction model:
- Static route page with small entrance fade/slide on article blocks.
- Links hover with color/underline/arrow movement.
- No homepage layout or footer behavior changes.

Content model:
- Keep Quietly AI branding.
- Use descriptive original content for every generated route.
- Resource and Meeting AI pages should include a lead summary, six or more article sections, optional bullets, and FAQs.
- Blog pages should read like guides, with multiple compact sections, CTA, and related reading.
