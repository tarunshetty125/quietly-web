"use client";

import {
  useRef,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  Zap,
  Smartphone,
  Brain,
  Terminal,
  Sparkles,
  Calendar,
  Cloud,
  LayoutGrid,
  Ghost,
  Layers,
  Mic,
  Monitor,
  MousePointer2,
  Keyboard,
  BookOpen,
  Check,
  X,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadingVideo } from "./FadingVideo";
import { DownloadOverlay } from "@/components/v2/DownloadOverlay";
import { WindowsDownloadOverlay } from "@/components/v2/WindowsDownloadOverlay";
import { ProSimulationPage } from "@/components/ProSimulationPage";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & DATA
   ═══════════════════════════════════════════════════════════════ */

const HERO_VIDEO = "/videos/pro-hero-bg.mp4";
const LIFETIME_HREF = "https://buy.quietly.ai/pro";

/* ── Features (bento grid) ────────────────────────────────────── */

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  glow: string;
  wide?: boolean;
  tags: string[];
};

const FEATURES: Feature[] = [
  {
    title: "Quietly Mirror",
    description:
      "Mirror AI responses to your phone in real-time. visionOS spatial glass UI with frosted glass and volumetric lighting.",
    icon: Smartphone,
    accent: "text-cyan-300",
    glow: "rgba(14,165,233,0.18)",
    tags: ["Live Sync", "visionOS", "Spatial UI", "Real-time"],
    wide: true,
  },
  {
    title: "Persona Intelligence",
    description:
      "Upload your resume, job descriptions, and custom context. AI learns who you are and tailors every response.",
    icon: Brain,
    accent: "text-amber-200",
    glow: "rgba(217,167,49,0.16)",
    tags: ["Resume.pdf", "JD — L5 Eng", "5 YOE", "Custom"],
  },
  {
    title: "Codex CLI Provider",
    description:
      "Run OpenAI Codex models locally as a full streaming AI provider. Selectable models and dedicated settings.",
    icon: Terminal,
    accent: "text-emerald-300",
    glow: "rgba(52,211,153,0.14)",
    tags: ["Local", "Streaming", "CLI", "Models"],
  },
  {
    title: "Skills & Commands",
    description:
      "Type / for AI skills or $ for terminal commands directly in the overlay. Custom workflows, instant invocation.",
    icon: Sparkles,
    accent: "text-violet-300",
    glow: "rgba(139,92,246,0.16)",
    tags: ["Summarize", "Draft Reply", "Analyze", "Custom"],
    wide: true,
  },
  {
    title: "Calendar Intelligence",
    description:
      "Connect your calendar for pre-meeting prep, likely topics, and saved notes tied to each event.",
    icon: Calendar,
    accent: "text-sky-300",
    glow: "rgba(56,189,248,0.14)",
    tags: ["Pre-Prep", "Topics", "Notes", "Auto-Sync"],
  },
  {
    title: "AI Providers",
    description:
      "Claude, GPT-4o, Gemini, AWS Bedrock, Ollama, Codex CLI — choose any model. Bring your own API keys.",
    icon: Cloud,
    accent: "text-orange-300",
    glow: "rgba(234,134,45,0.14)",
    tags: ["Claude", "GPT-4o", "Gemini", "Ollama"],
  },
  {
    title: "11 Meeting Modes",
    description:
      "Interview, Sales, Lecture, Recruiting, Team, Technical, Demo, Customer Support, Brainstorm, Review, 1:1.",
    icon: LayoutGrid,
    accent: "text-teal-300",
    glow: "rgba(45,212,191,0.14)",
    tags: ["Interview", "Sales", "Lecture", "Technical"],
    wide: true,
  },
  {
    title: "Stealth Mode",
    description:
      "NSPanel stealth attributes, window title disguise, undetectable by screen-sharing apps.",
    icon: Ghost,
    accent: "text-rose-300",
    glow: "rgba(251,113,133,0.14)",
    tags: ["Invisible", "NSPanel", "Disguise", "Pro"],
  },
  {
    title: "Pro Overlay V2",
    description:
      "Floating bar, split panels, answer streaming, response history, workspace expansion — all in one surface.",
    icon: Layers,
    accent: "text-blue-300",
    glow: "rgba(96,165,250,0.14)",
    tags: ["Floating", "Panels", "History", "Stream"],
  },
];

/* ── Capabilities ─────────────────────────────────────────────── */

type Capability = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

