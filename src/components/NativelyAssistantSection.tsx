"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { assistantRouteLinks } from "@/lib/quietly-content";

type AssistantCard = Readonly<{
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: ReactNode;
  accent: "emerald" | "blue" | "violet" | "amber";
  mockup: ReactNode;
}>;

type RevealProps = Readonly<{
  children: ReactNode;
  className?: string;
  delayClassName?: string;
}>;

const cards: readonly AssistantCard[] = [
  {
    title: "Job interviews",
    description:
      "Real-time coding, system design, and behavioral help on live interviews.",
    cta: "Explore Interview Copilot",
    href: assistantRouteLinks.interviews,
    icon: <Briefcase className="size-[15px]" aria-hidden="true" />,
    accent: "emerald",
    mockup: <InterviewMockup />,
  },
  {
    title: "Meetings",
    description:
      "Live transcription, instant answers, and automatic notes for any call.",
    cta: "Explore Meeting Assistant",
    href: assistantRouteLinks.meetings,
    icon: <Users className="size-[15px]" aria-hidden="true" />,
    accent: "blue",
    mockup: <MeetingMockup />,
  },
  {
    title: "Sales calls",
    description:
      "On-call objection handling and talk tracks, invisible to the prospect.",
    cta: "Explore Sales Assistant",
    href: assistantRouteLinks.sales,
    icon: <TrendingUp className="size-[15px]" aria-hidden="true" />,
    accent: "violet",
    mockup: <SalesMockup />,
  },
  {
    title: "Lectures",
    description:
      "Transcribe and summarize classes offline, searchable all semester.",
    cta: "Explore Lecture Notes",
    href: assistantRouteLinks.lectures,
    icon: <GraduationCap className="size-[15px]" aria-hidden="true" />,
    accent: "amber",
    mockup: <LectureMockup />,
  },
] as const;

const accentOverlay = {
  emerald:
    "bg-[radial-gradient(circle_at_10%_10%,rgba(16,185,129,0.04)_0%,transparent_65%)]",
  blue: "bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.04)_0%,transparent_65%)]",
  violet:
    "bg-[radial-gradient(circle_at_10%_10%,rgba(139,92,246,0.04)_0%,transparent_65%)]",
  amber:
    "bg-[radial-gradient(circle_at_10%_10%,rgba(245,158,11,0.04)_0%,transparent_65%)]",
} as const;

function NativelyReveal({
  children,
  className,
  delayClassName,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsRevealed(true);
        observer.unobserve(node);
      },
      {
        rootMargin: "0px 0px -4% 0px",
        threshold: 0.06,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "h-full transform-gpu transition-[opacity,transform,filter] duration-[1150ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform,filter] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none",
        delayClassName,
        isRevealed
          ? "translate-y-0 scale-100 opacity-100 blur-0"
          : "translate-y-8 scale-[0.985] opacity-0 blur-[10px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ChromeDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="size-2 rounded-full bg-[#FF5F56]/80" />
      <span className="size-2 rounded-full bg-[#FFBD2E]/80" />
      <span className="size-2 rounded-full bg-[#27C93F]/80" />
    </div>
  );
}

function MiniSpark() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="relative z-10 text-white"
      aria-hidden="true"
    >
      <path d="M12 2 14.8 9.2 22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z" />
    </svg>
  );
}

function MiniCheck() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      className="relative z-10 text-white"
      aria-hidden="true"
    >
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

function ActionBadge({
  label,
  color,
  icon = "spark",
}: Readonly<{
  label: string;
  color: "emerald" | "blue" | "violet" | "amber";
  icon?: "spark" | "check";
}>) {
  const classes = {
    emerald:
      "from-emerald-400 to-emerald-600 shadow-[0_4px_10px_rgba(16,185,129,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)]",
    blue: "from-blue-400 to-blue-600 shadow-[0_4px_10px_rgba(59,130,246,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)]",
    violet:
      "from-violet-400 to-violet-600 shadow-[0_4px_10px_rgba(139,92,246,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)]",
    amber:
      "from-amber-400 to-amber-600 shadow-[0_4px_10px_rgba(245,158,11,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)]",
  } as const;

  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1 overflow-hidden rounded-full bg-gradient-to-br px-2 py-0.5 text-[8.5px] font-bold text-white",
        classes[color],
      )}
    >
      <span
        className="pointer-events-none absolute top-0.5 right-1 left-1 h-[45%] rounded-full bg-gradient-to-b from-white/50 to-white/5 blur-[0.3px]"
        aria-hidden="true"
      />
      {icon === "check" ? <MiniCheck /> : <MiniSpark />}
      <span className="relative z-10 text-[7px] uppercase">{label}</span>
    </span>
  );
}

