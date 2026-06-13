"use client";

import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Bot,
  Brain,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3 as ClockIcon,
  Code2,
  Copy as CopyIcon,
  FileText,
  Gauge,
  GitBranch,
  Ghost as GhostIcon,
  Grid2X2 as GridIcon,
  History,
  Keyboard,
  Lightbulb,
  MessageCircle,
  Mic,
  Monitor,
  MousePointer2,
  Pin,
  Play,
  PlugZap,
  Power,
  RefreshCcw,
  Search as SearchIcon,
  Send,
  Settings as SettingsGearIcon,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  X as XIcon,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ActionKey =
  | "hint"
  | "solution"
  | "complexity"
  | "tradeoffs"
  | "deep-dive"
  | "star";

type HistoryKey = "response-1" | "response-2" | "response-3" | "pinned";

type SmartAction = Readonly<{
  id: ActionKey;
  label: string;
  icon: LucideIcon;
}>;

type HistoryEntry = Readonly<{
  id: HistoryKey;
  label: string;
  status: string;
  question: string;
  answer: string;
  tags: readonly string[];
}>;

type ProductShotKey = "modes" | "dashboard" | "demoGuide" | "settings";

type ProductShot = Readonly<{
  src: string;
  alt: string;
  width: number;
  height: number;
}>;

const productShots = {
  modes: {
    src: "/images/teamsync/v2/modes-overlay.png",
    alt: "Quietly Pro modes overlay screenshot",
    width: 2406,
    height: 1580,
  },
  dashboard: {
    src: "/images/teamsync/v2/dashboard.png",
    alt: "Quietly dashboard screenshot with meeting history",
    width: 2416,
    height: 1606,
  },
  demoGuide: {
    src: "/images/teamsync/v2/demo-guide.png",
    alt: "Quietly demo guide overlay screenshot",
    width: 2410,
    height: 1604,
  },
  settings: {
    src: "/images/teamsync/v2/settings.png",
    alt: "Quietly settings overlay screenshot",
    width: 2424,
    height: 1600,
  },
} satisfies Record<ProductShotKey, ProductShot>;

const smartActions: readonly SmartAction[] = [
  { id: "hint", label: "Hint", icon: Lightbulb },
  { id: "solution", label: "Solution", icon: CheckCircle2 },
  { id: "complexity", label: "Complexity", icon: Gauge },
  { id: "tradeoffs", label: "Tradeoffs", icon: GitBranch },
  { id: "deep-dive", label: "Deep Dive", icon: Brain },
  { id: "star", label: "STAR", icon: Sparkles },
];

const historyEntries: readonly HistoryEntry[] = [
  {
    id: "response-1",
    label: "Response 1",
    status: "Draft",
    question: "How would you start designing YouTube?",
    answer:
      "I would split the system into upload, processing, metadata, and playback paths. The first pass is API Gateway, a video service, metadata DB, and object storage for the raw media.",
    tags: ["API", "DB", "Upload path"],
  },
  {
    id: "response-2",
    label: "Response 2",
    status: "Refined",
    question: "How do you make playback fast globally?",
    answer:
      "Add CDN edges for hot videos, Redis for metadata and authorization lookups, signed playback URLs, and background invalidation so users see fast starts without overloading origin.",
    tags: ["Redis", "CDN", "Signed URLs"],
  },
  {
    id: "response-3",
    label: "Response 3",
    status: "Scaled",
    question: "What happens when uploads and events spike?",
    answer:
      "Kafka decouples uploads from transcode, notifications, search indexing, and recommendations. Consumers can autoscale independently while the API keeps accepting work.",
    tags: ["Kafka", "Workers", "Backpressure"],
  },
  {
    id: "pinned",
    label: "Pinned",
    status: "Best",
    question: "What is the final interview-ready answer?",
    answer:
      "Start simple, then evolve: API plus DB for correctness, Redis and CDN for low-latency playback, Kafka for async fanout, and active-active regions once traffic and availability require it.",
    tags: ["Final", "Multi-region", "Tradeoffs"],
  },
];

function useSectionActive(sectionRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = sectionRef.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;

      setActive(rect.top < viewport * 0.48 && rect.bottom > viewport * 0.36);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionRef]);

  return active;
}

