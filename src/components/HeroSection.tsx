import Image from "next/image";
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
    alt: "Cluely",
    src: "/images/cluely/cluely-icon.png",
  },
  {
    alt: "Trash",
    src: "/images/cluely/trash-icon.png",
  },
] as const;

function MacCta() {
  return (
    <a
      href="https://cluely.com/download"
      className="inline-flex h-[44px] items-center justify-center gap-2 rounded-xl bg-[radial-gradient(101.79%_101.79%_at_65.61%_81.79%,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_100%),radial-gradient(114.65%_114.65%_at_9.73%_17.27%,#1E82E0_0%,#1C38EA_100%)] px-5 text-[16px] font-medium text-white shadow-[0_18px_42px_rgba(28,56,234,0.36),inset_0_1px_0_rgba(255,255,255,0.38)] transition-transform hover:scale-[1.02]"
    >
      <Apple className="size-4 fill-current" aria-hidden="true" />
      Get for Mac
    </a>
  );
}

function WindowChrome() {
  return (
    <div className="absolute top-0 right-0 left-0 hidden h-fit w-full items-center justify-between bg-black/10 px-3 pt-2 pb-1 text-white lg:flex">
      <Image
        src="/images/cluely/cluely.7e226633.svg"
        alt=""
        width={16}
        height={16}
        unoptimized
        className="size-4 brightness-0 invert"
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
    <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full bg-[#3A3A42]/95 p-2 text-white shadow-[0_12px_28px_rgba(25,25,30,0.28)]">
      <span className="grid size-8 place-items-center rounded-full bg-white text-[#3A3A42]">
        <Image
          src="/images/cluely/cluely.7e226633.svg"
          alt=""
          width={22}
          height={22}
          unoptimized
          className="size-[22px]"
        />
      </span>
      <span className="flex h-8 items-center gap-1 rounded-full bg-[#2C2C34] px-3 text-[12px]">
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
        <div className="rounded-2xl border border-white/25 bg-[linear-gradient(180deg,rgba(24,23,28,0.75)_0%,rgba(24,23,28,0.86)_100%)] p-3 text-white shadow-[0_24px_54px_rgba(24,23,28,0.34)] backdrop-blur-md sm:p-4">
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

          <div className="mt-3 flex items-center rounded-xl border border-white/12 bg-white/6 px-3 py-2 text-[13px] text-white/52">
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
            <span className="ml-auto grid size-7 shrink-0 place-items-center rounded-full bg-[#1550DA] text-white">
              <Send className="size-3.5 fill-current" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-2 flex items-center gap-3 text-[12px] text-white/54">
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/7 px-3 py-1">
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

function HeroDemo() {
  return (
    <div className="cluely-hero-stage relative flex h-fit w-full items-start justify-center px-3 pt-10 sm:px-12 sm:pt-12 lg:pt-16 xl:pt-[74px]">
      <div className="relative h-[400px] w-full max-w-6xl rounded-[13px] bg-[#F2B56A] sm:h-[512px] lg:aspect-[1.7] lg:h-auto">
        <Image
          src="/images/cluely/wallpaper-2x.b7df867c.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 1152px, 1px"
          className="absolute inset-0 hidden rounded-[13px] object-cover object-center blur-xl lg:block"
        />
        <Image
          src="/images/cluely/wallpaper-2x.b7df867c.png"
          alt="Demo"
          fill
          priority
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="rounded-[13px] object-cover object-center"
        />

        <div className="absolute inset-0 flex items-center justify-center rounded-[13px]">
          <WindowChrome />
          <div className="relative flex h-full w-full items-center justify-center">
            <video
              aria-label="Cluely meeting demo"
              autoPlay
              className="cluely-hero-video aspect-[1.6] h-[80%] max-w-[86%] object-contain"
              loop
              muted
              playsInline
            >
              <source
                src="/videos/cluely/videos-home-hero-v2-pro-res-hevc-safari.mp4"
                type='video/mp4; codecs="hvc1"'
              />
              <source
                src="/videos/cluely/videos-home-hero-v2-pro-res-vp9-chrome.webm"
                type="video/webm"
              />
            </video>
            <HeroAssistOverlay />
          </div>
          <HeroDock />
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[1200px] w-full justify-center overflow-hidden bg-[#5d93d8] text-white md:min-h-[1220px]"
    >
      <div
        aria-hidden="true"
        className="cluely-hero-bg pointer-events-none absolute inset-0 z-0 [background-image:radial-gradient(87.76%_87.72%_at_50%_9.2%,rgba(255,255,255,0)_41.36%,#fff_71.93%),image-set(url('/images/cluely/background.png')_1x,url('/images/cluely/background-2x.png')_2x,url('/images/cluely/background-4x.png')_4x)] [background-position:top_center] [background-repeat:no-repeat] [background-size:1600px_auto]"
      />
      <div className="relative z-10 w-full max-w-[1425px]">
        <div className="flex h-[452px] items-start justify-center px-3 pt-20 text-center lg:pt-32">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <h1
                className="cluely-fade-up cluely-hero-title font-serif max-w-[350px] text-[55px] leading-[0.96] font-normal text-white md:max-w-[548px] md:text-[78px] md:leading-[74.88px]"
                aria-label="#1 Undetectable AI for Meetings"
              >
                <span className="block">#1 Undetectable</span>
                <span className="block">AI for Meetings</span>
              </h1>
              <p className="cluely-fade-up cluely-hero-subtitle max-w-[600px] text-base leading-6 font-medium text-white/88 md:text-lg md:leading-7">
                Cluely takes perfect meeting notes and gives real-time answers,
                all while completely undetectable
              </p>
            </div>
            <div className="cluely-fade-up cluely-hero-cta">
              <MacCta />
            </div>
          </div>
        </div>

        <HeroDemo />
      </div>
    </section>
  );
}
