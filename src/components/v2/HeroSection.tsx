"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { DownloadOverlay } from "./DownloadOverlay";

const VIDEO_SRC = "/images/teamsync/v2/hero-bg.mp4";
const DOWNLOAD_URL = "https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.3/Quietly-2.7.3-arm64.dmg";

const entrance = (y: number, delay: number, duration = 0.6) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay },
});

/* ── Magnetic spring config ────────────────────────────────── */
const magSpring = { stiffness: 260, damping: 24, mass: 0.62 };
const txtSpring = { stiffness: 340, damping: 25, mass: 0.5 };
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

function MagneticHeroCTA({ onDownloadClick }: { onDownloadClick?: () => void }) {
  const prefersReduced = useReducedMotion();
  const fieldRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [flashKey, setFlashKey] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ms = useMotionValue(1);
  const mr = useMotionValue(0);
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);

  const x = useSpring(mx, magSpring);
  const y = useSpring(my, magSpring);
  const scale = useSpring(ms, magSpring);
  const rotateZ = useSpring(mr, magSpring);
  const textX = useSpring(tx, txtSpring);
  const textY = useSpring(ty, txtSpring);

  const reset = useCallback(() => {
    mx.set(0); my.set(0); ms.set(1); mr.set(0); tx.set(0); ty.set(0);
    btnRef.current?.style.setProperty("--pill-x", "52%");
    btnRef.current?.style.setProperty("--pill-y", "26%");
  }, [mx, my, ms, mr, tx, ty]);

  const update = useCallback(
    (cx2: number, cy2: number) => {
      if (prefersReduced) return;
      const field = fieldRef.current;
      const button = btnRef.current;
      if (!field || !button) return;
      const r = field.getBoundingClientRect();
      const bx = r.left + r.width / 2;
      const by = r.top + r.height / 2;
      const dx = cx2 - bx;
      const dy = cy2 - by;
      const dist = Math.hypot(dx, dy);
      const str = Math.pow(clamp(1 - dist / 140, 0, 1), 1.4);
      if (str < 0.02) { reset(); return; }
      mx.set(clamp(dx * 0.1 * str, -8, 8));
      my.set(clamp(dy * 0.08 * str, -5, 5));
      ms.set(1 + 0.012 * str);
      mr.set(clamp(dx * 0.005 * str, -0.6, 0.6));
      tx.set(clamp(dx * 0.08 * str, -4, 4));
      ty.set(clamp(dy * 0.1 * str, -3, 3));
      const br = button.getBoundingClientRect();
      button.style.setProperty("--pill-x", `${clamp(((cx2 - br.left) / br.width) * 100, 14, 86)}%`);
      button.style.setProperty("--pill-y", `${clamp(((cy2 - br.top) / br.height) * 100, 8, 68)}%`);
    },
    [prefersReduced, reset, mx, my, ms, mr, tx, ty],
  );

  useEffect(() => {
    let af: number | null = null;
    let latest: { x: number; y: number } | null = null;
    const onMove = (e: PointerEvent) => {
      latest = { x: e.clientX, y: e.clientY };
      if (af !== null) return;
      af = requestAnimationFrame(() => { af = null; if (latest) update(latest.x, latest.y); });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", reset);
    return () => { if (af !== null) cancelAnimationFrame(af); window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerleave", reset); };
  }, [update, reset]);

  return (
    <div ref={fieldRef} className="relative flex min-h-[52px] w-full items-center justify-center overflow-visible">
      <motion.a
        ref={btnRef}
        href={DOWNLOAD_URL}
        onClick={(e) => {
          if (!prefersReduced) setFlashKey((k) => k + 1);
          onDownloadClick?.();
        }}
        whileTap={prefersReduced ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 360, damping: 24 }}
        className="group relative inline-flex h-[40px] min-w-[190px] items-center justify-center overflow-hidden rounded-full px-5 text-[13px] font-semibold tracking-[-0.005em] outline-none transition-[filter] duration-200 ease-out"
        style={{
          x, y, scale, rotateZ,
          fontFamily: "'Instrument Sans', sans-serif",
          background: "radial-gradient(circle at var(--pill-x, 52%) var(--pill-y, 26%), rgba(255,255,255,1) 0%, rgba(230,230,230,0.95) 40%, rgba(200,200,200,0.92) 100%)",
          color: "#0a0a0a",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -8px 16px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2)",
        }}
      >
        {/* Inner shine */}
        <span className="pointer-events-none absolute inset-x-[8%] top-1 h-[46%] rounded-full bg-gradient-to-b from-white/90 via-white/40 to-transparent blur-[6px]" />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.3)_42%,rgba(255,255,255,0.5)_50%,transparent_62%)] opacity-75 transition-transform duration-500 group-hover:translate-x-2" />

        {/* Flash */}
        {flashKey > 0 && (
          <motion.span
            key={flashKey}
            className="pointer-events-none absolute inset-0 z-20 rounded-full bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.18, times: [0, 0.16, 0.42, 1], ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        <motion.span
          className="relative z-10 flex items-center gap-2"
          style={{ x: textX, y: textY }}
        >
          Get Started for Free
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </motion.span>
      </motion.a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION — Neuralyn structure, Quietly brand
   Video centered at natural dimensions, dashboard overlaid
   ═══════════════════════════════════════════════════════════════ */
export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showDownloadOverlay, setShowDownloadOverlay] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden bg-black pb-0">
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 md:px-28 py-4 bg-white/[0.04] backdrop-blur-md border-b border-white/[0.06]">
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: "Features", href: "#platform", chevron: false },
            { label: "Modes", href: "#modes", chevron: true },
            { label: "Pricing", href: "#pricing", chevron: false },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-md"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              {link.label}
              {link.chevron && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Hero text content ───────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center mt-24 md:mt-28 px-4"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Tag pill — liquid glass */}
        <motion.div
          className="v2-glass-pill px-3 py-2 rounded-lg mb-6 flex items-center gap-2"
          {...entrance(10, 0, 0.5)}
        >
          <span className="relative overflow-hidden bg-white text-black rounded-md text-sm font-medium px-2 py-0.5">
            New
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)",
                animation: "shimmer-sweep 2.5s ease-in-out infinite",
              }}
            />
          </span>
          <span
            className="text-sm font-medium text-[hsl(0_0%_65%)]"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            11 Modes · One-time purchase
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl tracking-[-2px] font-medium leading-tight md:leading-[1.15] mb-3"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          {...entrance(20, 0.1)}
        >
          One Assistant.
          <br />
          Every{" "}
          <span className="italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Conversation.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg font-normal leading-6 opacity-90 mb-8 max-w-xl"
          style={{ color: "hsl(210 17% 95%)", fontFamily: "'Instrument Sans', sans-serif" }}
          {...entrance(20, 0.2)}
        >
          Real-time AI answers, live transcription, and 11 specialized
          <br />
          modes — for interviews, sales, lectures, and every meeting in between.
        </motion.p>

        {/* CTA — Magnetic Button */}
        <motion.div {...entrance(20, 0.3)}>
          <MagneticHeroCTA onDownloadClick={() => {
            setTimeout(() => setShowDownloadOverlay(true), 1000);
          }} />
        </motion.div>
      </motion.div>

      {/* ── Dashboard + Video area ──────────────────────────────── */}
      <motion.div
        className="relative mt-2 md:mt-4 mx-auto max-w-6xl w-[92%] pb-20"
        style={{ y: dashboardY }}
        {...entrance(40, 0.4, 0.8)}
      >
        {/* Video — natural 1664×1244 aspect, centered, rounded */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            maskImage: "radial-gradient(ellipse 85% 80% at 50% 45%, black 50%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 50% 45%, black 50%, transparent 100%)",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block"
            style={{ filter: "contrast(1.15) brightness(1.05) saturate(1.3)" }}
            src={VIDEO_SRC}
          />

          {/* Dashboard image — fused into video */}
          <div
            className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[70%] h-[80%] overflow-hidden rounded-xl"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
            }}
          >
            <img
              src="/images/teamsync/v2/dashboard.png"
              alt="Quietly Dashboard"
              className="w-[101%] h-auto -ml-[0.5%]"
              style={{ mixBlendMode: "luminosity" }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Bottom gradient fade ─────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />

      {/* ── Download install overlay ─────────────────────────────── */}
      {showDownloadOverlay && (
        <DownloadOverlay onClose={() => setShowDownloadOverlay(false)} />
      )}
    </section>
  );
}