function ProductScreenshot({
  shot,
  className,
  imageClassName,
  highPriority = false,
}: Readonly<{
  shot: ProductShotKey;
  className?: string;
  imageClassName?: string;
  highPriority?: boolean;
}>) {
  const image = productShots[shot];

  return (
    <div className={cn("relative overflow-hidden rounded-[24px] border border-white/12 bg-black", className)}>
      <Image
        alt={image.alt}
        className={cn("h-full w-full object-cover", imageClassName)}
        fetchPriority={highPriority ? "high" : "auto"}
        height={image.height}
        loading="eager"
        sizes="(max-width: 768px) 100vw, 1100px"
        src={image.src}
        width={image.width}
      />
    </div>
  );
}

function ProviderBadge({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 font-semibold text-emerald-100 shadow-[0_0_40px_rgba(52,211,153,0.16)]",
        compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]",
      )}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-40" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
      </span>
      Claude Sonnet
    </div>
  );
}

function AnswerStream({ dense = false }: Readonly<{ dense?: boolean }>) {
  return (
    <div className={cn("space-y-3", dense && "space-y-2")}>
      <p className={cn("font-medium text-white/82", dense ? "text-[12px]" : "text-sm")}>
        I&apos;d start with a simple read/write split and then evolve it as constraints appear.
      </p>
      <div className="space-y-2">
        <span className="v2-stream-line v2-stream-line-a block h-2 rounded-full bg-sky-300/55" />
        <span className="v2-stream-line v2-stream-line-b block h-2 rounded-full bg-white/24" />
        <span className="v2-stream-line v2-stream-line-c block h-2 rounded-full bg-emerald-300/45" />
      </div>
      <div className="grid gap-2 text-[11px] text-white/58 md:grid-cols-2">
        <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
          API and DB for correctness
        </span>
        <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
          CDN when reads dominate
        </span>
      </div>
    </div>
  );
}

