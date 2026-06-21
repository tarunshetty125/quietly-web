"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Apple,
  ChevronDown,
  Circle,
  MessageSquare,
  RefreshCw,
  Send,
  Sparkles,
  WandSparkles,
  Wifi,
} from "lucide-react";

import { QUIETLY_ICON_SRC } from "@/lib/brand";
import { DownloadOverlay } from "@/components/v2/DownloadOverlay";

const dockIcons = [
  {
    alt: "Launchpad",
    src: "/images/cluely/launchpad-icon.png",
  },
  {
    alt: "Safari",
    src: "/images/cluely/safari-icon.png",
  },
  {
    alt: "Settings",
    src: "/images/cluely/settings-icon.png",
  },
  {
    alt: "Zoom",
    src: "/images/cluely/zoom-icon.png",
  },
  {
    alt: "Quietly AI",
    src: QUIETLY_ICON_SRC,
  },
  {
    alt: "Trash",
    src: "/images/cluely/trash-icon.png",
  },
] as const;

function WindowsLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="relative z-10 size-4"
    >
      <path d="M3 5.02 10.7 4v7.35H3V5.02Zm9.3-1.22L21 2.65v8.7h-8.7V3.8ZM3 12.65h7.7V20L3 18.98v-6.33Zm9.3 0H21v8.7l-8.7-1.15v-7.55Z" />
    </svg>
  );
}

function PlatformCta({
  platform,
  href,
  onClick,
}: Readonly<{
  platform: "mac" | "windows";
  href: string;
  onClick?: () => void;
}>) {
  const isMac = platform === "mac";

  return (
    <a
      href={href}
      onClick={() => onClick?.()}
      className={
        isMac
          ? "cluely-gradient-button min-w-[190px] cluely-magnetic-button"
          : "cluely-gradient-button min-w-[190px] cluely-magnetic-button"
      }
    >
      <span
        className="absolute top-0 left-0 z-20 h-full w-full blur-[1px]"
        aria-hidden="true"
      >
        <span className="blurred-border absolute -top-px -left-px z-20 h-full w-full" />
      </span>
      {isMac ? (
        <Apple className="relative z-10 mb-0.5 size-4 fill-current" aria-hidden="true" />
      ) : (
        <WindowsLogo />
      )}
      <span className="relative z-10">
        Get for {isMac ? "Mac" : "Windows"}
      </span>
    </a>
  );
}

function WindowChrome() {
  return (
    <div className="absolute top-0 right-0 left-0 hidden h-fit w-full items-center justify-between bg-black/10 px-3 pt-2 pb-1 text-white lg:flex">
      <Image
        src={QUIETLY_ICON_SRC}
        alt=""
        width={16}
        height={16}
        unoptimized
        className="size-4"
      />
      <div className="flex items-center gap-2 text-white/82">
        <Wifi className="size-4" aria-hidden="true" />
        <span className="grid size-4 grid-cols-2 gap-[2px]" aria-hidden="true">
          <span className="rounded-[1px] bg-white/85" />
          <span className="rounded-[1px] bg-white/85" />
          <span className="rounded-[1px] bg-white/85" />
          <span className="rounded-[1px] bg-white/85" />
        </span>
      </div>
    </div>
  );
}

function HeroDock() {
  return (
    <div className="cluely-hero-dock absolute right-0 bottom-[-6px] left-0 hidden items-center justify-center lg:flex">
      <div className="flex items-center gap-0.5 rounded-xl border border-white/10 bg-white/10 px-1 py-1 backdrop-blur-lg">
        {dockIcons.slice(0, 5).map((icon) => (
          <Image
            key={icon.alt}
            src={icon.src}
            alt={icon.alt}
            width={44}
            height={44}
            className="size-11"
          />
        ))}
        <span className="mx-2 h-9 min-w-px rounded-full bg-white/30" />
        <Image
          src={dockIcons[5].src}
          alt={dockIcons[5].alt}
          width={44}
          height={44}
          className="size-11"
        />
      </div>
    </div>
  );
}

