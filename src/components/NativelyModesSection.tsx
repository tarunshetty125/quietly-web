"use client";

import { useState } from "react";
import {
  Check,
  FileText,
  Grid2X2,
  MoreHorizontal,
  Paperclip,
  Plus,
  Upload,
} from "lucide-react";

import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const modes = [
  {
    name: "Co-Pilot",
    prompt:
      "Assist me during live conversations. Summarise context, flag key points, and suggest responses based on what's being said.",
    powered: "Powered by TeamSync's built-in General intelligence.",
  },
  {
    name: "Technical Interview",
    prompt:
      "Break down every answer into: Problem Statement, My Approach, Edge Cases, Time & Space Complexity. Never give raw code without explaining the reasoning.",
    powered: "Powered by TeamSync's built-in Technical Interview intelligence.",
  },
  {
    name: "Sales Mode",
    prompt:
      "Track live signals: budget cues, pain points, objections. Surface recommended closes and next steps in real time during prospect calls.",
    powered: "Powered by TeamSync's built-in Sales intelligence.",
  },
  {
    name: "Recruiting",
    prompt:
      "Correlate candidate responses against the job requisition. Suggest follow-up probes for gaps and surface strong alignment signals.",
    powered: "Powered by TeamSync's built-in Recruiting intelligence.",
  },
  {
    name: "Looking for Work",
    prompt:
      "Coach me on behavioral interview answers using the STAR framework. Lead with business impact. Align every answer to the job description.",
    powered: "Powered by TeamSync's built-in Looking for Work intelligence.",
  },
  {
    name: "Team Meet",
    prompt:
      "Track action items, decisions, and blockers in real time. Assign owners and flag anything that's on the critical path.",
    powered: "Powered by TeamSync's built-in Team Meet intelligence.",
  },
  {
    name: "Lecture Mode",
    prompt:
      "Translate complex concepts into plain language. Generate LaTeX formulas on demand and provide intuitive analogies.",
    powered: "Powered by TeamSync's built-in Lecture intelligence.",
  },
] as const;

function SidebarMode({
  name,
  isActive,
  onClick,
}: Readonly<{
  name: (typeof modes)[number]["name"];
  isActive: boolean;
  onClick: () => void;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-11 shrink-0 snap-start items-center gap-3 rounded-2xl px-4 py-2.5 text-left transition-colors duration-150 hover:bg-black/[0.05] md:px-3",
        isActive ? "bg-black/[0.06]" : "bg-transparent",
      )}
      aria-pressed={isActive}
    >
      <FileText
        className={cn(
          "size-4 shrink-0 stroke-[1.6]",
          isActive ? "text-[#1a202c]" : "text-black/35",
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "truncate text-[13px] leading-5 font-medium",
          isActive ? "text-[#1a202c]" : "text-black/60",
        )}
      >
        {name}
      </span>
    </button>
  );
}

