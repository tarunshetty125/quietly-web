import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Check,
  Database,
  DollarSign,
  FileSearch,
  Layers,
  MessagesSquare,
  Network,
  UserCheck,
} from "lucide-react";

import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

type ProFeature = Readonly<{
  title: string;
  description: string;
  icon: ReactNode;
  badge?: "New" | "Soon";
  visual: ReactNode;
}>;

const proFeatures: readonly ProFeature[] = [
  {
    title: "Modes Manager",
    description:
      "7 expert personas that hard-override the LLM — Technical Interview, Sales, Recruiting, Lecture & more.",
    icon: <Layers className="size-[15px]" aria-hidden="true" />,
    visual: <ModeVisual />,
  },
  {
    title: "Resume Intelligence",
    description:
      "AI ingests your full resume so every answer is grounded in your lived experience, not generic docs.",
    icon: <UserCheck className="size-[15px]" aria-hidden="true" />,
    visual: <ResumeVisual />,
  },
  {
    title: "Custom Context Intelligence",
    description:
      "Provide any custom files or documentation to ground the AI completely in your specific domain knowledge.",
    icon: <Database className="size-[15px]" aria-hidden="true" />,
    visual: <ContextVisual />,
  },
  {
    title: "Negotiation Assistance",
    description:
      "Live salary coaching with real-time counters and anchor strategies based on current market bands.",
    icon: <DollarSign className="size-[15px]" aria-hidden="true" />,
    visual: <NegotiationVisual />,
  },
  {
    title: "System Design",
    description:
      "Chain screenshots for architecture questions. OCR extracts diagrams and renders answers in the invisible overlay.",
    icon: <Network className="size-[15px]" aria-hidden="true" />,
    badge: "New",
    visual: <SystemVisual />,
  },
  {
    title: "Mock Interviews",
    description:
      "Strict hiring-manager persona with STAR coaching and live gap analysis against your identity graph.",
    icon: <MessagesSquare className="size-[15px]" aria-hidden="true" />,
    badge: "Soon",
    visual: <MockVisual />,
  },
  {
    title: "JD Intelligence",
    description:
      "Paste any job description. AI gap-analyzes your profile against the role and surfaces exactly what to highlight.",
    icon: <FileSearch className="size-[15px]" aria-hidden="true" />,
    visual: <DocumentVisual />,
  },
  {
    title: "Company Research",
    description:
      "Real-time intel on culture, market positioning, and salary bands before you walk in.",
    icon: <Building2 className="size-[15px]" aria-hidden="true" />,
    visual: <ResearchVisual />,
  },
] as const;

const featureDelays = [
  "delay-75",
  "delay-100",
  "delay-150",
  "delay-200",
  "delay-[250ms]",
  "delay-300",
  "delay-[350ms]",
  "delay-[400ms]",
] as const;

function CheckIcon() {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/[0.08] shadow-[0_2px_6px_rgba(99,102,241,0.1)]">
      <Check className="size-[9px] text-indigo-500" strokeWidth={2.4} aria-hidden="true" />
    </span>
  );
}

function FeatureIcon({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[12px] border border-indigo-500/20 bg-[linear-gradient(135deg,rgba(99,102,241,0.12)_0%,rgba(99,102,241,0.02)_100%)] text-indigo-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] transition-transform duration-300 group-hover:scale-105">
      {children}
    </div>
  );
}

function FeatureCard({
  feature,
  delayClassName,
}: Readonly<{
  feature: ProFeature;
  delayClassName: string;
}>) {
  return (
    <ScrollReveal className="h-full" delayClassName={delayClassName}>
      <div className="group relative flex h-full cursor-pointer items-start justify-between gap-3 overflow-hidden rounded-[20px] border border-slate-200/40 bg-[#F2F4F8] p-4 shadow-[inset_0_1px_0_rgb(255,255,255),inset_0_-1.5px_0_rgba(0,0,0,0.03),inset_1px_0_0_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-indigo-500/20 hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(240px_at_0px_0px,rgba(0,0,0,0.04),transparent_80%)] opacity-0 transition-opacity duration-[350ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100"
        />
        <div className="relative z-10 flex min-w-0 flex-1 items-start gap-3">
          <FeatureIcon>{feature.icon}</FeatureIcon>
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-center gap-2">
              <p className="truncate text-[14px] font-semibold text-slate-900">
                {feature.title}
              </p>
              {feature.badge ? (
                <span className="rounded-full border border-slate-200 bg-white px-1.5 py-0.5 text-[8px] font-bold text-slate-400 uppercase">
                  {feature.badge}
                </span>
              ) : null}
            </div>
            <p className="line-clamp-2 text-[12px] leading-snug text-slate-500">
              {feature.description}
            </p>
          </div>
        </div>
        <div className="relative z-10 mt-1 shrink-0 select-none opacity-40 transition-opacity duration-300 group-hover:opacity-100">
          {feature.visual}
        </div>
      </div>
    </ScrollReveal>
  );
}

