"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Smartphone,
  Brain,
  Terminal,
  Sparkles,
  Cloud,
  Layers,
  LayoutGrid,
  ArrowRight,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import { DownloadOverlay } from "@/components/v2/DownloadOverlay";

/* ── Types ── */
interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  accentGlow: string;
  wide?: boolean;
  illustration: React.ReactNode;
}

/* ── Animation ── */
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const itemUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      duration: 0.65,
      bounce: 0.1,
    },
  },
};

/* ═══ Mini illustrations (pure CSS/SVG, no images) ═══ */

function PhoneIllustration() {
  return (
    <div className="absolute -right-1 -bottom-1 flex items-end justify-end opacity-60 transition-opacity duration-500 group-hover:opacity-80">
      <div
        className="relative"
        style={{
          width: 34,
          height: 58,
          borderRadius: 7,
          background:
            "linear-gradient(145deg, rgba(14,165,233,0.25), rgba(14,165,233,0.08))",
          border: "1px solid rgba(14,165,233,0.30)",
          boxShadow: "0 6px 16px rgba(14,165,233,0.15)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 3,
            borderRadius: 4,
            background:
              "linear-gradient(180deg, rgba(14,165,233,0.20) 0%, rgba(56,189,248,0.08) 100%)",
            border: "1px solid rgba(14,165,233,0.15)",
          }}
        >
          <div
            style={{
              margin: "5px 4px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div
              style={{
                height: 1.5,
                width: "80%",
                background: "rgba(255,255,255,0.25)",
                borderRadius: 1,
              }}
            />
            <div
              style={{
                height: 1.5,
                width: "60%",
                background: "rgba(255,255,255,0.15)",
                borderRadius: 1,
              }}
            />
            <div
              style={{
                height: 1.5,
                width: "70%",
                background: "rgba(255,255,255,0.10)",
                borderRadius: 1,
              }}
            />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 2,
            left: "50%",
            transform: "translateX(-50%)",
            width: 11,
            height: 2,
            borderRadius: 1,
            background: "rgba(255,255,255,0.12)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 4,
          right: 28,
          width: 28,
          height: 20,
          borderRadius: 4,
          background: "rgba(14,165,233,0.15)",
          border: "1px solid rgba(14,165,233,0.25)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 3px 8px rgba(14,165,233,0.20)",
          transform: "rotate(-6deg)",
        }}
      />
    </div>
  );
}

