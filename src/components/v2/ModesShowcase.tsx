"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  TrendingUp,
  BookOpen,
  Users,
  Handshake,
  Code2,
  Clapperboard,
  MessageCircle,
  Lightbulb,
  ClipboardList,
  Mic,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Mode { name: string; Icon: LucideIcon; bg: string; fg: string; }

const MODES: Mode[] = [
  { name: "Interview", Icon: Target, bg: "#7C3AED", fg: "#fff" },
  { name: "Sales", Icon: TrendingUp, bg: "#22C55E", fg: "#fff" },
  { name: "Lecture", Icon: BookOpen, bg: "#3B82F6", fg: "#fff" },
  { name: "Recruiting", Icon: Users, bg: "#EAB308", fg: "#fff" },
  { name: "Team", Icon: Handshake, bg: "#0EA5E9", fg: "#fff" },
  { name: "Technical", Icon: Code2, bg: "#6B7280", fg: "#fff" },
  { name: "Demo", Icon: Clapperboard, bg: "#EC4899", fg: "#fff" },
  { name: "Support", Icon: MessageCircle, bg: "#F97316", fg: "#fff" },
  { name: "Brainstorm", Icon: Lightbulb, bg: "#FACC15", fg: "#1a1a1a" },
  { name: "Review", Icon: ClipboardList, bg: "#14B8A6", fg: "#fff" },
  { name: "1:1", Icon: Mic, bg: "#A855F7", fg: "#fff" },
];

const HIGHLIGHTS = [
  { stat: "11", label: "Specialized Modes", desc: "Each tuned for a specific conversation type" },
  { stat: "AI", label: "Smart Actions", desc: "Context-aware quick actions per mode" },
  { stat: "📝", label: "Note Templates", desc: "Auto-structured notes for every meeting" },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* ── macOS Dock Bar ── */
function DockBar() {
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    // Start auto-cycling after 1s
    const startTimer = setTimeout(() => {
      setActiveIdx(0);
    }, 1000);

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % MODES.length);
    }, 2000);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
      className="flex justify-center mb-10 md:mb-14"
    >
      <div
        className="relative inline-flex items-end gap-1 px-2 pb-1.5 pt-2 rounded-[20px]"
        style={{
          background: "linear-gradient(180deg, rgba(60,60,60,0.65) 0%, rgba(30,30,30,0.75) 100%)",
          backdropFilter: "blur(60px) saturate(1.4)",
          WebkitBackdropFilter: "blur(60px) saturate(1.4)",
          border: "1.5px solid rgba(255,255,255,0.12)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.18)",
            "inset 0 -1px 2px rgba(0,0,0,0.3)",
            "inset 0 0 12px rgba(0,0,0,0.15)",
            "0 0 0 1px rgba(0,0,0,0.4)",
            "0 8px 30px rgba(0,0,0,0.5)",
            "0 20px 60px rgba(0,0,0,0.3)",
          ].join(", "),
        }}
      >
        {MODES.map((mode, i) => {
          const isActive = i === activeIdx;
          return (
            <motion.div
              key={mode.name}
              animate={{
                scale: isActive ? 1.3 : 1,
                y: isActive ? -10 : 0,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className="relative flex flex-col items-center cursor-default"
              onMouseEnter={() => setActiveIdx(i)}
            >
              {/* Tooltip bubble */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white"
                    style={{
                      background: "rgba(30,30,30,0.95)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                      fontFamily: "'Instrument Sans', sans-serif",
                    }}
                  >
                    {mode.name}
                    {/* Arrow */}
                    <span
                      className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45"
                      style={{
                        background: "rgba(30,30,30,0.95)",
                        borderRight: "1px solid rgba(255,255,255,0.12)",
                        borderBottom: "1px solid rgba(255,255,255,0.12)",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon tile — colored app icon */}
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                style={{
                  background: `linear-gradient(145deg, ${mode.bg}, ${mode.bg}cc)`,
                  boxShadow: isActive
                    ? `0 4px 12px ${mode.bg}40, inset 0 1px 0 rgba(255,255,255,0.25)`
                    : `inset 0 1px 0 rgba(255,255,255,0.2)`,
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <mode.Icon size={18} color={mode.fg} strokeWidth={2} />
              </div>

              {/* Active dot */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-1 h-1 rounded-full bg-white/60 mt-1"
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function ModesShowcase() {
  return (
    <section id="modes" className="py-20 md:py-28 px-8 md:px-28 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
        >
          <p
            className="text-xs font-mono uppercase tracking-widest text-[hsl(0_0%_40%)] mb-3"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            MODES
          </p>
          <h2
            className="text-[clamp(2rem,5vw,3rem)] font-medium tracking-[-0.03em] leading-[1.15] mb-4"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Built for Every{" "}
            <span
              className="italic font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Situation.
            </span>
          </h2>
          <p
            className="text-lg text-[hsl(0_0%_65%)] mb-10 md:mb-12 max-w-xl"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            11 specialized modes. Each with its own AI brain, smart actions, and
            note templates — so every conversation gets the right expert.
          </p>
        </motion.div>

        {/* ── macOS Dock ── */}
        <DockBar />

        {/* ── Image showcase ── */}
        <div className="relative mx-auto max-w-2xl mb-0">
          {/* Studio backlight — sits behind image */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(100,130,255,0.25) 0%, rgba(120,60,220,0.12) 30%, transparent 60%)",
            }}
          />

          {/* Image with mask */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="relative z-10 overflow-hidden"
            style={{
              maskImage:
                "radial-gradient(ellipse 92% 88% at 50% 50%, black 55%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 92% 88% at 50% 50%, black 55%, transparent 100%)",
            }}
          >
            <img
              src="/images/teamsync/v2/modes-showcase.png"
              alt="Quietly Meeting Modes — Interview, Sales Copilot, Recruit, Meet, Lecture, Technical"
              className="w-[100.14%] h-auto rounded-2xl -ml-[0.14%]"
            />
            {/* Glass flash sweep */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 70%)",
                animation: "glass-flash 3s ease-in-out 2s infinite",
              }}
            />
            <style>{`
              @keyframes glass-flash {
                0% { transform: translateX(-120%); opacity: 0; }
                5% { opacity: 1; }
                30% { transform: translateX(120%); opacity: 1; }
                35%, 100% { transform: translateX(120%); opacity: 0; }
              }
            `}</style>
          </motion.div>
        </div>

        {/* ── Highlights grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 md:mt-16"
        >
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.1 * i }}
              className="rounded-xl p-5 border transition-colors duration-300 hover:border-white/15"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-2xl font-semibold text-white mb-1"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                {h.stat}
              </p>
              <p
                className="text-sm font-medium text-white/80 mb-1"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                {h.label}
              </p>
              <p
                className="text-sm text-[hsl(0_0%_50%)]"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                {h.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