function ModeVisual() {
  return (
    <div className="h-6 w-14 overflow-hidden pr-1 text-right font-mono text-[8.5px] font-bold text-indigo-500">
      <div className="teamsync-pro-mode-list space-y-[4px]">
        <div>Interview</div>
        <div>Sales</div>
        <div>Lecture</div>
      </div>
    </div>
  );
}

function ResumeVisual() {
  return (
    <div className="relative flex h-6 w-12 shrink-0 flex-col justify-around overflow-hidden rounded border border-slate-200/50 bg-slate-100/60 p-1">
      <span className="h-0.5 w-7 rounded bg-slate-300" />
      <span className="h-0.5 w-9 rounded bg-slate-300" />
      <span className="h-0.5 w-5 rounded bg-slate-300" />
      <span className="teamsync-pro-resume-scan absolute right-0 left-0 h-px bg-indigo-500/50 shadow-[0_0_3px_rgba(99,102,241,0.5)]" />
    </div>
  );
}

function ContextVisual() {
  return (
    <div className="relative flex h-6 w-12 shrink-0 items-center justify-center overflow-hidden">
      <span className="teamsync-pro-context-node-a absolute size-1.5 rounded-sm bg-indigo-400/80" />
      <span className="teamsync-pro-context-node-b absolute size-1.5 rounded-sm bg-indigo-400/80" />
      <span className="flex size-[18px] items-center justify-center rounded border border-indigo-500/20 bg-indigo-500/10">
        <span className="size-2 rounded-sm bg-indigo-500/30" />
      </span>
    </div>
  );
}

function NegotiationVisual() {
  return (
    <div className="flex h-6 items-end gap-1">
      <span className="h-2 w-1 rounded-full bg-indigo-300" />
      <span className="h-3 w-1 rounded-full bg-indigo-400" />
      <span className="h-5 w-1 rounded-full bg-indigo-500" />
      <span className="font-mono text-[8px] font-bold text-indigo-500">+18%</span>
    </div>
  );
}

function SystemVisual() {
  return (
    <div className="grid h-6 w-12 grid-cols-3 gap-1">
      <span className="rounded bg-slate-200" />
      <span className="rounded bg-indigo-200" />
      <span className="rounded bg-slate-200" />
      <span className="col-span-3 rounded bg-slate-200/80" />
    </div>
  );
}

function MockVisual() {
  return (
    <div className="flex h-6 w-12 items-center justify-end gap-1">
      <span className="size-4 rounded-full bg-slate-200" />
      <span className="size-5 rounded-full border border-indigo-200 bg-indigo-100" />
    </div>
  );
}

function DocumentVisual() {
  return (
    <div className="flex h-6 w-12 flex-col justify-center gap-1 rounded border border-slate-200 bg-white px-1.5">
      <span className="h-0.5 w-8 rounded bg-slate-300" />
      <span className="h-0.5 w-6 rounded bg-indigo-300" />
      <span className="h-0.5 w-9 rounded bg-slate-200" />
    </div>
  );
}

function ResearchVisual() {
  return (
    <div className="flex h-6 w-12 items-end gap-1">
      <span className="h-2 w-2 rounded-sm bg-slate-200" />
      <span className="h-4 w-2 rounded-sm bg-indigo-300" />
      <span className="h-3 w-2 rounded-sm bg-slate-300" />
      <span className="h-5 w-2 rounded-sm bg-indigo-500" />
    </div>
  );
}

