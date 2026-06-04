"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "Why real-time vs. a regular AI notetaker?",
    answer:
      "Unlike regular AI notetakers like Otter or Granola that work after your meeting ends, Cluely provides real-time meeting intelligence during your calls. While other AI meeting assistants create meeting summaries afterward, Cluely helps you answer technical questions, handle objections, and perform better during high-stakes conversations.",
  },
  {
    question: "Who is Cluely for?",
    answer:
      "Cluely is perfect for students, professionals, sales teams, recruiters, consultants, executives, and anyone who needs to perform well in meetings. If you're in back-to-back sales calls, lectures, or client meetings where you can't afford to look unprepared, Cluely delivers you answers at moments when you most need them.",
  },
  {
    question: "Is Cluely free?",
    answer:
      "Yes, you can use Cluely's AI meeting assistant for free, and you will have limited access to all core Cluely features. The pro plan gives you access to unlimited meeting notes and unlimited AI responses with Cluely.",
  },
  {
    question: "How is it undetectable in meetings?",
    answer:
      "Unlike other meeting AI tools, it never joins your calls as a participant, doesn't appear in meeting recordings, and won't show up in screen shares (limitations here). It captures meeting audio in the background and provides a discreet, translucent overlay that only you can see--making it completely undetectable to other meeting participants.",
  },
  {
    question: "What languages and apps are supported?",
    answer:
      "Cluely's AI meeting assistant works with all major meeting platforms including Zoom, Microsoft Teams, Webex, and Slack calls. It supports English and major international languages for meeting transcription and real-time insights.",
  },
  {
    question: "Can I talk to customer support?",
    answer:
      "Yes, our support team is available to help you get the most out of your AI meeting assistant. You can reach out via live chat, email, or through the support center. We provide technical support and help with optimizing Cluely for your specific meeting and sales workflows.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 md:px-8">
        <ScrollReveal>
          <h2 className="mb-6 text-[28px] leading-tight font-medium text-black md:text-[40px] md:leading-[50px]">
            Frequently asked questions
          </h2>
        </ScrollReveal>
        <ScrollReveal className="text-black" delayClassName="delay-100">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={item.question} className="border-b border-[#e5e7eb]">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left text-sm font-medium text-black transition-colors duration-200 hover:text-black/80 focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-pretty text-[18px] leading-snug font-medium md:text-[20px] md:leading-[1.125] lg:text-[24px]">
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-5 shrink-0 text-black transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    strokeWidth={1.75}
                  />
                </button>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "grid overflow-hidden transition-all duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] pb-5 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="min-h-0">
                    <p className="max-w-3xl pb-1 text-sm leading-6 font-normal text-black/65 md:text-base md:leading-7">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