const CAPABILITIES: Capability[] = [
  { title: "Live Transcription", description: "Real-time speech-to-text with Whisper and cloud fallback. Every word captured.", icon: Mic, accent: "text-emerald-300" },
  { title: "Screenshot OCR", description: "Capture your screen, extract text with OCR. Ask AI about what's on screen.", icon: Monitor, accent: "text-sky-300" },
  { title: "Smart Actions", description: "Hint, Solution, Complexity, Tradeoffs, Deep Dive, STAR — six one-click actions.", icon: Zap, accent: "text-amber-300" },
  { title: "Mouse Passthrough", description: "Overlay stays visible but lets all clicks pass through to the app beneath.", icon: MousePointer2, accent: "text-violet-300" },
  { title: "Keyboard Shortcuts", description: "Cmd+B toggle, global shortcuts, keyboard-first operation. Zero mouse required.", icon: Keyboard, accent: "text-rose-300" },
  { title: "Response History", description: "Navigate between previous AI responses. Pin the best ones. Never lose context.", icon: BookOpen, accent: "text-cyan-300" },
];

/* ── Stats ────────────────────────────────────────────────────── */

const STATS = [
  { value: "11", label: "Meeting modes" },
  { value: "6+", label: "AI providers" },
  { value: "12", label: "Glass layers" },
  { value: "<2s", label: "Response time" },
  { value: "∞", label: "Custom skills" },
];

/* ── Comparison ───────────────────────────────────────────────── */

const COMPARISON_ROWS = [
  { feature: "Live transcription", free: true, pro: true },
  { feature: "Screenshot OCR", free: true, pro: true },
  { feature: "Local RAG memory", free: true, pro: true },
  { feature: "Stealth mode", free: true, pro: true },
  { feature: "Persona intelligence", free: false, pro: true },
  { feature: "Quietly Mirror (phone)", free: false, pro: true },
  { feature: "Calendar intelligence", free: false, pro: true },
  { feature: "Negotiation copilot", free: false, pro: true },
  { feature: "Skills & commands", free: false, pro: true },
  { feature: "Codex CLI provider", free: false, pro: true },
  { feature: "11 meeting modes", free: false, pro: true },
  { feature: "Priority AI routing", free: false, pro: true },
];

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════════════ */

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700", className)}
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        filter: visible ? "blur(0px)" : "blur(6px)",
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════════════════════════ */

function HeroSection({
  onMacClick,
  onWinClick,
}: {
  onMacClick: () => void;
  onWinClick: () => void;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background video — 120% scale, top-aligned */}
      <div className="absolute inset-0 z-0 flex justify-center overflow-hidden">
        <FadingVideo
          src={HERO_VIDEO}
          className="h-[120%] w-[120%] min-w-full object-cover object-top"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-24 pb-16 md:px-12 lg:px-20">
        {/* Kicker */}
        <Reveal>
          <p className="mb-6 font-[family-name:var(--font-body)] text-sm text-white/80">
            // Quietly AI Pro
          </p>
        </Reveal>

        {/* Heading */}
        <Reveal delay={100}>
          <h1 className="font-[family-name:var(--font-heading-serif)] text-6xl italic leading-[0.9] tracking-[-3px] text-white md:text-7xl lg:text-[6rem]">
            Built to get
            <br />
            <span className="text-white/70">the offer.</span>
          </h1>
        </Reveal>

        {/* Description */}
        <Reveal delay={200}>
          <p className="mt-8 max-w-lg font-[family-name:var(--font-body)] text-base leading-relaxed font-light text-white/70 md:text-lg">
            Real-time AI that knows your resume, your target company, and your experience.
            Every answer is tailored. Every response is precise.
          </p>
        </Reveal>

        {/* CTA buttons — pushed to bottom with mt-auto */}
        <div className="mt-auto pt-16">
          <Reveal delay={300}>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onMacClick}
                className="liquid-glass-strong inline-flex h-14 items-center gap-3 rounded-full px-8 font-[family-name:var(--font-body)] text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download for Mac
              </button>
              <button
                onClick={onWinClick}
                className="liquid-glass inline-flex h-14 items-center gap-3 rounded-full px-8 font-[family-name:var(--font-body)] text-sm font-medium text-white/90 transition-transform duration-200 hover:scale-[1.03]"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 12V6.75l8-1.25V12H3zm0 .5V18l8 1.25V12.5H3zm9-7L21 4v8.5h-9V5.5zm0 7.5H21V20l-9 1.5V13z" />
                </svg>
                Download for Windows
              </button>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <a
              href="https://quietly.ai/downloads/Quietly-2.7.2.dmg"
              className="mt-4 inline-block font-[family-name:var(--font-body)] text-[13px] font-medium text-violet-400 underline underline-offset-4 transition-colors hover:text-violet-300"
            >
              Using Apple Intel chip?
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1.5 — SIMULATION EMBED (old Free vs Pro demo)
   ═══════════════════════════════════════════════════════════════ */