function ActionButtonRow() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {smartActions.slice(0, 4).map((action) => {
        const Icon = action.icon;

        return (
          <button
            className="group flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 text-[11px] font-semibold text-white/70 transition hover:border-sky-300/35 hover:bg-sky-300/10 hover:text-white"
            key={action.id}
            type="button"
          >
            <Icon className="size-3.5 text-white/45 transition group-hover:text-sky-200" aria-hidden="true" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
}

function CompactOverlay() {
  return (
    <div className="v2-overlay-window mx-auto w-full max-w-[780px] rounded-[24px] border border-white/12 bg-[#0b0d11]/88 p-4 shadow-[0_32px_120px_rgba(0,0,0,0.72)] backdrop-blur-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
            <span className="h-1.5 w-12 rounded-full bg-white/25" />
          </div>
          <ProviderBadge compact />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/55">
          <History className="size-3.5" aria-hidden="true" />
          3 responses
        </div>
      </div>
      <div className="relative">
        <ProductScreenshot
          className="v2-shot-float aspect-[2406/1580] w-full rounded-[22px] shadow-[0_28px_90px_rgba(0,0,0,0.42)]"
          highPriority
          imageClassName="object-contain"
          shot="modes"
        />
        <div className="absolute left-4 top-4 hidden items-center gap-2 rounded-full border border-sky-300/25 bg-black/55 px-3 py-1.5 text-[11px] font-bold text-sky-100 backdrop-blur-xl md:flex">
          <Activity className="size-3.5" aria-hidden="true" />
          Design YouTube
        </div>
        <div className="absolute bottom-4 right-4 hidden max-w-[300px] rounded-[16px] border border-white/12 bg-black/62 p-3 backdrop-blur-xl md:block">
          <div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/36">
            <span className="flex items-center gap-2">
              <Bot className="size-3.5 text-emerald-200" aria-hidden="true" />
              Answer stream
            </span>
            <span className="rounded-full bg-emerald-300/12 px-2 py-1 text-emerald-100">live</span>
          </div>
          <AnswerStream dense />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3 rounded-[18px] border border-white/10 bg-black/25 p-3 md:flex-row md:items-center md:justify-between">
        <ActionButtonRow />
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-[12px] font-bold text-black transition hover:bg-sky-100"
          type="button"
        >
          <Send className="size-4" aria-hidden="true" />
          Insert answer
        </button>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-8 md:px-8 md:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(79,133,255,0.24),transparent_30%),linear-gradient(180deg,#10131a_0%,#040506_74%)]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-sky-300/10 to-transparent" />
      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center gap-5">
        <div className="v2-hero-copy text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
            Quietly Pro Overlay V2
          </h1>
          <p className="mt-3 text-lg font-medium text-white/52 md:text-xl">
            Realtime Interview Intelligence
          </p>
          <p className="mx-auto mt-3 max-w-[560px] text-sm leading-relaxed font-medium text-white/42">
            The product starts as a floating interview surface: question capture, answer stream, actions, provider state, and response history in one window.
          </p>
        </div>
        <div className="v2-hero-chrome w-full px-0 py-4 md:px-10">
          <CompactOverlay />
        </div>
      </div>
    </section>
  );
}

function HistoryRail({ activeId }: Readonly<{ activeId: HistoryKey }>) {
  return (
    <div className="space-y-3">
      {historyEntries.map((entry) => {
        const active = activeId === entry.id;

        return (
          <div
            className={cn(
              "rounded-[18px] border px-3 py-3 transition",
              active
                ? "border-sky-300/35 bg-sky-300/10 text-white shadow-[0_0_38px_rgba(56,189,248,0.1)]"
                : "border-white/10 bg-white/[0.035] text-white/45",
            )}
            key={entry.id}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">{entry.label}</span>
              {entry.id === "pinned" ? <Pin className="size-3.5 text-amber-200" aria-hidden="true" /> : null}
            </div>
            <p className="mt-1 text-[11px] font-medium text-white/36">{entry.status}</p>
          </div>
        );
      })}
    </div>
  );
}

function WorkspaceOverlay({
  expanded,
  activeId,
}: Readonly<{
  expanded: boolean;
  activeId: HistoryKey;
}>) {
  const activeEntry = historyEntries.find((entry) => entry.id === activeId) ?? historyEntries[0];

  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-[1120px] gap-3 rounded-[26px] border border-white/12 bg-[#080a0e]/92 p-3 shadow-[0_34px_140px_rgba(0,0,0,0.74)] backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:grid-cols-[220px_1fr_220px]",
        expanded ? "scale-100 opacity-100" : "scale-[0.82] opacity-85 md:max-w-[780px] md:grid-cols-[0px_1fr_0px]",
      )}
    >
      <aside
        className={cn(
          "overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.035] p-3 transition-all duration-700",
          expanded ? "max-h-[520px] opacity-100" : "max-h-0 p-0 opacity-0 md:border-0",
        )}
      >
        <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
          <History className="size-4" aria-hidden="true" />
          History
        </div>
        <ProductScreenshot
          className="mb-3 h-28 rounded-[16px] md:h-32"
          imageClassName="object-cover object-top"
          shot="dashboard"
        />
        <HistoryRail activeId={activeId} />
      </aside>
      <main className="min-h-[430px] rounded-[22px] border border-white/10 bg-black/28 p-5">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <ProviderBadge compact />
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold text-white/45">
                workspace mode
              </span>
            </div>
            <p className="text-sm font-semibold text-white/68">{activeEntry.question}</p>
          </div>
          <button
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-[12px] font-bold text-white/72 transition hover:border-white/20 hover:bg-white/[0.08]"
            type="button"
          >
            <Play className="size-4" aria-hidden="true" />
            Speak
          </button>
        </div>
        <div className="mt-5 space-y-5">
          <ProductScreenshot
            className="v2-shot-pan h-44 rounded-[20px] md:h-48"
            imageClassName="object-cover object-top"
            shot="demoGuide"
          />
          <div className="rounded-[20px] border border-sky-300/15 bg-sky-300/[0.06] p-4">
            <p className="text-lg leading-relaxed font-semibold text-white md:text-2xl">
              {activeEntry.answer}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeEntry.tags.map((tag) => (
              <span
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/52"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <AnswerStream dense />
        </div>
      </main>
      <aside
        className={cn(
          "overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.035] p-3 transition-all duration-700",
          expanded ? "max-h-[520px] opacity-100" : "max-h-0 p-0 opacity-0 md:border-0",
        )}
      >
        <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
          <Zap className="size-4" aria-hidden="true" />
          Actions
        </div>
        <ProductScreenshot
          className="mb-3 h-28 rounded-[16px] md:h-32"
          imageClassName="object-cover object-top"
          shot="settings"
        />
        <div className="space-y-2">
          {smartActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                className="flex h-11 w-full items-center gap-2 rounded-[14px] border border-white/10 bg-black/25 px-3 text-left text-[12px] font-semibold text-white/58 transition hover:border-sky-300/30 hover:bg-sky-300/10 hover:text-white"
                key={action.id}
                type="button"
              >
                <Icon className="size-4 text-white/38" aria-hidden="true" />
                {action.label}
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

function UnfoldSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const expanded = useSectionActive(sectionRef);

  return (
    <section ref={sectionRef} className="relative min-h-[145vh] bg-[#050608] px-4 md:px-8">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(52,211,153,0.13),transparent_34%),linear-gradient(180deg,#050608,#090c12)]" />
        <div className="relative mx-auto w-full max-w-[1240px]">
          <SectionDescriptor
            align="center"
            description="Scroll turns the same overlay into a workspace with history, answer, and actions opening around the active response."
            kicker="Expanded mode"
            title="The overlay unfolds into work mode."
          />
          <div className="mb-6 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white/34">
            <span>Compact Overlay</span>
            <ArrowRight
              className={cn(
                "size-4 transition-transform duration-700",
                expanded ? "rotate-90 text-emerald-200" : "text-white/30",
              )}
              aria-hidden="true"
            />
            <span className={expanded ? "text-emerald-100/70" : undefined}>Full Workspace Overlay</span>
          </div>
          <WorkspaceOverlay expanded={expanded} activeId="pinned" />
        </div>
      </div>
    </section>
  );
}

function ModeTile({
  title,
  description,
  icon: Icon,
  tone,
  wide = false,
  className,
  children,
}: Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
  wide?: boolean;
  className?: string;
  children?: ReactNode;
}>) {
  return (
    <div
      className={cn(
        "v2-product-reveal relative min-h-[96px] overflow-hidden rounded-[16px] border bg-white/[0.035] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        tone,
        wide && "md:col-span-2 md:min-h-[132px]",
        className,
      )}
    >
      <div className="absolute inset-1 rounded-[14px] border border-white/10" />
      <div className="relative flex h-full items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] border border-current bg-current/10">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-white">{title}</p>
          <p className="mt-1.5 max-w-[210px] text-[13px] leading-snug font-medium text-white/46">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function ProModesSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#050608] px-4 py-16 md:px-8">
      <ProductScreenshot
        className="absolute inset-0 rounded-none border-0 opacity-20"
        imageClassName="object-cover"
        shot="dashboard"
      />
      <div className="absolute inset-0 bg-black/62 backdrop-blur-[6px]" />
      <div className="relative mx-auto w-full max-w-[780px]">
        <SectionDescriptor
          align="center"
          description="The Pro modal expands the exact Quietly mode language from your screenshot into selectable expert surfaces."
          kicker="Pro modes"
          title="Every room gets its own expert."
        />
      <div className="v2-premium-surface overflow-hidden rounded-[24px] border border-white/12 bg-[#111]/88 shadow-[0_34px_120px_rgba(0,0,0,0.68)]">
        <button
          aria-label="Close"
          className="absolute right-5 top-5 z-10 flex size-10 items-center justify-center rounded-full border border-white/8 bg-white/8 text-white/54"
          type="button"
        >
          <XIcon className="size-5" aria-hidden="true" />
        </button>
        <div className="px-5 pb-5 pt-12 md:px-7">
          <div className="mx-auto max-w-[560px] text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Every conversation.
              <br />
              A different expert.
            </h2>
            <p className="mx-auto mt-3 max-w-[460px] text-sm leading-relaxed font-medium text-white/68">
              Six dedicated AI modes tuned for the exact room you&apos;re in. Designed for professionals.
            </p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <ModeTile
              description="Live stealth teleprompter during calls."
              icon={Users}
              title="Interview"
              tone="border-violet-300/24 text-violet-200 shadow-[0_0_36px_rgba(139,92,246,0.16)]"
              wide
            >
              <div className="hidden min-w-36 rounded-[13px] border border-white/10 bg-black/20 p-2.5 md:block">
                <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-white/72">
                  <span>Answer Cue</span>
                  <span className="rounded-full border border-violet-300/30 px-1.5 py-0.5 text-violet-200">STAR</span>
                </div>
                <div className="mt-3 h-1.5 w-24 rounded-full bg-violet-300/42" />
              </div>
            </ModeTile>
            <ModeTile
              description="Live objection handling."
              icon={Activity}
              title="Sales Copilot"
              tone="border-emerald-300/24 text-emerald-200 shadow-[0_0_36px_rgba(16,185,129,0.12)]"
              wide
            >
              <div className="hidden min-w-32 md:block">
                <div className="rounded-full border border-emerald-300/18 bg-black/20 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-200/72">
                  Signal ready
                </div>
                <div className="mt-2 flex h-6 items-end justify-center gap-1.5 rounded-full border border-emerald-300/14 bg-black/20 px-3 pb-1.5">
                  {["h-2.5", "h-4", "h-3", "h-5", "h-3.5"].map((heightClassName) => (
                    <span className={cn("v2-meter-bar w-1 rounded-full bg-emerald-300/55", heightClassName)} key={heightClassName} />
                  ))}
                </div>
              </div>
            </ModeTile>
            <ModeTile
              description="Candidate signal."
              icon={Users}
              title="Recruit"
              tone="border-amber-300/22 text-amber-200"
            />
            <ModeTile
              description="Live discussion."
              icon={MessageCircle}
              title="Meet"
              tone="border-rose-300/22 text-rose-200"
            />
            <ModeTile
              description="Deep topic synthesis."
              icon={BookOpen}
              title="Lecture"
              tone="border-sky-300/22 text-sky-200"
              wide
            />
            <ModeTile
              className="md:col-span-4 md:min-h-[112px]"
              description="DSA & Architecture bounds."
              icon={Code2}
              title="Technical"
              tone="border-cyan-300/22 text-cyan-200"
            >
              <div className="hidden min-w-28 rounded-[12px] border border-cyan-300/12 bg-black/20 p-2.5 font-mono text-[11px] text-cyan-100 md:block">
                O(log n)
                <br />
                cache memo
              </div>
            </ModeTile>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 bg-white/[0.02] px-5 py-4 md:flex-row md:items-center md:justify-between md:px-7">
          <button className="flex items-center gap-2 text-sm font-semibold text-white/78" type="button">
            I have a license
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
          <p className="max-w-[360px] text-sm leading-snug font-medium text-amber-300 md:text-center">
            Unlock Pro to access 6 advanced experts and unlimited custom modes.
          </p>
          <button className="flex h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-black" type="button">
            Unlock Pro
            <ArrowRight className="size-4 -rotate-45" aria-hidden="true" />
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}

function AppTopBar() {
  return (
    <div className="flex h-14 items-center border-b border-white/10 bg-[#11151d] px-5">
      <div className="flex items-center gap-2" aria-hidden="true">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#ffbd2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <ChevronRight className="ml-8 size-5 rotate-180 text-white/28" aria-hidden="true" />
      <div className="mx-auto flex h-9 w-[min(460px,48vw)] items-center gap-3 rounded-full bg-black/24 px-4 text-sm font-medium text-white/38">
        <SearchIcon className="size-4" aria-hidden="true" />
        Search or ask anything...
      </div>
      <div className="flex items-center gap-4 text-white/48" aria-hidden="true">
        <GridIcon className="size-5" />
        <SettingsGearIcon className="size-5" />
      </div>
    </div>
  );
}

function DashboardPill({
  icon: Icon,
  label,
}: Readonly<{
  icon: LucideIcon;
  label: string;
}>) {
  return (
    <span className="flex h-10 items-center gap-2 rounded-[9px] border border-white/10 bg-white/[0.04] px-3 text-sm font-semibold text-white/52">
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </span>
  );
}

function MeetingRow({
  active = false,
  duration,
  icon: Icon,
  status,
  subtitle,
  time,
  title,
}: Readonly<{
  active?: boolean;
  duration: string;
  icon: LucideIcon;
  status: string;
  subtitle: string;
  time: string;
  title: string;
}>) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-[18px] border px-4 py-4",
        active ? "border-slate-500/70 bg-slate-800/32" : "border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-[12px] border",
          active ? "border-emerald-300/18 bg-emerald-300/10 text-emerald-300" : "border-white/10 bg-white/[0.04] text-white/46",
        )}
      >
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-lg font-semibold text-white">{title}</p>
          <span className={cn("rounded-[8px] border px-2 py-1 text-xs font-semibold", active ? "border-white/10 bg-white/[0.06] text-white/52" : "border-slate-500/50 bg-slate-700/40 text-white/50")}>
            {status}
          </span>
        </div>
        <p className="mt-1 text-base font-medium text-white/48">{subtitle}</p>
      </div>
      <div className="hidden items-center gap-6 text-base font-medium text-white/54 sm:flex">
        <span className="rounded-[8px] border border-white/8 bg-black/30 px-3 py-1.5 font-mono text-sm">{duration}</span>
        <span>{time}</span>
      </div>
    </div>
  );
}

function GuideBlock({
  body,
  label,
  title,
}: Readonly<{
  body: string;
  label?: string;
  title: string;
}>) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      {label ? <p className="mt-7 text-xl font-bold text-white">{label}</p> : null}
      <p className="mt-4 text-lg leading-relaxed text-white/58">{body}</p>
    </div>
  );
}

