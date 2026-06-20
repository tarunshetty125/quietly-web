"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "./ui/SectionShell";
import { ScrollReveal } from "./ui/ScrollReveal";

interface DiagramNode {
  id: string;
  label: string;
  tech: string;
  x: number;
  y: number;
  layer: number;
  color: string; // HSL color
}

interface DiagramEdge {
  from: string;
  to: string;
}

// Soft blended layer colors
const LAYER_COLORS = [
  "217 90% 61%",   // Clients — bright blue
  "263 70% 58%",   // Edge — vivid purple
  "199 80% 48%",   // Gateway — cyan blue
  "152 70% 45%",   // Services — emerald green
  "38 92% 50%",    // Domain — orange
  "348 80% 55%",   // Messaging/Cache — red-rose
  "120 55% 42%",   // Database — green
  "24 90% 53%",    // Storage — deep orange
  "280 65% 55%",   // Observability — violet
  "186 75% 42%",   // Infra — teal
];

const LAYER_LABELS = [
  "Clients", "Edge", "Gateway", "Services", "Domain",
  "Messaging", "Database", "Storage", "Observability", "Infrastructure",
];

const NODES: DiagramNode[] = [
  // Layer 0 — Clients
  { id: "mobile", label: "Mobile", tech: "React Native", x: 60, y: 15, layer: 0, color: LAYER_COLORS[0] },
  { id: "web", label: "Web", tech: "Next.js", x: 195, y: 15, layer: 0, color: LAYER_COLORS[0] },
  { id: "desktop", label: "Desktop", tech: "Electron", x: 330, y: 15, layer: 0, color: LAYER_COLORS[0] },
  { id: "iot", label: "IoT", tech: "MQTT", x: 465, y: 15, layer: 0, color: LAYER_COLORS[0] },
  { id: "webhook-client", label: "Webhook", tech: "REST", x: 600, y: 15, layer: 0, color: LAYER_COLORS[0] },

  // Layer 1 — Edge
  { id: "cdn", label: "CDN", tech: "CloudFront", x: 128, y: 85, layer: 1, color: LAYER_COLORS[1] },
  { id: "waf", label: "WAF", tech: "Shield", x: 278, y: 85, layer: 1, color: LAYER_COLORS[1] },
  { id: "dns", label: "DNS", tech: "Route 53", x: 428, y: 85, layer: 1, color: LAYER_COLORS[1] },
  { id: "ddos", label: "DDoS", tech: "Cloudflare", x: 568, y: 85, layer: 1, color: LAYER_COLORS[1] },

  // Layer 2 — Load Balancing
  { id: "lb-ext", label: "Ext LB", tech: "ALB", x: 195, y: 155, layer: 2, color: LAYER_COLORS[2] },
  { id: "lb-int", label: "Int LB", tech: "NLB", x: 385, y: 155, layer: 2, color: LAYER_COLORS[2] },
  { id: "gateway", label: "API GW", tech: "Kong", x: 290, y: 220, layer: 2, color: LAYER_COLORS[2] },

  // Layer 3 — Core Services
  { id: "auth", label: "Auth", tech: "JWT+OAuth", x: 40, y: 295, layer: 3, color: LAYER_COLORS[3] },
  { id: "chat", label: "Chat", tech: "Go", x: 175, y: 295, layer: 3, color: LAYER_COLORS[3] },
  { id: "presence", label: "Presence", tech: "WebSocket", x: 310, y: 295, layer: 3, color: LAYER_COLORS[3] },
  { id: "user", label: "Users", tech: "Node.js", x: 445, y: 295, layer: 3, color: LAYER_COLORS[3] },
  { id: "notify", label: "Notify", tech: "Go", x: 580, y: 295, layer: 3, color: LAYER_COLORS[3] },
  { id: "media", label: "Media", tech: "Rust", x: 710, y: 295, layer: 3, color: LAYER_COLORS[3] },

  // Layer 4 — Domain Services
  { id: "search", label: "Search", tech: "Elastic", x: 40, y: 365, layer: 4, color: LAYER_COLORS[4] },
  { id: "recommend", label: "Recs", tech: "ML", x: 175, y: 365, layer: 4, color: LAYER_COLORS[4] },
  { id: "moderation", label: "Mod", tech: "TF", x: 310, y: 365, layer: 4, color: LAYER_COLORS[4] },
  { id: "analytics-svc", label: "Analytics", tech: "Spark", x: 445, y: 365, layer: 4, color: LAYER_COLORS[4] },
  { id: "billing", label: "Billing", tech: "Stripe", x: 580, y: 365, layer: 4, color: LAYER_COLORS[4] },
  { id: "scheduler", label: "Schedule", tech: "Temporal", x: 710, y: 365, layer: 4, color: LAYER_COLORS[4] },

  // Layer 5 — Messaging
  { id: "kafka", label: "Events", tech: "Kafka", x: 105, y: 440, layer: 5, color: LAYER_COLORS[5] },
  { id: "rabbitmq", label: "Tasks", tech: "RabbitMQ", x: 260, y: 440, layer: 5, color: LAYER_COLORS[5] },
  { id: "pubsub", label: "Pub/Sub", tech: "Streams", x: 415, y: 440, layer: 5, color: LAYER_COLORS[5] },
  { id: "sqs", label: "DLQ", tech: "SQS", x: 570, y: 440, layer: 5, color: LAYER_COLORS[5] },

  // Layer 6 — Cache
  { id: "redis", label: "Hot Cache", tech: "Redis", x: 105, y: 510, layer: 6, color: LAYER_COLORS[5] },
  { id: "memcached", label: "Sessions", tech: "Memcache", x: 260, y: 510, layer: 6, color: LAYER_COLORS[5] },
  { id: "local-cache", label: "L1 Cache", tech: "Caffeine", x: 415, y: 510, layer: 6, color: LAYER_COLORS[5] },

  // Layer 7 — Databases
  { id: "pg-primary", label: "Primary", tech: "Postgres", x: 40, y: 580, layer: 7, color: LAYER_COLORS[6] },
  { id: "pg-replica", label: "Replica", tech: "Postgres", x: 175, y: 580, layer: 7, color: LAYER_COLORS[6] },
  { id: "mongo", label: "DocDB", tech: "MongoDB", x: 310, y: 580, layer: 7, color: LAYER_COLORS[6] },
  { id: "timeseries", label: "TimeSeries", tech: "Timescale", x: 445, y: 580, layer: 7, color: LAYER_COLORS[6] },
  { id: "graph-db", label: "GraphDB", tech: "Neo4j", x: 580, y: 580, layer: 7, color: LAYER_COLORS[6] },
  { id: "vector-db", label: "VectorDB", tech: "Pinecone", x: 710, y: 580, layer: 7, color: LAYER_COLORS[6] },

  // Layer 8 — Storage
  { id: "s3", label: "Objects", tech: "S3", x: 105, y: 650, layer: 8, color: LAYER_COLORS[7] },
  { id: "glacier", label: "Archive", tech: "Glacier", x: 260, y: 650, layer: 8, color: LAYER_COLORS[7] },
  { id: "efs", label: "Files", tech: "EFS", x: 415, y: 650, layer: 8, color: LAYER_COLORS[7] },
  { id: "backup", label: "Backup", tech: "AWS", x: 570, y: 650, layer: 8, color: LAYER_COLORS[7] },

  // Layer 9 — Observability
  { id: "prometheus", label: "Metrics", tech: "Prom", x: 40, y: 725, layer: 9, color: LAYER_COLORS[8] },
  { id: "grafana", label: "Dash", tech: "Grafana", x: 175, y: 725, layer: 9, color: LAYER_COLORS[8] },
  { id: "elk", label: "Logs", tech: "ELK", x: 310, y: 725, layer: 9, color: LAYER_COLORS[8] },
  { id: "jaeger", label: "Tracing", tech: "Jaeger", x: 445, y: 725, layer: 9, color: LAYER_COLORS[8] },
  { id: "pagerduty", label: "Alerts", tech: "PD", x: 580, y: 725, layer: 9, color: LAYER_COLORS[8] },
  { id: "statuspage", label: "Status", tech: "SP", x: 710, y: 725, layer: 9, color: LAYER_COLORS[8] },

  // Layer 10 — Infrastructure
  { id: "k8s", label: "K8s", tech: "K8s", x: 128, y: 800, layer: 9, color: LAYER_COLORS[9] },
  { id: "terraform", label: "IaC", tech: "Terraform", x: 310, y: 800, layer: 9, color: LAYER_COLORS[9] },
  { id: "vault", label: "Secrets", tech: "Vault", x: 485, y: 800, layer: 9, color: LAYER_COLORS[9] },
  { id: "cicd", label: "CI/CD", tech: "GH Actions", x: 660, y: 800, layer: 9, color: LAYER_COLORS[9] },
];

