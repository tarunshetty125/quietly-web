"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, Copy, ArrowRight, X, FolderOpen, FolderInput, ShieldCheck, TerminalSquare, Sparkles, ChevronRight } from "lucide-react";

/* ───────────────────────── constants ───────────────────────── */

const DOWNLOAD_URL =
  "https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.3/Quietly-2.7.3-arm64.dmg";
const ICON_SRC = "/images/quietly/iconq-transparent.png";
const TERMINAL_CMD = "xattr -cr /Applications/Quietly.app";

/* ───────────────────────── step data ───────────────────────── */

type Step = {
  num: number;
  badgeGradient: string;
  borderAccent: string;
  glowColor: string;
  titleIcon: ReactNode;
  title: string;
  desc: string;
  illustration: ReactNode;
};

/* ───────────────────────── step illustrations ───────────────── */

function FinderIllustration() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#0d1117] p-3.5">
      {/* Title bar */}
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-[8px] rounded-full bg-[#ff5f57]" />
        <span className="size-[8px] rounded-full bg-[#febc2e]" />
        <span className="size-[8px] rounded-full bg-[#28c840]" />
        <span className="ml-2 flex items-center gap-1 text-[10px] font-medium text-white/50">
          <FolderOpen size={10} className="text-blue-400/60" />
          Downloads
        </span>
      </div>
      {/* File row */}
      <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5 border border-white/[0.06]">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-white/10 to-white/[0.03] border border-white/[0.08]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="2" width="14" height="16" rx="2.5" stroke="rgba(96,165,250,0.5)" strokeWidth="1.2" />
            <path d="M7 6h6M7 9h4" stroke="rgba(96,165,250,0.3)" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M10 12l-2 2.5h4L10 12z" fill="rgba(96,165,250,0.4)" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-semibold leading-tight text-white/80">
            Quietly-2.7.3-arm64.dmg
          </p>
          <p className="mt-0.5 text-[9px] font-medium text-emerald-400/60">148 MB</p>
        </div>
      </div>
    </div>
  );
}

function DragIllustration() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 rounded-2xl bg-[#0d1117] px-5 py-4">
      {/* App icon */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.1] shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
          <Image src={ICON_SRC} alt="" width={36} height={36} className="rounded-lg" />
        </div>
        <span className="text-[9px] font-semibold text-white/45">Quietly</span>
      </div>
      {/* Arrow */}
      <ArrowRight size={18} className="shrink-0 text-white/20" />
      {/* Applications folder */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-b from-blue-500/15 to-blue-600/[0.06] border border-blue-400/15 shadow-[0_4px_12px_rgba(59,130,246,0.1)]">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="3" y="7" width="22" height="17" rx="3.5" fill="rgba(96,165,250,0.12)" stroke="rgba(96,165,250,0.4)" strokeWidth="1.2" />
            <path d="M3 11.5h22" stroke="rgba(96,165,250,0.25)" strokeWidth="1" />
            <text x="14" y="22" textAnchor="middle" fill="rgba(96,165,250,0.65)" fontSize="9" fontWeight="700" fontFamily="system-ui">A</text>
          </svg>
        </div>
        <span className="text-[9px] font-semibold text-white/45">Applications</span>
      </div>
    </div>
  );
}

function GatekeeperIllustration() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-2xl bg-[#0d1117] px-4 py-4">
      {/* Warning triangle */}
      <div className="flex size-10 items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 3L2 24h24L14 3z" fill="rgba(250,204,21,0.15)" stroke="rgba(250,204,21,0.65)" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M14 12v5" stroke="rgba(250,204,21,0.8)" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="14" cy="20.5" r="1" fill="rgba(250,204,21,0.8)" />
        </svg>
      </div>
      <p className="text-center text-[11px] font-semibold leading-tight text-white/55">
        &ldquo;Quietly&rdquo; can&apos;t be opened
      </p>
      {/* Buttons */}
      <div className="flex items-center gap-2">
        <span className="rounded-lg bg-white/[0.05] border border-white/[0.08] px-3 py-1 text-[9px] font-semibold text-white/35">
          Move to Trash
        </span>
        <span className="rounded-lg bg-blue-500/20 border border-blue-400/20 px-3 py-1 text-[9px] font-semibold text-blue-300/70">
          Done
        </span>
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
    <div className="flex h-full w-full flex-col rounded-2xl bg-[#0d1117] p-3.5">
      {/* Title bar */}
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-[8px] rounded-full bg-[#ff5f57]" />
        <span className="size-[8px] rounded-full bg-[#febc2e]" />
        <span className="size-[8px] rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] font-medium text-white/50">Terminal</span>
      </div>
      {/* Command */}
      <div className="group relative flex-1 rounded-xl bg-black/50 border border-white/[0.06] px-3 py-2.5">
        <code className="text-[10px] leading-relaxed break-all">
          <span className="text-emerald-400/70">$</span>{" "}
          <span className="text-emerald-400/50">xattr -cr /Applications/</span>
          <span className="text-emerald-300/80">Quietly.app</span>
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-md bg-white/[0.06] border border-white/[0.08] text-white/30 transition-all hover:bg-white/[0.12] hover:text-white/60"
          aria-label="Copy command"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
        </button>
        {/* Cursor */}
        <div className="mt-2 h-3 w-[6px] rounded-[1px] bg-white/20 animate-pulse" />
      </div>
    </div>
  );
}

/* ───────────────────────── steps config ───────────────────────── */

