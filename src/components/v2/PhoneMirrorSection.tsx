"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell } from "./ui/SectionShell";
import { ScrollReveal } from "./ui/ScrollReveal";

const MIRROR_MESSAGES = [
  {
    q: "Tell me about your experience with distributed systems.",
    a: "At Stripe, I led the payment system migration from a monolithic Rails app to event-driven microservices using Kafka and gRPC.",
  },
  {
    q: "How did you handle scaling challenges?",
    a: "We reduced p99 latency from 340ms to 45ms by implementing read-through caching with Redis Cluster and sharding by merchant_id.",
  },
  {
    q: "Walk me through a difficult technical decision.",
    a: "Chose eventual consistency over strong consistency for our notification pipeline — accepted 2s delay for 10x throughput gain during peak.",
  },
];

function TypewriterText({ text, speed = 20 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    startRef.current = 0;

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const chars = Math.min(Math.floor(elapsed / speed), text.length);
      setDisplayed(text.slice(0, chars));
      if (chars >= text.length) {
        setDone(true);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-[2px] h-3 bg-sky-400/80 animate-pulse ml-0.5 align-middle" />}
    </span>
  );
}

export function PhoneMirrorSection() {
  const [activeMsg, setActiveMsg] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-start on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsLive(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-cycle messages
  useEffect(() => {
    if (!isLive) return;
    const t = setInterval(() => {
      setActiveMsg((p) => (p + 1) % MIRROR_MESSAGES.length);
    }, 6000);
    return () => clearInterval(t);
  }, [isLive]);

  const msg = MIRROR_MESSAGES[activeMsg];

  return (
    <SectionShell id="mirror">
      <div className="v2-content" ref={sectionRef}>
        <ScrollReveal>
          <p className="v2-kicker text-center">PHONE MIRROR</p>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium tracking-[-0.03em] leading-[1.15] mb-4 text-center">
            Your AI, <span className="v2-serif">Everywhere.</span>
          </h2>
          <p className="text-lg text-[hsl(0_0%_65%)] mb-12 md:mb-16 text-center max-w-xl mx-auto">
            Mirror responses to your phone in real-time. Read answers discreetly under the table — no one sees your screen.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex items-center justify-center gap-8 md:gap-14">
            {/* MacBook Pro mock */}
            <div className="hidden md:block relative" style={{ perspective: "1200px" }}>
              <div style={{ transform: "rotateY(8deg) rotateX(-2deg)" }}>
                {/* Lid / Screen assembly */}
                <div className="relative w-[400px] rounded-t-[12px] overflow-hidden"
                  style={{
                    aspectRatio: "16/10.5",
                    background: "linear-gradient(180deg, hsl(0 0% 10%) 0%, hsl(0 0% 7%) 100%)",
                    border: "2px solid hsl(0 0% 16%)",
                    borderBottom: "none",
                    boxShadow: "0 -2px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Camera notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[6px] rounded-b-md z-10"
                    style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 18%)", borderTop: "none" }}
                  >
                    <div className="absolute top-[1px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[hsl(220_10%_20%)]" />
                  </div>

                  {/* Screen bezel */}
                  <div className="absolute inset-[6px] rounded-[4px] overflow-hidden"
                    style={{ background: "linear-gradient(135deg, hsl(220 15% 5%) 0%, hsl(0 0% 2%) 100%)" }}
                  >
                    {/* Menu bar */}
                    <div className="flex items-center px-2.5 py-1.5 border-b border-white/[0.05]"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      <div className="flex gap-[5px]">
                        <div className="w-[7px] h-[7px] rounded-full bg-[#ff5f57]" />
                        <div className="w-[7px] h-[7px] rounded-full bg-[#febc2e]" />
                        <div className="w-[7px] h-[7px] rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex-1 text-center">
                        <span className="text-[7px] text-white/25">Zoom — System Design Interview</span>
                      </div>
                      <div className="w-12" />
                    </div>

                    {/* Zoom grid */}
                    <div className="grid grid-cols-2 gap-1.5 p-2 h-[calc(100%-28px)]">
                      {["JW", "SK", "AL", "You"].map((name, i) => (
                        <div key={i} className="rounded-md flex flex-col items-center justify-center relative"
                          style={{ background: `hsl(${200 + i * 30} 10% ${8 + i}%)` }}
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] text-white/30 font-medium"
                            style={{ background: `hsl(${200 + i * 40} 15% 18%)` }}
                          >
                            {name}
                          </div>
                          {i === 3 && (
                            <div className="absolute bottom-1 right-1 w-2 h-2 rounded-sm bg-red-500/60" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* AI Overlay bar */}
                    <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[90%] rounded-lg overflow-hidden z-10"
                      style={{
                        background: "rgba(0,0,0,0.88)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                      }}
                    >
                      <div className="p-2.5">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[7px] font-mono text-emerald-400/70">LISTENING</span>
                          </div>
                          <span className="text-[6px] font-mono text-white/15">quietly.ai</span>
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeMsg}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-[7px] text-white/25 mb-1 font-mono">Q: {msg.q}</p>
                            <p className="text-[8px] text-white/70 leading-relaxed">
                              {isLive ? <TypewriterText text={msg.a} speed={22} /> : msg.a}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hinge */}
                <div className="w-[402px] h-[3px] -ml-[1px] rounded-none"
                  style={{ background: "linear-gradient(180deg, hsl(0 0% 18%) 0%, hsl(0 0% 12%) 100%)" }}
                />

                {/* Base / Body */}
                <div className="relative w-[420px] -ml-[10px]"
                  style={{
                    height: "10px",
                    background: "linear-gradient(180deg, hsl(0 0% 15%) 0%, hsl(0 0% 11%) 100%)",
                    borderRadius: "0 0 8px 8px",
                    border: "1px solid hsl(0 0% 18%)",
                    borderTop: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Trackpad indent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-[2px] rounded-t-sm"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  />
                </div>
              </div>
            </div>

            {/* Connection — QR code + desc */}
            <div className="hidden md:flex flex-col items-center gap-4 px-2">
              {/* Animated line top */}
              <svg width="2" height="30" className="text-white/10">
                <line x1="1" y1="0" x2="1" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="0.8s" repeatCount="indefinite" />
                </line>
              </svg>

              {/* QR Code */}
              <div className="relative p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  {/* QR pattern — stylized grid */}
                  {/* Corners */}
                  <rect x="2" y="2" width="18" height="18" rx="2" stroke="white" strokeOpacity="0.5" strokeWidth="2" fill="none" />
                  <rect x="6" y="6" width="10" height="10" rx="1" fill="white" fillOpacity="0.4" />
                  <rect x="44" y="2" width="18" height="18" rx="2" stroke="white" strokeOpacity="0.5" strokeWidth="2" fill="none" />
                  <rect x="48" y="6" width="10" height="10" rx="1" fill="white" fillOpacity="0.4" />
                  <rect x="2" y="44" width="18" height="18" rx="2" stroke="white" strokeOpacity="0.5" strokeWidth="2" fill="none" />
                  <rect x="6" y="48" width="10" height="10" rx="1" fill="white" fillOpacity="0.4" />
                  {/* Data modules */}
                  {[
                    [24,4],[28,4],[32,4],[36,4],[24,8],[32,8],[36,8],[40,8],
                    [24,12],[28,12],[40,12],[24,16],[28,16],[32,16],[36,16],[40,16],
                    [4,24],[8,24],[12,24],[16,24],[24,24],[28,24],[32,24],[36,24],[44,24],[48,24],[52,24],[56,24],
                    [4,28],[12,28],[16,28],[28,28],[36,28],[44,28],[52,28],
                    [4,32],[8,32],[12,32],[24,32],[28,32],[32,32],[44,32],[48,32],[52,32],[56,32],
                    [4,36],[8,36],[16,36],[24,36],[32,36],[36,36],[44,36],[56,36],
                    [24,40],[28,40],[36,40],[40,40],
                    [44,44],[48,44],[52,44],[56,44],
                    [24,48],[28,48],[32,48],[44,48],[52,48],[56,48],
                    [24,52],[32,52],[36,52],[40,52],[44,52],[48,52],
                    [24,56],[28,56],[32,56],[40,56],[44,56],[52,56],[56,56],
                  ].map(([x, y], i) => (
                    <rect key={i} x={x} y={y} width="3" height="3" rx="0.5" fill="white" fillOpacity="0.3" />
                  ))}
                </svg>
                {/* Scan pulse */}
                <div className="absolute inset-0 rounded-xl animate-pulse"
                  style={{ boxShadow: "inset 0 0 20px rgba(56,189,248,0.06)" }}
                />
              </div>

              {/* Description */}
              <div className="flex flex-col items-center gap-1.5 max-w-[120px]">
                <span className="text-[9px] font-medium text-white/50 text-center leading-tight">Scan to pair</span>
                <span className="text-[7px] text-white/25 text-center leading-snug">
                  Open the Quietly app on your phone and scan this code to connect instantly.
                </span>
              </div>

              {/* Stats */}
              <div className="flex flex-col items-center gap-1 mt-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-emerald-400/60" />
                  <span className="text-[7px] font-mono text-emerald-400/40">Connected</span>
                </div>
                <span className="text-[7px] font-mono text-white/15">&lt;2ms · E2E encrypted</span>
              </div>

              {/* Animated line bottom */}
              <svg width="2" height="30" className="text-white/10">
                <line x1="1" y1="0" x2="1" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" from="-14" to="0" dur="0.8s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>

            {/* Phone mock */}
            <div style={{ perspective: "1200px" }}>
              <div
                className="relative w-[220px] md:w-[260px] aspect-[9/19.5] rounded-[2.5rem] overflow-hidden"
                style={{
                  transform: "rotateY(-8deg) rotateX(2deg)",
                  border: "2px solid rgba(255,255,255,0.12)",
                  background: "linear-gradient(180deg, hsl(220 10% 5%) 0%, hsl(0 0% 2%) 100%)",
                  boxShadow: "0 25px 70px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{ background: "black", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[6px] font-mono text-white/40">MIRRORING</span>
                </div>

                {/* Phone content */}
                <div className="absolute inset-0 pt-14 px-4 pb-6 flex flex-col">
                  {/* Status bar */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[9px] font-mono text-white/50">LIVE</span>
                    </div>
                    <span className="text-[8px] px-2 py-0.5 rounded-md text-sky-300 font-mono"
                      style={{ background: "rgba(56, 189, 248, 0.1)", border: "1px solid rgba(56, 189, 248, 0.2)" }}
                    >
                      PRO
                    </span>
                  </div>

                  {/* Question indicator */}
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <div className="flex gap-1">
                      {MIRROR_MESSAGES.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveMsg(i)}
                          className="transition-all duration-300"
                          style={{
                            width: i === activeMsg ? "16px" : "4px",
                            height: "4px",
                            borderRadius: "2px",
                            background: i === activeMsg ? "rgba(56,189,248,0.6)" : "rgba(255,255,255,0.12)",
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[7px] font-mono text-white/20 ml-auto">
                      {activeMsg + 1}/{MIRROR_MESSAGES.length}
                    </span>
                  </div>

                  {/* Glass card — mirrored response */}
                  <div className="flex-1 rounded-2xl overflow-hidden relative">
                    {/* Glass layers */}
                    <div className="absolute inset-0" style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                      backdropFilter: "blur(8px)",
                    }} />
                    <div className="absolute inset-px rounded-[15px]" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                    {/* Top shine */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-2xl" />

                    {/* Content */}
                    <div className="relative p-4 space-y-3 h-full flex flex-col">
                      <p className="text-[8px] font-mono text-white/30 uppercase tracking-[0.15em]">Interview Mode</p>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeMsg}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.35 }}
                          className="flex-1 space-y-3"
                        >
                          {/* Question bubble */}
                          <div className="rounded-lg p-2" style={{ background: "rgba(255,255,255,0.04)" }}>
                            <p className="text-[8px] text-white/40 font-mono mb-0.5">QUESTION</p>
                            <p className="text-[10px] text-white/60 leading-relaxed">{msg.q}</p>
                          </div>

                          {/* Answer */}
                          <div>
                            <p className="text-[8px] text-emerald-400/50 font-mono mb-1">SUGGESTED ANSWER</p>
                            <p className="text-[11px] text-white/85 leading-relaxed">
                              {isLive ? <TypewriterText text={msg.a} speed={22} /> : msg.a}
                            </p>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Action chips */}
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        {["🌟 STAR", "📄 Resume", "🔄 Rephrase"].map((a) => (
                          <span key={a} className="text-[8px] px-2 py-1 rounded-lg text-white/50 transition-colors hover:text-white/70"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="mt-3 mx-auto w-24 h-1 rounded-full bg-white/15" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Feature badges */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mt-10 md:mt-14">
            {[
              { icon: "📱", label: "iOS & Android" },
              { icon: "⚡", label: "< 2ms sync" },
              { icon: "🔒", label: "E2E encrypted" },
              { icon: "👁", label: "Screen off mode" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-sm">{f.icon}</span>
                <span className="text-xs text-white/40">{f.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </SectionShell>
  );
}
