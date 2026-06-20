"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell } from "./ui/SectionShell";
import { ScrollReveal } from "./ui/ScrollReveal";

const SCREEN_SCENARIOS = [
  {
    id: "meeting",
    label: "Meeting Screen",
    icon: "📹",
    screen: {
      title: "Zoom — Q3 Planning",
      elements: [
        { type: "header", text: "Q3 Revenue Targets", x: 10, y: 8, w: 80 },
        { type: "chart", label: "Revenue Chart", x: 8, y: 22, w: 52, h: 35 },
        { type: "sidebar", label: "Participants (8)", x: 64, y: 22, w: 32, h: 55 },
        { type: "text", text: "Target: $4.2M ARR", x: 8, y: 62, w: 52 },
        { type: "text", text: "Current: $3.1M ARR", x: 8, y: 70, w: 52 },
        { type: "chat", label: "Chat panel", x: 8, y: 80, w: 84, h: 12 },
      ],
    },
    analysis: [
      { tag: "Context", text: "Q3 planning meeting with revenue targets discussion" },
      { tag: "Key Data", text: "$4.2M ARR target vs $3.1M current — 35% gap to close" },
      { tag: "Suggestion", text: "Ask about pipeline breakdown by segment and close rates to validate target feasibility" },
      { tag: "Risk", text: "Target requires 3x current monthly growth rate — may need revised timeline" },
    ],
  },
  {
    id: "code",
    label: "Code Review",
    icon: "💻",
    screen: {
      title: "VS Code — auth-service/handler.go",
      elements: [
        { type: "header", text: "func HandleOAuth2Callback", x: 10, y: 8, w: 80 },
        { type: "code", label: "Line 42-89", x: 5, y: 18, w: 65, h: 60 },
        { type: "sidebar", label: "File Explorer", x: 74, y: 18, w: 22, h: 60 },
        { type: "text", text: "// TODO: validate state parameter", x: 8, y: 82, w: 60 },
      ],
    },
    analysis: [
      { tag: "Bug", text: "Missing CSRF state validation in OAuth callback — critical security vulnerability" },
      { tag: "Fix", text: "Add state parameter check before token exchange: if r.URL.Query().Get('state') != session.State" },
      { tag: "Pattern", text: "Consider using PKCE flow instead of implicit for better mobile security" },
      { tag: "Ref", text: "See RFC 7636 and your existing PKCE impl in /auth/pkce.go" },
    ],
  },
  {
    id: "email",
    label: "Email Draft",
    icon: "✉️",
    screen: {
      title: "Gmail — Compose",
      elements: [
        { type: "header", text: "Re: Partnership Proposal — Acme Corp", x: 10, y: 8, w: 80 },
        { type: "text", text: "To: sarah@acme.corp", x: 8, y: 18, w: 50 },
        { type: "code", label: "Email body draft", x: 5, y: 28, w: 90, h: 50 },
        { type: "text", text: "Thanks for the proposal. We'd like to...", x: 8, y: 34, w: 80 },
        { type: "chat", label: "Attachments (2)", x: 8, y: 82, w: 40, h: 10 },
      ],
    },
    analysis: [
      { tag: "Tone", text: "Current draft is too passive — strengthen language for negotiation leverage" },
      { tag: "Rewrite", text: "Replace 'We'd like to' with 'We're prepared to move forward contingent on...'" },
      { tag: "Missing", text: "No mention of exclusivity clause from page 4 of their proposal" },
      { tag: "Tip", text: "Add a deadline to create urgency: 'Please confirm by EOW Friday'" },
    ],
  },
];

