"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ScrollRevealProps = Readonly<{
  children: ReactNode;
  className?: string;
  delayClassName?: string;
  threshold?: number;
}>;

export function ScrollReveal({
  children,
  className,
  delayClassName,
  threshold = 0.18,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsRevealed(true);
        observer.unobserve(node);
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transform-gpu transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] will-change-[opacity,transform] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        delayClassName,
        isRevealed ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