function PersonaIllustration() {
  return (
    <div className="absolute -right-1 -bottom-1 flex items-end justify-end opacity-55 transition-opacity duration-500 group-hover:opacity-75">
      <div
        style={{
          width: 50,
          height: 38,
          borderRadius: 7,
          background:
            "linear-gradient(145deg, rgba(217,167,49,0.15), rgba(217,167,49,0.05))",
          border: "1px solid rgba(217,167,49,0.25)",
          padding: "6px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(217,167,49,0.5), rgba(217,167,49,0.25))",
              border: "1px solid rgba(217,167,49,0.35)",
            }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: 1.5 }}
          >
            <div
              style={{
                height: 1.5,
                width: 20,
                background: "rgba(255,255,255,0.25)",
                borderRadius: 1,
              }}
            />
            <div
              style={{
                height: 1.5,
                width: 14,
                background: "rgba(255,255,255,0.12)",
                borderRadius: 1,
              }}
            />
          </div>
        </div>
        <div
          style={{
            height: 1.5,
            width: "90%",
            background: "rgba(255,255,255,0.10)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 1.5,
            width: "70%",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}

function TerminalIllustration() {
  return (
    <div className="absolute -right-1 -bottom-1 flex items-end justify-end opacity-55 transition-opacity duration-500 group-hover:opacity-75">
      <div
        style={{
          width: 48,
          height: 34,
          borderRadius: 6,
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(34,197,94,0.25)",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: "0 4px 12px rgba(34,197,94,0.10)",
        }}
      >
        <div style={{ display: "flex", gap: 2, marginBottom: 1 }}>
          <div
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(255,95,86,0.6)",
            }}
          />
          <div
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(255,189,46,0.6)",
            }}
          />
          <div
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(39,201,63,0.6)",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          <div
            style={{
              color: "rgba(34,197,94,0.7)",
              fontSize: 5,
              fontFamily: "monospace",
            }}
          >
            $
          </div>
          <div
            style={{
              height: 1.5,
              width: 22,
              background: "rgba(34,197,94,0.35)",
              borderRadius: 1,
            }}
          />
        </div>
        <div
          style={{
            height: 1.5,
            width: 28,
            background: "rgba(255,255,255,0.10)",
            borderRadius: 1,
            marginLeft: 7,
          }}
        />
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          <div
            style={{
              width: 3,
              height: 6,
              background: "rgba(34,197,94,0.6)",
              borderRadius: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function SkillsIllustration() {
  return (
    <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 opacity-50 transition-opacity duration-500 group-hover:opacity-70">
      <div
        style={{
          width: 78,
          borderRadius: 7,
          background: "rgba(0,0,0,0.4)",
          border: "1px solid rgba(168,85,247,0.20)",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: "0 6px 16px rgba(168,85,247,0.12)",
        }}
      >
        <div
          style={{
            height: 12,
            borderRadius: 4,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 4,
            gap: 2,
          }}
        >
          <div
            style={{
              color: "rgba(168,85,247,0.7)",
              fontSize: 6,
              fontFamily: "monospace",
              fontWeight: 700,
            }}
          >
            /
          </div>
          <div
            style={{
              height: 1.5,
              width: 28,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 1,
            }}
          />
        </div>
        {["Summarize", "Draft reply", "Analyze"].map((label) => (
          <div
            key={label}
            style={{
              height: 10,
              borderRadius: 3,
              background: "rgba(168,85,247,0.10)",
              border: "1px solid rgba(168,85,247,0.15)",
              display: "flex",
              alignItems: "center",
              paddingLeft: 4,
              gap: 2,
            }}
          >
            <Sparkles
              size={5}
              style={{ color: "rgba(168,85,247,0.6)" }}
            />
            <span
              style={{
                fontSize: 5,
                color: "rgba(255,255,255,0.40)",
                fontWeight: 600,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProvidersIllustration() {
  return (
    <div className="absolute -right-1 -bottom-1 flex items-end justify-end opacity-50 transition-opacity duration-500 group-hover:opacity-70">
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
        {[20, 26, 17].map((size, i) => (
          <div
            key={i}
            style={{
              width: size,
              height: size * 0.7,
              borderRadius: size / 3,
              background: `rgba(234,134,45,${0.08 + i * 0.05})`,
              border: `1px solid rgba(234,134,45,${0.15 + i * 0.05})`,
              boxShadow: `0 3px 8px rgba(234,134,45,${0.06 + i * 0.03})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function OverlayIllustration() {
  return (
    <div className="absolute -right-1 -bottom-2 flex items-end justify-end opacity-50 transition-opacity duration-500 group-hover:opacity-70">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            right: 3 + i * 6,
            bottom: 3 + i * 4,
            width: 36,
            height: 25,
            borderRadius: 6,
            background: `rgba(59,130,246,${0.06 + i * 0.04})`,
            border: `1px solid rgba(59,130,246,${0.12 + i * 0.06})`,
            boxShadow: `0 ${3 + i * 1.5}px ${6 + i * 3}px rgba(59,130,246,${0.05 + i * 0.03})`,
            transform: `rotate(${-3 + i * 3}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function ModesIllustration() {
  const modes = [
    { label: "Interview", color: "rgba(250,204,21,0.50)" },
    { label: "Sales", color: "rgba(59,130,246,0.50)" },
    { label: "Lecture", color: "rgba(168,85,247,0.50)" },
    { label: "Recruiting", color: "rgba(34,197,94,0.50)" },
    { label: "Team", color: "rgba(14,165,233,0.50)" },
  ];
  return (
    <div className="absolute right-3 top-1/2 flex max-w-[100px] -translate-y-1/2 flex-wrap gap-1 opacity-55 transition-opacity duration-500 group-hover:opacity-75">
      {modes.map((mode) => (
        <div
          key={mode.label}
          style={{
            padding: "2px 6px",
            borderRadius: 4,
            background: mode.color.replace("0.50", "0.10"),
            border: `1px solid ${mode.color.replace("0.50", "0.20")}`,
            fontSize: 6,
            fontWeight: 600,
            color: mode.color.replace("0.50", "0.80"),
            whiteSpace: "nowrap",
          }}
        >
          {mode.label}
        </div>
      ))}
    </div>
  );
}

/* ── Features ── */
const FEATURES: Feature[] = [
  {
    title: "Quietly Mirror",
    description:
      "Mirror AI responses to your phone in real-time with a spatial glass UI.",
    icon: Smartphone,
    accent: "hsl(195, 90%, 50%)",
    accentGlow: "rgba(14, 165, 233, 0.35)",
    illustration: <PhoneIllustration />,
  },
  {
    title: "Persona",
    description:
      "Upload your resume, JD, and context — AI learns who you are.",
    icon: Brain,
    accent: "hsl(38, 85%, 55%)",
    accentGlow: "rgba(217, 167, 49, 0.30)",
    illustration: <PersonaIllustration />,
  },
  {
    title: "Codex CLI",
    description:
      "Run OpenAI Codex models locally as your streaming AI provider.",
    icon: Terminal,
    accent: "hsl(152, 68%, 46%)",
    accentGlow: "rgba(34, 197, 94, 0.30)",
    illustration: <TerminalIllustration />,
  },
  {
    title: "Skills & Commands",
    description:
      "Type / or $ in the overlay to invoke custom AI skills and workflows instantly.",
    icon: Sparkles,
    accent: "hsl(270, 76%, 62%)",
    accentGlow: "rgba(168, 85, 247, 0.30)",
    wide: true,
    illustration: <SkillsIllustration />,
  },
  {
    title: "AI Providers",
    description:
      "New AWS Bedrock support via CLI — connect enterprise AI at scale.",
    icon: Cloud,
    accent: "hsl(24, 85%, 55%)",
    accentGlow: "rgba(234, 134, 45, 0.30)",
    illustration: <ProvidersIllustration />,
  },
  {
    title: "Pro Overlay V2",
    description:
      "Redesigned overlay with floating bar, better streaming, and spatial depth.",
    icon: Layers,
    accent: "hsl(217, 85%, 56%)",
    accentGlow: "rgba(59, 130, 246, 0.30)",
    illustration: <OverlayIllustration />,
  },
  {
    title: "Meeting Modes",
    description:
      "11 specialized modes — Interview, Sales, Lecture, Recruiting, and more.",
    icon: LayoutGrid,
    accent: "hsl(172, 66%, 50%)",
    accentGlow: "rgba(45, 212, 191, 0.28)",
    wide: true,
    illustration: <ModesIllustration />,
  },
];

/* ── Feature Card ── */
function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        y: -3,
        scale: 1.01,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      className={`group relative overflow-hidden rounded-[10px] p-2 sm:rounded-[12px] sm:p-3 ${feature.wide ? "sm:col-span-2" : ""}`}
      style={{
        background:
          "linear-gradient(160deg, #151c2c 0%, #0f1420 60%, #0c101a 100%)",
        border: "1px solid rgba(255,255,255,0.12)",
        minHeight: "52px",
        boxShadow:
          "0 2px 4px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.20), 0 16px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.18) 50%, transparent 90%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-70"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${feature.accentGlow} 50%, transparent 95%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 85% 80%, ${feature.accentGlow} 0%, transparent 70%)`,
        }}
      />

      {feature.illustration}

      <div
        className="relative z-10 mb-1 flex h-5 w-5 items-center justify-center rounded-[6px] sm:mb-1.5 sm:h-6 sm:w-6 sm:rounded-[7px]"
        style={{
          background: `${feature.accent}18`,
          border: `1px solid ${feature.accent}28`,
        }}
      >
        <Icon
          size={12}
          strokeWidth={1.8}
          style={{ color: feature.accent }}
        />
      </div>

      <h3 className="relative z-10 text-[10px] font-bold leading-tight tracking-[-0.01em] text-white sm:text-[11.5px]">
        {feature.title}
      </h3>

      <p className="relative z-10 mt-0.5 max-w-[75%] text-[8px] font-medium leading-[1.3] text-white/50 sm:text-[10px] sm:leading-[1.35]">
        {feature.description}
      </p>
    </motion.div>
  );
}

/* ═══ Magnetic CTA Button ═══ */

const magneticSpring = { stiffness: 260, damping: 24, mass: 0.62 };
const textSpring = { stiffness: 340, damping: 25, mass: 0.5 };
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

function MagneticCTA({
  onClose,
  href,
}: {
  onClose: () => void;
  href: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const fieldRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [flashKey, setFlashKey] = useState(0);

  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const magneticScale = useMotionValue(1);
  const magneticRotate = useMotionValue(0);
  const magneticTextX = useMotionValue(0);
  const magneticTextY = useMotionValue(0);

  const x = useSpring(magneticX, magneticSpring);
  const y = useSpring(magneticY, magneticSpring);
  const scale = useSpring(magneticScale, magneticSpring);
  const rotateZ = useSpring(magneticRotate, magneticSpring);
  const textX = useSpring(magneticTextX, textSpring);
  const textY = useSpring(magneticTextY, textSpring);

  const resetMagnet = useCallback(() => {
    magneticX.set(0);
    magneticY.set(0);
    magneticScale.set(1);
    magneticRotate.set(0);
    magneticTextX.set(0);
    magneticTextY.set(0);
    btnRef.current?.style.setProperty("--pill-x", "52%");
    btnRef.current?.style.setProperty("--pill-y", "26%");
  }, [
    magneticX,
    magneticY,
    magneticScale,
    magneticRotate,
    magneticTextX,
    magneticTextY,
  ]);

  const updateMagnet = useCallback(
    (clientX: number, clientY: number) => {
      if (prefersReducedMotion) return;
      const field = fieldRef.current;
      const button = btnRef.current;
      if (!field || !button) return;

      const fieldRect = field.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const cx = fieldRect.left + fieldRect.width / 2;
      const cy = fieldRect.top + fieldRect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = 120;
      const strength = Math.pow(clamp(1 - dist / radius, 0, 1), 1.4);

      if (strength < 0.02) {
        resetMagnet();
        return;
      }

      magneticX.set(clamp(dx * 0.1 * strength, -8, 8));
      magneticY.set(clamp(dy * 0.08 * strength, -5, 5));
      magneticScale.set(1 + 0.012 * strength);
      magneticRotate.set(clamp(dx * 0.005 * strength, -0.6, 0.6));
      magneticTextX.set(clamp(dx * 0.08 * strength, -4, 4));
      magneticTextY.set(clamp(dy * 0.1 * strength, -3, 3));

      const hx = clamp(
        ((clientX - buttonRect.left) / buttonRect.width) * 100,
        14,
        86,
      );
      const hy = clamp(
        ((clientY - buttonRect.top) / buttonRect.height) * 100,
        8,
        68,
      );
      button.style.setProperty("--pill-x", `${hx}%`);
      button.style.setProperty("--pill-y", `${hy}%`);
    },
    [
      prefersReducedMotion,
      resetMagnet,
      magneticX,
      magneticY,
      magneticScale,
      magneticRotate,
      magneticTextX,
      magneticTextY,
    ],
  );

  useEffect(() => {
    let af: number | null = null;
    let latest: { x: number; y: number } | null = null;

    const onMove = (e: PointerEvent) => {
      latest = { x: e.clientX, y: e.clientY };
      if (af !== null) return;
      af = requestAnimationFrame(() => {
        af = null;
        if (latest) updateMagnet(latest.x, latest.y);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", resetMagnet);
    return () => {
      if (af !== null) cancelAnimationFrame(af);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", resetMagnet);
    };
  }, [updateMagnet, resetMagnet]);

  const handleClick = () => {
    if (!prefersReducedMotion) setFlashKey((k) => k + 1);
    // Don't close immediately — let the download start, then show overlay
    setTimeout(() => onClose(), 200);
  };

  return (
    <motion.div variants={itemUp} className="mt-2 flex flex-col items-center gap-1 sm:mt-3 sm:gap-1.5">
      <div
        ref={fieldRef}
        className="relative flex min-h-[44px] w-full items-center justify-center overflow-visible"
      >
        <motion.a
          ref={btnRef}
          href={href}
          onClick={handleClick}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 360, damping: 24 }}
          className="group relative inline-flex h-[36px] min-w-[180px] items-center justify-center overflow-hidden rounded-full px-5 text-[12px] font-semibold tracking-[-0.005em] text-[#050009] outline-none transition-[filter] duration-200 ease-out"
          style={{
            x,
            y,
            scale,
            rotateZ,
            background:
              "radial-gradient(circle at var(--pill-x, 52%) var(--pill-y, 26%), rgba(255,255,255,0.98) 0%, rgba(226,207,255,0.92) 20%, rgba(169,92,255,0.9) 48%, rgba(83,45,236,0.98) 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.68), inset 0 -15px 22px rgba(55,28,207,0.42), inset 0 -2px 8px rgba(30,4,88,0.38), 0 12px 24px rgba(10,0,45,0.44), 0 0 0 1px rgba(229,214,255,0.24)",
          }}
        >
          <span className="pointer-events-none absolute inset-x-[8%] top-1 h-[46%] rounded-full bg-gradient-to-b from-white/75 via-white/30 to-transparent blur-[8px]" />
          <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.18)_42%,rgba(255,255,255,0.34)_50%,transparent_62%)] opacity-75 transition-transform duration-500 group-hover:translate-x-2" />
          {flashKey > 0 && (
            <motion.span
              key={flashKey}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 rounded-full bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 0.18,
                times: [0, 0.16, 0.42, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          )}
          <motion.span
            className="relative z-10 flex items-center gap-2 drop-shadow-[0_1px_1px_rgba(255,255,255,0.22)]"
            style={{ x: textX, y: textY }}
          >
            Download Now
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </motion.span>
        </motion.a>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-[13px] font-medium transition-colors"
        style={{ color: "rgba(255,255,255,0.4)" }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
      >
        Maybe later
      </button>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/* ══ Main Modal Component ══ */
/* ══════════════════════════════════════════════════════════════════════════ */

const SHOW_DELAY_MS = 10000;
const STORAGE_KEY = "quietly-whats-new-2.7-dismissed";

export function WhatsNewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDownloadOverlay, setShowDownloadOverlay] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => setIsOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDownloadClose = () => {
    setIsOpen(false);
    setTimeout(() => setShowDownloadOverlay(true), 1000);
  };

  return (<>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="whats-new-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Backdrop overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "rgba(0,0,0,0.35)" }}
          />

          {/* Modal panel */}
          <motion.div
            key="whats-new-modal-panel"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative z-10 mx-5 w-full max-w-[400px] max-h-[85dvh] overflow-y-auto overflow-x-hidden rounded-[18px] shadow-[0_32px_80px_rgba(0,0,0,0.5)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-4 sm:max-w-[540px]"
            style={{
              backgroundColor: "#08080f",
              fontFamily:
                "'Inter', 'Geist', ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              }}
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* ── 3D Wireframe Grid Background ── */}
            <style>{`
              @keyframes wn-wireflow-scroll {
                0%   { transform: rotateX(55deg) translateY(0); }
                100% { transform: rotateX(55deg) translateY(60px); }
              }
              @keyframes wn-wireflow-scroll-slow {
                0%   { transform: rotateX(55deg) translateY(0); }
                100% { transform: rotateX(55deg) translateY(60px); }
              }
              @keyframes wn-wireflow-pulse {
                0%, 100% { opacity: 0.3; }
                50%      { opacity: 0.6; }
              }
            `}</style>

            {/* Wireframe scene container */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                perspective: "320px",
                perspectiveOrigin: "50% 40%",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Primary grid plane */}
              <div
                style={{
                  position: "absolute",
                  inset: "-120% -60%",
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)
                  `,
                  backgroundSize: "60px 60px",
                  animation: "wn-wireflow-scroll 4s linear infinite",
                  transformOrigin: "center center",
                  willChange: "transform",
                }}
              />
              {/* Secondary grid plane (parallax depth) */}
              <div
                style={{
                  position: "absolute",
                  inset: "-120% -60%",
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
                  `,
                  backgroundSize: "60px 60px",
                  animation: "wn-wireflow-scroll-slow 6s linear infinite",
                  opacity: 0.7,
                  transformOrigin: "center center",
                  willChange: "transform",
                }}
              />
              {/* Intersection dots */}
              <div
                style={{
                  position: "absolute",
                  inset: "-120% -60%",
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.40) 1.5px, transparent 1.5px)",
                  backgroundSize: "60px 60px",
                  animation: "wn-wireflow-scroll 4s linear infinite",
                  transformOrigin: "center center",
                  willChange: "transform",
                }}
              />
            </div>

            {/* Depth fade overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(180deg,
                  rgba(8,8,16,0.9) 0%,
                  rgba(8,8,16,0.3) 25%,
                  transparent 50%,
                  rgba(8,8,16,0.15) 80%,
                  rgba(8,8,16,0.7) 100%)`,
              }}
            />
            {/* Horizon glow */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-0"
              style={{
                height: "50%",
                background: "linear-gradient(180deg, rgba(120,160,255,0.06) 0%, transparent 100%)",
              }}
            />

            {/* Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="relative z-10 flex flex-col items-center px-3.5 py-3.5 sm:px-7 sm:py-6"
            >
              {/* Eyebrow */}
              <motion.div
                variants={itemUp}
                className="mb-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] sm:mb-2 sm:px-3 sm:py-1 sm:text-[10px]"
                style={{
                  border: "1px solid rgba(96,165,250,0.25)",
                  background: "rgba(96,165,250,0.10)",
                  color: "rgba(147,197,253,0.9)",
                }}
              >
                <Sparkles size={10} />
                Quietly 2.7
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={itemUp}
                className="text-center text-[20px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[28px]"
                style={{
                  background:
                    "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.65) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                What&apos;s New
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                variants={itemUp}
                className="mt-1 text-center text-[11px] font-medium leading-relaxed sm:mt-2 sm:text-[13px]"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Seven powerful upgrades to supercharge your meetings
              </motion.p>

              {/* Bento Grid */}
              <motion.div
                variants={containerVariants}
                className="mt-2.5 grid w-full grid-cols-2 gap-1 sm:mt-3 sm:grid-cols-3 sm:gap-1.5"
              >
                {FEATURES.map((feature) => (
                  <FeatureCard key={feature.title} feature={feature} />
                ))}
              </motion.div>

              {/* CTA */}
              <MagneticCTA
                onClose={handleDownloadClose}
                href="https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.2/Quietly-2.7.2-arm64.dmg"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {showDownloadOverlay && (
      <DownloadOverlay onClose={() => setShowDownloadOverlay(false)} />
    )}
  </>);
}

