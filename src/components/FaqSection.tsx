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
    question: "What does Quietly AI do during a live meeting?",
    answer:
      "Quietly AI listens alongside you, understands the conversation, and gives you useful answers while the meeting is still happening. It can surface context, suggest responses, capture action items, and help you stay ready without interrupting the call.",
  },
  {
    question: "How is Quietly AI different from a normal AI notetaker?",
    answer:
      "Most AI notetakers summarize the meeting after it ends. Quietly AI is built for the moment itself, so it can help with live questions, objections, follow-ups, and decisions while you are still talking.",
  },
  {
    question: "Can other people see Quietly AI on my screen?",
    answer:
      "Quietly AI is designed to stay visible only to you. It does not join as a meeting participant, and its overlay is built to stay out of recordings and screen shares so you can use it discreetly during calls.",
  },
  {
    question: "Does Quietly AI create meeting notes too?",
    answer:
      "Yes. Quietly AI can turn the conversation into clean notes, summaries, action items, and follow-ups after the meeting. You get both live assistance during the call and organized notes when it is done.",
  },
  {
    question: "Which meeting apps does Quietly AI work with?",
    answer:
      "Quietly AI works with major meeting platforms including Zoom, Google Meet, Microsoft Teams, Webex, and Slack calls. It is built for everyday calls, interviews, sales meetings, lectures, and client conversations.",
  },
  {
    question: "Who should use Quietly AI?",
    answer:
      "Quietly AI is for anyone who needs to perform better in conversations: founders, sales teams, recruiters, consultants, students, managers, and operators who want real-time support without losing focus.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white pb-20 text-black md:pb-28 lg:pb-32">
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
