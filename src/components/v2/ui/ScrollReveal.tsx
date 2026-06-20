"use client";

import { motion } from "framer-motion";
import { V2_EASE, V2_DURATION } from "@/lib/v2/motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function ScrollReveal({ children, className, delay = 0, y = 24 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: V2_DURATION.slow, ease: V2_EASE.outExpo, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