function CardIcon({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-700 shadow-sm">
      {children}
    </span>
  );
}

function VoiceBars() {
  const bars = Array.from({ length: 6 }, (_, index) => index);

  return (
    <span className="flex h-3.5 items-center gap-[1.5px] rounded-md border border-slate-100 bg-slate-50 px-1">
      {bars.map((index) => (
        <span
          key={index}
          className="natively-voice-bar h-full w-[1.2px] rounded-full bg-blue-500"
        />
      ))}
    </span>
  );
}

function AssistantCard({ card }: Readonly<{ card: AssistantCard }>) {
  return (
    <Link
      href={card.href}
      className="natively-card-shadow group relative flex h-[390px] flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200/40 bg-[#F2F4F8] text-[#111827] transition-all duration-300 hover:-translate-y-2 hover:border-slate-300/60 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          accentOverlay[card.accent],
        )}
        aria-hidden="true"
      />

      <div className="relative z-10 shrink-0 p-4 pb-0">
        {card.mockup}
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between p-6 pb-7">
        <div>
          <div className="mb-2.5 flex items-center gap-2.5">
            <CardIcon>{card.icon}</CardIcon>
            <h3 className="text-[17px] leading-6 font-semibold text-slate-900 transition-colors duration-200">
              {card.title}
            </h3>
          </div>
          <p className="text-[13px] leading-relaxed text-slate-500">
            {card.description}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-700 transition-colors duration-200 group-hover:text-slate-900">
          <span>{card.cta}</span>
          <ArrowRight
            className="size-[13px] transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}

function InterviewMockup() {
  return (
    <div className="relative flex h-[140px] w-full select-none flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-[#090D16] p-4">
      <div
        className="pointer-events-none absolute top-0 left-0 h-[40%] w-full bg-gradient-to-b from-white/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-emerald-500/10 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="natively-scan-line pointer-events-none absolute inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
        aria-hidden="true"
      />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <ChromeDots />
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            <span className="font-mono text-[7.5px] font-bold text-emerald-500 uppercase">
              ACTIVE
            </span>
          </div>
        </div>
        <div className="space-y-0.5 font-mono text-[9.5px] leading-normal text-slate-400">
          <p>
            <span className="text-pink-500">const</span> path = (root) =&gt; {"{"}
          </p>
          <p className="pl-3">
            <span className="text-pink-500">if</span> (!root){" "}
            <span className="text-pink-500">return</span> [];
          </p>
          <p className="pl-3">
            visited.add(root);
            <span className="ml-0.5 inline-block h-3 w-1 align-middle bg-emerald-400" />
          </p>
          <p>{"};"}</p>
        </div>
      </div>
      <div className="natively-float-a relative z-10 origin-bottom-left rounded-xl border border-emerald-500/10 bg-white/95 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <div className="mb-1 flex items-center gap-1.5">
          <ActionBadge label="Copilot" color="emerald" />
        </div>
        <p className="text-[10px] leading-snug font-semibold text-slate-800">
          Use BFS to optimize search queries.
        </p>
      </div>
    </div>
  );
}

function MeetingMockup() {
  return (
    <div className="relative flex h-[140px] w-full select-none flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-4">
      <div
        className="pointer-events-none absolute top-0 left-0 h-[40%] w-full bg-gradient-to-b from-white/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-blue-500/5 blur-2xl"
        aria-hidden="true"
      />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <ChromeDots />
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-red-500 motion-safe:animate-pulse" />
            <span className="text-[7.5px] font-bold text-red-500">
              LIVE TRANSCRIBING
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="relative grid size-[22px] place-items-center rounded-full bg-blue-100 text-[9px] font-bold text-blue-600">
              <span className="absolute inset-0 rounded-full bg-blue-500/20 motion-safe:animate-ping" />
              <span className="relative z-10">A</span>
            </span>
            <span className="text-[9.5px] font-semibold text-slate-800">
              Alex
            </span>
            <VoiceBars />
          </div>
          <p className="pl-7 text-[9.5px] leading-normal text-slate-500">
            &quot;We need to sync the design mockups next week.&quot;
          </p>
        </div>
      </div>
      <div className="natively-float-b relative z-10 origin-top-right rounded-xl border border-blue-500/10 bg-white/95 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <div className="mb-1 flex items-center gap-1.5">
          <ActionBadge label="Note" color="blue" icon="check" />
        </div>
        <p className="text-[10px] leading-snug font-semibold text-slate-800">
          Alex to present Figma layout on Monday.
        </p>
      </div>
    </div>
  );
}