function AnalysisTypewriter({ items }: { items: { tag: string; text: string }[] }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);
  const totalChars = items.reduce((s, item) => s + item.text.length, 0);

  useEffect(() => {
    setProgress(0);
    startRef.current = 0;
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const chars = Math.min(Math.floor(elapsed / 14), totalChars);
      setProgress(chars);
      if (chars < totalChars) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items, totalChars]);

  let remaining = progress;
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const prevChars = items.slice(0, i).reduce((s, it) => s + it.text.length, 0);
        const available = Math.max(0, remaining - prevChars);
        const shown = item.text.slice(0, Math.min(available, item.text.length));
        const isActive = available > 0 && available < item.text.length;
        const isDone = available >= item.text.length;
        if (available <= 0 && i > 0) return null;

        const tagColors: Record<string, string> = {
          Context: "56 189 248", Bug: "239 68 68", Fix: "34 197 94", Pattern: "168 85 247",
          Ref: "148 163 184", "Key Data": "250 204 21", Suggestion: "45 212 191",
          Risk: "251 146 60", Tone: "244 114 182", Rewrite: "34 197 94",
          Missing: "250 204 21", Tip: "56 189 248",
        };
        const c = tagColors[item.tag] || "255 255 255";

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex gap-2.5"
          >
            <span
              className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded h-fit flex-shrink-0 mt-0.5"
              style={{
                color: `rgb(${c})`,
                background: `rgba(${c}, 0.1)`,
                border: `1px solid rgba(${c}, 0.2)`,
              }}
            >
              {item.tag}
            </span>
            <p className="text-[12px] text-white/70 leading-relaxed">
              {shown}
              {isActive && <span className="inline-block w-[2px] h-3.5 bg-sky-400/70 animate-pulse ml-0.5 align-middle" />}
              {isDone && !isActive && ""}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Dedicated Screen Mocks ──────────────────────────── */

