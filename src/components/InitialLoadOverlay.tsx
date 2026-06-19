"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { QUIETLY_ICON_SRC } from "@/lib/brand";

const minimumLoadingMs = 3600;
const fadeOutMs = 450;

type LoadingPhase = "visible" | "leaving" | "hidden";

export function InitialLoadOverlay() {
  const [phase, setPhase] = useState<LoadingPhase>("visible");

  useEffect(() => {
    let pageLoaded = document.readyState === "complete";
    let minimumDelayDone = false;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;

    const beginExit = () => {
      if (!pageLoaded || !minimumDelayDone) {
        return;
      }

      setPhase("leaving");
      fadeTimer = setTimeout(() => setPhase("hidden"), fadeOutMs);
    };

    const handleLoad = () => {
      pageLoaded = true;
      beginExit();
    };

    const delayTimer = setTimeout(() => {
      minimumDelayDone = true;
      beginExit();
    }, minimumLoadingMs);

    if (pageLoaded) {
      beginExit();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(delayTimer);

      if (fadeTimer) {
        clearTimeout(fadeTimer);
      }
    };
  }, []);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white text-slate-950 transition-opacity duration-500 ease-out ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        <div className="relative flex size-20 items-center justify-center rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_35%_20%,rgba(99,102,241,0.16),transparent_58%)]"
          />
          <Image
            src={QUIETLY_ICON_SRC}
            alt="Quietly AI"
            width={48}
            height={48}
            priority
            className="relative size-12"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[13px] font-semibold tracking-normal text-slate-700">
            Loading Quietly AI
          </p>
          <div className="h-1 w-44 overflow-hidden rounded-full bg-slate-200">
            <span className="block h-full w-1/2 animate-[quietly-loader_1.05s_ease-in-out_infinite] rounded-full bg-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