function OverlayToolbar() {
  return (
    <div className="cluely-ai-card cluely-ai-card-one mx-auto mb-3 flex w-fit items-center gap-2 rounded-full bg-[#3A3A42]/95 p-2 text-white shadow-[0_12px_28px_rgba(25,25,30,0.28)]">
      <span className="grid size-8 place-items-center rounded-full bg-white text-[#3A3A42]">
        <Image
          src={QUIETLY_ICON_SRC}
          alt=""
          width={22}
          height={22}
          unoptimized
          className="size-[22px]"
        />
      </span>
      <span className="flex h-8 items-center gap-1 rounded-full bg-[linear-gradient(180deg,#2E3039_0%,#272A31_100%)] px-3 text-xs font-medium text-white shadow-[inset_0_0.7px_0_#AFB3C4] transition-transform hover:scale-105">
        <ChevronDown className="size-3.5" aria-hidden="true" />
        Hide
      </span>
      <span className="grid size-8 place-items-center rounded-full bg-[#2C2C34]">
        <Circle className="size-3.5 fill-white text-white" aria-hidden="true" />
      </span>
    </div>
  );
}

function HeroAssistOverlay() {
  return (
    <div className="cluely-hero-overlay absolute inset-0 z-20 flex items-start justify-center pt-2 lg:pt-10">
      <div className="w-[88%] max-w-[520px] origin-top md:w-[480px] lg:w-[45%]">
        <OverlayToolbar />
        <div className="cluely-ai-card cluely-ai-card-two cluely-ai-panel rounded-2xl border border-white/25 bg-[linear-gradient(180deg,rgba(24,23,28,0.75)_0%,rgba(24,23,28,0.86)_100%)] p-3 text-white shadow-[0_24px_54px_rgba(24,23,28,0.34)] backdrop-blur-md sm:p-4">
          <div className="ml-auto w-fit rounded-lg bg-[#164ED3] px-3 py-2 text-[12px] leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            What should I say?
          </div>

          <p className="mt-4 text-[12px] leading-5 text-white/86">
            &ldquo;A discounted cash flow model values a company by projecting
            future free cash flows and discounting them to present value using
            the weighted average cost of capital.&rdquo;
          </p>

          <div className="mt-5 flex items-center gap-4 overflow-hidden text-[12px] text-white/82">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Assist
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <WandSparkles className="size-3.5" aria-hidden="true" />
              What should I say?
            </span>
            <span className="hidden items-center gap-1.5 whitespace-nowrap sm:flex">
              <MessageSquare className="size-3.5" aria-hidden="true" />
              Follow-up questions
            </span>
            <span className="hidden items-center gap-1.5 whitespace-nowrap md:flex">
              <RefreshCw className="size-3.5" aria-hidden="true" />
              Recap
            </span>
          </div>

          <div className="cluely-ai-card cluely-ai-card-three cluely-ai-input mt-3 flex items-center rounded-xl border border-white/12 bg-white/6 px-3 py-2 text-[13px] text-white/52">
            <span className="truncate">
              Ask about your screen or conversation, or
            </span>
            <kbd className="ml-2 rounded border border-white/12 px-1.5 py-0.5 text-[10px]">
              Cmd
            </kbd>
            <kbd className="ml-1 rounded border border-white/12 px-1.5 py-0.5 text-[10px]">
              Enter
            </kbd>
            <span className="ml-2 hidden sm:inline">for Assist</span>
            <span className="cluely-ai-send ml-auto grid size-7 shrink-0 place-items-center rounded-full bg-[#1550DA] text-white">
              <Send className="size-3.5 fill-current" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-2 flex items-center gap-3 text-[12px] text-white/54">
            <span className="cluely-ai-status flex items-center gap-1.5 rounded-full border border-white/10 bg-white/7 px-3 py-1">
              <Sparkles className="size-3" aria-hidden="true" />
              Smart
            </span>
            <span>...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    video.pause();

    try {
      video.currentTime = 0;
    } catch {
      // Some browsers wait for metadata before seeking; delayed play still works.
    }

    const timer = window.setTimeout(() => {
      void video.play().catch(() => undefined);
    }, 1950);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <video
      ref={videoRef}
      aria-label="Quietly AI meeting demo"
      className="cluely-hero-video aspect-[1.6] h-[80%] max-w-[86%] object-contain"
      loop
      muted
      playsInline
      preload="auto"
    >
      <source
        src="/videos/hero-bg.webm"
        type="video/webm"
      />
    </video>
  );
}