function LifetimeCard() {
  const included = [
    "Resume & JD context awareness",
    "Live negotiation coaching",
    "7 expert interview modes",
    "All future updates",
  ] as const;

  return (
    <ScrollReveal delayClassName="delay-300">
      <Link
        href="/pro"
        className="block focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:outline-none"
      >
        <div className="group relative flex cursor-pointer flex-col gap-5 overflow-hidden rounded-[24px] border border-indigo-500/25 bg-[linear-gradient(165deg,rgba(99,102,241,0.06)_0%,rgba(255,255,255,0.9)_100%)] p-6 shadow-[0_20px_45px_-12px_rgba(99,102,241,0.06),inset_0_1.5px_0_rgb(255,255,255)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(99,102,241,0.15)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(240px_at_0px_0px,rgba(0,0,0,0.04),transparent_80%)] opacity-0 transition-opacity duration-[350ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)] opacity-60"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-indigo-500/10 blur-3xl transition-colors duration-500 group-hover:bg-indigo-500/20"
          />
          <div className="relative z-10 flex w-full items-start justify-between gap-3">
            <div className="pr-2">
              <p className="mb-1 font-serif text-[28px] leading-none font-normal text-indigo-700 italic">
                Lifetime License
              </p>
              <p className="text-[11px] leading-snug text-slate-500 sm:text-[12px]">
                One payment. All future updates included.
              </p>
            </div>
            <span className="mt-1 shrink-0 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[8px] font-bold text-indigo-600 uppercase transition-all duration-300 group-hover:bg-indigo-100 group-hover:text-indigo-700 sm:text-[9px]">
              Best value
            </span>
          </div>
          <ul className="relative z-10 flex flex-col gap-2.5">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[12px] font-medium text-slate-700"
              >
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
          <div className="relative z-10 w-full overflow-hidden rounded-[14px] bg-[linear-gradient(rgb(99,102,241)_0%,rgb(79,70,229)_100%)] py-3.5 text-center text-[14px] font-bold text-white shadow-[0_8px_24px_rgba(99,102,241,0.3),inset_0_2px_0_rgba(255,255,255,0.3),inset_0_-2px_0_rgba(0,0,0,0.1)] transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-110">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0.5 right-2 left-2 h-1/2 rounded-full bg-gradient-to-b from-white/60 to-white/5 blur-[0.5px]"
            />
            <span className="relative z-10 drop-shadow-sm">Get Lifetime →</span>
          </div>
          <p className="relative z-10 -mt-1.5 text-center text-[10px] text-slate-400">
            One-time purchase · No subscription · yours forever
          </p>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function TeamSyncProSection() {
  return (
    <section
      id="teamsync-pro"
      className="relative overflow-hidden border-t border-slate-100 bg-[#F8FAFC]"
    >
      <div
        aria-hidden="true"
        className="teamsync-pro-noise pointer-events-none absolute inset-0 opacity-[0.015]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[900px] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.15),transparent)]"
      />

      <div className="relative mx-auto w-full max-w-[1270px] px-5 py-16 md:px-6 lg:py-24">
        <ScrollReveal className="mb-8 lg:mb-12">
          <div className="mb-5">
            <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 px-3.5 py-1.5 text-[10px] font-bold text-white uppercase shadow-[0_4px_12px_rgba(99,102,241,0.2),inset_0_1px_2px_rgba(255,255,255,0.4)]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0.5 right-1 left-1 h-[45%] rounded-full bg-gradient-to-b from-white/50 to-white/5 blur-[0.3px]"
              />
              <span className="relative z-10 drop-shadow-sm">
                TeamSync Pro
              </span>
            </span>
          </div>
          <h2 className="mb-6 font-serif text-[42px] leading-[0.95] font-normal text-slate-900 md:text-[72px] lg:text-[84px]">
            Built to get
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text font-serif italic text-transparent">
              the offer.
            </span>
          </h2>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start md:items-center">
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-slate-500">
              Connect your own API keys. One payment unlocks all 7 modes — no
              subscription, no metering.
            </p>
            <Link
              href="/pro"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-1.5 rounded-full border border-indigo-200/60 bg-white px-5 py-2.5 text-[11px] font-bold text-indigo-600 uppercase shadow-sm transition-all duration-300 hover:bg-indigo-50 md:min-h-0 md:px-4"
            >
              See Pro in action
              <ArrowUpRight
                className="size-[13px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </ScrollReveal>

        <div className="flex flex-col-reverse items-stretch gap-12 lg:grid lg:grid-cols-[1fr_380px] lg:items-center lg:gap-10">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {proFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                delayClassName={featureDelays[index]}
              />
            ))}
          </div>
          <div className={cn("w-full", "lg:w-[380px]")}>
            <LifetimeCard />
          </div>
        </div>
      </div>
    </section>
  );
}
