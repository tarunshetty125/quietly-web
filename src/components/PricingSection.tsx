"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ───────────────────────── constants ───────────────────────── */

const PURCHASE_EMAIL = "schmidt.berg1989@gmail.com";

function purchaseHref(plan: string) {
  return `mailto:${PURCHASE_EMAIL}?subject=Quietly%20AI%20${encodeURIComponent(plan)}%20License`;
}

/* ───────────────────────── types ───────────────────────── */

type PricingTier = {
  id: string;
  badge?: string;
  name: string;
  tagline: string;
  monthlyPrice: string;
  lifetimePrice: string;
  period: { monthly: string; lifetime: string };
  features: string[];
  footnote: string;
  cta: string;
  variant: "base" | "popular" | "plus";
};

/* ───────────────────────── data ───────────────────────── */

const tiers: PricingTier[] = [
  {
    id: "free",
    name: "FREE",
    tagline: "Everything you need to get started.",
    monthlyPrice: "$0",
    lifetimePrice: "$0",
    period: { monthly: "Forever", lifetime: "Forever" },
    features: [
      "Real-time AI answers",
      "Manual AI chat",
      "Live transcription",
      "Meeting recap",
      "Brainstorm & code hints",
      "Calendar integration",
      "Bring your own AI providers",
    ],
    footnote: "Upgrade anytime. No credit card required.",
    cta: "Download Free",
    variant: "base",
  },
  {
    id: "pro",
    badge: "MOST POPULAR",
    name: "PRO",
    tagline: "An unfair advantage in every conversation.",
    monthlyPrice: "$12",
    lifetimePrice: "$49",
    period: { monthly: "/month", lifetime: "Lifetime" },
    features: [
      "Everything in Free",
      "Screen Scan",
      "Specialized AI Modes",
      "Profile Intelligence",
      "Resume & Job Assistant",
      "Negotiation Coach",
      "System Design Assistant",
      "Pro Floating Overlay",
      "Unlimited Meeting History",
    ],
    footnote: "One payment. No subscriptions. No AI metering.",
    cta: "Upgrade to Pro",
    variant: "popular",
  },
  {
    id: "pro-plus",
    name: "PRO PLUS",
    tagline: "Complete intelligence.\nMaximum discretion.",
    monthlyPrice: "$24",
    lifetimePrice: "$99",
    period: { monthly: "/month", lifetime: "Lifetime" },
    features: [
      "Everything in Pro",
      "Advanced Stealth",
      "Screen Protection",
      "Phone Mirror",
      "Company Research",
      "Cross-session AI Search",
      "API Access",
      "Priority Routing",
    ],
    footnote: "Built for power users and professionals.",
    cta: "Go Pro Plus",
    variant: "plus",
  },
];

type ComparisonCategory = {
  title: string;
  rows: { feature: string; free: string; pro: string; proPlus: string }[];
};

const comparisonData: ComparisonCategory[] = [
  {
    title: "AI Intelligence",
    rows: [
      { feature: "Real-time AI answers", free: "✓", pro: "✓", proPlus: "✓" },
      { feature: "Manual AI chat", free: "✓", pro: "✓", proPlus: "✓" },
      { feature: "Screen Scan", free: "—", pro: "✓", proPlus: "✓" },
      { feature: "Cross-session AI Search", free: "—", pro: "—", proPlus: "✓" },
      { feature: "API Access", free: "—", pro: "—", proPlus: "✓" },
    ],
  },
  {
    title: "Modes",
    rows: [
      { feature: "Specialized AI Modes", free: "—", pro: "✓", proPlus: "✓" },
      { feature: "System Design Assistant", free: "—", pro: "✓", proPlus: "✓" },
      { feature: "Negotiation Coach", free: "—", pro: "✓", proPlus: "✓" },
    ],
  },
  {
    title: "Meetings",
    rows: [
      { feature: "Live transcription", free: "✓", pro: "✓", proPlus: "✓" },
      { feature: "Meeting recap", free: "✓", pro: "✓", proPlus: "✓" },
      { feature: "Unlimited Meeting History", free: "—", pro: "✓", proPlus: "✓" },
    ],
  },
  {
    title: "Profile Intelligence",
    rows: [
      { feature: "Resume & Job Assistant", free: "—", pro: "✓", proPlus: "✓" },
      { feature: "Profile Intelligence", free: "—", pro: "✓", proPlus: "✓" },
      { feature: "Company Research", free: "—", pro: "—", proPlus: "✓" },
    ],
  },
  {
    title: "Privacy",
    rows: [
      { feature: "Bring your own AI providers", free: "✓", pro: "✓", proPlus: "✓" },
      { feature: "Advanced Stealth", free: "—", pro: "—", proPlus: "✓" },
      { feature: "Screen Protection", free: "—", pro: "—", proPlus: "✓" },
    ],
  },
  {
    title: "Experience",
    rows: [
      { feature: "Calendar integration", free: "✓", pro: "✓", proPlus: "✓" },
      { feature: "Pro Floating Overlay", free: "—", pro: "✓", proPlus: "✓" },
      { feature: "Phone Mirror", free: "—", pro: "—", proPlus: "✓" },
      { feature: "Priority Routing", free: "—", pro: "—", proPlus: "✓" },
    ],
  },
];

