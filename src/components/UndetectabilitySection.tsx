"use client";

import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ChevronDown,
  Command,
  EyeOff,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { ScrollReveal } from "@/components/ScrollReveal";
import { QUIETLY_ICON_SRC } from "@/lib/brand";
import { cn } from "@/lib/utils";

const participants = [
  {
    name: "Gina Huels",
    suffix: "(You)",
    email: "ginahue65@quietly.ai",
    role: "Owner",
    avatar: "/images/cluely/gina-huels.b14409cf.png",
  },
  {
    name: "Todd Cremin",
    suffix: undefined,
    email: "todd.cremin@quietly.ai",
    role: "Speaker",
    avatar: "/images/cluely/todd-cremin.9cbbdf9c.png",
  },
  {
    name: "Holly Gleason",
    suffix: undefined,
    email: "holly_gleaso1972@quietly.ai",
    role: "Speaker",
    avatar: "/images/cluely/holly-gleason.528905fb.png",
  },
  {
    name: "Tomas Hansen",
    suffix: undefined,
    email: "tomas_hansen@quietly.ai",
    role: "Speaker",
    avatar: "/images/cluely/tomas-hansen.5f58da3e.png",
  },
] as const;

const arrowKeys = [
  { label: "Up", iconClassName: "", state: "up" },
  { label: "Down", iconClassName: "rotate-180", state: "down" },
  { label: "Left", iconClassName: "-rotate-90", state: "left" },
  { label: "Right", iconClassName: "rotate-90", state: "right" },
] as const;

const undetectabilityFeatureCount = 3;

const demoStates = [
  {
    key: "up",
    label: "Move Quietly AI up",
    background: "/images/cluely/bg-blue.825b2efd.jpg",
    image: "/images/cluely/video-player-card.9b7a7f86.png",
    width: 971,
    height: 741,
    imageClassName:
      "absolute bottom-[-117px] left-[-86px] w-[130%] max-w-[475px]",
    overlayClassName: "top-5 right-4 xl:top-7 xl:right-6",
  },
  {
    key: "down",
    label: "Move Quietly AI down",
    background: "/images/cluely/bg-purple-dark.58e0b5e1.jpg",
    image: "/images/cluely/video-conference-card.26ec85da.png",
    width: 708,
    height: 475,
    imageClassName: "absolute top-[-11px] left-[-75px] w-full max-w-[350px]",
    overlayClassName: "right-4 bottom-5 xl:right-6 xl:bottom-7",
  },
  {
    key: "left",
    label: "Move Quietly AI left",
    background: "/images/cluely/bg-pink.1696fade.jpg",
    image: "/images/cluely/messaging-card.f1bfaf57.png",
    width: 798,
    height: 517,
    imageClassName: "absolute top-[-41px] right-[-93px] w-[110%] max-w-[401px]",
    overlayClassName: "bottom-5 left-4 xl:bottom-7 xl:left-6",
  },
  {
    key: "right",
    label: "Move Quietly AI right",
    background: "/images/cluely/bg-purple.449cf71b.jpg",
    image: "/images/cluely/file-browser-card.8990f1d2.png",
    width: 671,
    height: 525,
    imageClassName: "absolute top-[23px] right-[18px] w-[89%]",
    overlayClassName: "top-5 left-4 xl:top-7 xl:left-6",
  },
] as const;

type DemoStateKey = (typeof demoStates)[number]["key"];

function stateIndexFor(key: DemoStateKey) {
  return demoStates.findIndex((state) => state.key === key);
}

function inactiveSceneClass(key: DemoStateKey) {
  switch (key) {
    case "up":
      return "-translate-y-5 opacity-0";
    case "down":
      return "translate-y-5 opacity-0";
    case "left":
      return "-translate-x-5 opacity-0";
    case "right":
      return "translate-x-5 opacity-0";
  }
}

const FeatureFrame = forwardRef<
  HTMLDivElement,
  Readonly<{
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }>
>(function FeatureFrame({ children, className, style }, ref) {
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "relative h-[300px] w-full overflow-hidden rounded-[22px] bg-[radial-gradient(92.09%_126.39%_at_50%_100%,#DDE2EE_58.91%,#BBC5DD_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),0_20px_40px_rgba(95,105,130,0.12)] md:h-[340px] lg:h-[366px]",
        className,
      )}
    >
      {children}
    </div>
  );
});

function FeatureCopy({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <p className="mt-5 text-[18px] leading-[1.38] text-[#5F626D] md:text-[20px]">
      <strong className="mr-1 font-medium text-[#2E3038]">{title}</strong>
      {children}
    </p>
  );
}

