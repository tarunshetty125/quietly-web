export type FooterLink = Readonly<{
  label: string;
  href: string;
}>;

export type FooterColumn = Readonly<{
  title: string;
  links: readonly FooterLink[];
}>;

export type ContentSection = Readonly<{
  heading: string;
  body: string;
  bullets?: readonly string[];
}>;

export type ContentPage = Readonly<{
  slug: string;
  href: string;
  category: "Legal" | "Resources" | "Meeting AI" | "Blog";
  eyebrow: string;
  title: string;
  summary: string;
  primaryCta: string;
  sections: readonly ContentSection[];
  related: readonly string[];
}>;

export const footerColumns: readonly FooterColumn[] = [
  {
    title: "Resources",
    links: [
      { label: "AI Interview Assistant", href: "/ai-interview-assistant" },
      { label: "Coding Interview Helper", href: "/ai-coding-interview-helper" },
      { label: "Local AI Assistant", href: "/local-ai-assistant" },
      { label: "AI for Coding Exams", href: "/ai-assistant-for-coding-interviews" },
      { label: "How AI Helps You", href: "/how-ai-helps-in-coding-interviews" },
      { label: "Local Coding Copilot", href: "/local-ai-coding-assistant" },
      { label: "Top Technical AI Tools", href: "/ai-tools-for-technical-interviews" },
    ],
  },
  {
    title: "Meeting AI",
    links: [
      { label: "AI Meeting Assistant", href: "/ai-meeting-assistant" },
      { label: "AI Note Taker", href: "/ai-note-taker" },
      { label: "Sales Call Assistant", href: "/sales-call-assistant" },
      { label: "Lecture Note Taker", href: "/lecture-note-taker" },
      { label: "Fireflies Alternative", href: "/fireflies-alternative" },
      { label: "Otter Alternative", href: "/otter-alternative" },
    ],
  },
  {
    title: "Blog",
    links: [
      { label: "Interview Assistant Guide", href: "/blog/ai-interview-assistant-guide" },
      { label: "Local vs Cloud AI", href: "/blog/local-ai-vs-cloud-ai-assistants" },
      { label: "AI for Coding Exams", href: "/blog/how-ai-can-help-with-coding-interviews" },
      { label: "How Interview Copilots Work", href: "/blog/how-ai-interview-assistants-work" },
      { label: "Top 5 AI Tools (2026)", href: "/blog/best-ai-tools-for-coding-interviews" },
      { label: "Preparing for Screenings", href: "/blog/preparing-for-technical-interviews-with-ai" },
    ],
  },
];

export const assistantRouteLinks = {
  interviews: "/ai-interview-assistant",
  meetings: "/ai-meeting-assistant",
  sales: "/sales-call-assistant",
  lectures: "/lecture-note-taker",
} as const;