export function NativelyModesSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeMode = modes[activeIndex];

  return (
    <section
      id="natively-modes"
      className="bg-white py-20 text-[#111827] md:py-24"
    >
      <div className="mx-auto w-full max-w-[1270px] px-5 md:px-6">
        <ScrollReveal className="mb-12 flex flex-col items-center text-center">
          <h2 className="font-serif mx-auto max-w-[900px] text-[44px] leading-[1.02] font-medium text-black md:text-[64px] md:leading-[1.275]">
            Seven modes. One AI that listens.
          </h2>
          <p className="mx-auto mt-5 max-w-[621px] text-[16px] leading-[1.625] text-[#6B7280] md:text-[18px]">
            Switch between expert personas built for every professional context.
            Each one rewrites the AI&apos;s instruction set — not just a prompt
            suggestion.
          </p>
        </ScrollReveal>

        <ScrollReveal
          className="mx-auto flex w-full max-w-[800px] justify-center"
          delayClassName="delay-150"
        >
          <div className="group relative flex h-auto min-h-[640px] w-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.02)] md:h-[560px] md:min-h-0 md:flex-row">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(280px_at_0px_0px,rgba(0,0,0,0.024),rgba(0,0,0,0)_80%)] opacity-0 transition-opacity duration-[350ms] ease-[cubic-bezier(.23,1,.32,1)] group-hover:opacity-100" />

            <aside className="relative z-10 flex w-full shrink-0 flex-col border-b border-black/[0.05] bg-[#FAFAFA] md:h-full md:w-[240px] md:border-r md:border-b-0">
              <div className="flex items-center gap-2 px-5 pt-6 pb-3">
                <span className="text-[12px] leading-[18px] font-bold text-[#1a202c]">
                  MODES
                </span>
                <span className="rounded-md bg-[#fff7dc] px-1.5 py-0.5 text-[9px] leading-[14px] font-bold text-[#c9a445]">
                  BETA
                </span>
              </div>

              <div className="px-4 pb-4">
                <button
                  type="button"
                  className="flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-lg bg-white py-2.5 text-[13px] leading-5 font-medium text-black/70 shadow-sm transition-colors hover:bg-black/[0.03]"
                >
                  <Plus className="size-4 text-black/40" aria-hidden="true" />
                  New Mode
                </button>
              </div>

              <div className="scrollbar-none flex flex-1 touch-pan-x snap-x gap-2 overflow-x-auto px-3 py-2 md:flex-col md:gap-0.5 md:overflow-hidden md:py-0">
                {modes.map((mode, index) => (
                  <SidebarMode
                    key={mode.name}
                    name={mode.name}
                    isActive={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>

              <div className="mt-auto hidden items-center gap-2.5 px-5 py-5 md:flex">
                <Grid2X2
                  className="size-4 text-black/25"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span className="text-[13px] leading-5 font-medium text-black/40">
                  TeamSync Templates
                </span>
              </div>
            </aside>

            <div className="relative z-10 flex-1 overflow-y-auto bg-white [scrollbar-color:rgba(0,0,0,0.16)_transparent] [scrollbar-width:thin]">
              <div className="flex min-h-full flex-col gap-6 px-4 py-5 md:px-10 md:py-8">
                <div className="flex shrink-0 flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                  <h3 className="text-[28px] leading-tight font-bold text-[#1a202c] md:text-[32px]">
                    {activeMode.name}
                  </h3>

                  <div className="flex w-full shrink-0 items-center gap-2 md:w-auto">
                    <button
                      type="button"
                      className="flex min-h-[30px] flex-1 items-center justify-center gap-1.5 rounded-full bg-black/[0.04] px-3 py-1.5 text-[12px] leading-[18px] font-medium text-black/60 transition-colors hover:bg-black/[0.06] md:flex-none"
                    >
                      <Check className="size-3.5" aria-hidden="true" />
                      Set active
                    </button>
                    <button
                      type="button"
                      aria-label="More options"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-black/[0.04] text-black/45 transition-colors hover:bg-black/[0.06]"
                    >
                      <MoreHorizontal className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="shrink-0">
                  <p className="mb-3 text-[15px] leading-[22px] font-bold text-[#1a202c]">
                    Real-time prompt
                  </p>
                  <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
                    <div className="min-h-[100px] px-5 py-4">
                      <p className="text-[14px] leading-relaxed text-black/40">
                        {activeMode.prompt}
                      </p>
                    </div>
                    <div className="flex justify-end border-t border-black/10 bg-white px-5 py-2.5">
                      <button
                        type="button"
                        className="text-[13px] leading-5 font-medium text-black/30 transition-colors hover:text-black/50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  <p className="mt-2.5 text-[13px] leading-5 text-black/40">
                    {activeMode.powered}
                  </p>
                </div>

                <div className="shrink-0">
                  <p className="mb-3 text-[15px] leading-[22px] font-bold text-[#1a202c]">
                    Reference files
                  </p>
                  <div className="flex min-h-[149px] flex-col items-center justify-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-10 shadow-sm">
                    <Paperclip
                      className="size-5 text-black/30"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <p className="text-[13px] leading-5 font-medium text-black/50">
                      Add files as real-time context.
                    </p>
                    <button
                      type="button"
                      className="flex h-9 items-center gap-2 rounded-full bg-black/[0.04] px-4 text-[13px] leading-5 font-medium text-[#1a202c] transition-colors hover:bg-black/[0.06]"
                    >
                      <Upload className="size-3.5" aria-hidden="true" />
                      Upload file
                    </button>
                  </div>
                </div>

                <div className="shrink-0 pb-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[15px] leading-[22px] font-bold text-[#1a202c]">
                      Notes template
                    </p>
                    <button
                      type="button"
                      className="text-[13px] leading-5 font-medium text-black/30 transition-colors hover:text-black/50"
                    >
                      Remove template
                    </button>
                  </div>

                  <div className="rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm">
                    <p className="mb-1 text-[16px] leading-6 font-bold text-[#1a202c]">
                      Summary
                    </p>
                    <p className="text-[14px] leading-[21px] text-black/50">
                      High-level summary of the conversation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delayClassName="delay-300">
          <p className="mt-5 text-center text-[13px] leading-[19.5px] text-[#9CA3AF]">
            Each mode hard-overrides the AI&apos;s instruction set — a complete
            persona rewrite, not a prompt suggestion.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