function ParticipantsCard() {
  return (
    <FeatureFrame className="flex flex-col justify-between p-[18px] md:p-[19px] lg:p-[17px] xl:p-[22px] 2xl:p-6">
      <div className="pointer-events-none rounded-[10px] bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,#F9FAFB_100%)] p-3.5 shadow-[0_16px_36px_rgba(91,101,126,0.08)] xl:rounded-xl xl:p-[18px]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-1">
            <h3 className="text-[12px] leading-snug font-medium text-[#2E3038] xl:text-base">
              Meeting participants
            </h3>
            <span className="text-[10px] font-medium text-[#777A88] xl:text-[13px]">
              (4)
            </span>
          </div>
          <div className="flex h-[22px] shrink-0 items-center gap-1 rounded-[5px] bg-white/85 px-2 text-[9px] font-medium text-[#20242D] shadow-[0_1px_6px_rgba(86,96,120,0.08)] xl:text-[10px]">
            <ShieldCheck className="size-3 text-[#65D981]" aria-hidden="true" />
            <span>No bots detected</span>
          </div>
        </div>

        <div className="mt-2 divide-y divide-[#E8EAF0]">
          {participants.map((participant) => (
            <div
              key={participant.email}
              className="flex items-center gap-2 py-[9px] last:pb-0 xl:gap-3"
            >
              <Image
                src={participant.avatar}
                alt={participant.name}
                width={64}
                height={65}
                className="size-6 shrink-0 rounded-full xl:size-8"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1">
                  <span className="truncate text-[10px] leading-snug font-medium text-black xl:text-[13px]">
                    {participant.name}
                  </span>
                  {participant.suffix ? (
                    <span className="text-[8px] font-medium text-[#777A88] xl:text-[11px]">
                      {participant.suffix}
                    </span>
                  ) : null}
                </div>
                <div className="truncate text-[8px] leading-snug text-[#777A88] xl:text-[11px]">
                  {participant.email}
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-0.5 text-[9px] leading-snug font-medium text-[#AAADBB] xl:text-xs">
                {participant.role}
                {participant.role === "Speaker" ? (
                  <ChevronDown className="size-3" aria-hidden="true" />
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-0 flex h-[57px] w-full items-center rounded-xl bg-[linear-gradient(180deg,#F2F4F9_0%,#F2F4F9_24.57%)] px-4 opacity-[0.97]">
        <Image
          src={QUIETLY_ICON_SRC}
          alt=""
          width={32}
          height={32}
          unoptimized
          className="mr-[11px] size-[29px]"
        />
        <span className="bg-[#A3ADC2] bg-[linear-gradient(96.56deg,rgba(209,214,224,0)_11.17%,#D1D6E0_27.98%,rgba(209,214,224,0)_52.25%,rgba(209,214,224,0)_69.29%,#D1D6E0_93.02%,rgba(209,214,224,0)_99.59%)] bg-clip-text text-[12px] font-semibold text-transparent">
          Quietly AI
        </span>
        <Image
          src="/images/cluely/eye.79b67e64.svg"
          alt=""
          width={21}
          height={21}
          unoptimized
          className="ml-auto size-[19px] opacity-45"
        />
      </div>
    </FeatureFrame>
  );
}

function InvisibleCard() {
  const [splitPercent, setSplitPercent] = useState(50);
  const autoFrameRef = useRef<number | null>(null);
  const autoStartedRef = useRef(false);
  const autoActiveRef = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);

  function cancelAutoSweep() {
    autoActiveRef.current = false;

    if (autoFrameRef.current !== null) {
      window.cancelAnimationFrame(autoFrameRef.current);
      autoFrameRef.current = null;
    }
  }

  function updateSplit(clientX: number) {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const nextPercent = ((clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.min(84, Math.max(16, nextPercent)));
  }

  function startDrag(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    autoStartedRef.current = true;
    cancelAutoSweep();
    event.currentTarget.setPointerCapture(event.pointerId);
    updateSplit(event.clientX);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      updateSplit(moveEvent.clientX);
    };
    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateSplit(moveEvent.clientX);
    };
    const stopDrag = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("mouseup", stopDrag);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("mouseup", stopDrag);
  }

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || autoStartedRef.current) return;

        autoStartedRef.current = true;
        observer.unobserve(frame);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return;
        }

        const minSplit = 16;
        const maxSplit = 84;
        const duration = 5000;
        const startedAt = performance.now();

        autoActiveRef.current = true;

        const tick = (now: number) => {
          if (!autoActiveRef.current) return;

          const phase = ((now - startedAt) % duration) / duration;
          const wave = 0.5 + Math.sin(phase * Math.PI * 2) * 0.5;
          setSplitPercent(minSplit + (maxSplit - minSplit) * wave);
          autoFrameRef.current = window.requestAnimationFrame(tick);
        };

        autoFrameRef.current = window.requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );

    observer.observe(frame);

    return () => {
      observer.disconnect();
      autoActiveRef.current = false;

      if (autoFrameRef.current !== null) {
        window.cancelAnimationFrame(autoFrameRef.current);
      }
    };
  }, []);

  return (
    <FeatureFrame
      className="select-none"
      ref={frameRef}
      style={
        {
          "--split-x": `${splitPercent}%`,
          "--clip-right": `${100 - splitPercent}%`,
        } as React.CSSProperties
      }
    >
      <Image
        src="/images/cluely/invisible-tool.452f4abe.png"
        alt=""
        fill
        sizes="(max-width: 1024px) calc(100vw - 40px), 384px"
        className="object-cover opacity-60 blur-[2px] saturate-[0.68] brightness-[1.08]"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 left-[var(--split-x)] bg-white/[0.18] backdrop-blur-[3px]" />
      <div className="absolute inset-0 z-20 [clip-path:inset(0_0_0_var(--split-x))]">
        <div className="absolute top-[18px] right-[18px] flex h-[22px] items-center rounded-[4px] bg-[#676B74]/90 px-[6px] text-[9px] leading-tight font-semibold text-white shadow-[0_8px_18px_rgba(37,40,48,0.12)] ring-1 ring-white/[0.15] backdrop-blur-[8px] xl:top-6 xl:right-6 xl:h-[29px] xl:rounded-[6px] xl:px-2 xl:text-[12px]">
          Invisible to others
        </div>
      </div>
      <div className="absolute inset-0 z-20 [clip-path:inset(0_var(--clip-right)_0_0)]">
        <Image
          src="/images/cluely/invisible-tool.452f4abe.png"
          alt=""
          fill
          sizes="(max-width: 1024px) calc(100vw - 40px), 384px"
          className="object-cover object-left"
        />
        <div className="absolute top-[18px] left-[18px] flex h-[22px] items-center rounded-[4px] bg-[#676B74]/90 px-[6px] text-[9px] leading-tight font-semibold text-white shadow-[0_8px_18px_rgba(37,40,48,0.12)] ring-1 ring-white/[0.15] backdrop-blur-[8px] xl:top-6 xl:left-6 xl:h-[29px] xl:rounded-[6px] xl:px-2 xl:text-[12px]">
          Visible to you
        </div>
        <div className="absolute top-[50px] left-[18px] w-[calc(100%-36px)] rounded-[9px] bg-[linear-gradient(180deg,rgba(255,255,255,0.68)_0%,rgba(249,250,251,0.82)_100%)] px-[14px] pt-[10px] pb-[6px] shadow-[0_10px_24px_rgba(91,101,126,0.08)] ring-1 ring-white/[0.45] backdrop-blur-[9px] lg:top-12 xl:top-[66px] xl:left-6 xl:w-[calc(100%-48px)] xl:rounded-xl xl:px-4 xl:pt-3 xl:pb-2">
          <div className="flex items-center gap-1 text-[10px] leading-tight font-semibold text-[#2E3038]">
            <Sparkles className="size-3 text-[#618BFF]" aria-hidden="true" />
            <span>AI Response</span>
          </div>
          <p className="mt-[7px] text-[9px] leading-normal text-[#2E3038] xl:mt-[9px] xl:text-[10px]">
            Add a check for missing
            <span className="relative mx-[5px] font-mono text-[8px] leading-none text-[#4984FD] before:absolute before:top-1/2 before:left-1/2 before:z-[-1] before:h-[calc(100%+4px)] before:w-[calc(100%+6px)] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-[4px] before:bg-[#4984FD1A] xl:mx-[7px] xl:text-[10px]">
              userId
            </span>
            before calling the API. Also handle
            <span className="relative mx-[5px] font-mono text-[8px] leading-none text-[#4984FD] before:absolute before:top-1/2 before:left-1/2 before:z-[-1] before:h-[calc(100%+4px)] before:w-[calc(100%+6px)] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-[4px] before:bg-[#4984FD1A] xl:mx-[7px] xl:text-[10px]">
              data.name
            </span>
            safely to avoid undefined.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-[9px] left-[9px] z-30 rounded-[18px] border border-[#8AF396] shadow-[0_0_0_1px_rgba(138,243,150,0.34)] [width:calc(var(--split-x)_-_9px)]" />
      <div className="pointer-events-none absolute inset-y-0 left-[var(--split-x)] z-30 w-[18px] -translate-x-1/2 bg-white/[0.12] backdrop-blur-[9px]" />
      <div className="pointer-events-none absolute inset-y-0 left-[var(--split-x)] z-30 w-px bg-[rgba(79,84,96,0.76)] shadow-[0_0_0_1px_rgba(255,255,255,0.28),-1px_0_10px_rgba(0,0,0,0.18),0_0_18px_rgba(255,255,255,0.46)]" />
      <button
        type="button"
        aria-label="Drag visibility split"
        className="absolute inset-y-0 left-[var(--split-x)] z-40 flex w-10 -translate-x-1/2 cursor-ew-resize touch-none items-center justify-center"
        onPointerDown={startDrag}
      >
        <span className="grid size-8 place-items-center rounded-full bg-[#5D606A]/[0.88] text-white shadow-[0_8px_18px_rgba(37,40,48,0.22),inset_0_1px_0_rgba(255,255,255,0.22)] ring-1 ring-white/30 backdrop-blur-[10px] transition-transform hover:scale-105 active:scale-95">
          <EyeOff className="size-4" aria-hidden="true" />
        </span>
      </button>
    </FeatureFrame>
  );
}

function EyesCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeState = demoStates[activeIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % demoStates.length);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  function showState(key: DemoStateKey) {
    setActiveIndex(stateIndexFor(key));
  }

  return (
    <FeatureFrame className="flex flex-col justify-between p-[18px] xl:p-6">
      <div className="relative h-[232px] overflow-hidden rounded-xl bg-[#EEEFF7] md:h-[240px]">
        {demoStates.map((state, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={state.key}
              className={cn(
                "absolute inset-0 transform-gpu transition-[opacity,transform] duration-[1150ms] ease-[cubic-bezier(.4,0,.2,1)] [backface-visibility:hidden] [will-change:opacity,transform]",
                isActive
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : inactiveSceneClass(state.key),
              )}
              aria-hidden={!isActive}
              aria-label={state.label}
            >
              <Image
                src={state.background}
                alt=""
                fill
                sizes="(max-width: 1024px) calc(100vw - 76px), 336px"
                className="object-cover"
              />
              <Image
                src={state.image}
                alt=""
                width={state.width}
                height={state.height}
                className={state.imageClassName}
              />
              <div
                className={cn(
                  "absolute z-30 flex w-fit transform-gpu flex-col rounded-[8px] transition-transform duration-[1150ms] ease-[cubic-bezier(.4,0,.2,1)] [backface-visibility:hidden]",
                  isActive ? "scale-100" : "scale-[0.985]",
                  state.overlayClassName,
                )}
              >
                <div className="relative flex w-[140px] flex-col items-center gap-y-2 md:w-[148px] lg:w-[133px] xl:w-[174px]">
                  <div className="relative mx-auto flex h-[17px] w-full items-center justify-center gap-x-1.5 overflow-hidden rounded-[6px] bg-black/10 px-[6px] shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[3px]">
                    <span className="h-[6px] flex-1 rounded-[4px] bg-white/70" />
                    <span className="h-[6px] flex-1 rounded-[4px] bg-white/70" />
                    <span className="h-[6px] flex-1 rounded-[4px] bg-white/70" />
                  </div>
                  <div className="relative w-full overflow-hidden rounded-[6px] bg-black/10 px-[7px] py-[6px] text-white shadow-[0_2px_4px_rgba(0,0,0,0.2),0_13px_26px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-[3px]">
                    <div className="flex items-center gap-[5px] text-[8px] leading-tight font-semibold xl:text-[9px]">
                      <Sparkles className="size-2.5" aria-hidden="true" />
                      <span>AI Response</span>
                    </div>
                    <div className="mt-1.5 ml-[3px] flex w-full flex-col gap-[5px]">
                      <span className="h-[6px] w-[70%] rounded-full bg-white/70" />
                      <span className="h-[6px] w-[95%] rounded-full bg-white/70" />
                      <span className="h-[6px] w-[95%] rounded-full bg-white/70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex h-[72px] flex-col gap-4 rounded-xl bg-[linear-gradient(180deg,#F3F4F7_0%,#E6E8EE_100%)] p-[9px] shadow-[0_15px_15px_rgba(0,0,0,0.04)] xl:p-3">
        <div className="flex h-full items-center justify-between gap-2">
          <button
            type="button"
            className="flex h-full min-w-[68px] items-center justify-center gap-1 rounded-[8px] border border-[#E5E7EF] bg-white px-2 transition-colors hover:bg-[#F8F9FC]"
            onClick={() =>
              setActiveIndex((index) => (index + 1) % demoStates.length)
            }
            aria-label="Cycle Quietly AI position"
          >
            <Command className="size-4 text-[#737783]" aria-hidden="true" />
            <span className="text-[8px] leading-none font-semibold text-black xl:text-[10px]">
              command
            </span>
          </button>
          <span className="text-[#B9BDC8]">+</span>
          <div className="grid flex-1 grid-cols-4 gap-2">
            {arrowKeys.map((key) => (
              <button
                type="button"
                key={key.label}
                aria-label={key.label}
                onClick={() => showState(key.state)}
                className={cn(
                  "flex h-12 items-center justify-center rounded-[8px] border border-[#E5E7EF] bg-white transition-colors hover:bg-[#F8F9FC]",
                  activeState.key === key.state
                    ? "shadow-[inset_0_0_0_1px_rgba(96,130,255,0.28)]"
                    : "",
                )}
              >
                <ArrowUp
                  className={cn("size-4 text-[#737783]", key.iconClassName)}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </FeatureFrame>
  );
}

export function UndetectabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobileCarouselActive, setIsMobileCarouselActive] = useState(false);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const desktopViewport = window.matchMedia("(min-width: 1024px)");

    if (prefersReducedMotion.matches || desktopViewport.matches) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMobileCarouselActive(Boolean(entry?.isIntersecting));
      },
      {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.35,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobileCarouselActive) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveFeatureIndex((index) => (index + 1) % undetectabilityFeatureCount);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [isMobileCarouselActive]);

  useEffect(() => {
    if (!isMobileCarouselActive) {
      return;
    }

    const feature = carouselRef.current?.children.item(activeFeatureIndex);

    if (feature instanceof HTMLElement) {
      feature.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeFeatureIndex, isMobileCarouselActive]);

  return (
    <section
      ref={sectionRef}
      id="undetectability"
      className="relative z-10 scroll-mt-24 overflow-hidden py-20 md:py-24 lg:min-h-[790px] lg:py-0"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal className="flex flex-col items-center gap-3 text-center">
          <h2 className="inline-block w-fit bg-gradient-to-r from-[#19191D] to-[#626275] bg-clip-text text-3xl leading-[1.25] font-medium text-transparent lg:text-5xl xl:text-[56px]">
            Undetectable in every way
          </h2>
          <p className="max-w-[600px] text-base leading-relaxed text-[#8C929D] md:text-lg">
            Suite of features to use Quietly AI without a trace.
          </p>
        </ScrollReveal>

        <div
          ref={carouselRef}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-16 md:px-0 lg:grid lg:snap-none lg:grid-cols-3 lg:overflow-visible lg:pb-0 xl:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          <ScrollReveal className="w-[85vw] shrink-0 snap-center sm:w-[calc(100vw-40px)] sm:max-w-[384px] sm:snap-start lg:w-auto lg:max-w-none">
            <article>
              <ParticipantsCard />
              <FeatureCopy title="Doesn't join meetings.">
                Quietly AI never joins your meetings, so there are no bots and no
                extra people on the guest list.
              </FeatureCopy>
            </article>
          </ScrollReveal>

          <ScrollReveal
            className="w-[85vw] shrink-0 snap-center sm:w-[calc(100vw-40px)] sm:max-w-[384px] sm:snap-start lg:w-auto lg:max-w-none"
            delayClassName="delay-200"
          >
            <article>
              <InvisibleCard />
              <FeatureCopy title="Invisible to screen share.">
                Quietly AI never shows up in shared screens, recordings, or external
                meeting tools.
              </FeatureCopy>
            </article>
          </ScrollReveal>

          <ScrollReveal
            className="w-[85vw] shrink-0 snap-center sm:w-[calc(100vw-40px)] sm:max-w-[384px] sm:snap-start lg:w-auto lg:max-w-none"
            delayClassName="delay-[400ms]"
          >
            <article>
              <EyesCard />
              <FeatureCopy title="Follows your eyes.">
                Quietly AI window is fully moveable so you can position it exactly
                where you&apos;re looking.
              </FeatureCopy>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
