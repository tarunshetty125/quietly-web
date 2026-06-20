"use client";

import { COMPARISON } from "@/lib/v2/data";
import { SectionShell } from "./ui/SectionShell";
import { ScrollReveal } from "./ui/ScrollReveal";

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/[0.04] border border-white/[0.06]">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </span>
    );
  }
  return <span>{value}</span>;
}

export function ComparisonSection() {
  return (
    <SectionShell id="pricing">
      <div className="v2-content">
        <ScrollReveal>
          <p className="v2-kicker text-center">COMPARISON</p>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium tracking-[-0.03em] leading-[1.15] mb-4 text-center">
            Why Teams <span className="v2-serif">Switch.</span>
          </h2>
          <p className="text-lg text-[hsl(0_0%_65%)] mb-10 md:mb-12 text-center max-w-xl mx-auto">
            One-time purchase. More features. Zero data breaches.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="v2-glass rounded-2xl overflow-hidden">
            {/* Desktop table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-4 px-5 text-[hsl(0_0%_45%)] font-medium text-xs uppercase tracking-wider">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-white">Quietly</th>
                    <th className="text-center py-4 px-4 text-[hsl(0_0%_45%)] font-medium">Cluely</th>
                    <th className="text-center py-4 px-4 text-[hsl(0_0%_45%)] font-medium hidden md:table-cell">Final Round</th>
                    <th className="text-center py-4 px-4 text-[hsl(0_0%_45%)] font-medium hidden md:table-cell">LockedIn</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-white/[0.04] ${i % 2 === 0 ? "v2-table-highlight" : ""}`}
                    >
                      <td className="py-3 px-5 text-white/70 font-medium">{row.feature}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">
                        <Cell value={row.quietly} />
                      </td>
                      <td className="py-3 px-4 text-center text-white/40">
                        <Cell value={row.cluely} />
                      </td>
                      <td className="py-3 px-4 text-center text-white/40 hidden md:table-cell">
                        <Cell value={row.finalRound} />
                      </td>
                      <td className="py-3 px-4 text-center text-white/40 hidden md:table-cell">
                        <Cell value={row.lockedIn} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionShell>
  );
}