const rootPages: readonly ContentPage[] = [
  {
    slug: "security",
    href: "/security",
    category: "Legal",
    eyebrow: "Security",
    title: "Security that keeps Quietly AI private by design.",
    summary:
      "Quietly AI is built for conversations where context matters and exposure cannot happen. The product keeps local workflows local, limits cloud processing, and makes sensitive meeting data easy to control.",
    primaryCta: "Review privacy controls",
    sections: [
      {
        heading: "Local-first capture",
        body:
          "Quietly AI can process meeting audio, screen context, and notes on-device whenever your setup allows it. That reduces the amount of raw conversation data leaving your machine and keeps assistants useful in restricted environments.",
        bullets: ["Local transcription options", "Minimal retained context", "Private screen-aware overlays"],
      },
      {
        heading: "Controlled cloud intelligence",
        body:
          "When teams choose managed AI, Quietly AI sends only the context needed for a specific answer. Admins can choose model providers, set workspace rules, and keep the assistant aligned with company policy.",
      },
    ],
    related: ["/privacy", "/termsandconditions", "/local-ai-assistant"],
  },
  {
    slug: "privacy",
    href: "/privacy",
    category: "Legal",
    eyebrow: "Privacy Policy",
    title: "Your conversations should stay yours.",
    summary:
      "Quietly AI is designed for private work. We avoid invasive meeting bots, keep controls visible to the user, and make it clear when AI context is being used.",
    primaryCta: "Explore local AI",
    sections: [
      {
        heading: "What Quietly AI uses",
        body:
          "Quietly AI uses meeting audio, visible screen context, uploaded files, and user prompts only to produce notes, answers, summaries, and follow-up suggestions for the person using the app.",
      },
      {
        heading: "What Quietly AI avoids",
        body:
          "Quietly AI does not need to join your meeting as a participant. It is built to assist from your device, so your call does not get interrupted by a visible recording bot.",
        bullets: ["No bot participant required", "No public meeting transcript feed", "No hidden social sharing"],
      },
    ],
    related: ["/security", "/ai-meeting-assistant", "/local-ai-assistant"],
  },
  {
    slug: "refundpolicy",
    href: "/refundpolicy",
    category: "Legal",
    eyebrow: "Refund Policy",
    title: "Simple, human refund expectations.",
    summary:
      "Quietly AI plans are meant to be easy to evaluate. If the product is not a fit, the refund page explains how to contact us and what information helps us resolve the request quickly.",
    primaryCta: "Compare plans",
    sections: [
      {
        heading: "How refunds are reviewed",
        body:
          "Refunds are reviewed based on purchase date, usage, and whether the issue can be solved quickly through support. We keep the process straightforward and avoid making users repeat the same context.",
      },
      {
        heading: "What to include",
        body:
          "Include the purchase email, the plan name, and a short note about what did not work. That helps the Quietly AI team respond with the right next step instead of a generic checklist.",
      },
    ],
    related: ["/termsandconditions", "/privacy", "/pro"],
  },
  {
    slug: "termsandconditions",
    href: "/termsandconditions",
    category: "Legal",
    eyebrow: "Terms & Conditions",
    title: "Clear rules for using Quietly AI responsibly.",
    summary:
      "Quietly AI is a real-time assistant for meetings, interviews, classes, and sales calls. The terms page explains acceptable use, account responsibilities, and workspace ownership.",
    primaryCta: "Read privacy policy",
    sections: [
      {
        heading: "Responsible assistance",
        body:
          "Use Quietly AI to understand conversations, remember details, and prepare stronger responses. Users remain responsible for how they disclose, record, and apply AI-generated suggestions.",
      },
      {
        heading: "Workspace ownership",
        body:
          "Team content belongs to the workspace that created it. Admins can define who may access notes, summaries, shared context, and billing settings.",
      },
    ],
    related: ["/privacy", "/security", "/ai-meeting-assistant"],
  },
  {
    slug: "ai-interview-assistant",
    href: "/ai-interview-assistant",
    category: "Resources",
    eyebrow: "Interview Copilot",
    title: "A real-time AI interview assistant for technical screens.",
    summary:
      "Quietly AI helps candidates keep structure during live interviews by breaking down prompts, surfacing trade-offs, and turning pressure into a clear answer plan.",
    primaryCta: "See Quietly AI Pro in action",
    sections: [
      {
        heading: "Answer with structure",
        body:
          "Instead of dumping generic code, Quietly AI frames the problem, names constraints, suggests a plan, and reminds you to explain complexity and edge cases out loud.",
        bullets: ["Problem breakdown", "System design scaffolding", "Behavioral answer prompts"],
      },
      {
        heading: "Use your own context",
        body:
          "Quietly AI Pro can ground answers in your resume, target job description, and notes so your responses sound like your actual experience instead of a public template.",
      },
    ],
    related: ["/ai-coding-interview-helper", "/local-ai-coding-assistant", "/blog/ai-interview-assistant-guide"],
  },
  {
    slug: "ai-coding-interview-helper",
    href: "/ai-coding-interview-helper",
    category: "Resources",
    eyebrow: "Coding Interview Helper",
    title: "Keep the coding interview moving without losing your reasoning.",
    summary:
      "Quietly AI turns live prompts into implementation steps, test cases, and explanation cues so you can keep talking while you solve.",
    primaryCta: "Explore interview mode",
    sections: [
      {
        heading: "From prompt to plan",
        body:
          "When a graph, dynamic programming, or data structure question appears, Quietly AI helps identify the likely pattern and the decision points you should explain.",
      },
      {
        heading: "Better communication",
        body:
          "The goal is not to replace your thinking. It is to help you narrate assumptions, trade-offs, and tests with more confidence under time pressure.",
      },
    ],
    related: ["/ai-interview-assistant", "/ai-assistant-for-coding-interviews", "/blog/how-ai-can-help-with-coding-interviews"],
  },
  {
    slug: "local-ai-assistant",
    href: "/local-ai-assistant",
    category: "Resources",
    eyebrow: "Local AI Assistant",
    title: "A private AI assistant that works close to your device.",
    summary:
      "Quietly AI is designed around local-first workflows for people who want answers, notes, and context without sending everything to a meeting bot.",
    primaryCta: "View privacy model",
    sections: [
      {
        heading: "Why local matters",
        body:
          "Meetings often contain confidential product plans, customer details, compensation ranges, or interview material. Local processing reduces exposure and keeps the assistant available even on unstable networks.",
      },
      {
        heading: "Cloud when you choose it",
        body:
          "Teams can still use managed models when they want higher intelligence. Quietly AI keeps that choice explicit and context-aware.",
      },
    ],
    related: ["/privacy", "/security", "/local-ai-coding-assistant"],
  },
  {
    slug: "ai-assistant-for-coding-interviews",
    href: "/ai-assistant-for-coding-interviews",
    category: "Resources",
    eyebrow: "Coding Exams",
    title: "AI help for coding exams, practice loops, and timed screens.",
    summary:
      "Quietly AI helps you practice the habits that matter in coding exams: clarifying constraints, choosing an approach, testing edge cases, and explaining complexity.",
    primaryCta: "Read the coding guide",
    sections: [
      {
        heading: "Practice with feedback",
        body:
          "Use Quietly AI to create follow-up questions after a practice problem, then compare your explanation against a concise answer structure.",
      },
      {
        heading: "Stay calm under time",
        body:
          "When a timed exercise gets tense, Quietly AI keeps the next step visible: define inputs, choose the data structure, write tests, then optimize.",
      },
    ],
    related: ["/ai-coding-interview-helper", "/blog/how-ai-can-help-with-coding-interviews", "/ai-tools-for-technical-interviews"],
  },
  {
    slug: "how-ai-helps-in-coding-interviews",
    href: "/how-ai-helps-in-coding-interviews",
    category: "Resources",
    eyebrow: "How AI Helps",
    title: "How AI helps you communicate stronger engineering judgment.",
    summary:
      "The best interview assistance is not just an answer. Quietly AI helps you reveal your process, explain trade-offs, and recover quickly when a question changes.",
    primaryCta: "Open interview guide",
    sections: [
      {
        heading: "More than syntax",
        body:
          "Quietly AI can remind you why an approach works, where it fails, and what complexity you should mention before the interviewer asks.",
      },
      {
        heading: "Better follow-ups",
        body:
          "After the first answer, Quietly AI can suggest thoughtful follow-up questions about scale, constraints, and production behavior.",
      },
    ],
    related: ["/ai-interview-assistant", "/local-ai-coding-assistant", "/blog/how-ai-interview-assistants-work"],
  },
  {
    slug: "local-ai-coding-assistant",
    href: "/local-ai-coding-assistant",
    category: "Resources",
    eyebrow: "Local Coding Copilot",
    title: "A coding copilot designed for private live contexts.",
    summary:
      "Quietly AI gives developers a discreet, context-aware helper for live debugging, architecture discussions, and interview-style coding.",
    primaryCta: "Explore local AI",
    sections: [
      {
        heading: "Private by default",
        body:
          "Local coding assistance is useful when source code, architecture diagrams, or interview prompts should not be streamed to an unknown service.",
      },
      {
        heading: "Practical responses",
        body:
          "Quietly AI focuses on concise next steps: what to inspect, what to test, and how to explain the likely issue to another engineer.",
      },
    ],
    related: ["/local-ai-assistant", "/ai-coding-interview-helper", "/security"],
  },
  {
    slug: "ai-tools-for-technical-interviews",
    href: "/ai-tools-for-technical-interviews",
    category: "Resources",
    eyebrow: "Technical AI Tools",
    title: "What to look for in technical interview AI tools.",
    summary:
      "A useful interview tool should be fast, private, explainable, and grounded in your background. Quietly AI is shaped around those four requirements.",
    primaryCta: "Compare Quietly AI Pro",
    sections: [
      {
        heading: "Speed and context",
        body:
          "Latency matters when someone is waiting for your answer. The tool should capture context quickly and produce a short, usable plan.",
      },
      {
        heading: "Trust and fit",
        body:
          "The best tool helps you sound like yourself. Quietly AI Pro uses your resume and role context so suggestions match the story you are actually trying to tell.",
      },
    ],
    related: ["/pro", "/ai-interview-assistant", "/blog/best-ai-tools-for-coding-interviews"],
  },
  {
    slug: "ai-meeting-assistant",
    href: "/ai-meeting-assistant",
    category: "Meeting AI",
    eyebrow: "Meeting Assistant",
    title: "Meeting AI that helps during the call, not after.",
    summary:
      "Quietly AI listens locally, captures decisions, and gives you answers while the conversation is still happening.",
    primaryCta: "See meeting workflow",
    sections: [
      {
        heading: "Live help",
        body:
          "Ask Quietly AI for a recap, a clearer answer, a follow-up question, or a decision summary without breaking the meeting flow.",
      },
      {
        heading: "Clean notes",
        body:
          "After the call, Quietly AI turns the conversation into structured notes with owners, dates, open risks, and next steps.",
      },
    ],
    related: ["/ai-note-taker", "/sales-call-assistant", "/privacy"],
  },
  {
    slug: "ai-note-taker",
    href: "/ai-note-taker",
    category: "Meeting AI",
    eyebrow: "AI Note Taker",
    title: "Automatic notes without adding a meeting bot.",
    summary:
      "Quietly AI captures useful meeting notes from your side of the call, then organizes the output into summary, action items, and decisions.",
    primaryCta: "Try meeting notes",
    sections: [
      {
        heading: "Notes people can scan",
        body:
          "Quietly AI prioritizes clear sections over raw transcript dumps: summary, decisions, action items, blockers, owners, and follow-ups.",
      },
      {
        heading: "Invisible to the room",
        body:
          "Because Quietly AI does not need to join as a participant, teammates do not have to manage another bot tile on every calendar invite.",
      },
    ],
    related: ["/ai-meeting-assistant", "/fireflies-alternative", "/otter-alternative"],
  },
  {
    slug: "sales-call-assistant",
    href: "/sales-call-assistant",
    category: "Meeting AI",
    eyebrow: "Sales Assistant",
    title: "Live sales coaching for discovery, objections, and next steps.",
    summary:
      "Quietly AI tracks buyer language, pricing concerns, urgency, and decision-maker signals so reps can respond with more precision.",
    primaryCta: "Explore sales mode",
    sections: [
      {
        heading: "Objection support",
        body:
          "When a prospect raises pricing, timing, security, or migration concerns, Quietly AI surfaces a concise talk track and a follow-up question.",
      },
      {
        heading: "Cleaner handoff",
        body:
          "After the call, Quietly AI summarizes pain points, deal risks, next steps, and the exact language the customer used.",
      },
    ],
    related: ["/ai-meeting-assistant", "/ai-note-taker", "/blog/local-ai-vs-cloud-ai-assistants"],
  },
  {
    slug: "lecture-note-taker",
    href: "/lecture-note-taker",
    category: "Meeting AI",
    eyebrow: "Lecture Notes",
    title: "Lecture notes that become searchable study material.",
    summary:
      "Quietly AI turns classes, workshops, and training calls into clean notes with definitions, examples, and review prompts.",
    primaryCta: "Explore lecture mode",
    sections: [
      {
        heading: "Capture the structure",
        body:
          "Quietly AI separates concepts, examples, formulas, and instructor emphasis so the final notes are useful when you study later.",
      },
      {
        heading: "Ask while learning",
        body:
          "During the lecture, ask Quietly AI to simplify a concept, produce an analogy, or recap the last five minutes.",
      },
    ],
    related: ["/ai-meeting-assistant", "/local-ai-assistant", "/blog/preparing-for-technical-interviews-with-ai"],
  },
  {
    slug: "fireflies-alternative",
    href: "/fireflies-alternative",
    category: "Meeting AI",
    eyebrow: "Alternative",
    title: "A Quietly AI alternative for teams that do not want meeting bots.",
    summary:
      "If your team wants private notes and real-time help without adding another participant to every call, Quietly AI is built for that workflow.",
    primaryCta: "Compare meeting AI",
    sections: [
      {
        heading: "No bot tile",
        body:
          "Quietly AI assists from your device, avoiding the friction of external bot approvals, visible attendees, and awkward recording reminders.",
      },
      {
        heading: "Help during the call",
        body:
          "Many note tools focus on after-the-fact summaries. Quietly AI also helps you answer questions, clarify points, and remember context live.",
      },
    ],
    related: ["/ai-note-taker", "/otter-alternative", "/ai-meeting-assistant"],
  },
  {
    slug: "otter-alternative",
    href: "/otter-alternative",
    category: "Meeting AI",
    eyebrow: "Alternative",
    title: "A real-time Quietly AI alternative for transcription-first tools.",
    summary:
      "Quietly AI combines transcription, notes, and live AI assistance so the meeting output is useful before and after the call ends.",
    primaryCta: "See Quietly AI notes",
    sections: [
      {
        heading: "Beyond transcripts",
        body:
          "Raw transcript search is helpful, but teams need decisions, action items, risks, and follow-ups. Quietly AI turns the conversation into those artifacts.",
      },
      {
        heading: "Private live context",
        body:
          "Quietly AI can help you formulate answers while the call is happening, using visible context and conversation history from your side.",
      },
    ],
    related: ["/ai-note-taker", "/fireflies-alternative", "/privacy"],
  },
] as const;

