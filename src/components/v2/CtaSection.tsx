"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ui/ScrollReveal";
import { DownloadOverlay } from "./DownloadOverlay";

const DOWNLOAD_URL =
  "https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.0/Quietly-2.7.0-arm64.dmg";

export function CtaSection() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <section className="min-h-[60vh] flex items-center justify-center v2-section text-center" id="download">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium tracking-[-0.03em] leading-[1.15] mb-4">
            Start Your Next <span className="v2-serif">Conversation.</span>
          </h2>
          <p className="text-lg text-[hsl(0_0%_65%)] mb-8">
            One-time purchase. 11 modes. Invisible.
          </p>

          <div className="flex flex-col items-center gap-3">
            <motion.a
              href={DOWNLOAD_URL}
              onClick={() => {
                setTimeout(() => setShowOverlay(true), 1000);
              }}
              className="bg-white text-black rounded-full px-8 py-3.5 text-base font-medium inline-flex items-center gap-2 v2-cta-glow"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Download for macOS
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
            </motion.a>
            <a href="#pricing" className="text-sm text-[hsl(0_0%_65%)] underline-offset-4 hover:underline transition-colors hover:text-white">
              View Pricing →
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mt-10 flex-wrap">
            {["macOS 12+", "Apple Silicon native", "No subscription"].map((badge) => (
              <span key={badge} className="text-xs font-mono text-[hsl(0_0%_35%)] uppercase tracking-wider">
                {badge}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {showOverlay && (
        <DownloadOverlay onClose={() => setShowOverlay(false)} />
      )}
    </section>
  );
}