const steps: Step[] = [
  {
    num: 1,
    badgeGradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
    borderAccent: "rgba(96,165,250,0.2)",
    glowColor: "rgba(96,165,250,0.08)",
    titleIcon: <FolderOpen size={14} className="text-blue-400" />,
    title: "Open the DMG",
    desc: "Open Quietly.dmg from your Downloads folder.",
    illustration: <FinderIllustration />,
  },
  {
    num: 2,
    badgeGradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
    borderAccent: "rgba(96,165,250,0.2)",
    glowColor: "rgba(96,165,250,0.08)",
    titleIcon: <FolderInput size={14} className="text-blue-400" />,
    title: "Move to Applications",
    desc: "Drag Quietly.app into your Applications folder.",
    illustration: <DragIllustration />,
  },
  {
    num: 3,
    badgeGradient: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
    borderAccent: "rgba(74,222,128,0.2)",
    glowColor: "rgba(74,222,128,0.08)",
    titleIcon: <ShieldCheck size={14} className="text-emerald-400" />,
    title: "If macOS asks…",
    desc: "Standard check for unsigned apps. It's safe to proceed.",
    illustration: <GatekeeperIllustration />,
  },
  {
    num: 4,
    badgeGradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
    borderAccent: "rgba(168,85,247,0.2)",
    glowColor: "rgba(168,85,247,0.08)",
    titleIcon: <TerminalSquare size={14} className="text-violet-400" />,
    title: "Quick Fix Command",
    desc: "Paste into Terminal, hit Enter, then open the app again.",
    illustration: <TerminalIllustration />,
  },
];

/* ───────────────────────── step card ───────────────────────── */

function StepCard({ step, index, isLast }: { step: Step; index: number; isLast: boolean }) {
  return (
    <div className="flex items-start gap-0">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12 + index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative flex w-[190px] flex-col"
      >
        {/* Number badge */}
        <div
          className="mb-3 flex size-7 items-center justify-center rounded-full text-[12px] font-bold text-white shadow-lg"
          style={{
            background: step.badgeGradient,
            boxShadow: `0 4px 14px ${step.glowColor.replace("0.08", "0.35")}`,
          }}
        >
          {step.num}
        </div>

        {/* Illustration card — fixed height for all steps */}
        <div
          className="mb-4 h-[130px] w-full overflow-hidden rounded-2xl"
          style={{
            border: `1px solid ${step.borderAccent}`,
            boxShadow: `0 8px 32px ${step.glowColor}, inset 0 1px 0 rgba(255,255,255,0.04)`,
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {step.illustration}
        </div>

        {/* Title with icon */}
        <div className="mb-1 flex items-center gap-1.5">
          {step.titleIcon}
          <h3
            className="text-[14px] font-bold tracking-tight text-white"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {step.title}
          </h3>
        </div>
        <p
          className="max-w-[180px] text-[12px] leading-relaxed text-white/40"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {step.desc}
        </p>
      </motion.div>

      {/* Arrow between cards */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          className="hidden md:flex items-start pt-[90px] px-2 shrink-0"
        >
          <ArrowRight size={14} className="text-white/15" />
        </motion.div>
      )}
    </div>
  );
}

/* ───────────────────────── overlay component ───────────────────────── */

export function DownloadOverlay({ onClose, downloadUrl }: { onClose: () => void; downloadUrl?: string }) {
  const retryUrl = downloadUrl || DOWNLOAD_URL;
  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="download-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal card */}
      <motion.div
        key="download-overlay"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed inset-0 z-[10001] flex items-center justify-center pointer-events-none"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        <div
          className="pointer-events-auto relative w-full max-w-[920px] max-h-[85vh] overflow-y-auto mx-4 rounded-2xl border border-white/[0.1] px-6 py-8 md:px-10 md:py-10"
          style={{
            background: "#0d0d0d",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-white/40 transition-all hover:bg-white/[0.1] hover:text-white/70 md:top-6 md:right-6"
            aria-label="Close"
          >
            <X size={16} />
          </button>



          {/* Steps 1×4 Grid with arrows */}
          <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:justify-center md:gap-0">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} isLast={i === steps.length - 1} />
            ))}
          </div>

          {/* Help bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mx-auto mb-6 max-w-[560px]"
          >
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 backdrop-blur-sm">
              <Sparkles size={14} className="shrink-0 text-violet-400/60" />
              <p className="text-[12px] font-medium text-white/35">
                Need help?{" "}
                <a href="#" className="font-semibold text-blue-400/70 hover:text-blue-400 transition-colors">
                  Visit our docs
                </a>
                {" "}or reach out to{" "}
                <a href="mailto:support@quietly.ai" className="font-semibold text-blue-400/70 hover:text-blue-400 transition-colors">
                  support
                </a>
                .
              </p>
              <ChevronRight size={14} className="shrink-0 text-white/15" />
            </div>
          </motion.div>

          {/* Retry link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex flex-col items-center gap-1 text-center"
          >
            <p className="text-[12px] text-white/25">
              Download didn&apos;t start?{" "}
              <a
                href={retryUrl}
                className="font-semibold text-blue-400/60 underline underline-offset-2 transition-colors hover:text-blue-400"
              >
                Try again
              </a>
            </p>
          </motion.div>

          {/* Footer brand */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.65 }}
            className="mt-8 flex items-center justify-center gap-2 opacity-25"
          >
            <Image src={ICON_SRC} alt="" width={16} height={16} className="rounded-[4px]" />
            <span className="text-[11px] font-semibold tracking-wider text-white">Quietly</span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