function SimulationEmbed() {
  return (
    <section className="bg-black">
      <ProSimulationPage />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — STATS STRIP
   ═══════════════════════════════════════════════════════════════ */

function StatsStrip() {
  return (
    <section className="border-y border-white/[0.06] bg-black">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center divide-x divide-white/[0.06] px-4 py-8">
        {STATS.map((stat) => (
          <Reveal key={stat.label}>
            <div className="flex flex-col items-center px-8 py-3 md:px-12">
              <span className="font-[family-name:var(--font-heading-serif)] text-4xl italic text-white">
                {stat.value}
              </span>
              <span className="mt-1 font-[family-name:var(--font-body)] text-xs font-light tracking-wide text-white/50">
                {stat.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — FEATURES BENTO
   ═══════════════════════════════════════════════════════════════ */

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <Reveal
      delay={index * 80}
      className={feature.wide ? "md:col-span-2" : ""}
    >
      <div className="liquid-glass flex min-h-[320px] flex-col rounded-[1.25rem] p-6">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          {/* Icon */}
          <div className="liquid-glass flex size-11 shrink-0 items-center justify-center rounded-[0.75rem]">
            <feature.icon className={cn("size-5", feature.accent)} />
          </div>
          {/* Tags */}
          <div className="flex max-w-[70%] flex-wrap justify-end gap-1.5">
            {feature.tags.map((tag) => (
              <span
                key={tag}
                className="liquid-glass whitespace-nowrap rounded-full px-3 py-1 font-[family-name:var(--font-body)] text-[11px] text-white/90"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom content */}
        <div className="mt-6">
          <h3 className="font-[family-name:var(--font-heading-serif)] text-3xl italic leading-none tracking-[-1px] text-white md:text-3xl">
            {feature.title}
          </h3>
          <p className="mt-3 max-w-[32ch] font-[family-name:var(--font-body)] text-sm leading-snug font-light text-white/90">
            {feature.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-black px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-6 font-[family-name:var(--font-body)] text-sm text-white/80">
            // Features
          </p>
        </Reveal>
        <Reveal delay={50}>
          <h2 className="mb-16 font-[family-name:var(--font-heading-serif)] text-5xl italic leading-[0.9] tracking-[-2px] text-white md:text-6xl lg:text-7xl">
            Everything
            <br />
            <span className="text-white/60">included.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <FeatureCard feature={feature} index={i} key={feature.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — CAPABILITIES (with background video)
   ═══════════════════════════════════════════════════════════════ */

function CapabilitiesSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background video — full bleed */}
      <FadingVideo
        src={HERO_VIDEO}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-24 pb-10 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-auto">
          <Reveal>
            <p className="mb-6 font-[family-name:var(--font-body)] text-sm text-white/80">
              // Capabilities
            </p>
          </Reveal>
          <Reveal delay={50}>
            <h2 className="font-[family-name:var(--font-heading-serif)] text-6xl italic leading-[0.9] tracking-[-3px] text-white md:text-7xl lg:text-[6rem]">
              Production
              <br />
              <span className="text-white/60">evolved.</span>
            </h2>
          </Reveal>
        </div>

        {/* Capability cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 100}>
              <div className="liquid-glass flex min-h-[360px] flex-col rounded-[1.25rem] p-6">
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <div className="liquid-glass flex size-11 shrink-0 items-center justify-center rounded-[0.75rem]">
                    <cap.icon className={cn("size-5", cap.accent)} />
                  </div>
                </div>
                {/* Spacer */}
                <div className="flex-1" />
                {/* Bottom */}
                <div className="mt-6">
                  <h3 className="font-[family-name:var(--font-heading-serif)] text-3xl italic leading-none tracking-[-1px] text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 max-w-[32ch] font-[family-name:var(--font-body)] text-sm leading-snug font-light text-white/90">
                    {cap.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — COMPARISON TABLE
   ═══════════════════════════════════════════════════════════════ */

function ComparisonSection() {
  return (
    <section className="bg-black px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-6 text-center font-[family-name:var(--font-body)] text-sm text-white/80">
            // Free vs Pro
          </p>
        </Reveal>
        <Reveal delay={50}>
          <h2 className="mb-16 text-center font-[family-name:var(--font-heading-serif)] text-5xl italic leading-[0.9] tracking-[-2px] text-white">
            Compare plans.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="liquid-glass overflow-hidden rounded-[1.25rem]">
            {/* Header */}
            <div className="grid grid-cols-[1fr_80px_80px] items-center gap-4 border-b border-white/[0.06] px-6 py-4 md:grid-cols-[1fr_120px_120px]">
              <span className="font-[family-name:var(--font-body)] text-xs font-medium text-white/40 uppercase tracking-wider">
                Feature
              </span>
              <span className="text-center font-[family-name:var(--font-body)] text-xs font-medium text-white/40 uppercase tracking-wider">
                Free
              </span>
              <span className="text-center font-[family-name:var(--font-body)] text-xs font-semibold text-violet-400 uppercase tracking-wider">
                Pro
              </span>
            </div>

            {/* Rows */}
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-[1fr_80px_80px] items-center gap-4 border-b border-white/[0.04] px-6 py-3.5 last:border-b-0 md:grid-cols-[1fr_120px_120px]"
              >
                <span className="font-[family-name:var(--font-body)] text-sm font-light text-white/80">
                  {row.feature}
                </span>
                <div className="flex justify-center">
                  {row.free ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <X className="size-4 text-white/20" />
                  )}
                </div>
                <div className="flex justify-center">
                  <Check className="size-4 text-violet-400" />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — PRICING
   ═══════════════════════════════════════════════════════════════ */

function PricingSection() {
  return (
    <section className="bg-black px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-lg">
        <Reveal>
          <div className="liquid-glass-strong rounded-[1.5rem] p-8 text-center md:p-12">
            <p className="mb-3 font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.2em] text-violet-400 uppercase">
              Lifetime License
            </p>
            <h2 className="font-[family-name:var(--font-heading-serif)] text-6xl italic text-white">
              $149
            </h2>
            <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-light text-white/50">
              One-time payment. No subscription. Yours forever.
            </p>

            <div className="mx-auto mt-8 max-w-xs space-y-3 text-left">
              {[
                "All Pro features included",
                "Lifetime updates",
                "Priority support",
                "Unlimited devices",
                "Cancel anytime — keep the license",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20">
                    <Check className="size-3 text-violet-400" />
                  </div>
                  <span className="font-[family-name:var(--font-body)] text-sm font-light text-white/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={LIFETIME_HREF}
              className="liquid-glass-strong mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-full px-10 font-[family-name:var(--font-body)] text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
            >
              Get Quietly Pro
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — FINAL CTA
   ═══════════════════════════════════════════════════════════════ */

function FinalCTA({
  onMacClick,
  onWinClick,
}: {
  onMacClick: () => void;
  onWinClick: () => void;
}) {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-32 md:px-12 lg:px-20">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-heading-serif)] text-5xl italic leading-[0.9] tracking-[-2px] text-white md:text-6xl lg:text-7xl">
            Built to get
            <br />
            <span className="text-white/60">the offer.</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-6 max-w-md font-[family-name:var(--font-body)] text-base font-light leading-relaxed text-white/50">
            Stop using generic AI. Start using the AI that knows who you are and where you're going.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onMacClick}
              className="liquid-glass-strong inline-flex h-14 items-center gap-3 rounded-full px-8 font-[family-name:var(--font-body)] text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download for Mac
            </button>
            <button
              onClick={onWinClick}
              className="liquid-glass inline-flex h-14 items-center gap-3 rounded-full px-8 font-[family-name:var(--font-body)] text-sm font-medium text-white/90 transition-transform duration-200 hover:scale-[1.03]"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12V6.75l8-1.25V12H3zm0 .5V18l8 1.25V12.5H3zm9-7L21 4v8.5h-9V5.5zm0 7.5H21V20l-9 1.5V13z" />
              </svg>
              Download for Windows
            </button>
            <a
              href={LIFETIME_HREF}
              className="inline-flex h-14 items-center gap-2 rounded-full border border-white/[0.08] px-8 font-[family-name:var(--font-body)] text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/20 hover:text-white"
            >
              Buy Pro — $149
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <a
            href="https://quietly.ai/downloads/Quietly-2.7.2.dmg"
            className="mt-6 inline-block font-[family-name:var(--font-body)] text-[13px] font-medium text-violet-400 underline underline-offset-4 transition-colors hover:text-violet-300"
          >
            Using Apple Intel chip?
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE ROOT
   ═══════════════════════════════════════════════════════════════ */

export function ProPage() {
  const [showMacOverlay, setShowMacOverlay] = useState(false);
  const [showWinOverlay, setShowWinOverlay] = useState(false);

  const handleMac = () => setTimeout(() => setShowMacOverlay(true), 1000);
  const handleWin = () => setTimeout(() => setShowWinOverlay(true), 1000);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <HeroSection onMacClick={handleMac} onWinClick={handleWin} />
      <SimulationEmbed />
      <StatsStrip />
      <FeaturesSection />
      <CapabilitiesSection />
      <ComparisonSection />
      <PricingSection />
      <FinalCTA onMacClick={handleMac} onWinClick={handleWin} />

      {showMacOverlay && (
        <DownloadOverlay onClose={() => setShowMacOverlay(false)} />
      )}
      {showWinOverlay && (
        <WindowsDownloadOverlay onClose={() => setShowWinOverlay(false)} />
      )}
    </main>
  );
}