const providers = [
  "OpenAI",
  "Claude",
  "Gemini",
  "Groq",
  "AWS Bedrock",
  "Ollama",
  "OpenRouter",
];

/* ───────────────────────── spring curves ───────────────────────── */

const ease = [0.32, 0.72, 0, 1] as const;

/* ───────────────────────── sub-components ───────────────────────── */

function AnimatedPrice({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease }}
      className="inline-block"
    >
      {value}
    </motion.span>
  );
}

function ExpandableRow({ category }: { category: ComparisonCategory }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between px-0 py-5 text-left transition-colors duration-300 hover:opacity-80"
      >
        <span className="text-[15px] font-medium tracking-wide text-white/90">
          {category.title}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease }}
          className="flex size-6 items-center justify-center rounded-full border border-white/10 text-white/40"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              {/* Header row */}
              <div className="mb-3 grid grid-cols-4 gap-4 px-1">
                <span className="text-[11px] font-medium tracking-widest text-white/30 uppercase" />
                <span className="text-center text-[11px] font-medium tracking-widest text-white/30 uppercase">
                  Free
                </span>
                <span className="text-center text-[11px] font-medium tracking-widest text-white/30 uppercase">
                  Pro
                </span>
                <span className="text-center text-[11px] font-medium tracking-widest text-white/30 uppercase">
                  Pro+
                </span>
              </div>
              {category.rows.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-4 gap-4 border-t border-white/[0.04] px-1 py-3"
                >
                  <span className="text-[13px] text-white/50">{row.feature}</span>
                  <span className={`text-center text-[13px] ${row.free === "✓" ? "text-white/70" : "text-white/20"}`}>
                    {row.free}
                  </span>
                  <span className={`text-center text-[13px] ${row.pro === "✓" ? "text-white/70" : "text-white/20"}`}>
                    {row.pro}
                  </span>
                  <span className={`text-center text-[13px] ${row.proPlus === "✓" ? "text-white/70" : "text-white/20"}`}>
                    {row.proPlus}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PricingCard({
  tier,
  billingCycle,
  index,
}: {
  tier: PricingTier;
  billingCycle: "monthly" | "lifetime";
  index: number;
}) {
  const price = billingCycle === "monthly" ? tier.monthlyPrice : tier.lifetimePrice;
  const period = billingCycle === "monthly" ? tier.period.monthly : tier.period.lifetime;
  const isPopular = tier.variant === "popular";
  const isPlus = tier.variant === "plus";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
      whileHover={
        isPopular
          ? { scale: 1.02, y: -4 }
          : { y: -6 }
      }
      className={`pricing-card-${tier.id} relative flex flex-col overflow-hidden rounded-[24px] border transition-all duration-500 ${
        isPopular
          ? "border-white/[0.12] bg-white/[0.06] shadow-[0_0_60px_rgba(255,255,255,0.04)]"
          : isPlus
            ? "border-white/[0.08] bg-white/[0.04] shadow-[0_0_30px_rgba(255,255,255,0.02)]"
            : "border-white/[0.05] bg-white/[0.03]"
      }`}
      style={{
        backdropFilter: "blur(40px) saturate(1.2)",
        WebkitBackdropFilter: "blur(40px) saturate(1.2)",
      }}
    >
      {/* Glass reflection — animated on popular & plus */}
      {(isPopular || isPlus) && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]"
          aria-hidden="true"
        >
          <div
            className={`absolute -top-1/2 -left-1/4 h-[200%] w-[60%] rotate-12 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent ${
              isPopular ? "pricing-reflection-move" : "pricing-reflection-move-slow"
            }`}
          />
        </div>
      )}

      {/* Subtle top glow for popular card */}
      {isPopular && (
        <div
          className="pointer-events-none absolute -top-px right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Thin top glow for plus card */}
      {isPlus && (
        <div
          className="pointer-events-none absolute -top-px right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          aria-hidden="true"
        />
      )}

      <div className={`relative flex flex-1 flex-col p-4 md:p-5 ${isPopular ? "pt-0" : ""}`}>
        {/* Badge */}
        {tier.badge && (
          <div className="mb-3 flex justify-center pt-4 md:pt-5">
            <span className="rounded-full border border-white/10 bg-white/[0.08] px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.15em] text-white/70 uppercase backdrop-blur-sm">
              {tier.badge}
            </span>
          </div>
        )}

        {/* Plan name */}
        <h3 className="mb-1 text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
          {tier.name}
        </h3>

        {/* Tagline */}
        <p className="mb-3 text-[12px] leading-snug font-medium text-white/55 whitespace-pre-line">
          {tier.tagline}
        </p>

        {/* Price */}
        <div className="mb-0.5 flex items-baseline gap-1.5">
          <span className="text-[30px] leading-none font-bold tracking-tight text-white md:text-[34px]">
            <AnimatedPrice value={price} />
          </span>
        </div>
        <p className="mb-3 text-[10px] font-medium tracking-wide text-white/30">{period}</p>

        {/* Divider */}
        <div className="mb-3 h-px bg-white/[0.06]" />

        {/* Features */}
        <ul className="mb-3 flex flex-col gap-1.5">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-[11.5px] leading-tight text-white/55">
              <span className="flex size-3 shrink-0 items-center justify-center rounded-full bg-white/[0.08]">
                <svg width="6" height="6" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M1.5 4L3.2 5.8L6.5 2.2"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Spacer + bottom section pushed to card bottom */}
        <div className="mt-auto">
          {/* Divider */}
          <div className="mb-2 h-px bg-white/[0.06]" />

          {/* Footnote */}
          {tier.footnote && (
            <p className="mb-3 text-center text-[10px] leading-relaxed text-white/25 whitespace-pre-line">
              {tier.footnote}
            </p>
          )}

          {/* CTA Button */}
          <a
            href={purchaseHref(tier.name)}
            className={`pricing-cta group relative flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-[12px] font-semibold tracking-wide transition-all duration-500 ${
              isPopular
                ? "bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                : "border border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1] hover:border-white/20"
            }`}
          >
            <span className="relative z-10">{tier.cta}</span>
            {/* Magnetic hover glow */}
            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
              background: isPopular
                ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 70%)"
                : "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 70%)"
            }} />
          </a>
        </div>
      </div>

      {/* Popular card floating animation */}
      {isPopular && (
        <style jsx>{`
          .pricing-card-pro {
            animation: pricing-float 6s ease-in-out infinite;
          }
          @keyframes pricing-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
        `}</style>
      )}
    </motion.div>
  );
}