const EDGES: DiagramEdge[] = [
  // Clients → Edge
  { from: "mobile", to: "cdn" }, { from: "web", to: "cdn" }, { from: "desktop", to: "waf" },
  { from: "iot", to: "dns" }, { from: "webhook-client", to: "ddos" },
  // Edge → LB
  { from: "cdn", to: "lb-ext" }, { from: "waf", to: "lb-ext" },
  { from: "dns", to: "lb-int" }, { from: "ddos", to: "lb-int" },
  // LB → Gateway
  { from: "lb-ext", to: "gateway" }, { from: "lb-int", to: "gateway" },
  // Gateway → Services
  { from: "gateway", to: "auth" }, { from: "gateway", to: "chat" },
  { from: "gateway", to: "presence" }, { from: "gateway", to: "user" },
  { from: "gateway", to: "notify" }, { from: "gateway", to: "media" },
  // Services → Domain
  { from: "chat", to: "search" }, { from: "chat", to: "moderation" },
  { from: "user", to: "recommend" }, { from: "notify", to: "analytics-svc" },
  { from: "media", to: "billing" }, { from: "auth", to: "scheduler" },
  // Services → Messaging
  { from: "chat", to: "kafka" }, { from: "presence", to: "pubsub" },
  { from: "notify", to: "rabbitmq" }, { from: "moderation", to: "sqs" },
  // Messaging → Cache
  { from: "kafka", to: "redis" }, { from: "pubsub", to: "local-cache" },
  { from: "rabbitmq", to: "memcached" },
  // Cache → DB
  { from: "redis", to: "pg-primary" }, { from: "pg-primary", to: "pg-replica" },
  { from: "memcached", to: "mongo" }, { from: "local-cache", to: "timeseries" },
  // DB → Storage
  { from: "pg-primary", to: "s3" }, { from: "mongo", to: "glacier" },
  { from: "timeseries", to: "efs" }, { from: "graph-db", to: "backup" },
  // Observability links
  { from: "prometheus", to: "grafana" }, { from: "elk", to: "jaeger" },
  { from: "jaeger", to: "pagerduty" }, { from: "pagerduty", to: "statuspage" },
  // Infra links
  { from: "k8s", to: "terraform" }, { from: "terraform", to: "vault" },
  { from: "vault", to: "cicd" },
];

