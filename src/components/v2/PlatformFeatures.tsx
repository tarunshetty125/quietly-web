"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "./ui/SectionShell";
import { ScrollReveal } from "./ui/ScrollReveal";

const AI_MODELS = [
  { name: "Claude", color: "24 65% 55%", icon: "C" },
  { name: "GPT-4o", color: "152 69% 45%", icon: "G" },
  { name: "Gemini", color: "217 91% 60%", icon: "✦" },
  { name: "Bedrock", color: "33 100% 50%", icon: "B" },
  { name: "Ollama", color: "0 0% 60%", icon: "O" },
  { name: "Codex CLI", color: "262 83% 58%", icon: "⌘" },
];

const SKILLS = [
  { name: "Summarize", icon: "📝" },
  { name: "Draft Reply", icon: "✍️" },
  { name: "Analyze", icon: "🔍" },
  { name: "Code Review", icon: "💻" },
  { name: "Meeting Notes", icon: "📋" },
  { name: "Custom", icon: "⚙️" },
];

const CALENDAR_FEATURES = [
  { label: "Event sync", icon: "🔄" },
  { label: "Mode suggestion", icon: "💡" },
  { label: "Participant context", icon: "👥" },
  { label: "Saved notes", icon: "📌" },
];

export function PlatformFeatures() {
  const [activeModel, setActiveModel] = useState(0);
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  return (
    <SectionShell id="platform">
      <div className="v2-wide">
        <ScrollReveal>
          <p className="v2-kicker text-center">PLATFORM</p>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium tracking-[-0.03em] leading-[1.15] mb-4 text-center">
            Everything You <span className="v2-serif">Need.</span>
          </h2>
          <p className="text-lg text-[hsl(0_0%_65%)] mb-10 md:mb-14 text-center max-w-2xl mx-auto">
            Provider freedom, custom skills, and calendar intelligence — all built in.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5">
          {/* ── Card 1: AI Models ──────────────────────── */}
          <ScrollReveal delay={0}>
            <div className="rounded-2xl overflow-hidden h-full flex flex-col"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="p-6 pb-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">AI MODELS</p>
                <h3 className="text-lg font-semibold tracking-[-0.01em] mb-1.5">8+ AI Models</h3>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  Claude, GPT-4o, Gemini, Bedrock, Ollama, Codex CLI. Bring your own API keys.
                </p>
              </div>

              {/* Model grid */}
              <div className="px-6 pb-5 mt-auto">
                <div className="grid grid-cols-3 gap-2">
                  {AI_MODELS.map((m, i) => (
                    <motion.button
                      key={m.name}
                      onClick={() => setActiveModel(i)}
                      className="relative flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all duration-200"
                      style={{
                        background: i === activeModel
                          ? `hsl(${m.color} / 0.12)`
                          : "rgba(255,255,255,0.02)",
                        border: `1px solid ${i === activeModel
                          ? `hsl(${m.color} / 0.25)`
                          : "rgba(255,255,255,0.06)"}`,
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className="text-[11px] font-semibold w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                        style={{
                          color: `hsl(${m.color})`,
                          background: `hsl(${m.color} / 0.15)`,
                          fontSize: m.icon.length > 1 ? "7px" : "11px",
                        }}
                      >{m.icon}</span>
                      <span className="text-[11px] text-white/55 whitespace-nowrap">{m.name}</span>
                      {i === activeModel && (
                        <motion.div
                          layoutId="activeModel"
                          className="absolute -top-px -right-px w-1.5 h-1.5 rounded-full"
                          style={{ background: `hsl(${m.color})` }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Card 2: Skills ──────────────────────────── */}
          <ScrollReveal delay={0.08}>
            <div className="rounded-2xl overflow-hidden h-full flex flex-col"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="p-6 pb-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">SKILLS</p>
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">Type</h3>
                  <span className="text-lg font-mono text-white/40">/</span>
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">to invoke</h3>
                </div>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  Built-in skills and custom SKILL.md files. Summarize, draft replies, analyze — instant workflows.
                </p>
              </div>

              {/* Skill chips */}
              <div className="px-6 pb-5 mt-auto">
                {/* Command input mock */}
                <div className="mb-3 rounded-lg px-3 py-2 flex items-center gap-2"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-white/20 text-sm">/</span>
                  <span className="text-[12px] text-white/25">
                    {activeSkill !== null ? SKILLS[activeSkill].name.toLowerCase() : "search skills..."}
                  </span>
                  <span className="ml-auto w-[2px] h-4 bg-white/20 animate-pulse" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS.map((s, i) => (
                    <motion.button
                      key={s.name}
                      onClick={() => setActiveSkill(i === activeSkill ? null : i)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] transition-all duration-200"
                      style={{
                        background: i === activeSkill ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${i === activeSkill ? "rgba(56,189,248,0.25)" : "rgba(255,255,255,0.06)"}`,
                        color: i === activeSkill ? "rgba(56,189,248,0.8)" : "rgba(255,255,255,0.45)",
                      }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <span className="text-xs">{s.icon}</span>
                      {s.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Card 3: Calendar ────────────────────────── */}
          <ScrollReveal delay={0.16}>
            <div className="rounded-2xl overflow-hidden h-full flex flex-col"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="p-6 pb-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">CALENDAR</p>
                <h3 className="text-lg font-semibold tracking-[-0.01em] mb-1.5">Pre-Meeting Prep</h3>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  Connect Google Calendar. Get pre-meeting context, likely topics, and mode recommendations.
                </p>
              </div>

              {/* Calendar mock */}
              <div className="px-6 pb-5 mt-auto">
                {/* Mini event card */}
                <div className="rounded-lg overflow-hidden mb-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-6 rounded-full bg-sky-400/40" />
                      <div>
                        <p className="text-[11px] text-white/60 font-medium">System Design — Round 2</p>
                        <p className="text-[9px] text-white/25 font-mono">2:00 PM · Google Meet</p>
                      </div>
                    </div>
                    <span className="text-[8px] px-1.5 py-0.5 rounded text-emerald-400/60 font-mono"
                      style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}
                    >IN 15m</span>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[8px] text-white/20 font-mono mb-1.5">AI RECOMMENDATION</p>
                    <p className="text-[10px] text-white/45 leading-relaxed">
                      → Use <span className="text-sky-400/60">System Design mode</span> · Load resume context · 2 prior rounds detected
                    </p>
                  </div>
                </div>

                {/* Feature list */}
                <div className="grid grid-cols-2 gap-1.5">
                  {CALENDAR_FEATURES.map((f) => (
                    <div key={f.label} className="flex items-center gap-2 px-2.5 py-2 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <span className="text-xs opacity-50">{f.icon}</span>
                      <span className="text-[10px] text-white/40">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionShell>
  );
}