/* ───────────────────────── main component ───────────────────────── */

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "lifetime">("lifetime");

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-black"
      style={{ fontFamily: "var(--font-inter-tight), 'Inter', system-ui, sans-serif" }}
    >
      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Subtle radial glow behind center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease }}
          className="mb-10 text-center md:mb-14"
        >
          {/* Eyebrow */}
          <span className="mb-4 inline-block text-[10px] font-semibold tracking-[0.3em] text-white/30 uppercase">
            Pricing
          </span>

          {/* Heading */}
          <h2 className="mx-auto mb-4 max-w-[600px] text-[32px] leading-[1.1] font-bold tracking-tight text-white md:text-[42px] lg:text-[52px]">
            Choose the workspace
            <br />
            that works for you.
          </h2>

          {/* Description */}
          <p className="mx-auto mb-7 max-w-[440px] text-[14px] leading-relaxed font-medium text-white/35 md:text-[15px]">
            Everything runs locally.
            <br />
            Connect your own AI providers.
            <br />
            One purchase unlocks premium workflows with no subscriptions or usage metering.
          </p>

          {/* ─── Billing Toggle ─── */}
          <div className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] p-1 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`relative rounded-full px-5 py-2 text-[13px] font-semibold tracking-wide transition-all duration-400 ${
                billingCycle === "monthly"
                  ? "bg-white/[0.1] text-white"
                  : "text-white/35 hover:text-white/50"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("lifetime")}
              className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold tracking-wide transition-all duration-400 ${
                billingCycle === "lifetime"
                  ? "bg-white/[0.1] text-white"
                  : "text-white/35 hover:text-white/50"
              }`}
            >
              Lifetime
              <span className="rounded-full bg-white/[0.12] px-2 py-0.5 text-[9px] font-bold tracking-widest text-white/60 uppercase">
                Best Value
              </span>
            </button>
          </div>
        </motion.div>

        {/* ─── Pricing Grid ─── */}
        <div className="mx-auto mb-16 grid max-w-[1000px] grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {tiers.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              billingCycle={billingCycle}
              index={index}
            />
          ))}
        </div>

        {/* ─── Comparison Rows ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mb-16 max-w-[720px]"
        >
          <h3 className="mb-5 text-center text-[11px] font-semibold tracking-[0.2em] text-white/30 uppercase">
            Compare Plans
          </h3>
          <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.02] px-5 py-1 backdrop-blur-sm md:px-6">
            {comparisonData.map((category) => (
              <ExpandableRow key={category.title} category={category} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Global animations ─── */}
      <style jsx global>{`
        @keyframes pricing-reflection-move {
          0% { transform: translateX(-100%) rotate(12deg); }
          100% { transform: translateX(250%) rotate(12deg); }
        }
        .pricing-reflection-move {
          animation: pricing-reflection-move 8s cubic-bezier(0.32, 0.72, 0, 1) infinite;
        }
        .pricing-reflection-move-slow {
          animation: pricing-reflection-move 12s cubic-bezier(0.32, 0.72, 0, 1) infinite;
        }
      `}</style>
    </section>
  );
}
