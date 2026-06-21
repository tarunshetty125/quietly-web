"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, X, FolderOpen, ShieldCheck, MonitorDown, Rocket, Sparkles, ChevronRight } from "lucide-react";

/* ───────────────────────── constants ───────────────────────── */

const DOWNLOAD_URL =
  "https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.1/Quietly-Setup-2.7.1.exe";
const ICON_SRC = "/images/quietly/iconq-transparent.png";

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

function FileExplorerIllustration() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#0d1117] p-3.5">
      {/* Title bar — Windows style */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="1" width="4.5" height="4.5" rx="0.5" fill="rgba(96,165,250,0.5)" />
            <rect x="6.5" y="1" width="4.5" height="4.5" rx="0.5" fill="rgba(96,165,250,0.3)" />
            <rect x="1" y="6.5" width="4.5" height="4.5" rx="0.5" fill="rgba(96,165,250,0.3)" />
            <rect x="6.5" y="6.5" width="4.5" height="4.5" rx="0.5" fill="rgba(96,165,250,0.2)" />
          </svg>
          <span className="text-[10px] font-medium text-white/50">Downloads</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-2.5 bg-white/20" />
          <span className="size-2 border border-white/20" />
          <span className="text-[10px] text-white/20">✕</span>
        </div>
      </div>
      {/* Address bar */}
      <div className="mb-2.5 flex items-center gap-1.5 rounded-md bg-white/[0.03] border border-white/[0.06] px-2.5 py-1">
        <FolderOpen size={9} className="text-yellow-400/50" />
        <span className="text-[8px] text-white/30">This PC › Downloads</span>
      </div>
      {/* File row */}
      <div className="flex items-center gap-3 rounded-lg bg-blue-500/[0.08] px-3 py-2 border border-blue-400/[0.12]">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-b from-blue-500/15 to-blue-600/[0.06] border border-blue-400/10">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="2" width="14" height="14" rx="2" fill="rgba(96,165,250,0.12)" stroke="rgba(96,165,250,0.4)" strokeWidth="1" />
            <path d="M6 7l3 4 3-4" fill="rgba(96,165,250,0.4)" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-semibold leading-tight text-white/80">
            Quietly-Setup-2.7.1.exe
          </p>
          <p className="mt-0.5 text-[8px] font-medium text-emerald-400/60">684 MB</p>
        </div>
      </div>
    </div>
  );
}

function SmartScreenIllustration() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-2xl bg-[#0d1117] px-4 py-3">
      {/* Shield icon */}
      <div className="flex size-9 items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 6v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.6)" strokeWidth="1.4" />
          <path d="M12 8v4" stroke="rgba(59,130,246,0.8)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="15" r="0.8" fill="rgba(59,130,246,0.8)" />
        </svg>
      </div>
      <p className="text-center text-[9px] font-semibold leading-tight text-white/55">
        Windows protected your PC
      </p>
      {/* Buttons */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        <span className="text-[8px] font-medium text-blue-400/60 underline underline-offset-2">
          More info
        </span>
        <span className="rounded-md bg-blue-500/20 border border-blue-400/20 px-3 py-1 text-[8px] font-semibold text-blue-300/80">
          Run anyway
        </span>
      </div>
    </div>
  );
}

function SetupWizardIllustration() {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-[#0d1117] p-3.5">
      {/* Title bar */}
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[9px] font-medium text-white/50">Quietly Setup</span>
        <span className="text-[9px] text-white/20">✕</span>
      </div>
      {/* Setup content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2.5">
        <Image src={ICON_SRC} alt="" width={28} height={28} className="rounded-lg" />
        <p className="text-center text-[9px] font-semibold text-white/50">
          Installing Quietly...
        </p>
        {/* Progress bar */}
        <div className="h-1.5 w-[70%] overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500/80 to-violet-500/60" />
        </div>
        <p className="text-[7px] text-white/25">72% complete</p>
      </div>
    </div>
  );
}

function LaunchIllustration() {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-[#0d1117] p-3.5">
      {/* Windows taskbar at bottom */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.1] shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <Image src={ICON_SRC} alt="" width={30} height={30} className="rounded-lg" />
          </div>
          <span className="text-[9px] font-semibold text-white/50">Quietly</span>
        </div>
      </div>
      {/* Taskbar */}
      <div className="mt-auto flex items-center justify-center gap-3 rounded-lg bg-white/[0.03] border-t border-white/[0.06] px-3 py-1.5">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="1" width="4.5" height="4.5" rx="0.5" fill="rgba(96,165,250,0.4)" />
          <rect x="6.5" y="1" width="4.5" height="4.5" rx="0.5" fill="rgba(74,222,128,0.4)" />
          <rect x="1" y="6.5" width="4.5" height="4.5" rx="0.5" fill="rgba(250,204,21,0.4)" />
          <rect x="6.5" y="6.5" width="4.5" height="4.5" rx="0.5" fill="rgba(239,68,68,0.4)" />
        </svg>
        <div className="h-5 w-px bg-white/[0.06]" />
        <div className="flex size-6 items-center justify-center rounded-md bg-white/[0.06] border border-white/[0.08]">
          <Image src={ICON_SRC} alt="" width={14} height={14} className="rounded-[2px]" />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── steps config ───────────────────────── */

const winSteps: Step[] = [
  {
    num: 1,
    badgeGradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
    borderAccent: "rgba(96,165,250,0.2)",
    glowColor: "rgba(96,165,250,0.08)",
    titleIcon: <FolderOpen size={14} className="text-blue-400" />,
    title: "Run the Installer",
    desc: "Open Quietly-Setup-2.7.1.exe from your Downloads.",
    illustration: <FileExplorerIllustration />,
  },
  {
    num: 2,
    badgeGradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
    borderAccent: "rgba(96,165,250,0.2)",
    glowColor: "rgba(96,165,250,0.08)",
    titleIcon: <ShieldCheck size={14} className="text-blue-400" />,
    title: "Click Run Anyway",
    desc: "Click \"More info\" then \"Run anyway\" — it's safe.",
    illustration: <SmartScreenIllustration />,
  },
  {
    num: 3,
    badgeGradient: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
    borderAccent: "rgba(74,222,128,0.2)",
    glowColor: "rgba(74,222,128,0.08)",
    titleIcon: <MonitorDown size={14} className="text-emerald-400" />,
    title: "Complete Setup",
    desc: "Follow the installer prompts to finish.",
    illustration: <SetupWizardIllustration />,
  },
  {
    num: 4,
    badgeGradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
    borderAccent: "rgba(168,85,247,0.2)",
    glowColor: "rgba(168,85,247,0.08)",
    titleIcon: <Rocket size={14} className="text-violet-400" />,
    title: "Launch Quietly",
    desc: "Open from Start Menu or Desktop shortcut.",
    illustration: <LaunchIllustration />,
  },
];

/* ───────────────────────── step card ───────────────────────── */

function WinStepCard({ step, index, isLast }: { step: Step; index: number; isLast: boolean }) {
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

export function WindowsDownloadOverlay({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="win-download-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal card */}
      <motion.div
        key="win-download-overlay"
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
            className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-white/40 transition-all hover:bg-white/[0.1] hover:text-white/70"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* Steps 1×4 Grid with arrows */}
          <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:justify-center md:gap-0">
            {winSteps.map((step, i) => (
              <WinStepCard key={step.num} step={step} index={i} isLast={i === winSteps.length - 1} />
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
                href={DOWNLOAD_URL}
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