function PannableDiagram({ visible }: { visible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.65);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }, [pan]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      setPan({
        x: dragStart.current.panX + (e.clientX - dragStart.current.x),
        y: dragStart.current.panY + (e.clientY - dragStart.current.y),
      });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    setDragging(true);
    dragStart.current = { x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y };
  }, [pan]);

  useEffect(() => {
    if (!dragging) return;
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      setPan({
        x: dragStart.current.panX + (t.clientX - dragStart.current.x),
        y: dragStart.current.panY + (t.clientY - dragStart.current.y),
      });
    };
    const onTouchEnd = () => setDragging(false);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [dragging]);

  const NODE_W = 110;
  const NODE_H = 38;

  // Non-passive wheel listener to block page scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setZoom((z) => Math.min(Math.max(z - e.deltaY * 0.001, 0.25), 1.5));
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden select-none"
      style={{
        height: "420px",
        cursor: dragging ? "grabbing" : "grab",
        background: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* Drag hint */}
      <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-lg text-[10px] text-white/30 bg-white/[0.04] border border-white/[0.06] pointer-events-none"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        ↕ Drag to explore
      </div>

      {/* Stats badge */}
      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-lg text-[10px] font-mono text-white/25 bg-white/[0.04] border border-white/[0.06] pointer-events-none">
        {NODES.length} nodes · {EDGES.length} edges
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.15, 1.5)); }}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <div className="text-[9px] font-mono text-white/25 text-center">{Math.round(zoom * 100)}%</div>
        <button
          onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 0.15, 0.25)); }}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>
        </button>
      </div>

      {/* Pannable canvas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
          transition: dragging ? "none" : "transform 0.15s ease-out",
        }}
      >
        {/* SVG edges layer */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="850"
          height="870"
          viewBox="0 0 850 870"
          fill="none"
          style={{ overflow: "visible" }}
        >
          {/* Grid */}
          <defs>
            <pattern id="grid-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="rgba(255,255,255,0.04)" />
            </pattern>
          </defs>
          <rect width="850" height="870" fill="url(#grid-dots)" />

          {EDGES.map((edge, i) => {
            const from = NODES.find((n) => n.id === edge.from)!;
            const to = NODES.find((n) => n.id === edge.to)!;
            const fx = from.x + NODE_W / 2, fy = from.y + NODE_H / 2;
            const tx = to.x + NODE_W / 2, ty = to.y + NODE_H / 2;
            const midY = (fy + ty) / 2;
            return (
              <motion.path
                key={`${edge.from}-${edge.to}`}
                d={`M${fx},${fy} C${fx},${midY} ${tx},${midY} ${tx},${ty}`}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={visible ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.02, ease: [0, 0, 1, 1] }}
              />
            );
          })}
        </svg>

        {/* HTML node divs */}
        {NODES.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: node.layer * 0.06 + i * 0.012, ease: [0.16, 1, 0.3, 1] }}
            className="absolute rounded-lg flex items-center gap-2 px-2.5"
            style={{
              left: node.x,
              top: node.y,
              width: NODE_W,
              height: NODE_H,
              background: `hsl(${node.color} / 0.25)`,
              border: `1px solid hsl(${node.color} / 0.4)`,
              boxShadow: `0 2px 12px hsl(${node.color} / 0.15)`,
            }}
          >
            {/* Accent bar */}
            <div
              className="w-[3px] h-4 rounded-full flex-shrink-0"
              style={{ background: `hsl(${node.color} / 0.8)` }}
            />
            <div className="min-w-0 overflow-hidden">
              <p
                className="text-[10px] font-semibold leading-tight truncate"
                style={{ color: `hsl(${node.color} / 1)`, fontFamily: "var(--font-geist-sans)" }}
              >
                {node.label}
              </p>
              <p className="text-[8px] text-white/40 font-mono leading-tight truncate">
                {node.tech}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const TYPING_LINES = [
  { section: "tradeoffs", text: "WebSocket vs. long polling — latency vs. infra cost" },
  { section: "tradeoffs", text: "Redis pub/sub vs. Kafka — simplicity vs. durability" },
  { section: "tradeoffs", text: "Sharding by user_id — hot partition risk" },
  { section: "scale", text: "100M DAU → 115K QPS peak" },
  { section: "scale", text: "2TB messages/day" },
  { section: "scale", text: "p99 latency target: 200ms" },
];

