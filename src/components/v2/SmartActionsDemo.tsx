"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell } from "./ui/SectionShell";
import { ScrollReveal } from "./ui/ScrollReveal";

const PROMPT = "Write me a code in C for sliding window problem";

const RESPONSE_SECTIONS = [
  {
    title: "COMPLEXITY",
    content: [
      "Time complexity: O(n), where n is the length of the array, because each element is visited at most twice.",
      "Space complexity: O(1), because only a constant amount of space is used to store the pointers and max sum.",
    ],
  },
  {
    title: "SOLUTION",
    code: `int maxSubarraySum(int arr[], int n, int k) {
    int maxSum = 0, windowSum = 0;
    for (int i = 0; i < k; i++)
        windowSum += arr[i];
    maxSum = windowSum;
    for (int i = k; i < n; i++) {
        windowSum += arr[i] - arr[i - k];
        if (windowSum > maxSum)
            maxSum = windowSum;
    }
    return maxSum;
}`,
  },
  {
    title: "EDGE CASES",
    content: [
      "Array length less than window size k — return -1 or handle error.",
      "All negative numbers — algorithm still works, tracks maximum correctly.",
      "Window size of 1 — degenerates to finding the max element.",
    ],
  },
  {
    title: "FOLLOW UP",
    content: [
      "How would you modify this for a variable-size sliding window?",
      "Can you optimize for the case where k changes dynamically?",
      "What data structure would you use for sliding window minimum/maximum?",
    ],
  },
];

