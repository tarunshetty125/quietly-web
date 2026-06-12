import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import {
  allContentPagesByHref,
  type ContentPage,
  type ContentSection,
} from "@/lib/quietly-content";
import { QUIETLY_ICON_SRC } from "@/lib/brand";

export function ContentRoutePage({ page }: Readonly<{ page: ContentPage }>) {
  const articleSections = buildArticleSections(page);
  const faqs = buildFaqs(page);
  const signals = buildSignals(page);
  const comparisonRows = buildComparisonRows(page);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/86 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 w-full max-w-[1180px] items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full text-[20px] leading-none font-semibold text-slate-950 transition-colors hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:outline-none"
          >
            <Image
              src={QUIETLY_ICON_SRC}
              alt=""
              width={30}
              height={30}
              className="size-[30px] rounded-md object-contain"
              priority
            />
            Quietly AI
          </Link>

          <nav
            aria-label="Route navigation"
            className="hidden items-center gap-9 text-[14px] font-medium text-slate-700 md:flex"
          >
            <Link
              href="/"
              className="transition-colors hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:outline-none"
            >
              Home
            </Link>
            <Link
              href="/ai-meeting-assistant"
              className="transition-colors hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:outline-none"
            >
              Meeting AI
            </Link>
            <Link
              href="/blog/ai-interview-assistant-guide"
              className="transition-colors hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:outline-none"
            >
              Blog
            </Link>
            <Link
              href="/pro"
              className="font-semibold text-amber-500 transition-colors hover:text-amber-400 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none"
            >
              Pro
            </Link>
          </nav>

          <Link
            href="/pro"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 text-[13px] font-semibold text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-colors hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:outline-none"
          >
            See Pro
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main className="quietly-route-shell mx-auto w-full max-w-4xl px-6 pt-24 pb-20 md:px-8 md:pt-32 md:pb-28">
        <article>
          <p className="mb-5 inline-flex items-center gap-2 text-[12px] leading-5 font-semibold tracking-[0.18em] text-emerald-500 uppercase">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {page.eyebrow}
          </p>
          <h1 className="max-w-[900px] font-serif text-[44px] leading-[0.96] font-bold tracking-tight text-slate-950 sm:text-[56px] md:text-[64px]">
            {page.title}
          </h1>
          <p className="mt-8 max-w-[850px] text-[18px] leading-8 text-slate-500">
            {page.summary}
          </p>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {signals.map((signal) => (
              <div
                className="rounded-2xl border border-slate-200/60 bg-white/60 px-4 py-3 shadow-[0_14px_34px_rgba(15,23,42,0.035)]"
                key={signal}
              >
                <p className="text-[13px] leading-5 font-semibold text-slate-700">
                  {signal}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 space-y-0">
            {articleSections.map((section) => (
              <section className="quietly-route-block" key={section.heading}>
                <h2 className="mt-12 mb-6 text-[24px] leading-8 font-semibold text-slate-950">
                  {section.heading}
                </h2>
                <p className="text-[16px] leading-[1.65] text-slate-500">
                  {section.body}
                </p>
                {section.bullets ? (
                  <ul className="mt-5 grid gap-3">
                    {section.bullets.map((bullet) => (
                      <li
                        className="flex gap-3 text-[15px] leading-6 text-slate-600"
                        key={bullet}
                      >
                        <CheckCircle2
                          className="mt-1 size-4 shrink-0 text-emerald-500"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {comparisonRows.length > 0 ? (
            <section className="quietly-route-block mt-12 overflow-hidden rounded-2xl border border-slate-200/70">
              <div className="overflow-x-auto">
                <div className="min-w-[620px]">
                  <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-slate-200/70 bg-slate-50/70 px-4 py-3 text-[12px] font-semibold text-slate-500">
                    <span>Feature</span>
                    <span>Quietly AI</span>
                    <span>Typical tools</span>
                  </div>
                  {comparisonRows.map((row) => (
                    <div
                      className="grid grid-cols-[1fr_1fr_1fr] border-b border-slate-100 px-4 py-4 text-[14px] leading-5 last:border-b-0"
                      key={row.feature}
                    >
                      <span className="font-medium text-slate-700">
                        {row.feature}
                      </span>
                      <span className="text-emerald-600">{row.quietly}</span>
                      <span className="text-slate-500">{row.typical}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {faqs.length > 0 ? (
            <section className="quietly-route-block mt-14">
              <h2 className="mb-6 text-[24px] leading-8 font-semibold text-slate-950">
                Frequently asked questions
              </h2>
              <div className="space-y-7">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="mb-3 text-[20px] leading-7 font-medium text-slate-950">
                      {faq.question}
                    </h3>
                    <p className="text-[16px] leading-[1.65] text-slate-500">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="quietly-route-block mt-16 rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.045)] sm:p-8">
            <h2 className="mb-4 text-[24px] leading-8 font-bold text-slate-950">
              Ready to try Quietly AI?
            </h2>
            <p className="mb-6 max-w-2xl text-[16px] leading-7 text-slate-500">
              Use Quietly AI as a private real-time layer for meetings,
              interviews, classes, and sales calls without adding noise to the
              conversation.
            </p>
            <Link
              href="/pro"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-8 text-[14px] font-medium text-white shadow-[0_14px_36px_rgba(15,23,42,0.18)] transition-colors hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:outline-none sm:w-auto"
            >
              {page.primaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </section>

          <section className="quietly-route-block mt-12" id="related">
            <h2 className="mb-5 text-[24px] leading-8 font-semibold text-slate-950">
              Related reading
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {page.related.map((href) => {
                const related = allContentPagesByHref[href];

                return (
                  <Link
                    href={href}
                    className="group block rounded-2xl border border-slate-200/60 bg-white/50 px-4 py-3 text-slate-950 transition-colors hover:border-emerald-500/40 hover:bg-white focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:outline-none"
                    key={href}
                  >
                    <span className="flex items-center justify-between gap-4 text-[15px] leading-6 font-medium">
                      {related?.eyebrow ?? "Quietly AI Pro"}
                      <ArrowRight
                        className="size-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-emerald-500"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}

function buildArticleSections(page: ContentPage): readonly ContentSection[] {
  return [
    ...page.sections,
    ...buildCategorySections(page),
  ];
}

function buildCategorySections(page: ContentPage): readonly ContentSection[] {
  if (page.category === "Meeting AI") {
    return [
      {
        heading: "What happens while the call is live",
        body: `${page.eyebrow} mode keeps a compact running memory of the conversation, then turns that context into useful prompts while people are still speaking. Instead of waiting for a transcript after the call, Quietly AI can surface a recap, a careful answer, or the next question in the moment.`,
        bullets: [
          "Live transcript context without a visible meeting bot",
          "Short answers designed to be read mid-conversation",
          "Meeting notes shaped around decisions, owners, and follow-ups",
        ],
      },
      {
        heading: "Why local-first changes the experience",
        body: "Most meeting assistants ask everyone in the room to accept a bot. Quietly AI is designed around the person using it: capture happens from your device, controls stay in your hands, and sensitive customer or internal context does not need to become a shared bot transcript by default.",
      },
      {
        heading: "The output you should expect",
        body: "A good meeting assistant should not produce a wall of raw text. Quietly AI turns a conversation into a readable summary, action items, risks, open questions, and searchable context you can reuse before the next call.",
      },
      {
        heading: "Best moments to use it",
        body: `${page.eyebrow} mode is useful when the call is moving fast, when a stakeholder asks for a precise answer, or when you need clean notes without losing presence in the conversation.`,
      },
    ];
  }

  if (page.category === "Blog") {
    return [
      {
        heading: "The practical takeaway",
        body: `For Quietly AI users, the point of ${page.eyebrow.toLowerCase()} is not to outsource judgment. It is to reduce the friction between hearing something important and responding with structure, context, and calm.`,
      },
      {
        heading: "How to apply this in real calls",
        body: "Start with a narrow workflow: one interview loop, one recurring team meeting, one sales call type, or one lecture. Add the context you already trust, then let Quietly AI help with summaries, answer outlines, and follow-up questions.",
      },
      {
        heading: "What to avoid",
        body: "Avoid using AI as a script. The strongest results happen when Quietly AI gives you a small, private nudge and you keep the final answer in your own voice.",
        bullets: [
          "Do not read long generated answers word for word",
          "Check sensitive policy requirements before recording or storing notes",
          "Use personal context so suggestions match your real background",
        ],
      },
    ];
  }

  if (page.category === "Resources") {
    return [
      {
        heading: "How Quietly AI supports this workflow",
        body: `${page.eyebrow} support is built around live context. Quietly AI listens for the actual prompt, keeps the answer compact, and helps you move from pressure to a clear next step without breaking eye contact or losing the conversation.`,
        bullets: [
          "Context from the current conversation",
          "Answer structure instead of generic walls of text",
          "Private overlay behavior for high-pressure live moments",
        ],
      },
      {
        heading: "Why developers and operators use it",
        body: "The hard part is rarely knowing one fact. It is recalling the right fact at the right time, explaining the trade-off cleanly, and staying composed while someone waits. Quietly AI is shaped for that narrow, real-time gap.",
      },
      {
        heading: "Local, private, and fast",
        body: "Quietly AI can run close to the device for sensitive workflows, with optional cloud intelligence when you explicitly choose it. That makes the assistant feel immediate while keeping control over what context leaves your machine.",
      },
      {
        heading: "What a good answer looks like",
        body: "A useful answer is short enough to read quickly, specific enough to act on, and grounded enough to sound like you. Quietly AI prioritizes outlines, examples, edge cases, and follow-up prompts over theatrical AI output.",
      },
    ];
  }

  return [
    {
      heading: "Built for responsible use",
      body: "Quietly AI is intended to make live work easier to understand and remember while keeping user control, disclosure requirements, and workspace expectations clear.",
    },
  ];
}

function buildSignals(page: ContentPage): readonly string[] {
  if (page.category === "Meeting AI") {
    return ["Live during calls", "No bot participant", "Structured notes"];
  }

  if (page.category === "Blog") {
    return ["Practical guide", "Private workflow", "Quietly AI context"];
  }

  if (page.category === "Resources") {
    return ["Real-time guidance", "Local-first option", "Screen-aware context"];
  }

  return ["Private by design", "User controlled", "Clear policies"];
}

function buildComparisonRows(
  page: ContentPage,
): readonly {
  feature: string;
  quietly: string;
  typical: string;
}[] {
  if (page.category === "Blog") {
    return [];
  }

  if (page.category === "Meeting AI") {
    return [
      {
        feature: "How it joins",
        quietly: "Runs from your device",
        typical: "Bot appears in the call",
      },
      {
        feature: "When it helps",
        quietly: "During and after the meeting",
        typical: "Mostly after the call",
      },
      {
        feature: "Data control",
        quietly: "Local-first workflow",
        typical: "Vendor cloud transcript",
      },
      {
        feature: "Output",
        quietly: "Answers, notes, risks, owners",
        typical: "Transcript and summary",
      },
    ];
  }

  return [
    {
      feature: "Context",
      quietly: "Current screen, audio, and prep notes",
      typical: "Manual paste into chat",
    },
    {
      feature: "Timing",
      quietly: "Real-time compact prompts",
      typical: "Long answers after the moment",
    },
    {
      feature: "Privacy",
      quietly: "Local-first option",
      typical: "Cloud-only workflow",
    },
    {
      feature: "Voice",
      quietly: "Grounded in your situation",
      typical: "Generic AI response",
    },
  ];
}

function buildFaqs(
  page: ContentPage,
): readonly {
  question: string;
  answer: string;
}[] {
  if (page.category === "Meeting AI") {
    return [
      {
        question: "Does Quietly AI join the meeting as a participant?",
        answer:
          "No. Quietly AI is designed as a private overlay on your device, so it does not need to appear as another attendee just to help you understand and remember the call.",
      },
      {
        question: "Can it help before the meeting ends?",
        answer:
          "Yes. The assistant can recap, draft a response, suggest a follow-up question, or turn the current discussion into structured notes while the conversation is still active.",
      },
      {
        question: "What happens after the call?",
        answer:
          "Quietly AI organizes the meeting into a summary, decisions, action items, risks, and follow-ups so you can share or revisit the important parts quickly.",
      },
    ];
  }

  if (page.category === "Blog") {
    return [
      {
        question: "Is Quietly AI meant to replace preparation?",
        answer:
          "No. It works best when you prepare your context first. The assistant helps retrieve and structure that context during live pressure.",
      },
      {
        question: "Can the same app help with meetings and interviews?",
        answer:
          "Yes. Quietly AI is built around modes, so the same private assistant can adapt to interviews, meetings, sales calls, lectures, and focused work.",
      },
      {
        question: "Why does local AI matter?",
        answer:
          "Local processing can reduce exposure for sensitive audio, screen context, and notes while keeping responses fast enough to use mid-conversation.",
      },
    ];
  }

  if (page.category === "Resources") {
    return [
      {
        question: `What makes Quietly AI useful for ${page.eyebrow.toLowerCase()}?`,
        answer:
          "It is designed for the moment when context is moving quickly. Quietly AI keeps suggestions short, grounded, and easy to translate into your own words.",
      },
      {
        question: "Does it only work with cloud models?",
        answer:
          "No. Quietly AI supports local-first workflows and can use managed models when you choose stronger hosted intelligence for a specific task.",
      },
      {
        question: "How should I use the suggestions?",
        answer:
          "Treat them as structure, not a script. Use the outline, trade-offs, examples, or follow-up prompts, then answer naturally.",
      },
    ];
  }

  return [];
}