function TradeoffsPanel() {
  const [progress, setProgress] = useState(0); // total chars typed across all lines
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTime = useRef(0);

  const totalChars = TYPING_LINES.reduce((s, l) => s + l.text.length, 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || progress >= totalChars) return;
    const tick = (ts: number) => {
      if (!lastTime.current) lastTime.current = ts;
      const delta = ts - lastTime.current;
      if (delta > 18) { // ~55 chars/sec
        lastTime.current = ts;
        setProgress((p) => Math.min(p + 1, totalChars));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, progress, totalChars]);

  // Derive which line and how many chars
  let remaining = progress;
  let lineIndex = 0;
  for (let i = 0; i < TYPING_LINES.length; i++) {
    if (remaining >= TYPING_LINES[i].text.length) {
      remaining -= TYPING_LINES[i].text.length;
      lineIndex = i + 1;
    } else {
      lineIndex = i;
      break;
    }
  }
  const charIndex = remaining;
  const currentLine = lineIndex < TYPING_LINES.length ? TYPING_LINES[lineIndex] : null;
  const completedLines = TYPING_LINES.slice(0, lineIndex);
  const currentText = currentLine ? currentLine.text.slice(0, charIndex) : "";
  const isTyping = lineIndex < TYPING_LINES.length;

  const tradeoffsDone = completedLines.filter((l) => l.section === "tradeoffs");
  const scaleDone = completedLines.filter((l) => l.section === "scale");

  return (
    <div ref={ref} className="v2-glass rounded-2xl p-5 md:p-6 space-y-5 h-fit">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[hsl(0_0%_40%)] mb-3">Tradeoffs</p>
        <ul className="space-y-2.5">
          {tradeoffsDone.map((l) => (
            <li key={l.text} className="text-sm text-white/60 leading-relaxed flex gap-2">
              <span className="text-white/20 mt-0.5">•</span>{l.text}
            </li>
          ))}
          {currentLine?.section === "tradeoffs" && (
            <li className="text-sm text-white/60 leading-relaxed flex gap-2">
              <span className="text-white/20 mt-0.5">•</span>
              {currentText}
              <span className="inline-block w-[2px] h-4 bg-white/60 animate-pulse ml-0.5" />
            </li>
          )}
        </ul>
      </div>

      <div className="h-px bg-white/[0.06]" />

      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[hsl(0_0%_40%)] mb-3">Scale Estimates</p>
        <ul className="space-y-2">
          {scaleDone.map((l) => (
            <li key={l.text} className="text-sm font-mono text-white/50">{l.text}</li>
          ))}
          {currentLine?.section === "scale" && (
            <li className="text-sm font-mono text-white/50">
              {currentText}
              <span className="inline-block w-[2px] h-4 bg-white/60 animate-pulse ml-0.5" />
            </li>
          )}
        </ul>
      </div>

      <div className="h-px bg-white/[0.06]" />

      <div className="flex flex-wrap gap-1.5">
        {["⚖️ Tradeoffs", "❓ Clarify", "🧠 Approaches", "🔍 Deep Dive"].map((a) => (
          <motion.span
            key={a}
            className="v2-action-btn text-xs"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: isTyping ? 0.3 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {a}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export function SystemDesignSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <SectionShell id="system-design">
      <div className="v2-wide" ref={ref}>
        <ScrollReveal>
          <p className="v2-kicker text-center">SYSTEM DESIGN</p>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium tracking-[-0.03em] leading-[1.15] mb-4 text-center">
            Architecture at <span className="v2-serif">Scale.</span>
          </h2>
          <p className="text-lg text-[hsl(0_0%_65%)] mb-10 md:mb-14 text-center max-w-2xl mx-auto">
            Generate production-grade architecture diagrams with tradeoff analysis, scaling estimates, and technology recommendations.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6 md:gap-8">
          {/* Diagram */}
          <ScrollReveal>
            <PannableDiagram visible={visible} />
            {/* Color legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 px-1">
              {LAYER_COLORS.map((color, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ background: `hsl(${color} / 0.6)` }}
                  />
                  <span className="text-[10px] text-white/40" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    {LAYER_LABELS[i]}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Tradeoffs panel */}
          <ScrollReveal delay={0.2}>
            <TradeoffsPanel />
          </ScrollReveal>
        </div>
      </div>
    </SectionShell>
  );
}
