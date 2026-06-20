"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { STATS } from "@/lib/v2/data";
import { V2_EASE } from "@/lib/v2/motion";

function Counter({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

export function SocialProofStrip() {
  return (
    <motion.div
      className="w-full border-y border-white/[0.06] py-5 md:py-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: V2_EASE.out }}
    >
      <div className="v2-wide flex items-center justify-center gap-4 md:gap-8 flex-wrap px-4">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-4 md:gap-8">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm md:text-base font-mono tracking-wider text-white/90 font-medium">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </span>
              <span className="text-[11px] md:text-xs font-mono tracking-widest uppercase text-[hsl(0_0%_45%)]">
                {stat.label}
              </span>
            </div>
            {i < STATS.length - 1 && (
              <span className="text-white/10 text-xs hidden md:block">·</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