function SalesMockup() {
  return (
    <div className="relative flex h-[140px] w-full select-none flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-[#090D16] p-4">
      <div
        className="pointer-events-none absolute top-0 left-0 h-[40%] w-full bg-gradient-to-b from-white/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-violet-500/10 blur-2xl"
        aria-hidden="true"
      />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <ChromeDots />
          <div className="flex items-center gap-1 font-mono text-[8px] text-violet-400">
            <span className="size-1.5 rounded-full bg-violet-500 motion-safe:animate-ping" />
            <span>00:42</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[8.5px] font-bold text-slate-500 uppercase">
            Prospect Objection
          </p>
          <p className="text-[9.5px] leading-snug text-slate-300 italic">
            &quot;The pricing model isn&apos;t clear to us.&quot;
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-[7px] font-bold text-slate-500 uppercase">
              Confidence
            </span>
            <span className="relative h-1 w-16 overflow-hidden rounded-full bg-slate-800">
              <span className="natively-confidence absolute top-0 bottom-0 left-0 rounded-full bg-violet-400" />
            </span>
          </div>
        </div>
      </div>
      <div className="natively-float-c relative z-10 origin-bottom-right rounded-xl border border-violet-500/10 bg-white/95 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <div className="mb-1 flex items-center gap-1.5">
          <ActionBadge label="Coaching" color="violet" />
        </div>
        <p className="text-[10px] leading-snug font-semibold text-slate-800">
          Highlight 80% cost savings with local execution.
        </p>
      </div>
    </div>
  );
}

function LectureMockup() {
  return (
    <div className="relative flex h-[140px] w-full select-none flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:100%_16px] p-4">
      <div
        className="pointer-events-none absolute top-0 left-0 h-[40%] w-full bg-gradient-to-b from-white/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-amber-500/5 blur-2xl"
        aria-hidden="true"
      />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <ChromeDots />
          <span className="font-mono text-[8px] font-bold text-amber-600/70">
            GRID
          </span>
        </div>
        <div className="space-y-0.5">
          <p className="text-[8.5px] font-bold text-slate-400 uppercase">
            Notebook
          </p>
          <p className="text-[9.5px] leading-snug font-semibold text-slate-800">
            Distributed System Design
          </p>
          <svg
            className="h-8 w-full overflow-visible text-slate-400"
            viewBox="0 0 100 20"
            aria-hidden="true"
          >
            <line
              x1="20"
              y1="10"
              x2="50"
              y2="10"
              stroke="#E2E8F0"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <line
              x1="50"
              y1="10"
              x2="80"
              y2="10"
              stroke="#E2E8F0"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle className="natively-node-dot" cx="21.2" cy="10" r="1.8" fill="#F59E0B" />
            <circle cx="50" cy="10" r="1.8" fill="#F59E0B" />
            <circle cx="20" cy="10" r="3" fill="#FFF" stroke="#F59E0B" strokeWidth="1" />
            <circle cx="50" cy="10" r="3" fill="#FFF" stroke="#F59E0B" strokeWidth="1" />
            <circle cx="80" cy="10" r="3" fill="#FFF" stroke="#F59E0B" strokeWidth="1" />
          </svg>
        </div>
      </div>
      <div className="natively-float-b relative z-10 origin-top-left rounded-xl border border-amber-500/10 bg-white/95 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <div className="mb-1 flex items-center gap-1.5">
          <ActionBadge label="Summary" color="amber" />
        </div>
        <p className="text-[10px] leading-snug font-semibold text-slate-800">
          Raft splits state machines into isolated subproblems.
        </p>
      </div>
    </div>
  );
}

export function NativelyAssistantSection() {
  return (
    <section
      id="use-cases"
      className="relative overflow-hidden bg-white py-20 text-[#111827] md:py-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1270px] px-5 md:px-6">
        <div className="mb-14 text-center md:mb-20">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-slate-100/80 bg-slate-50 px-3 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase sm:text-[11px]">
              Versatility
            </span>
          </div>
          <h2 className="font-serif mx-auto mb-5 max-w-[900px] text-center text-[40px] leading-none font-medium text-black sm:text-[64px] md:text-[82px] lg:text-[96px]">
            One assistant for every{" "}
            <br className="hidden sm:block" />
            <span className="font-serif italic text-slate-700">
              conversation
            </span>
          </h2>
          <p className="mx-auto max-w-[46ch] text-[16px] leading-relaxed text-[#6B7280] md:text-[18px]">
            Quietly AI is an AI interview copilot and a meeting assistant in one
            app — local, private, and real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {cards.map((card, index) => (
            <NativelyReveal
              key={card.title}
              delayClassName={
                index === 0
                  ? "delay-100"
                  : index === 1
                    ? "delay-[190ms]"
                    : index === 2
                      ? "delay-[280ms]"
                      : "delay-[370ms]"
              }
            >
              <AssistantCard card={card} />
            </NativelyReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
