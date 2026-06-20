"use client";

import {
  AudioWaveform,
  ChevronDown,
  MessageSquare,
  MousePointer2,
  RefreshCw,
  Send,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const visibleWaveformBarCount = 48;

function formatElapsedTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function ListeningCard() {
  const cardRef = useRef<HTMLElement>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const node = cardRef.current;

    if (!node) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsLive(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.32,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isLive) {
      return undefined;
    }

    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 250);

    return () => window.clearInterval(timer);
  }, [isLive]);

  return (
    <article
      ref={cardRef}
      className="relative mx-auto flex h-[390px] w-full max-w-[344px] overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_50%_0%,#86A4FF_0%,#7196F5_44%,#5F88EF_100%)] p-4 text-white shadow-[0_28px_70px_rgba(83,124,232,0.24),inset_0_1px_0_rgba(255,255,255,0.38)] sm:h-auto sm:max-w-full sm:rounded-[28px] sm:p-6 md:p-8 lg:min-h-[586px] lg:p-10"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(95,136,239,0)_0%,rgba(68,116,225,0.36)_100%)]" />
      <div className="relative z-10 flex h-full w-[128.2%] origin-top-left scale-[0.78] flex-col items-center text-center sm:w-full sm:scale-100 sm:items-stretch sm:text-left">
        <div>
          <h3 className="text-[18px] font-medium leading-[24px] sm:max-w-[500px] sm:text-[22px] sm:leading-[30px] md:text-[28px] md:leading-[38px]">
            Quietly AI{" "}
            <span className="inline-flex translate-y-[-2px] items-center gap-1 rounded-full bg-white/16 px-2 py-0.5 text-[14px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-md sm:px-2.5 sm:py-1 sm:text-[inherit]">
              <AudioWaveform className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              listens
            </span>{" "}
            in to the conversation
          </h3>
          <p className="mt-2 text-[14px] leading-5 text-white/88 sm:mt-3 sm:max-w-[520px] sm:text-[15px] sm:leading-6 md:mt-5 md:text-[17px] md:leading-7">
            It picks up the context of your meeting in real time, so it can help
            when you need it.
          </p>
        </div>

        <div className="mt-5 flex flex-col items-center sm:mt-8 md:mt-10">
          <div className="text-[28px] font-medium leading-none text-white/62 sm:text-[36px] md:text-[46px]">
            {formatElapsedTime(elapsedSeconds)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[15px] text-white/62">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8E7D] motion-safe:animate-pulse" />
            Recording
          </div>
        </div>

        <div
          className={cn(
            "quietly-audio-waveform mt-4 flex h-8 items-center justify-center gap-0.5 overflow-hidden sm:mt-auto sm:h-16 sm:gap-1 md:gap-[5px]",
            isLive && "quietly-audio-waveform-live",
          )}
          aria-hidden="true"
        >
          {Array.from({ length: visibleWaveformBarCount }, (_, index) => (
            <span key={index} className="quietly-audio-wave-bar" />
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-white/8 bg-[#26376E]/34 p-2 text-white/52 shadow-[0_16px_44px_rgba(41,64,130,0.32)] backdrop-blur-lg sm:mt-9 sm:rounded-xl sm:p-3">
          <div className="flex items-center gap-3 overflow-hidden px-1 text-[10px] sm:gap-4 sm:text-[11px]">
            <span className="flex items-center gap-1.5 text-white/58">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Assist
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <WandSparkles className="h-3.5 w-3.5" aria-hidden="true" />
              What should I say?
            </span>
            <span className="hidden items-center gap-1.5 whitespace-nowrap sm:flex">
              <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              Follow-up questions
            </span>
            <span className="hidden items-center gap-1.5 whitespace-nowrap md:flex">
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              Recap
            </span>
          </div>
          <div className="mt-2 flex items-center rounded-lg border border-white/8 bg-white/6 px-2.5 py-1.5 text-[12px] text-white/42 sm:mt-3 sm:rounded-xl sm:px-3 sm:py-2 sm:text-[13px]">
            <span className="truncate">
              Ask about your screen or conversation, or
            </span>
            <kbd className="ml-2 rounded border border-white/10 px-1.5 py-0.5 text-[10px]">
              Cmd
            </kbd>
            <kbd className="ml-1 rounded border border-white/10 px-1.5 py-0.5 text-[10px]">
              Enter
            </kbd>
            <span className="ml-2 hidden sm:inline">for Assist</span>
            <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#1C56D8] text-white">
              <Send className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-3 text-[11px] sm:mt-2 sm:text-[12px]">
            <span className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/6 px-3 py-1">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Smart
            </span>
            <span>...</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function AssistantPanel() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#26252B]/88 p-2 text-white shadow-[0_24px_54px_rgba(24,23,28,0.22)] backdrop-blur-md sm:rounded-2xl sm:p-3 md:p-4">
      <div className="ml-auto w-fit rounded-md bg-[#164ED3] px-2.5 py-1.5 text-[10px] leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] sm:rounded-lg sm:px-3 sm:py-2 sm:text-[12px]">
        Assist
      </div>
      <div className="mt-2 text-[10px] leading-4 text-white/44 sm:mt-4 sm:max-w-[470px] sm:text-[12px] sm:leading-5">
        <p className="text-white/36">Viewed screen</p>
        <p className="line-clamp-2 sm:line-clamp-none">
          Quietly AI is an AI meeting assistant that listens in real time,
          understands what&apos;s being said, and gives you instant answers,
          notes, and next steps all while staying completely undetectable on
          your screen.
        </p>
      </div>
      <div className="mt-2 flex items-center gap-3 overflow-hidden text-[10px] text-white/82 sm:mt-5 sm:gap-4 sm:text-[12px]">
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Assist
        </span>
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <WandSparkles className="h-3.5 w-3.5" aria-hidden="true" />
          What should I say?
        </span>
        <span className="hidden items-center gap-1.5 whitespace-nowrap sm:flex">
          <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
          Follow-up questions
        </span>
        <span className="hidden items-center gap-1.5 whitespace-nowrap md:flex">
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          Recap
        </span>
      </div>
      <div className="mt-2 flex items-center rounded-lg border border-white/12 bg-white/6 px-2 py-1.5 text-[11px] text-white/52 sm:mt-3 sm:rounded-xl sm:px-3 sm:py-2 sm:text-[13px]">
        <span className="truncate text-[10px] sm:text-[13px]">Ask about your screen or conversation</span>
        <kbd className="ml-2 rounded border border-white/12 px-1.5 py-0.5 text-[10px]">
          Cmd
        </kbd>
        <kbd className="ml-1 rounded border border-white/12 px-1.5 py-0.5 text-[10px]">
          Enter
        </kbd>
        <span className="ml-2 hidden sm:inline">for Assist</span>
        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#1550DA] text-white sm:h-7 sm:w-7">
          <Send className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-[10px] text-white/54 sm:mt-2 sm:gap-3 sm:text-[12px]">
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/7 px-3 py-1">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          Smart
        </span>
        <span>...</span>
      </div>
    </div>
  );
}

function AssistCard() {
  return (
    <article className="relative mx-auto flex h-[390px] w-full max-w-[344px] overflow-hidden rounded-[20px] border border-[#DDE2EE] bg-[radial-gradient(circle_at_50%_-18%,#FFFFFF_0%,#F3F6FC_42%,#F9FAFD_100%)] p-4 shadow-[0_22px_70px_rgba(178,188,213,0.2),inset_0_0_0_1px_rgba(255,255,255,0.78)] sm:h-auto sm:max-w-full sm:rounded-[28px] sm:p-6 md:p-8 lg:min-h-[586px] lg:p-10">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-full bg-white/70 blur-2xl" />
      <div className="relative z-10 flex h-full w-[128.2%] origin-top-left scale-[0.78] flex-col items-center text-center sm:w-full sm:scale-100 sm:items-stretch sm:text-left">
        <div>
          <h3 className="text-[18px] font-medium leading-[24px] text-[#24242C] sm:max-w-[520px] sm:text-[22px] sm:leading-[30px] md:text-[28px] md:leading-[38px]">
            When you need help, Quietly AI{" "}
            <span className="inline-flex translate-y-[-2px] items-center gap-1 rounded-full bg-white/72 px-2 py-0.5 text-[14px] text-[#24242C] shadow-[0_1px_8px_rgba(150,159,180,0.16)] sm:px-2.5 sm:py-1 sm:text-[inherit]">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              assists
            </span>{" "}
            you instantly
          </h3>
          <p className="mt-2 text-[14px] leading-5 text-[#777783] sm:mt-5 sm:max-w-[520px] sm:text-[15px] sm:leading-6 md:text-[17px] md:leading-7">
            Hit Cmd/Ctrl + Enter and Quietly AI helps you with AI in the moment.
          </p>
        </div>

        <div className="mt-4 pt-3 sm:mt-auto sm:pt-7">
          <div className="mx-auto mb-2 flex w-fit items-center gap-1.5 rounded-full bg-[#3A3A42] p-1.5 text-white shadow-[0_12px_28px_rgba(38,38,45,0.18)] sm:mb-3 sm:gap-2 sm:p-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#3A3A42] sm:h-8 sm:w-8">
              <MousePointer2
                className="h-4 w-4 rotate-45 sm:h-5 sm:w-5"
                aria-hidden="true"
              />
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[#2C2C34] px-2.5 py-1.5 text-[10px] sm:px-3 sm:py-2 sm:text-[12px]">
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              Hide
            </span>
            <span className="h-5 w-5 rounded-full border-4 border-white bg-white/20 sm:h-7 sm:w-7 sm:border-[6px]" />
          </div>
          <AssistantPanel />
        </div>
      </div>
    </article>
  );
}

export function MeetingHelpSection() {
  return (
    <section
      aria-labelledby="meeting-help-title"
      className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 overflow-hidden px-4 sm:gap-8 sm:px-6 md:gap-11 md:px-8"
    >
      <ScrollReveal>
        <h2
          id="meeting-help-title"
          className="max-w-[980px] bg-[linear-gradient(90deg,#19191D_0%,#626275_100%)] bg-clip-text text-[28px] font-medium leading-[36px] text-transparent sm:text-[40px] sm:leading-[48px] md:text-[56px] md:leading-[70px]"
        >
          How Quietly AI helps during a meeting
        </h2>
      </ScrollReveal>
      <div className="grid min-w-0 gap-5 sm:gap-7 lg:grid-cols-2">
        <ScrollReveal delayClassName="delay-100">
          <ListeningCard />
        </ScrollReveal>
        <ScrollReveal delayClassName="delay-200">
          <AssistCard />
        </ScrollReveal>
      </div>
    </section>
  );
}