function MeetingScreen() {
  return (
    <div className="flex h-[280px]">
      {/* Main area */}
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        {/* Shared slide */}
        <div className="flex-1 rounded-md overflow-hidden relative"
          style={{ background: "hsl(220 15% 7%)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="p-3">
            <p className="text-[9px] text-white/20 font-mono mb-1">SLIDE 14 OF 28</p>
            <p className="text-[12px] font-medium text-white/55 mb-3">Q3 Revenue Targets</p>
            <div className="flex items-end gap-[3px] h-16 px-1">
              {["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
                <div key={q} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-sm" style={{
                    height: `${[38, 52, 70, 90][i]}%`,
                    background: i === 2
                      ? "linear-gradient(180deg, rgba(56,189,248,0.5) 0%, rgba(56,189,248,0.2) 100%)"
                      : `rgba(255,255,255,${0.06 + i * 0.02})`,
                    border: i === 2 ? "1px solid rgba(56,189,248,0.3)" : "none",
                  }} />
                  <span className="text-[7px] text-white/25">{q}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400/40" />
                <span className="text-[7px] text-white/25">Target: $4.2M</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                <span className="text-[7px] text-white/25">Current: $3.1M</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom toolbar */}
        <div className="flex items-center justify-center gap-3 py-1.5 rounded-md" style={{ background: "rgba(255,255,255,0.02)" }}>
          {["🎤", "📹", "🖥", "💬", "😊"].map((e, i) => (
            <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
              style={{ background: i === 0 ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.04)" }}
            >{e}</div>
          ))}
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] text-red-400"
            style={{ background: "rgba(239,68,68,0.15)" }}
          >✕</div>
        </div>
      </div>
      {/* Participant strip */}
      <div className="w-[72px] p-1.5 flex flex-col gap-1 border-l border-white/[0.04]">
        {[
          { name: "JW", color: "199 89% 48%" },
          { name: "SK", color: "142 71% 45%" },
          { name: "AL", color: "262 83% 58%" },
          { name: "You", color: "33 100% 52%" },
          { name: "MR", color: "340 75% 55%" },
        ].map((p) => (
          <div key={p.name} className="relative rounded-sm aspect-square flex items-center justify-center"
            style={{ background: `hsl(${p.color} / 0.08)` }}
          >
            <span className="text-[8px] font-medium" style={{ color: `hsl(${p.color} / 0.5)` }}>{p.name}</span>
            {p.name === "You" && <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-sm bg-red-500/50" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeScreen() {
  const lines = [
    { num: 42, indent: 0, tokens: [{ t: "func ", c: "199 89% 48%" }, { t: "HandleOAuth2Callback", c: "47 100% 62%" }, { t: "(w http.ResponseWriter, r *http.Request) {", c: "0 0% 40%" }] },
    { num: 43, indent: 1, tokens: [{ t: "code := r.URL.Query().Get(", c: "0 0% 40%" }, { t: '"code"', c: "142 71% 45%" }, { t: ")", c: "0 0% 40%" }] },
    { num: 44, indent: 1, tokens: [{ t: "state := r.URL.Query().Get(", c: "0 0% 40%" }, { t: '"state"', c: "142 71% 45%" }, { t: ")", c: "0 0% 40%" }] },
    { num: 45, indent: 0, tokens: [{ t: "", c: "0 0% 0%" }] },
    { num: 46, indent: 1, tokens: [{ t: "// TODO: validate state param", c: "0 0% 28%" }] },
    { num: 47, indent: 0, tokens: [{ t: "", c: "0 0% 0%" }] },
    { num: 48, indent: 1, tokens: [{ t: "token, err := oauthConfig.Exchange(ctx, code)", c: "0 0% 40%" }] },
    { num: 49, indent: 1, tokens: [{ t: "if ", c: "262 83% 58%" }, { t: "err != nil {", c: "0 0% 40%" }] },
    { num: 50, indent: 2, tokens: [{ t: "http.Error(w, ", c: "0 0% 40%" }, { t: '"auth failed"', c: "142 71% 45%" }, { t: ", 500)", c: "0 0% 40%" }] },
    { num: 51, indent: 2, tokens: [{ t: "return", c: "262 83% 58%" }] },
    { num: 52, indent: 1, tokens: [{ t: "}", c: "0 0% 40%" }] },
    { num: 53, indent: 0, tokens: [{ t: "", c: "0 0% 0%" }] },
    { num: 54, indent: 1, tokens: [{ t: "userInfo, err := getUserInfo(token)", c: "0 0% 40%" }] },
  ];

  return (
    <div className="flex h-[280px]">
      {/* File tree */}
      <div className="w-[90px] border-r border-white/[0.04] p-2 flex flex-col gap-0.5" style={{ background: "rgba(255,255,255,0.01)" }}>
        <p className="text-[7px] font-mono text-white/20 uppercase tracking-wider mb-1">Explorer</p>
        {["📁 auth-service", "  📄 handler.go", "  📄 pkce.go", "  📄 config.go", "📁 api", "  📄 routes.go", "📁 models", "📄 go.mod"].map((f, i) => (
          <p key={i} className="text-[7px] font-mono whitespace-nowrap" style={{
            color: i === 1 ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)",
            background: i === 1 ? "rgba(255,255,255,0.06)" : "transparent",
            padding: "1px 3px",
            borderRadius: "2px",
          }}>{f}</p>
        ))}
      </div>
      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {/* Tab bar */}
        <div className="flex border-b border-white/[0.04]">
          <div className="px-3 py-1.5 text-[8px] font-mono text-white/50 border-b border-sky-400/40"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >handler.go</div>
          <div className="px-3 py-1.5 text-[8px] font-mono text-white/20">config.go</div>
        </div>
        {/* Code area */}
        <div className="flex-1 overflow-hidden p-1">
          {lines.map((line) => (
            <div key={line.num} className="flex items-center h-[17px]"
              style={{ background: line.num === 46 ? "rgba(250,204,21,0.05)" : "transparent" }}
            >
              <span className="w-7 text-right text-[8px] font-mono flex-shrink-0 pr-2"
                style={{ color: line.num === 46 ? "rgba(250,204,21,0.4)" : "rgba(255,255,255,0.15)" }}
              >{line.num}</span>
              <span className="text-[9px] font-mono" style={{ paddingLeft: `${line.indent * 12}px` }}>
                {line.tokens.map((tok, j) => (
                  <span key={j} style={{ color: `hsl(${tok.c})` }}>{tok.t}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
        {/* Problems panel */}
        <div className="border-t border-white/[0.04] px-3 py-1.5" style={{ background: "rgba(255,255,255,0.01)" }}>
          <div className="flex items-center gap-1.5">
            <span className="text-[7px] font-mono text-yellow-400/50">⚠</span>
            <span className="text-[8px] font-mono text-yellow-400/40">1 warning</span>
            <span className="text-[7px] font-mono text-red-400/50 ml-2">✕</span>
            <span className="text-[8px] font-mono text-red-400/40">1 error</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailScreen() {
  return (
    <div className="flex flex-col h-[280px]">
      {/* Email header fields */}
      <div className="px-4 py-2 space-y-1.5 border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-white/25 w-5">To</span>
          <div className="flex-1 flex items-center gap-1">
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-400/10 text-sky-300/60 border border-sky-400/15">sarah@acme.corp</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-white/25 w-5">Cc</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-white/30 border border-white/[0.06]">legal@ourco.com</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-white/25 w-5">Re</span>
          <span className="text-[10px] text-white/45 font-medium">Partnership Proposal — Acme Corp</span>
        </div>
      </div>
      {/* Formatting toolbar */}
      <div className="flex items-center gap-1 px-4 py-1.5 border-b border-white/[0.04]" style={{ background: "rgba(255,255,255,0.01)" }}>
        {["B", "I", "U", "🔗", "📎", "😊"].map((b, i) => (
          <div key={i} className="w-5 h-5 rounded flex items-center justify-center text-[9px] text-white/20"
            style={{ background: i < 3 ? "rgba(255,255,255,0.04)" : "transparent" }}
          >{b}</div>
        ))}
      </div>
      {/* Body */}
      <div className="flex-1 px-4 py-3 space-y-2.5">
        <p className="text-[10px] text-white/35 leading-relaxed">Hi Sarah,</p>
        <p className="text-[10px] text-white/35 leading-relaxed">
          Thanks for the proposal. We&apos;d like to explore the partnership further.
          The technical integration scope looks reasonable, and our engineering
          team has reviewed the API documentation.
        </p>
        <p className="text-[10px] text-white/35 leading-relaxed">
          A few points we&apos;d want to discuss:
        </p>
        <div className="space-y-1 pl-3">
          <p className="text-[10px] text-white/30">• Revenue share model (Section 3.2)</p>
          <p className="text-[10px] text-white/30">• Data handling and privacy terms</p>
          <p className="text-[10px] text-white/30">• Timeline for the pilot phase</p>
        </div>
        <p className="text-[10px] text-white/25 mt-2">
          <span className="inline-block w-16 h-[2px] bg-white/10 animate-pulse rounded" />
        </p>
      </div>
      {/* Bottom bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.04]">
        <div className="flex items-center gap-1.5">
          <div className="px-2.5 py-1 rounded text-[9px] font-medium text-white/60"
            style={{ background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.2)" }}
          >Send</div>
          <div className="text-[9px] text-white/15">▾</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-white/15">📎 2 attachments</span>
        </div>
      </div>
    </div>
  );
}

export function StealthSection() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const scanRef = useRef<number>(0);

  const scenario = SCREEN_SCENARIOS[activeScenario];

  const handleAnalyze = () => {
    if (analyzing) return;
    setShowResult(false);
    setAnalyzing(true);
    setScanLine(0);

    // Scan animation
    const start = performance.now();
    const animate = (ts: number) => {
      const p = Math.min((ts - start) / 1500, 1);
      setScanLine(p * 100);
      if (p < 1) {
        scanRef.current = requestAnimationFrame(animate);
      } else {
        setAnalyzing(false);
        setShowResult(true);
      }
    };
    scanRef.current = requestAnimationFrame(animate);
  };

  const switchScenario = (i: number) => {
    setActiveScenario(i);
    setShowResult(false);
    setAnalyzing(false);
    cancelAnimationFrame(scanRef.current);
  };

  return (
    <SectionShell id="stealth">
      <div className="v2-content">
        <ScrollReveal>
          <p className="v2-kicker text-center">SCREEN ANALYSIS</p>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium tracking-[-0.03em] leading-[1.15] mb-4 text-center">
            Sees What You <span className="v2-serif">See.</span>
          </h2>
          <p className="text-lg text-[hsl(0_0%_65%)] mb-10 md:mb-14 text-center max-w-xl mx-auto">
            One click captures your screen context. AI instantly analyzes and gives you actionable intelligence.
          </p>
        </ScrollReveal>

        {/* Scenario tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-2 mb-8">
            {SCREEN_SCENARIOS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => switchScenario(i)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                style={{
                  background: i === activeScenario ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${i === activeScenario ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
                  color: i === activeScenario ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)",
                }}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Left — Screen mock */}
            <div className="relative">
              <div className="rounded-xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsl(220 12% 6%) 0%, hsl(0 0% 3%) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                }}
              >
                {/* Window chrome */}
                <div className="flex items-center px-3 py-2 border-b border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="flex gap-[5px]">
                    <div className="w-[7px] h-[7px] rounded-full bg-[#ff5f57]" />
                    <div className="w-[7px] h-[7px] rounded-full bg-[#febc2e]" />
                    <div className="w-[7px] h-[7px] rounded-full bg-[#28c840]" />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={scenario.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 text-center text-[9px] text-white/25"
                    >
                      {scenario.screen.title}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Screen content */}
                <div className="relative min-h-[280px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={scenario.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-full"
                    >
                      {scenario.id === "meeting" && <MeetingScreen />}
                      {scenario.id === "code" && <CodeScreen />}
                      {scenario.id === "email" && <EmailScreen />}
                    </motion.div>
                  </AnimatePresence>

                  {/* Scan line overlay */}
                  {analyzing && (
                    <div className="absolute inset-0 pointer-events-none z-10">
                      <div
                        className="absolute left-0 right-0 h-[2px]"
                        style={{
                          top: `${scanLine}%`,
                          background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.6), transparent)",
                          boxShadow: "0 0 20px rgba(56,189,248,0.3)",
                        }}
                      />
                      <div
                        className="absolute left-0 right-0"
                        style={{
                          top: 0,
                          height: `${scanLine}%`,
                          background: "rgba(56,189,248,0.03)",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Analyze button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: analyzing
                      ? "rgba(56,189,248,0.1)"
                      : "linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(168,85,247,0.15) 100%)",
                    border: `1px solid ${analyzing ? "rgba(56,189,248,0.2)" : "rgba(56,189,248,0.25)"}`,
                    color: analyzing ? "rgba(56,189,248,0.6)" : "rgba(255,255,255,0.8)",
                    boxShadow: analyzing ? "none" : "0 4px 20px rgba(56,189,248,0.1)",
                    cursor: analyzing ? "wait" : "pointer",
                  }}
                >
                  {analyzing ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                      </svg>
                      Analyzing…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      Analyze Screen
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right — AI Response */}
            <div className="rounded-xl h-fit"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                minHeight: "340px",
              }}
            >
              <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${showResult ? "bg-emerald-400" : analyzing ? "bg-sky-400 animate-pulse" : "bg-white/15"}`} />
                  <span className="text-[11px] font-mono text-white/40">
                    {showResult ? "Analysis Complete" : analyzing ? "Processing…" : "Ready to analyze"}
                  </span>
                </div>
                {showResult && (
                  <span className="text-[9px] font-mono text-white/20">{scenario.analysis.length} insights</span>
                )}
              </div>

              <div className="p-4">
                <AnimatePresence mode="wait">
                  {!analyzing && !showResult && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-12 gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/25">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </div>
                      <p className="text-xs text-white/25 text-center">
                        Click &quot;Analyze Screen&quot; to see<br />AI-powered insights
                      </p>
                    </motion.div>
                  )}

                  {analyzing && (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-8 flex flex-col items-center gap-3"
                    >
                      <div className="flex gap-1">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-6 rounded-full bg-sky-400/40"
                            animate={{ scaleY: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] text-white/30 font-mono">Scanning screen elements…</p>
                    </motion.div>
                  )}

                  {showResult && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnalysisTypewriter items={scenario.analysis} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Works with platforms — scrolling marquee */}
        <ScrollReveal delay={0.25}>
          <div className="mt-16 md:mt-24">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/35 text-center mb-8">
              Works on every platform
            </p>
            <div className="relative overflow-hidden py-2" style={{ maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)" }}>
              <div className="flex gap-14 animate-marquee items-center">
                {[...Array(2)].flatMap((_, dup) => [
                  { name: "Google", logo: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
                  { name: "Meta", logo: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="#ffffff" fillOpacity="0.5"/></svg> },
                  { name: "Amazon", logo: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M.045 18.02c.072-.116.187-.124.348-.064 3.381 1.556 7.06 2.344 10.872 2.344 3.25 0 6.597-.67 9.895-1.99.264-.11.48.06.65.27.168.21.066.46-.173.62C18.735 21.3 15.41 22.5 12 22.5c-4.082 0-7.85-.9-11.1-2.65-.22-.117-.305-.295-.16-.488zm21.06-2.98c-.226-.294-.84-.378-1.742-.278-.906.1-2.142.52-2.142.52s.156-.123.456-.232c.906-.32 1.814-.488 2.442-.41.626.076.822.456.466 1.012-.36.555-1.568 1.76-2.472 2.346-.22.143-.412.07-.282-.142z" fill="#FF9900"/><path d="M14.478 8.542c0 1.197.03 2.195-.576 3.257-.49.86-1.267 1.39-2.13 1.39-1.18 0-1.872-.9-1.872-2.23 0-2.622 2.352-3.1 4.578-3.1v.683zm3.105 7.506a.643.643 0 0 1-.73.073c-1.024-.852-1.207-1.246-1.77-2.06-1.69 1.724-2.887 2.24-5.078 2.24-2.593 0-4.613-1.6-4.613-4.8 0-2.5 1.353-4.2 3.283-5.032 1.672-.734 4.007-.865 5.793-1.067v-.398c0-.733.056-1.6-.374-2.233-.376-.567-1.096-.8-1.733-.8-1.177 0-2.226.604-2.483 1.856a.51.51 0 0 1-.438.44l-2.6-.28c-.218-.05-.46-.225-.398-.558C7.123 1.48 9.9.5 12.46.5c1.313 0 3.028.35 4.063 1.344 1.313 1.227 1.188 2.864 1.188 4.645v4.206c0 1.264.524 1.818 1.017 2.502.173.244.21.535-.01.717-.557.465-1.546 1.33-2.09 1.815l-.046-.082z" fill="#ffffff" fillOpacity="0.5"/></svg> },
                  { name: "Microsoft", logo: <svg viewBox="0 0 24 24" width="20" height="20"><rect x="1" y="1" width="10" height="10" fill="#F25022"/><rect x="13" y="1" width="10" height="10" fill="#7FBA00"/><rect x="1" y="13" width="10" height="10" fill="#00A4EF"/><rect x="13" y="13" width="10" height="10" fill="#FFB900"/></svg> },
                  { name: "Apple", logo: <svg viewBox="0 0 24 24" width="20" height="20"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#ffffff" fillOpacity="0.55"/></svg> },
                  { name: "Stripe", logo: <svg viewBox="0 0 24 24" width="20" height="20"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.918 3.757 7.044c0 4.178 2.555 5.951 6.522 7.394 2.567.934 3.459 1.607 3.459 2.67 0 .957-.794 1.573-2.27 1.573-1.943 0-4.898-.958-6.853-2.216L3.757 22c1.718.95 4.842 1.98 7.833 1.98 2.657 0 4.85-.62 6.398-1.79 1.665-1.254 2.512-3.155 2.512-5.478 0-4.295-2.613-6.012-6.524-7.562z" fill="#635BFF"/></svg> },
                  { name: "LeetCode", logo: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#FFA116"/></svg> },
                  { name: "HackerRank", logo: <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2C8.128 2 1 6.212 1 12s7.128 10 11 10 11-4.212 11-10S15.872 2 12 2zm-1 14h-1v-4H8l3-4v4h1l-3 4zm5-4h-1l-3 4v-4h-1l3-4z" fill="#2EC866"/></svg> },
                  { name: "Netflix", logo: <svg viewBox="0 0 24 24" width="20" height="20"><path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c.953.19 1.852.392 2.749.606V0zm-8.487 0H2.6v24c1.18-.228 2.018-.382 3.148-.546V8.968z" fill="#E50914"/></svg> },
                  { name: "Uber", logo: <svg viewBox="0 0 24 24" width="20" height="20"><path d="M0 7.97v4.958c0 1.867 1.302 3.101 3 3.101.826 0 1.562-.316 2.094-.87v.736H6.27V7.97H5.094v4.79c0 1.357-.777 2.24-1.952 2.24-1.15 0-1.966-.86-1.966-2.24V7.97H0zm8.57 0v4.958c0 1.867 1.302 3.101 3 3.101s3-1.234 3-3.101V7.97h-1.176v4.79c0 1.357-.777 2.24-1.952 2.24-1.15 0-1.966-.86-1.966-2.24V7.97H8.57zM18.4 7.97c-1.723 0-3.102 1.38-3.102 3.101 0 1.723 1.38 3.101 3.102 3.101a3.094 3.094 0 0 0 2.259-.987l-.815-.665a2.093 2.093 0 0 1-1.444.564c-1.16 0-1.926-.905-1.926-2.013s.766-2.013 1.926-2.013a2.08 2.08 0 0 1 1.444.564l.815-.665a3.094 3.094 0 0 0-2.259-.987z" fill="#ffffff" fillOpacity="0.55"/></svg> },
                  { name: "Spotify", logo: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954"/></svg> },
                  { name: "Slack", logo: <svg viewBox="0 0 24 24" width="20" height="20"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/><path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/><path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/><path d="M15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z" fill="#ECB22E"/></svg> },
                  { name: "Coinbase", logo: <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.2c-3.976 0-7.2-3.224-7.2-7.2S8.024 4.8 12 4.8a7.16 7.16 0 0 1 5.088 2.112l-2.16 2.16A4.31 4.31 0 0 0 12 7.68 4.32 4.32 0 1 0 16.32 12h-4.08v-2.88H19.2A7.2 7.2 0 0 1 12 19.2z" fill="#0052FF"/></svg> },
                  { name: "Airbnb", logo: <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12.001 18.275c-.93-1.26-1.86-2.61-2.72-3.93-.86-1.35-1.66-2.73-2.3-4.02-.68-1.44-1.01-2.67-1.01-3.78 0-1.68.57-3.24 1.62-4.38C8.62 1.08 10.26.42 12 .42s3.39.66 4.42 1.74c1.05 1.14 1.62 2.7 1.62 4.38 0 1.11-.33 2.34-1.01 3.78-.63 1.29-1.44 2.67-2.3 4.02-.87 1.32-1.79 2.67-2.72 3.93z" fill="#FF5A5F"/></svg> },
                ].map((p, i) => (
                  <div key={`${dup}-${i}`} className="flex items-center gap-3 flex-shrink-0">
                    <span className="flex-shrink-0 opacity-60">{p.logo}</span>
                    <span className="text-[15px] font-medium text-white/50 whitespace-nowrap">{p.name}</span>
                  </div>
                )))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionShell>
  );
}
