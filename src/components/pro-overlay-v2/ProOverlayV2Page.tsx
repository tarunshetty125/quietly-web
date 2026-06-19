"use client";

import Image from "next/image";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  Cloud,
  Code2,
  Eye,
  EyeOff,
  Ghost,
  Keyboard,
  Layers,
  LayoutGrid,
  MessageCircle,
  Mic,
  Monitor,
  MousePointer2,
  Smartphone,
  Sparkles,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ Hooks                                                             ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function useInView(threshold = 0.18) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ Constants & Data                                                  ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  glow: string;
  wide?: boolean;
  tag?: string;
  visual?: ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: "Quietly Mirror",
    description:
      "Mirror AI responses to your phone in real-time. visionOS spatial glass UI with 12-layer material system, frosted glass, and volumetric lighting.",
    icon: Smartphone,
    accent: "text-cyan-300",
    glow: "rgba(14,165,233,0.18)",
    tag: "NEW",
    wide: true,
    visual: (
      <div className="hidden min-w-[140px] md:block">
        <div className="rounded-[14px] border border-cyan-300/15 bg-black/30 p-3">
          <div className="mb-2 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            <span>Mirror</span>
            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-1.5 py-0.5">LIVE</span>
          </div>
          <div className="space-y-1.5">
            <span className="block h-1.5 w-full rounded-full bg-cyan-300/30" />
            <span className="block h-1.5 w-3/4 rounded-full bg-cyan-300/15" />
            <span className="block h-1.5 w-1/2 rounded-full bg-cyan-300/10" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Persona Intelligence",
    description:
      "Upload your resume, job descriptions, and custom context. AI learns who you are and tailors every response.",
    icon: Brain,
    accent: "text-amber-200",
    glow: "rgba(217,167,49,0.16)",
    tag: "PRO",
    visual: (
      <div className="hidden min-w-[120px] md:block">
        <div className="space-y-1.5">
          {["Resume.pdf", "JD — L5 Eng", "5 YOE"].map((item) => (
            <div key={item} className="rounded-lg border border-amber-300/15 bg-amber-300/[0.06] px-2.5 py-1.5 text-[9px] font-semibold text-amber-200/60">
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Codex CLI Provider",
    description:
      "Run OpenAI Codex models locally as a full streaming AI provider. Selectable models and dedicated settings.",
    icon: Terminal,
    accent: "text-emerald-300",
    glow: "rgba(52,211,153,0.14)",
    tag: "NEW",
  },
  {
    title: "Skills & Commands",
    description:
      "Type / for AI skills or $ for terminal commands directly in the overlay. Custom workflows, instant invocation.",
    icon: Sparkles,
    accent: "text-violet-300",
    glow: "rgba(139,92,246,0.16)",
    tag: "NEW",
    wide: true,
    visual: (
      <div className="hidden min-w-[150px] md:block">
        <div className="rounded-[12px] border border-violet-300/15 bg-black/25 p-2.5">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[10px] font-bold text-violet-300/70">/</span>
            <span className="h-1.5 w-20 rounded-full bg-white/12" />
          </div>
          {["Summarize", "Draft reply", "Analyze"].map((s) => (
            <div key={s} className="mt-1.5 flex items-center gap-2 rounded-lg bg-violet-300/[0.06] px-2 py-1.5">
              <Sparkles size={8} className="text-violet-300/50" />
              <span className="text-[8px] font-semibold text-white/35">{s}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Calendar Intelligence",
    description:
      "Connect your calendar for pre-meeting prep, likely topics, and saved notes tied to each event.",
    icon: Calendar,
    accent: "text-sky-300",
    glow: "rgba(56,189,248,0.14)",
    tag: "NEW",
  },
  {
    title: "AI Providers",
    description:
      "Claude, GPT-4o, Gemini, AWS Bedrock, Ollama, Codex CLI — choose any model. Bring your own API keys.",
    icon: Cloud,
    accent: "text-orange-300",
    glow: "rgba(234,134,45,0.14)",
  },
  {
    title: "11 Meeting Modes",
    description:
      "Interview, Sales, Lecture, Recruiting, Team, Technical, Demo, Customer Support, Brainstorm, Review, 1:1.",
    icon: LayoutGrid,
    accent: "text-teal-300",
    glow: "rgba(45,212,191,0.14)",
    wide: true,
    visual: (
      <div className="hidden flex-wrap gap-1 md:flex" style={{ maxWidth: 160 }}>
        {[
          { label: "Interview", c: "violet" },
          { label: "Sales", c: "emerald" },
          { label: "Lecture", c: "sky" },
          { label: "Recruiting", c: "amber" },
          { label: "Technical", c: "cyan" },
        ].map((m) => (
          <span
            key={m.label}
            className="rounded-md px-1.5 py-0.5 text-[7px] font-bold"
            style={{
              background: `color-mix(in srgb, ${m.c} 8%, transparent)`,
              border: `1px solid color-mix(in srgb, ${m.c} 15%, transparent)`,
              color: `color-mix(in srgb, ${m.c} 65%, white)`,
            }}
          >
            {m.label}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Stealth Mode",
    description:
      "NSPanel stealth attributes, window title disguise, undetectable by screen-sharing apps. Invisible when you need it.",
    icon: Ghost,
    accent: "text-rose-300",
    glow: "rgba(251,113,133,0.14)",
    tag: "PRO",
  },
  {
    title: "Pro Overlay V2",
    description:
      "Floating bar, split panels, answer streaming, response history, workspace expansion — all in one surface.",
    icon: Layers,
    accent: "text-blue-300",
    glow: "rgba(96,165,250,0.14)",
  },
];

type Stat = { value: string; label: string };
const STATS: Stat[] = [
  { value: "11", label: "Meeting modes" },
  { value: "6+", label: "AI providers" },
  { value: "12", label: "Glass layers" },
  { value: "<2s", label: "Response time" },
  { value: "∞", label: "Custom skills" },
];

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

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ Reusable Components                                               ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white/28">
      {children}
    </p>
  );
}

function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-[44px]", className)}>
      {children}
    </h2>
  );
}

function RevealWrapper({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700", className)}
      style={{
        transitionTimingFunction: EASE,
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

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ Hero Section                                                      ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-4 py-20 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(96,165,250,0.18),transparent_56%),linear-gradient(180deg,#080a10_0%,#040506_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sky-300/[0.06] to-transparent" />

      {/* Animated grid lines — breathing pulse (from Launcher) */}
      <style>{`
        @keyframes v2GridPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.015); }
        }
      `}</style>
      <div
        className="pointer-events-none absolute inset-[-20px] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          animation: "v2GridPulse 8s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
      {/* Radial fade over grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 30%, #080a10 100%)" }}
      />

      {/* Mesh orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-violet-500/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
        <RevealWrapper>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-bold text-white/50 backdrop-blur-xl">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Quietly 2.7 — Now available
          </div>
        </RevealWrapper>

        <RevealWrapper delay={80}>
          <h1 className="mx-auto max-w-[800px] text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[68px]">
            Your invisible
            <br />
            <span className="bg-gradient-to-r from-sky-200 via-violet-200 to-emerald-200 bg-clip-text text-transparent">
              AI meeting copilot
            </span>
          </h1>
        </RevealWrapper>

        <RevealWrapper delay={160}>
          <p className="mx-auto mt-5 max-w-[540px] text-base font-medium leading-relaxed text-white/40 md:text-lg">
            Real-time AI answers, live transcription, stealth mode, and 11 specialized meeting modes — all in one invisible overlay.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={240}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.0/Quietly-2.7.0-arm64.dmg"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-white px-6 text-[13px] font-bold text-black transition-all duration-200 hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)]"
              style={{ transitionTimingFunction: EASE }}
            >
              Download for Mac
              <span className="flex size-7 items-center justify-center rounded-full bg-black/[0.06] transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.0/Quietly-Setup-2.7.0.exe"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-[13px] font-semibold text-white/70 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              style={{ transitionTimingFunction: EASE }}
            >
              <Monitor size={15} className="text-white/45" />
              Windows
            </a>
          </div>
        </RevealWrapper>

        {/* Hero product shot */}
        <RevealWrapper delay={350} className="mt-12 w-full px-0 md:px-8">
          <div className="relative mx-auto max-w-[1000px]">
            {/* Outer shell */}
            <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-1.5 shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
              {/* Inner core — cropped left/right */}
              <div className="overflow-hidden rounded-[24px] border border-white/[0.06] bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                <div className="mx-[-3%] mb-[-3%] overflow-hidden">
                  <Image
                    alt="Quietly Pro dashboard with meeting history"
                    className="w-[106%] object-cover"
                    height={1606}
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 1000px"
                    src="/images/teamsync/v2/dashboard.png"
                    width={2416}
                  />
                </div>
              </div>
            </div>
            {/* Reflection glow */}
            <div className="pointer-events-none absolute -bottom-20 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-full bg-sky-400/[0.08] blur-[60px]" />
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ Stats Strip                                                       ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function StatsStrip() {
  const { ref, visible } = useInView(0.3);
  return (
    <section
      ref={ref}
      className="relative border-y border-white/[0.06] bg-[#060810] px-4 py-16 md:py-20"
    >
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-8 md:gap-16">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="text-center transition-all duration-700"
            style={{
              transitionTimingFunction: EASE,
              transitionDelay: `${i * 80}ms`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <p className="text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[12px] font-semibold text-white/32">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ Feature Bento Grid                                                ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "group relative min-h-[140px] overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-700 hover:border-white/[0.14] hover:bg-white/[0.04] md:min-h-[160px]",
        feature.wide && "md:col-span-2",
      )}
      style={{
        transitionTimingFunction: EASE,
        transitionDelay: `${index * 60}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Top line highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent 5%, ${feature.glow} 50%, transparent 95%)` }}
      />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: `radial-gradient(ellipse 60% 70% at 80% 80%, ${feature.glow} 0%, transparent 70%)` }}
      />

      <div className="relative z-10 flex h-full items-start gap-4">
        <div className="flex flex-1 flex-col">
          <div className="mb-3 flex items-center gap-3">
            <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-current/20 bg-current/10", feature.accent)}>
              <Icon size={18} />
            </div>
            {feature.tag && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em]",
                  feature.tag === "NEW"
                    ? "border border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                    : "border border-violet-300/20 bg-violet-300/10 text-violet-200",
                )}
              >
                {feature.tag}
              </span>
            )}
          </div>
          <h3 className="text-[17px] font-semibold text-white">{feature.title}</h3>
          <p className="mt-1.5 max-w-[320px] text-[13px] font-medium leading-relaxed text-white/38">
            {feature.description}
          </p>
        </div>
        {feature.visual}
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[#050608] px-4 py-24 md:px-8 md:py-32">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.06),transparent_36%)]" />

      <div className="relative mx-auto max-w-[1100px]">
        <RevealWrapper className="mb-10 max-w-[540px]">
          <SectionKicker>Features</SectionKicker>
          <SectionTitle>
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </SectionTitle>
          <p className="mt-3 text-[15px] font-medium leading-relaxed text-white/38">
            Nine powerful capabilities built for professionals who need to perform at their best in every conversation.
          </p>
        </RevealWrapper>

        <div className="grid gap-3 md:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ Product Showcase                                                  ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function ProductShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#070910] px-4 py-24 md:px-8 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(59,130,246,0.1),transparent_32%)]" />
      <div className="relative mx-auto max-w-[1100px]">
        <RevealWrapper className="mx-auto mb-12 max-w-[600px] text-center">
          <SectionKicker>Product</SectionKicker>
          <SectionTitle className="text-center">
            Designed to disappear.
            <br />
            Built to perform.
          </SectionTitle>
          <p className="mt-3 text-[15px] font-medium leading-relaxed text-white/38">
            From the floating overlay to the full workspace — every surface is crafted for zero distraction and maximum intelligence.
          </p>
        </RevealWrapper>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Demo Guide shot */}
          <RevealWrapper delay={0}>
            <div className="group overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/[0.14]" style={{ transitionTimingFunction: EASE }}>
              <div className="overflow-hidden rounded-[18px] border border-white/[0.05]">
                <Image
                  alt="Quietly meeting recap and guide"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  height={1604}
                  sizes="(max-width: 768px) 100vw, 540px"
                  src="/images/teamsync/v2/demo-guide.png"
                  style={{ transitionTimingFunction: EASE }}
                  width={2410}
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-[15px] font-semibold text-white">Meeting Recap & Guide</p>
                <p className="mt-1 text-[12px] font-medium text-white/36">Structured summaries, transcript tabs, and an AI assistant pinned to every session.</p>
              </div>
            </div>
          </RevealWrapper>

          {/* Settings shot */}
          <RevealWrapper delay={100}>
            <div className="group overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/[0.14]" style={{ transitionTimingFunction: EASE }}>
              <div className="overflow-hidden rounded-[18px] border border-white/[0.05]">
                <Image
                  alt="Quietly settings and control plane"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  height={1600}
                  sizes="(max-width: 768px) 100vw, 540px"
                  src="/images/teamsync/v2/settings.png"
                  style={{ transitionTimingFunction: EASE }}
                  width={2424}
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-[15px] font-semibold text-white">Control Plane</p>
                <p className="mt-1 text-[12px] font-medium text-white/36">Stealth, passthrough, Pro UI, transcript, and runtime controls — all visible.</p>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ Capabilities Grid                                                 ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function CapabilityCard({ cap, index }: { cap: Capability; index: number }) {
  const Icon = cap.icon;
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className="group rounded-[16px] border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
      style={{
        transitionTimingFunction: EASE,
        transitionDelay: `${index * 50}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <div className={cn("mb-3 flex size-10 items-center justify-center rounded-[10px] border border-current/15 bg-current/8", cap.accent)}>
        <Icon size={18} />
      </div>
      <h3 className="text-[14px] font-semibold text-white">{cap.title}</h3>
      <p className="mt-1 text-[12px] font-medium leading-relaxed text-white/34">{cap.description}</p>
    </div>
  );
}

function CapabilitiesSection() {
  return (
    <section className="relative overflow-hidden bg-[#050608] px-4 py-24 md:px-8 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(52,211,153,0.06),transparent_34%)]" />
      <div className="relative mx-auto max-w-[1100px]">
        <RevealWrapper className="mx-auto mb-10 max-w-[540px] text-center">
          <SectionKicker>Capabilities</SectionKicker>
          <SectionTitle className="text-center">
            More than an overlay.
          </SectionTitle>
          <p className="mt-3 text-[15px] font-medium leading-relaxed text-white/38">
            Every tool a professional needs — from live transcription to keyboard-first operation.
          </p>
        </RevealWrapper>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ Stealth Section                                                   ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function StealthSection() {
  const [stealthOn, setStealthOn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setStealthOn((v) => !v), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#060810] px-4 py-24 md:px-8 md:py-32">
      <div className="relative mx-auto flex max-w-[1100px] flex-col items-center gap-12 md:flex-row md:gap-20">
        {/* Copy */}
        <RevealWrapper className="flex-1">
          <SectionKicker>Stealth</SectionKicker>
          <SectionTitle>
            Invisible when
            <br />
            it matters most.
          </SectionTitle>
          <p className="mt-4 max-w-[420px] text-[15px] font-medium leading-relaxed text-white/38">
            NSPanel stealth attributes, instant window title disguise, and undetectable screen-sharing bypass. Your AI assistant stays hidden from everyone except you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Screen-share safe", "Title disguise", "Dock enforcement", "Global shortcuts"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold text-white/40"
              >
                {item}
              </span>
            ))}
          </div>
        </RevealWrapper>

        {/* Interactive visual */}
        <RevealWrapper delay={120} className="flex flex-1 items-center justify-center">
          <div className="relative flex size-[280px] items-center justify-center md:size-[320px]">
            <div className="absolute inset-0 rounded-full border border-white/[0.06] bg-[radial-gradient(circle,rgba(251,113,133,0.08),transparent_60%)]" />
            <div
              className="relative flex size-24 items-center justify-center rounded-[20px] border transition-all duration-700 md:size-28"
              style={{
                transitionTimingFunction: EASE,
                borderColor: stealthOn ? "rgba(52,211,153,0.3)" : "rgba(251,113,133,0.3)",
                background: stealthOn ? "rgba(52,211,153,0.06)" : "rgba(251,113,133,0.06)",
                boxShadow: stealthOn
                  ? "0 0 60px rgba(52,211,153,0.15)"
                  : "0 0 60px rgba(251,113,133,0.15)",
              }}
            >
              {stealthOn ? (
                <EyeOff size={36} className="text-emerald-300 transition-all duration-500" style={{ transitionTimingFunction: EASE }} />
              ) : (
                <Eye size={36} className="text-rose-300 transition-all duration-500" style={{ transitionTimingFunction: EASE }} />
              )}
            </div>
            <p
              className="absolute bottom-10 text-[13px] font-bold transition-all duration-500"
              style={{
                transitionTimingFunction: EASE,
                color: stealthOn ? "rgba(52,211,153,0.7)" : "rgba(251,113,133,0.6)",
              }}
            >
              {stealthOn ? "Undetectable" : "Detectable"}
            </p>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ Final CTA                                                         ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050608] px-4 py-24 md:px-8 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(96,165,250,0.1),transparent_56%)]" />
      <RevealWrapper className="relative mx-auto max-w-[680px] text-center">
        <SectionKicker>Get started</SectionKicker>
        <SectionTitle className="text-center">
          Your next meeting.
          <br />
          <span className="bg-gradient-to-r from-sky-200 via-violet-200 to-emerald-200 bg-clip-text text-transparent">
            Supercharged.
          </span>
        </SectionTitle>
        <p className="mx-auto mt-4 max-w-[440px] text-[15px] font-medium leading-relaxed text-white/38">
          Download Quietly and experience AI-powered meetings in under 60 seconds. Free forever with your own API keys.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.0/Quietly-2.7.0-arm64.dmg"
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-white px-6 text-[13px] font-bold text-black transition-all duration-200 hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)]"
            style={{ transitionTimingFunction: EASE }}
          >
            Download for Mac
            <span className="flex size-7 items-center justify-center rounded-full bg-black/[0.06] transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight size={14} />
            </span>
          </a>
          <a
            href="https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.0/Quietly-Setup-2.7.0.exe"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-[13px] font-semibold text-white/70 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            style={{ transitionTimingFunction: EASE }}
          >
            Windows
          </a>
        </div>
        <p className="mt-4 text-[12px] font-medium text-white/24">
          macOS (Apple Silicon & Intel) · Windows x64
        </p>
      </RevealWrapper>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ System Design Section                                             ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

type DiagramNode = {
  id: string;
  label: string;
  tech: string;
  kind: "client" | "gateway" | "service" | "database" | "cache" | "queue" | "storage" | "external";
  row: number;
  col: number;
  colSpan?: number;
};

type DiagramEdge = { from: string; to: string };

const WHATSAPP_NODES: DiagramNode[] = [
  { id: "client", label: "Mobile Client", tech: "React Native", kind: "client", row: 0, col: 1 },
  { id: "gateway", label: "API Gateway", tech: "Nginx / Envoy", kind: "gateway", row: 1, col: 1 },
  { id: "chat", label: "Chat Service", tech: "Erlang / Elixir", kind: "service", row: 2, col: 0 },
  { id: "presence", label: "Presence Service", tech: "WebSocket", kind: "service", row: 2, col: 1 },
  { id: "media", label: "Media Service", tech: "Go / FFmpeg", kind: "service", row: 2, col: 2 },
  { id: "queue", label: "Message Queue", tech: "Kafka", kind: "queue", row: 3, col: 0 },
  { id: "cache", label: "Session Cache", tech: "Redis", kind: "cache", row: 3, col: 1 },
  { id: "db", label: "Message DB", tech: "Cassandra", kind: "database", row: 4, col: 0 },
  { id: "blob", label: "Media Storage", tech: "S3 / CDN", kind: "storage", row: 4, col: 1 },
  { id: "push", label: "Push Notifications", tech: "APNs / FCM", kind: "external", row: 4, col: 2 },
];

const WHATSAPP_EDGES: DiagramEdge[] = [
  { from: "client", to: "gateway" },
  { from: "gateway", to: "chat" },
  { from: "gateway", to: "presence" },
  { from: "gateway", to: "media" },
  { from: "chat", to: "queue" },
  { from: "presence", to: "cache" },
  { from: "media", to: "blob" },
  { from: "queue", to: "db" },
  { from: "queue", to: "push" },
];

const NODE_STYLES: Record<DiagramNode["kind"], { bg: string; border: string; accent: string }> = {
  client: { bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.25)", accent: "#60a5fa" },
  gateway: { bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.25)", accent: "#a855f7" },
  service: { bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.25)", accent: "#34d399" },
  database: { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.25)", accent: "#fbbf24" },
  cache: { bg: "rgba(244,63,94,0.08)", border: "rgba(244,63,94,0.25)", accent: "#f43f5e" },
  queue: { bg: "rgba(14,165,233,0.08)", border: "rgba(14,165,233,0.25)", accent: "#0ea5e9" },
  storage: { bg: "rgba(234,179,8,0.08)", border: "rgba(234,179,8,0.25)", accent: "#eab308" },
  external: { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)", accent: "#8b5cf6" },
};

function DiagramNodeCard({ node, index }: { node: DiagramNode; index: number }) {
  const style = NODE_STYLES[node.kind];
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className="flex items-center gap-2.5 rounded-[12px] border px-3 py-2.5 transition-all duration-500 hover:scale-[1.03]"
      style={{
        gridRow: node.row + 1,
        gridColumn: node.colSpan ? `${node.col + 1} / span ${node.colSpan}` : node.col + 1,
        background: style.bg,
        borderColor: style.border,
        transitionTimingFunction: EASE,
        transitionDelay: `${index * 60}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
        boxShadow: `0 0 30px ${style.bg}`,
      }}
    >
      <div
        className="flex size-7 shrink-0 items-center justify-center rounded-[8px] border text-[11px] font-bold"
        style={{ borderColor: style.border, background: style.bg, color: style.accent }}
      >
        {node.kind[0].toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-white">{node.label}</p>
        <p className="text-[10px] font-medium text-white/30">{node.tech}</p>
      </div>
    </div>
  );
}

function SystemDesignSection() {
  return (
    <section className="relative overflow-hidden bg-[#060810] px-4 py-24 md:px-8 md:py-32">
      {/* Grid line bg */}
      <div
        className="pointer-events-none absolute inset-[-20px] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          animation: "v2GridPulse 10s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 35%, #060810 100%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
          {/* Copy */}
          <RevealWrapper className="flex-1">
            <SectionKicker>System Design</SectionKicker>
            <SectionTitle>
              Architecture diagrams.
              <br />
              Generated live.
            </SectionTitle>
            <p className="mt-4 max-w-[400px] text-[15px] font-medium leading-relaxed text-white/38">
              Ask Quietly to design any system — WhatsApp, YouTube, Uber — and get an interactive architecture diagram with React Flow. Nodes for services, databases, queues, and caches. Edges showing data flow.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["React Flow", "Auto-layout", "Zoomable", "Click to inspect", "Export"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-emerald-300/12 bg-emerald-300/[0.05] px-3 py-1.5 text-[10px] font-semibold text-emerald-200/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 rounded-[12px] border border-white/8 bg-white/[0.02] px-4 py-3">
              <p className="text-[11px] font-bold text-white/24">Question</p>
              <p className="mt-1 text-[14px] font-semibold text-white/70">
                &quot;Design WhatsApp at scale&quot;
              </p>
            </div>
          </RevealWrapper>

          {/* Diagram */}
          <RevealWrapper delay={120} className="flex-1">
            <div className="relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0a0d14]/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
              {/* Dot grid background like React Flow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 0.7px, transparent 0.7px)",
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Header bar */}
              <div className="relative mb-4 flex items-center justify-between rounded-[10px] border border-white/8 bg-white/[0.03] px-3 py-2">
                <div className="flex items-center gap-2">
                  <Activity size={12} className="text-emerald-300" />
                  <span className="text-[11px] font-bold text-white/50">WhatsApp Architecture</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded border border-white/8 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-bold text-white/30">10 nodes</span>
                  <span className="rounded border border-white/8 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-bold text-white/30">9 edges</span>
                </div>
              </div>

              {/* Node grid */}
              <div className="relative grid grid-cols-3 gap-2.5" style={{ gridAutoRows: "auto" }}>
                {WHATSAPP_NODES.map((node, i) => (
                  <DiagramNodeCard key={node.id} node={node} index={i} />
                ))}
              </div>

              {/* Edge indicator strip */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {WHATSAPP_EDGES.map((edge) => (
                  <span
                    key={`${edge.from}-${edge.to}`}
                    className="rounded border border-white/6 bg-white/[0.02] px-2 py-1 text-[8px] font-semibold text-white/20"
                  >
                    {edge.from} → {edge.to}
                  </span>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ═══ Page Export                                                       ═══ */
/* ═══════════════════════════════════════════════════════════════════════════ */

export function ProOverlayV2Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#040506] text-white">
      <HeroSection />
      <StatsStrip />
      <FeaturesSection />
      <SystemDesignSection />
      <ProductShowcase />
      <CapabilitiesSection />
      <StealthSection />
      <FinalCTA />
    </main>
  );
}
