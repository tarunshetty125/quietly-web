"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, Copy, ArrowRight, X } from "lucide-react";

/* ───────────────────────── constants ───────────────────────── */

const DOWNLOAD_URL =
  "https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.0/Quietly-2.7.0-arm64.dmg";
const ICON_SRC = "/images/quietly/iconq-transparent.png";
const TERMINAL_CMD = "xattr -cr /Applications/Quietly.app";

/* ───────────────────────── step data ───────────────────────── */

type Step = {
  num: number;
  color: string;
  title: string;
  desc: string;
  illustration: ReactNode;
};

/* ───────────────────────── step illustrations ───────────────── */

function FinderIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#1a1a1a] p-3">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="size-[7px] rounded-full bg-[#ff5f57]" />
        <span className="size-[7px] rounded-full bg-[#febc2e]" />
        <span className="size-[7px] rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[9px] font-medium text-white/40">Downloads</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-2.5 py-2">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/[0.08]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="1" width="12" height="14" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
            <path d="M5 5h6M5 7.5h4" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-medium leading-tight text-white/70">Quietly-2.7.0-arm64</p>
          <p className="text-[8px] text-white/30">.dmg · 148 MB</p>
        </div>
      </div>
    </div>
  );
}

function DragIllustration() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-3 rounded-xl bg-[#1a1a1a] px-4">
      <div className="flex flex-col items-center gap-1">
        <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-b from-white/10 to-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <Image src={ICON_SRC} alt="" width={32} height={32} className="rounded-md" />
        </div>
        <span className="text-[8px] font-medium text-white/40">Quietly</span>
      </div>
      <ArrowRight size={18} className="shrink-0 text-white/25" />
      <div className="flex flex-col items-center gap-1">
        <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-b from-blue-500/20 to-blue-600/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="14" rx="3" stroke="rgba(96,165,250,0.6)" strokeWidth="1.5"/>
            <path d="M3 10h18" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
            <text x="12" y="19" textAnchor="middle" fill="rgba(96,165,250,0.7)" fontSize="7" fontWeight="600">A</text>
          </svg>
        </div>
        <span className="text-[8px] font-medium text-white/40">Applications</span>
      </div>
    </div>
  );
}

function GatekeeperIllustration() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-[#1a1a1a] px-3 py-3">
      <div className="flex size-8 items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 20h20L12 2z" fill="rgba(250,204,21,0.2)" stroke="rgba(250,204,21,0.7)" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M12 10v4" stroke="rgba(250,204,21,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="17" r="0.8" fill="rgba(250,204,21,0.8)"/>
        </svg>
      </div>
      <p className="text-center text-[9px] font-medium leading-tight text-white/50">
        &ldquo;Quietly&rdquo; can&apos;t be opened
      </p>
      <div className="flex items-center gap-1.5">
        <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[7px] font-medium text-white/30">Move to Trash</span>
        <span className="rounded-md bg-white/[0.1] px-2 py-0.5 text-[7px] font-medium text-white/50">Done</span>
      </div>
    </div>
  );
}

function TerminalIllustration() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(TERMINAL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-[#1a1a1a] p-3">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="size-[7px] rounded-full bg-[#ff5f57]" />
        <span className="size-[7px] rounded-full bg-[#febc2e]" />
        <span className="size-[7px] rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[9px] font-medium text-white/40">Terminal</span>
      </div>
      <div className="group relative flex-1 rounded-lg bg-black/40 px-2.5 py-2">
        <code className="text-[9.5px] leading-relaxed text-emerald-400/80 break-all">
          $ {TERMINAL_CMD}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded bg-white/[0.06] text-white/30 transition-colors hover:bg-white/[0.12] hover:text-white/60"
          aria-label="Copy command"
        >
          {copied ? <Check size={10} /> : <Copy size={10} />}
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── steps config ───────────────────────── */

const steps: Step[] = [
  {
    num: 1,
    color: "rgba(96,165,250,0.9)",
    title: "Open the DMG",
    desc: "Open Quietly.dmg from your Downloads folder.",
    illustration: <FinderIllustration />,
  },
  {
    num: 2,
    color: "rgba(96,165,250,0.9)",
    title: "Move to Applications",
    desc: "Drag Quietly.app into your Applications folder.",
    illustration: <DragIllustration />,
  },
  {
    num: 3,
    color: "rgba(74,222,128,0.9)",
    title: "If macOS asks…",
    desc: "Standard check for unsigned apps. It's safe to proceed.",
    illustration: <GatekeeperIllustration />,
  },
  {
    num: 4,
    color: "rgba(251,146,60,0.9)",
    title: "Quick Fix Command",
    desc: "Paste into Terminal, hit Enter, then open the app again.",
    illustration: <TerminalIllustration />,
  },
];

/* ───────────────────────── step card ───────────────────────── */

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative flex flex-col"
    >
      {/* Number badge */}
      <div
        className="mb-3 flex size-6 items-center justify-center rounded-full text-[11px] font-bold"
        style={{
          background: step.color.replace("0.9", "0.15"),
          color: step.color,
          boxShadow: `0 0 12px ${step.color.replace("0.9", "0.1")}`,
        }}
      >
        {step.num}
      </div>

      {/* Illustration card */}
      <div className="mb-3 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
        {step.illustration}
      </div>

      {/* Text */}
      <h3
        className="mb-1 text-[14px] font-semibold tracking-tight text-white"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        {step.title}
      </h3>
      <p
        className="text-[12px] leading-relaxed text-white/40"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        {step.desc}
      </p>
    </motion.div>
  );
}

/* ───────────────────────── overlay component ───────────────────────── */

export function DownloadOverlay({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="download-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/90 backdrop-blur-xl"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        {/* Subtle glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 60%)" }}
        />

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.99 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative mx-auto w-full max-w-[820px] px-5 py-12 md:px-10 md:py-16"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/30 transition-colors hover:bg-white/[0.1] hover:text-white/60 md:top-6 md:right-6"
            aria-label="Close"
          >
            <X size={14} />
          </button>

          {/* Header */}
          <div className="mb-10 flex flex-col items-center text-center md:mb-12">
            {/* Status pill */}
            <div className="v2-glass-pill mb-5 flex items-center gap-2 rounded-lg px-3 py-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[12px] font-medium text-white/50">DOWNLOADED</span>
            </div>

            {/* Title */}
            <h2
              className="text-[28px] font-semibold tracking-tight text-white md:text-[36px]"
            >
              How to install{" "}
              <span style={{ fontFamily: "var(--font-eb-garamond), 'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
                Quietly
              </span>
            </h2>
          </div>

          {/* Steps 1×4 Grid */}
          <div className="mb-10 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>

          {/* Retry link */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-[12px] text-white/25">
              Download didn&apos;t start?{" "}
              <a
                href={DOWNLOAD_URL}
                className="font-medium text-blue-400/70 underline underline-offset-2 transition-colors hover:text-blue-400"
              >
                Try again
              </a>
            </p>
          </div>

          {/* Footer brand */}
          <div className="mt-10 flex items-center justify-center gap-2 opacity-25">
            <Image src={ICON_SRC} alt="" width={14} height={14} className="rounded-[3px]" />
            <span className="text-[10px] font-medium tracking-wide text-white">Quietly</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
