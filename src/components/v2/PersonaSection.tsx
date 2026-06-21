"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell } from "./ui/SectionShell";
import { ScrollReveal } from "./ui/ScrollReveal";

const ease = [0.22, 1, 0.36, 1] as const;

function ProfileSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const SLIDE_COUNT = 2;

  const next = useCallback(() => {
    setActiveSlide((p) => (p + 1) % SLIDE_COUNT);
  }, []);

  // Auto-cycle every 5s
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [isPaused, next]);

  const handleDot = (i: number) => {
    setActiveSlide(i);
    setIsPaused(true);
    // Resume auto after 8s
    setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: "340px" }}>
        <AnimatePresence mode="wait">
          {activeSlide === 0 && (
            <motion.div
              key="slide-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease }}
            >
              {/* Profile Intelligence screenshot */}
              <div className="relative rounded-2xl overflow-hidden max-w-full"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src="/images/teamsync/v2/profile-intelligence.png"
                  alt="Quietly Intelligence — Profile Intelligence Panel"
                  className="w-[102%] max-w-none h-auto block"
                  style={{
                    marginLeft: "-0.5%",
                    marginTop: "-0.5%",
                    maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                  }}
                />
              </div>
            </motion.div>
          )}

          {activeSlide === 1 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease }}
              className="space-y-4"
            >
              {/* Document badges */}
              <div className="flex flex-wrap gap-2">
                <div className="v2-glass rounded-lg px-3 py-2 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>
                  <span className="text-sm text-white/70">Resume.pdf</span>
                </div>
                <div className="v2-glass rounded-lg px-3 py-2 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>
                  <span className="text-sm text-white/70">JD — L5 Engineer</span>
                </div>
                <div className="v2-glass rounded-lg px-3 py-2 flex items-center gap-2">
                  <span className="text-xs font-mono text-white/40">5 YOE</span>
                  <span className="text-white/10">·</span>
                  <span className="text-xs font-mono text-white/40">React</span>
                  <span className="text-white/10">·</span>
                  <span className="text-xs font-mono text-white/40">Node.js</span>
                </div>
              </div>

              {/* Before/After card */}
              <div className="v2-glass rounded-2xl p-5 md:p-6 space-y-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-red-400/60 mb-1.5">
                    Generic AI
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed line-through decoration-white/10">
                    &ldquo;I have extensive experience in building scalable systems and leading engineering teams to deliver high-quality software…&rdquo;
                  </p>
                </div>
                <div className="h-px bg-white/[0.06]" />
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/60 mb-1.5">
                    Grounded in You
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    &ldquo;At Stripe, I led the payment system migration from a monolithic Rails app to event-driven microservices. We reduced p99 latency from 340ms to 45ms and handled Black Friday traffic at 12K TPS…&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            className="transition-all duration-300"
            style={{
              width: i === activeSlide ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === activeSlide ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function PersonaSection() {
  return (
    <SectionShell id="persona">
      <div className="v2-content">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-start">
          {/* Left — copy */}
          <div>
            <ScrollReveal>
              <p className="v2-kicker">PERSONA INTELLIGENCE</p>
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium tracking-[-0.03em] leading-[1.15] mb-4">
                Answers That Sound Like <span className="v2-serif">You.</span>
              </h2>
              <p className="text-lg text-[hsl(0_0%_65%)] leading-relaxed">
                Upload your resume, job descriptions, and custom context. Every AI response is grounded in your actual experience — not generic templates.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — slider */}
          <ScrollReveal delay={0}>
            <ProfileSlider />
          </ScrollReveal>
        </div>
      </div>
    </SectionShell>
  );
}
