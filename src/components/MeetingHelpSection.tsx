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
      className="relative flex min-h-[520px] overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,#86A4FF_0%,#7196F5_44%,#5F88EF_100%)] p-6 text-white shadow-[0_28px_70px_rgba(83,124,232,0.24),inset_0_1px_0_rgba(255,255,255,0.38)] sm:p-8 lg:min-h-[586px] lg:p-10"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(95,136,239,0)_0%,rgba(68,116,225,0.36)_100%)]" />
      <div className="relative z-10 flex h-full w-full flex-col">
        <div>
          <h3 className="max-w-[500px] text-[25px] font-medium leading-[34px] sm:text-[28px] sm:leading-[38px]">
            TeamSync{" "}
            <span className="inline-flex translate-y-[-2px] items-center gap-1 rounded-full bg-white/16 px-2.5 py-1 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-md">
              <AudioWaveform className="h-4 w-4" aria-hidden="true" />
              listens
            </span>{" "}
            in to the conversation
          </h3>
          <p className="mt-5 max-w-[520px] text-[17px] leading-7 text-white/88 sm:text-lg">
            It picks up the context of your meeting in real time, so it can help
            when you need it.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center sm:mt-10">
          <div className="text-[42px] font-medium leading-none text-white/62 sm:text-[46px]">
            {formatElapsedTime(elapsedSeconds)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[15px] text-white/62">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8E7D] motion-safe:animate-pulse" />
            Recording
          </div>
        </div>

        <div
          className={cn(
            "teamsync-audio-waveform mt-auto flex h-16 items-center justify-center gap-1 overflow-hidden sm:gap-[5px]",
            isLive && "teamsync-audio-waveform-live",
          )}
          aria-hidden="true"
        >
          {Array.from({ length: visibleWaveformBarCount }, (_, index) => (
            <span key={index} className="teamsync-audio-wave-bar" />
          ))}
        </div>

        <div className="mt-9 rounded-xl border border-white/8 bg-[#26376E]/34 p-3 text-white/52 shadow-[0_16px_44px_rgba(41,64,130,0.32)] backdrop-blur-lg">
          <div className="flex items-center gap-4 overflow-hidden px-1 text-[11px]">
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
          <div className="mt-3 flex items-center rounded-xl border border-white/8 bg-white/6 px-3 py-2 text-[13px] text-white/42">
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
          <div className="mt-2 flex items-center gap-3 text-[12px]">
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
    <div className="rounded-2xl border border-white/10 bg-[#26252B]/88 p-3 text-white shadow-[0_24px_54px_rgba(24,23,28,0.22)] backdrop-blur-md sm:p-4">
      <div className="ml-auto w-fit rounded-lg bg-[#164ED3] px-3 py-2 text-[12px] leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
        Assist
      </div>
      <div className="mt-4 max-w-[470px] text-[12px] leading-5 text-white/44">
        <p className="text-white/36">Viewed screen</p>
        <p>
          TeamSync is an AI meeting assistant that listens in real time,
          understands what&apos;s being said, and gives you instant answers,
          notes, and next steps all while staying completely undetectable on
          your screen.
        </p>
      </div>
      <div className="mt-5 flex items-center gap-4 overflow-hidden text-[12px] text-white/82">
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
      <div className="mt-3 flex items-center rounded-xl border border-white/12 bg-white/6 px-3 py-2 text-[13px] text-white/52">
        <span className="truncate">Ask about your screen or conversation, or</span>
        <kbd className="ml-2 rounded border border-white/12 px-1.5 py-0.5 text-[10px]">
          Cmd
        </kbd>
        <kbd className="ml-1 rounded border border-white/12 px-1.5 py-0.5 text-[10px]">
          Enter
        </kbd>
        <span className="ml-2 hidden sm:inline">for Assist</span>
        <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#1550DA] text-white">
          <Send className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-2 flex items-center gap-3 text-[12px] text-white/54">
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
    <article className="relative flex min-h-[520px] overflow-hidden rounded-[28px] border border-[#DDE2EE] bg-[radial-gradient(circle_at_50%_-18%,#FFFFFF_0%,#F3F6FC_42%,#F9FAFD_100%)] p-6 shadow-[0_22px_70px_rgba(178,188,213,0.2),inset_0_0_0_1px_rgba(255,255,255,0.78)] sm:p-8 lg:min-h-[586px] lg:p-10">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-full bg-white/70 blur-2xl" />
      <div className="relative z-10 flex h-full w-full flex-col">
        <div>
          <h3 className="max-w-[520px] text-[25px] font-medium leading-[34px] text-[#24242C] sm:text-[28px] sm:leading-[38px]">
            When you need help, TeamSync{" "}
            <span className="inline-flex translate-y-[-2px] items-center gap-1 rounded-full bg-white/72 px-2.5 py-1 text-[#24242C] shadow-[0_1px_8px_rgba(150,159,180,0.16)]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              assists
            </span>{" "}
            you instantly
          </h3>
          <p className="mt-5 max-w-[520px] text-[17px] leading-7 text-[#777783] sm:text-lg">
            Hit Cmd/Ctrl + Enter and TeamSync helps you with AI in the moment.
          </p>
        </div>

        <div className="mt-auto pt-7">
          <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full bg-[#3A3A42] p-2 text-white shadow-[0_12px_28px_rgba(38,38,45,0.18)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#3A3A42]">
              <MousePointer2
                className="h-5 w-5 rotate-45"
                aria-hidden="true"
              />
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[#2C2C34] px-3 py-2 text-[12px]">
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              Hide
            </span>
            <span className="h-7 w-7 rounded-full border-[6px] border-white bg-white/20" />
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
      className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 sm:px-8 md:gap-11"
    >
      <ScrollReveal>
        <h2
          id="meeting-help-title"
          className="max-w-[980px] bg-[linear-gradient(90deg,#19191D_0%,#626275_100%)] bg-clip-text text-[40px] font-medium leading-[48px] text-transparent md:text-[56px] md:leading-[70px]"
        >
          How TeamSync helps during a meeting
        </h2>
      </ScrollReveal>
      <div className="grid gap-7 lg:grid-cols-2">
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
