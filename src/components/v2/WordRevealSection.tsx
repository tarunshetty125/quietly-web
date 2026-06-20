"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const QUOTE =
  "Quietly transformed how we prepare for every meeting using real-time intelligence. We are now performing better in interviews and closing deals faster than we ever imagined. Quietly transformed how we prepare for every meeting using real-time intelligence.";

const WORDS = QUOTE.split(" ");

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, [
    "hsl(0 0% 35%)",
    "hsl(0 0% 100%)",
  ]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.3em] inline-block will-change-[opacity,color]"
    >
      {word}
    </motion.span>
  );
}

export function WordRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  return (
    <section
      ref={containerRef}
      className="flex items-center py-20 md:py-28 px-8 md:px-28"
      id="testimonial"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-start gap-10">
        {/* Quote symbol */}
        <div className="w-14 h-10 flex items-center justify-center">
          <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
            <path
              d="M0 40V24.8C0 20.27 0.93 16.13 2.8 12.4C4.67 8.53 7.2 5.33 10.4 2.8L16.8 7.6C14.4 9.6 12.53 11.87 11.2 14.4C9.87 16.93 9.2 19.6 9.2 22.4H16V40H0ZM30 40V24.8C30 20.27 30.93 16.13 32.8 12.4C34.67 8.53 37.2 5.33 40.4 2.8L46.8 7.6C44.4 9.6 42.53 11.87 41.2 14.4C39.87 16.93 39.2 19.6 39.2 22.4H46V40H30Z"
              fill="rgba(255,255,255,0.15)"
            />
          </svg>
        </div>

        {/* Testimonial text — scroll-driven word reveal */}
        <p
          className="text-2xl md:text-3xl font-medium leading-[1.5] flex flex-wrap"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {WORDS.map((word, i) => {
            const start = i / WORDS.length;
            const end = (i + 1) / WORDS.length;
            return (
              <Word
                key={`${word}-${i}`}
                word={word}
                range={[start, end]}
                progress={scrollYProgress}
              />
            );
          })}
          <span className="text-[hsl(0_0%_65%)] ml-2">&rdquo;</span>
        </p>


      </div>
    </section>
  );
}