const INSIGHTS = [
  { icon: "💡", label: "Hint", color: "#FACC15" },
  { icon: "⚡", label: "Solution", color: "#A855F7" },
  { icon: "📊", label: "Complexity", color: "#3B82F6" },
  { icon: "🔴", label: "Edge Cases", color: "#EF4444" },
  { icon: "🔄", label: "Follow Up", color: "#22C55E" },
  { icon: "✨", label: "Improve", color: "#F97316" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function OverlayMock() {
  const [phase, setPhase] = useState<"idle" | "typing" | "sending" | "response">("idle");
  const [typedChars, setTypedChars] = useState(0);
  const [visibleSections, setVisibleSections] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isVisible]);

  // Auto-play sequence
  useEffect(() => {
    if (!isVisible) return;

    // Phase 1: Start typing after 800ms
    const t1 = setTimeout(() => setPhase("typing"), 800);

    return () => clearTimeout(t1);
  }, [isVisible]);

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;
    if (typedChars >= PROMPT.length) {
      // Done typing → send
      const t = setTimeout(() => setPhase("sending"), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTypedChars((p) => p + 1), 45);
    return () => clearTimeout(t);
  }, [phase, typedChars]);

  // Sending → response
  useEffect(() => {
    if (phase !== "sending") return;
    const t = setTimeout(() => {
      setPhase("response");

    }, 800);
    return () => clearTimeout(t);
  }, [phase]);

  // Stagger response sections
  useEffect(() => {
    if (phase !== "response") return;
    if (visibleSections >= RESPONSE_SECTIONS.length) return;
    const t = setTimeout(
      () => setVisibleSections((p) => p + 1),
      visibleSections === 0 ? 300 : 700
    );
    return () => clearTimeout(t);
  }, [phase, visibleSections]);

  // Loop: restart after full display
  useEffect(() => {
    if (phase !== "response" || visibleSections < RESPONSE_SECTIONS.length) return;
    const t = setTimeout(() => {
      setPhase("idle");
      setTypedChars(0);
      setVisibleSections(0);

      // Restart
      setTimeout(() => setPhase("typing"), 1200);
    }, 6000);
    return () => clearTimeout(t);
  }, [phase, visibleSections]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">
      {/* ── Floating Top Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="flex justify-center mb-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl"
          style={{
            background: "linear-gradient(180deg, rgba(50,50,50,0.8) 0%, rgba(30,30,30,0.9) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {/* Pause */}
          <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="rgba(255,255,255,0.6)">
              <rect x="1" y="1" width="3" height="8" rx="0.5"/><rect x="6" y="1" width="3" height="8" rx="0.5"/>
            </svg>
          </div>
          {/* Timer */}
          <div className="flex items-center gap-1.5 px-2">
            <span className="flex gap-[2px]">
              <span className="w-[3px] h-[8px] rounded-full bg-emerald-400 animate-pulse" />
              <span className="w-[3px] h-[6px] rounded-full bg-emerald-400/60 animate-pulse" style={{ animationDelay: "0.15s" }} />
              <span className="w-[3px] h-[10px] rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: "0.3s" }} />
              <span className="w-[3px] h-[5px] rounded-full bg-emerald-400/60 animate-pulse" style={{ animationDelay: "0.45s" }} />
            </span>
            <span className="text-[12px] font-mono text-white/60 tabular-nums">00:21</span>
          </div>
          {/* Mic */}
          <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
            <svg width="11" height="14" viewBox="0 0 11 14" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="0.5" width="5" height="8" rx="2.5"/><path d="M1 6.5a4.5 4.5 0 009 0"/><line x1="5.5" y1="11" x2="5.5" y2="13.5"/>
            </svg>
          </div>
          {/* Divider */}
          <div className="w-px h-5 bg-white/10" />
          {/* Ask AI input */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04]">
            <span className="text-[10px]">✨</span>
            <span className="text-[12px] text-white/40" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Ask AI</span>
            <span className="text-[9px] text-white/20 ml-3 px-1.5 py-0.5 rounded border border-white/10 font-mono">⏎</span>
          </div>
          {/* Action icons */}
          <div className="flex gap-1">
            {["⚙️", "⛶", "◻"].map((icon, i) => (
              <div key={i} className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-[10px] text-white/30">
                {icon}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Listening indicator with live speech ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease, delay: 0.2 }}
        className="flex justify-center mb-4"
      >
        <div className="px-5 py-2 rounded-full min-w-[280px]"
          style={{
            background: "linear-gradient(180deg, rgba(40,40,40,0.7) 0%, rgba(25,25,25,0.8) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider bg-violet-500/20 text-violet-400 border border-violet-500/25 flex-shrink-0">INTERVIEWER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-[12px] text-white/50" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              {phase === "idle" ? (
                "Listening..."
              ) : phase === "typing" || phase === "sending" ? (
                <>
                  <span className="text-white/70">{PROMPT.slice(0, typedChars)}</span>
                  {phase === "typing" && (
                    <span className="inline-block w-[2px] h-[12px] bg-emerald-400/70 ml-[1px] align-middle animate-pulse" />
                  )}
                </>
              ) : (
                <span className="text-white/50">{PROMPT}</span>
              )}
            </span>
          </span>
        </div>
      </motion.div>


      <div className="grid md:grid-cols-[240px_1fr] gap-3 items-start">
        {/* ── Left Panel — Live Insights ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="rounded-2xl p-4"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Panel header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1">
              <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">GEMINI</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider bg-white/5 text-white/40 border border-white/10">VISION</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-white/40">☆</span>
              <span className="text-[12px] font-semibold text-white/70" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Live insights
              </span>
            </div>
            <div className="flex gap-1">
              <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center">
                <span className="text-[10px]">🔊</span>
              </div>
              <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center">
                <span className="text-[10px] text-white/30">📋</span>
              </div>
            </div>
          </div>

          {/* Insight items */}
          <div className="space-y-2.5">
            {INSIGHTS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease, delay: 0.1 * i }}
                className="flex items-start gap-2"
              >
                <span className="text-xs mt-0.5" style={{ color: item.color }}>{item.icon}</span>
                <div>
                  <p className="text-[12px] font-semibold text-white/75" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    {item.label}
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-white/25 font-mono">
                    {phase === "response" && i <= visibleSections ? "READY" : "WAITING FOR SPEECH..."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right Panel — Main Overlay ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            height: "400px",
          }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px]">📄</span>
              <span className="text-[12px] font-semibold text-white/70" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Quietly Intelligence
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-medium text-white/50 bg-white/[0.04] border border-white/[0.08]"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                ✏️ Manual Input
              </span>
            </div>
          </div>


          {/* Response area */}
          <div className="px-4 py-4 space-y-4 flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {phase === "sending" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 py-8 justify-center"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <motion.div
                      key={d}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-white/40"
                    />
                  ))}
                </div>
                <span className="text-[11px] text-white/30" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Thinking...</span>
              </motion.div>
            )}

            <AnimatePresence>
              {phase === "response" &&
                RESPONSE_SECTIONS.slice(0, visibleSections).map((section, i) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease, delay: i * 0.1 }}
                  >
                    <p className="text-[10px] font-mono uppercase tracking-widest text-white/35 mb-2">
                      {section.title}
                    </p>

                    {section.content && (
                      <ul className="space-y-1.5 mb-3">
                        {section.content.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-[12px] text-white/65 leading-relaxed"
                            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                          >
                            <span className="text-white/25 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.code && (
                      <div className="rounded-lg overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.04]">
                          <span className="text-[10px] text-white/30 font-mono">C</span>
                          <span className="text-[10px] text-white/20 cursor-pointer hover:text-white/40">📋</span>
                        </div>
                        <pre className="px-3 py-2.5 text-[11px] text-white/55 font-mono leading-relaxed overflow-x-auto">
                          {section.code}
                        </pre>
                      </div>
                    )}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Shimmer animation */}
      <style>{`
        @keyframes arrival-shine {
          0%, 100% { transform: translateX(-150%); opacity: 0; }
          8% { opacity: 1; }
          40% { transform: translateX(150%); opacity: 1; }
          50%, 100% { transform: translateX(150%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export function SmartActionsDemo() {
  return (
    <SectionShell id="smart-actions" tight>
      <div className="v2-content">
        <ScrollReveal>
          {/* New Arrival badge */}
          <div className="flex justify-center mb-4">
            <div className="relative overflow-hidden px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'Instrument Sans', sans-serif",
              }}
            >
              ✨ New Arrival
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.2) 55%, transparent 70%)",
                  animation: "arrival-shine 2s ease-in-out 0.5s infinite",
                }}
              />
            </div>
          </div>
          <p className="v2-kicker">SMART ACTIONS</p>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium tracking-[-0.03em] leading-[1.15] mb-4">
            Intelligence That <span className="v2-serif">Adapts.</span>
          </h2>
          <p className="text-lg text-[hsl(0_0%_65%)] mb-10 md:mb-12 max-w-xl">
            The overlay changes its actions based on what&apos;s happening in the conversation.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <OverlayMock />
        </ScrollReveal>
      </div>
    </SectionShell>
  );
}