const blogPages: readonly ContentPage[] = [
  {
    slug: "ai-interview-assistant-guide",
    href: "/blog/ai-interview-assistant-guide",
    category: "Blog",
    eyebrow: "Guide",
    title: "The Quietly AI guide to using an AI interview assistant.",
    summary:
      "A practical guide to using real-time AI assistance without losing your own voice, judgment, or preparation discipline.",
    primaryCta: "Open interview copilot",
    sections: [
      {
        heading: "Use AI as structure, not a script",
        body:
          "Quietly AI is most useful when it keeps your answer organized: clarify the problem, state assumptions, choose an approach, test edge cases, and explain trade-offs.",
      },
      {
        heading: "Prepare your context",
        body:
          "Before the call, load resume highlights, role requirements, and projects you want to emphasize. The assistant can then suggest answers that fit your real background.",
      },
    ],
    related: ["/ai-interview-assistant", "/ai-coding-interview-helper", "/pro"],
  },
  {
    slug: "local-ai-vs-cloud-ai-assistants",
    href: "/blog/local-ai-vs-cloud-ai-assistants",
    category: "Blog",
    eyebrow: "Local vs Cloud",
    title: "Local vs cloud AI assistants: what teams should consider.",
    summary:
      "Local AI gives privacy and resilience. Cloud AI gives stronger models and managed infrastructure. Quietly AI supports workflows that can use both intentionally.",
    primaryCta: "Explore local AI",
    sections: [
      {
        heading: "Choose local for sensitive moments",
        body:
          "Interviews, customer calls, legal discussions, and internal planning often deserve local processing first because the raw context is sensitive.",
      },
      {
        heading: "Use cloud for maximum intelligence",
        body:
          "For deeper reasoning, company research, and larger context windows, managed models can be valuable. Quietly AI makes that trade-off explicit.",
      },
    ],
    related: ["/local-ai-assistant", "/security", "/privacy"],
  },
  {
    slug: "how-ai-can-help-with-coding-interviews",
    href: "/blog/how-ai-can-help-with-coding-interviews",
    category: "Blog",
    eyebrow: "Coding Interviews",
    title: "How AI can help with coding interviews without taking over.",
    summary:
      "The best coding interview support improves your process: problem framing, test coverage, edge cases, and explanation quality.",
    primaryCta: "Read coding helper",
    sections: [
      {
        heading: "Expose the reasoning",
        body:
          "Quietly AI can remind you to say why a data structure fits, what the runtime is, and how you would test failure cases.",
      },
      {
        heading: "Recover from stalls",
        body:
          "If you get stuck, ask for a hint or a smaller subproblem. That keeps the conversation collaborative instead of silent.",
      },
    ],
    related: ["/ai-coding-interview-helper", "/ai-assistant-for-coding-interviews", "/ai-interview-assistant"],
  },
  {
    slug: "how-ai-interview-assistants-work",
    href: "/blog/how-ai-interview-assistants-work",
    category: "Blog",
    eyebrow: "Explainer",
    title: "How real-time interview copilots work.",
    summary:
      "A real-time copilot combines screen context, audio transcription, prompt routing, and short response generation into a quiet assistant loop.",
    primaryCta: "See live simulation",
    sections: [
      {
        heading: "Listen and understand",
        body:
          "The assistant turns conversation into structured context, then identifies whether the user needs an answer, recap, clarification, or follow-up.",
      },
      {
        heading: "Respond in small pieces",
        body:
          "Good copilots avoid long essays. Quietly AI produces compact suggestions that can be read quickly while the conversation continues.",
      },
    ],
    related: ["/pro", "/ai-interview-assistant", "/how-ai-helps-in-coding-interviews"],
  },
  {
    slug: "best-ai-tools-for-coding-interviews",
    href: "/blog/best-ai-tools-for-coding-interviews",
    category: "Blog",
    eyebrow: "Tools",
    title: "Top AI tools for technical interviews in 2026.",
    summary:
      "The strongest tools are fast, private, context-aware, and built around explanation rather than answer dumping.",
    primaryCta: "Compare Quietly AI",
    sections: [
      {
        heading: "Evaluation criteria",
        body:
          "Look for latency, local processing options, resume context, code reasoning, system design support, and a UI that does not interrupt the call.",
      },
      {
        heading: "Where Quietly AI fits",
        body:
          "Quietly AI focuses on live assistance across interviews, meetings, sales calls, and lectures, with Pro context for resume and company-specific answers.",
      },
    ],
    related: ["/ai-tools-for-technical-interviews", "/pro", "/local-ai-assistant"],
  },
  {
    slug: "preparing-for-technical-interviews-with-ai",
    href: "/blog/preparing-for-technical-interviews-with-ai",
    category: "Blog",
    eyebrow: "Preparation",
    title: "Preparing for technical screenings with Quietly AI.",
    summary:
      "Use Quietly AI before the interview to rehearse explanations, organize project stories, and practice the questions that usually cause hesitation.",
    primaryCta: "Start preparing",
    sections: [
      {
        heading: "Build your answer bank",
        body:
          "Add your projects, metrics, technologies, and role requirements. Then practice concise answers for architecture, debugging, conflict, and impact questions.",
      },
      {
        heading: "Rehearse follow-ups",
        body:
          "Quietly AI can generate interviewer-style follow-ups so you practice adapting, not just memorizing one polished response.",
      },
    ],
    related: ["/ai-interview-assistant", "/lecture-note-taker", "/blog/ai-interview-assistant-guide"],
  },
] as const;

function indexBySlug(pages: readonly ContentPage[]) {
  const result: Record<string, ContentPage> = {};

  for (const page of pages) {
    result[page.slug] = page;
  }

  return result;
}

function indexByHref(pages: readonly ContentPage[]) {
  const result: Record<string, ContentPage> = {};

  for (const page of pages) {
    result[page.href] = page;
  }

  return result;
}

export const rootContentPages = indexBySlug(rootPages);
export const blogContentPages = indexBySlug(blogPages);
export const allContentPagesByHref = indexByHref([...rootPages, ...blogPages]);