function SidebarGroup({
  active,
  items,
  title,
}: Readonly<{
  active?: string;
  items: readonly (readonly [string, LucideIcon])[];
  title: string;
}>) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white/58">{title}</p>
      <div className="space-y-2">
        {items.map(([item, Icon]) => {
          const selected = active === item;

          return (
            <div
              className={cn(
                "flex h-12 items-center gap-3 rounded-[12px] px-3 text-sm font-semibold",
                selected ? "border border-white/16 bg-white/10 text-white" : "text-white/74",
              )}
              key={item}
            >
              <Icon className="size-5" aria-hidden="true" />
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsPanel({
  active = false,
  badge,
  description,
  icon: Icon,
  title,
}: Readonly<{
  active?: boolean;
  badge?: string;
  description: string;
  icon: LucideIcon;
  title: string;
}>) {
  return (
    <div className={cn("rounded-[18px] border border-white/10 bg-white/[0.035] p-5", active && "shadow-[0_24px_80px_rgba(168,85,247,0.12)]")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Icon className={cn("size-6", active ? "text-violet-300" : "text-white/78")} aria-hidden="true" />
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            {badge ? (
              <span className="rounded-full border border-violet-300/30 bg-violet-300/12 px-2 py-1 text-xs font-bold text-violet-200">
                {badge}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-base font-medium text-white/52">{description}</p>
        </div>
        <Toggle active={active} />
      </div>
    </div>
  );
}

function SettingsRow({
  active = false,
  description,
  icon: Icon,
  title,
}: Readonly<{
  active?: boolean;
  description: string;
  icon: LucideIcon;
  title: string;
}>) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.035] text-white/52">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm font-medium text-white/48">{description}</p>
        </div>
      </div>
      <Toggle active={active} />
    </div>
  );
}

function Toggle({ active = false }: Readonly<{ active?: boolean }>) {
  return (
    <span
      className={cn(
        "flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition",
        active ? "justify-end bg-blue-500" : "justify-start bg-white/14",
      )}
    >
      <span className="size-6 rounded-full bg-white" />
    </span>
  );
}

function SectionDescriptor({
  align = "left",
  description,
  kicker,
  title,
}: Readonly<{
  align?: "left" | "center";
  description: string;
  kicker: string;
  title: string;
}>) {
  return (
    <div
      className={cn(
        "v2-section-note mb-6 max-w-[620px]",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/34">{kicker}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed font-medium text-white/48">{description}</p>
    </div>
  );
}

function DashboardSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0d13] px-4 py-16 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_18%,rgba(59,130,246,0.18),transparent_28%),linear-gradient(180deg,#0b0e14,#050608)]" />
      <div className="relative mx-auto w-full max-w-[1220px]">
        <SectionDescriptor
          description="The home screen carries meeting status, detectability state, calendar context, and captured sessions without leaving the app."
          kicker="Dashboard"
          title="Today is the operating surface."
        />
      <div className="v2-premium-surface relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0b0e14] shadow-[0_36px_140px_rgba(0,0,0,0.62)]">
        <AppTopBar />
        <div className="p-5 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-4xl font-semibold tracking-[-0.02em] text-white">Today</h2>
                <span className="rounded-[10px] border border-white/12 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white/64">
                  Calendar off
                </span>
              </div>
              <p className="mt-4 text-lg font-medium text-white/48">2 meetings captured today</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <DashboardPill icon={FileText} label="2 today" />
                <DashboardPill icon={ClockIcon} label="Next event: Calendar not connected" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex size-12 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] text-white/55" type="button">
                <RefreshCcw className="size-5" aria-hidden="true" />
              </button>
              <button className="flex h-12 items-center gap-3 rounded-[10px] border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-white/70" type="button">
                <GhostIcon className="size-5" aria-hidden="true" />
                Detectable
                <span className="flex h-6 w-11 items-center rounded-full bg-white/12 p-1">
                  <span className="size-4 rounded-full bg-white" />
                </span>
              </button>
              <button className="v2-live-button flex h-12 items-center gap-3 rounded-full px-6 text-base font-bold text-white" type="button">
                <Activity className="size-5" aria-hidden="true" />
                Start Quietly
              </button>
            </div>
          </div>
          <div className="mt-7 grid overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.025] md:grid-cols-[1.35fr_1fr]">
            <div className="p-6 md:p-8">
              <div className="mb-6 flex size-16 items-center justify-center rounded-[14px] border border-white/10 bg-black/30">
                <PlugZap className="size-7 text-white/70" aria-hidden="true" />
              </div>
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/38">Calendar Onboarding</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white">Connect calendar context</h3>
              <p className="mt-8 max-w-[640px] text-lg leading-relaxed font-medium text-white/52">
                Quietly can prepare from your next event before the meeting starts and keep saved notes tied to the calendar title.
              </p>
            </div>
            <div className="border-t border-white/10 p-6 md:border-l md:border-t-0 md:p-8">
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/38">Benefits</p>
              <div className="mt-6 space-y-4">
                {[
                  "See the next meeting before starting capture",
                  "Surface likely topics and prep notes",
                  "Preserve calendar context in saved recaps",
                ].map((benefit) => (
                  <div className="flex items-center gap-3 text-base font-medium text-white/58" key={benefit}>
                    <CheckCircle2 className="size-5 text-emerald-300" aria-hidden="true" />
                    {benefit}
                  </div>
                ))}
              </div>
              <button className="mt-16 flex h-12 w-full items-center justify-center gap-3 rounded-[10px] bg-white text-base font-bold text-black" type="button">
                Connect calendar
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-[980px] space-y-8">
            <p className="text-lg font-semibold text-white/48">Today</p>
            <MeetingRow
              active
              duration="03:24"
              icon={Users}
              status="Captured"
              subtitle="No AI summary captured yet."
              time="12:46 am"
              title="Project Team Status Update"
            />
            <MeetingRow
              duration="00:02"
              icon={FileText}
              status="Captured"
              subtitle="No AI summary captured yet."
              time="12:42 am"
              title="Meeting Discussion and Planning Session"
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

function GuideSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#07090e] px-4 py-16 md:px-8">
      <ProductScreenshot
        className="absolute inset-0 rounded-none border-0 opacity-[0.18]"
        imageClassName="object-cover"
        shot="dashboard"
      />
      <div className="absolute inset-0 bg-black/58 backdrop-blur-[5px]" />
      <div className="relative mx-auto w-full max-w-[1060px]">
        <SectionDescriptor
          description="Saved meetings open into a readable overlay with tabs, summaries, usage context, and an assistant input pinned to the session."
          kicker="Meeting recap"
          title="The guide behaves like a living meeting artifact."
        />
      <div className="v2-premium-surface relative overflow-hidden rounded-[34px] border border-white/16 bg-white/[0.22] p-6 shadow-[0_38px_140px_rgba(0,0,0,0.62)] backdrop-blur-xl md:p-11">
        <p className="text-base font-semibold text-white/36">Friday, Jun 5</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.02em] text-white md:text-6xl">
          Quietly Demo &amp; Guide
        </h2>
        <div className="mt-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full max-w-[360px] rounded-full border border-white/18 bg-white/10 p-1">
            {["Summary", "Transcript", "Usage"].map((tab, index) => (
              <button
                className={cn(
                  "h-12 flex-1 rounded-full text-base font-semibold",
                  index === 0 ? "bg-slate-700 text-white" : "text-white/34",
                )}
                key={tab}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex h-12 items-center justify-center gap-3 rounded-full border border-white/16 bg-white/12 px-5 text-sm font-semibold text-white/62" type="button">
            <CopyIcon className="size-5" aria-hidden="true" />
            Copy full summary
          </button>
        </div>
        <div className="mt-10 max-w-[880px] space-y-8 pb-24">
          <GuideBlock
            body="Quietly is a real-time AI meeting assistant designed to help you stay focused, informed, and fast-moving during calls. Get live insights while you speak, instant answers to questions, and structured notes after every meeting."
            title="Overview"
          />
          <GuideBlock
            body="Click Start Session from the dashboard. Join a scheduled meeting and start directly from the meeting notification."
            label="Start a Session"
            title="Getting Started"
          />
          <div>
            <h3 className="text-xl font-bold text-white">During a Meeting</h3>
            <ul className="mt-4 space-y-3 text-lg leading-relaxed text-white/58">
              <li>Use the five quick action buttons for real-time assistance</li>
              <li>Show or hide Quietly at any time: Mac: Cmd + B, Windows: Ctrl + B</li>
              <li>Move the widget anywhere on your screen by hovering over the top pill and dragging</li>
            </ul>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 flex h-16 w-[min(620px,86%)] -translate-x-1/2 items-center justify-between rounded-full border border-white/16 bg-[#111722]/72 px-6 text-lg font-medium text-white/40 shadow-[0_20px_80px_rgba(0,0,0,0.32)]">
          Ask about this meeting...
          <button className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white/70" type="button">
            <ArrowRight className="size-5 -rotate-45" aria-hidden="true" />
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}

function SettingsSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#050608] px-4 py-16 md:px-8">
      <ProductScreenshot
        className="absolute inset-0 rounded-none border-0 opacity-20"
        imageClassName="object-cover"
        shot="dashboard"
      />
      <div className="absolute inset-0 bg-black/62 backdrop-blur-[7px]" />
      <div className="relative mx-auto w-full max-w-[980px]">
        <SectionDescriptor
          description="The settings surface exposes the operational controls shown in your capture: detectability, passthrough, Pro UI, transcript, and runtime logging."
          kicker="Control plane"
          title="Trust and workspace controls stay visible."
        />
      <div className="v2-premium-surface grid overflow-hidden rounded-[26px] border border-white/12 bg-black/78 shadow-[0_42px_150px_rgba(0,0,0,0.72)] md:grid-cols-[240px_1fr]">
        <aside className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-white/70">Quietly</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Settings</h2>
            </div>
            <span className="rounded-full border border-blue-300/20 bg-blue-400/16 px-3 py-2 text-sm font-bold text-white">
              1/4 ready
            </span>
          </div>
          <div className="mt-8 space-y-6">
            <SidebarGroup title="Today" items={[["Overview", Activity], ["Privacy & Trust", ShieldCheck]]} />
            <SidebarGroup title="Workspace" items={[["General", Monitor], ["Audio", Mic], ["Keybinds", Keyboard]]} active="General" />
            <SidebarGroup title="Intelligence" items={[["Profile Intelligence", Users]]} />
          </div>
        </aside>
        <main className="p-5 md:p-8">
          <div className="space-y-4">
            <SettingsPanel
              description="Quietly is currently detectable by screen-sharing. Supported apps here"
              icon={GhostIcon}
              title="Detectable"
            />
            <SettingsPanel
              description="Overlay stays visible but lets all mouse clicks pass through to the app beneath."
              icon={MousePointer2}
              title="Mouse Passthrough"
            />
            <SettingsPanel
              active
              badge="BETA"
              description="Switch to the new floating panels layout with split insights and response surfaces."
              icon={Sparkles}
              title="Pro UI"
            />
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-white">General settings</h3>
            <p className="mt-2 text-base font-medium text-white/52">Customize how Quietly works for you</p>
            <div className="mt-6 space-y-5">
              <SettingsRow description="Quietly will open automatically when you log in to your computer" icon={Power} title="Open Quietly when you log in" />
              <SettingsRow description="Print detailed audio, STT, and pipeline diagnostics" icon={Terminal} title="Verbose debug logging" />
              <SettingsRow active description="Show real-time transcription of the interviewer" icon={MessageCircle} title="Interviewer Transcript" />
            </div>
          </div>
        </main>
      </div>
      </div>
    </section>
  );
}

export function ProOverlayV2Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#040506] text-white">
      <HeroSection />
      <UnfoldSection />
      <ProModesSection />
      <DashboardSection />
      <GuideSection />
      <SettingsSection />
    </main>
  );
}