function HeroMacWallpaper() {
  return (
    <>
      <video
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 hidden h-full w-full rounded-[13px] object-cover object-center blur-xl lg:block"
        loop
        muted
        playsInline
        poster="/images/cluely/wallpaper-2x.b7df867c.png"
        preload="auto"
      >
        <source
          src="/videos/teamsync/team-sync-logo-live-wallpaper.mp4"
          type="video/mp4"
        />
      </video>
      <video
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 h-full w-full rounded-[13px] object-cover object-center"
        loop
        muted
        playsInline
        poster="/images/cluely/wallpaper-2x.b7df867c.png"
        preload="auto"
      >
        <source
          src="/videos/teamsync/team-sync-logo-live-wallpaper.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
}

function HeroDemo() {
  return (
    <div className="cluely-hero-stage relative flex h-fit w-full items-start justify-center px-3 pt-10 sm:px-12 sm:pt-12 lg:pt-16 xl:pt-[74px]">
      <div className="cluely-hero-frame relative h-[400px] w-full max-w-6xl rounded-[13px] bg-[#F2B56A] sm:h-[512px] lg:aspect-[1.7] lg:h-auto">
        <HeroMacWallpaper />

        <div className="absolute inset-0 flex items-center justify-center rounded-[13px]">
          <WindowChrome />
          <div className="relative flex h-full w-full items-center justify-center">
            <HeroVideo />
            <HeroAssistOverlay />
          </div>
          <HeroDock />
        </div>
      </div>
    </div>
  );
}

function HeroMountainBackground() {
  return (
    <div
      aria-hidden="true"
      className="teamsync-hero-mountain pointer-events-none absolute -top-20 left-0 z-0 h-[680px] w-full overflow-hidden md:h-[820px]"
    >
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/images/teamsync/natively-hero-bg-poster.jpeg"
        className="h-full w-full object-cover object-top"
      >
        <source src="/videos/teamsync/natively-hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="teamsync-hero-mountain-wash absolute inset-0" />
      <div className="teamsync-hero-mountain-depth absolute inset-0" />
    </div>
  );
}

export function HeroSection() {
  const [showDownloadOverlay, setShowDownloadOverlay] = useState(false);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[1200px] w-full justify-center overflow-hidden bg-white text-white md:min-h-[1220px]"
    >
      <HeroMountainBackground />
      <div className="relative z-10 w-full max-w-[1425px]">
        <div className="flex h-[452px] items-start justify-center px-3 pt-20 text-center lg:pt-32">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/v2"
                className="group inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3.5 py-1.5 text-[12px] font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-500/25"
                style={{ boxShadow: "0 0 24px rgba(52,211,153,0.15), inset 0 1px 0 rgba(255,255,255,0.08)" }}
              >
                <span className="relative flex size-1.5 items-center justify-center">
                  <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-emerald-400 opacity-30" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                <span>Quietly 2.7 — Out now</span>
                <svg className="size-3 text-emerald-400/50 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
              <h1
                className="cluely-hero-title font-serif max-w-[350px] text-[55px] leading-[0.96] font-normal text-white md:max-w-[548px] md:text-[78px] md:leading-[74.88px]"
                aria-label="#1 Undetectable AI for Meetings"
              >
                <span className="block" aria-hidden="true">
                  <span className="cluely-title-word-mask">
                    <span className="cluely-title-word cluely-title-word-one">
                      #1
                    </span>
                  </span>{" "}
                  <span className="cluely-title-word-mask">
                    <span className="cluely-title-word cluely-title-word-two">
                      Undetectable
                    </span>
                  </span>
                </span>
                <span className="block" aria-hidden="true">
                  <span className="cluely-title-word-mask">
                    <span className="cluely-title-word cluely-title-word-three">
                      AI
                    </span>
                  </span>{" "}
                  <span className="cluely-title-word-mask">
                    <span className="cluely-title-word cluely-title-word-four">
                      for
                    </span>
                  </span>{" "}
                  <span className="cluely-title-word-mask">
                    <span className="cluely-title-word cluely-title-word-five">
                      Meetings
                    </span>
                  </span>
                </span>
              </h1>
              <p className="cluely-hero-subtitle max-w-[600px] text-base leading-6 font-medium text-white/88 md:text-lg md:leading-7">
                Quietly AI takes perfect meeting notes and gives real-time answers,
                all while completely undetectable
              </p>
            </div>
            <div className="cluely-hero-cta flex flex-wrap justify-center gap-3">
              <PlatformCta
                platform="mac"
                href="https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.0/Quietly-2.7.0-arm64.dmg"
                onClick={() => setTimeout(() => setShowDownloadOverlay(true), 1000)}
              />
              <PlatformCta
                platform="windows"
                href="https://github.com/tarunshetty125/TeamSync/releases/download/v2.7.0/Quietly-Setup-2.7.0.exe"
              />
            </div>
          </div>
        </div>

        <HeroDemo />
      </div>
      {showDownloadOverlay && (
        <DownloadOverlay onClose={() => setShowDownloadOverlay(false)} />
      )}
    </section>
  );
}
