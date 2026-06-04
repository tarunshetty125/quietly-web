import Image from "next/image";

import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const compatibleTools = [
  {
    name: "Zoom",
    icon: "/images/cluely/zoom.398e9568.png",
    width: 453,
    height: 453,
  },
  {
    name: "Slack",
    icon: "/images/cluely/slack.0e754017.png",
    width: 422,
    height: 453,
  },
  {
    name: "Webex",
    icon: "/images/cluely/webex.6e65e4a4.png",
    width: 465,
    height: 435,
  },
  {
    name: "Microsoft Teams",
    icon: "/images/cluely/teams.845b90a5.png",
    width: 465,
    height: 435,
  },
  {
    name: "Google Meet",
    icon: "/images/cluely/meet.7640c976.png",
    width: 453,
    height: 453,
  },
] as const;

const stats = [
  {
    value: "12+",
    label: "Languages",
    copy: "We support over 12 different languages, including English, Chinese, Spanish, and more.",
  },
  {
    value: "300",
    unit: "ms",
    label: "Response time",
    copy: "We have the fastest live transcription available. Test us against any other competitor.",
  },
  {
    value: "95%",
    label: "Transcription accuracy",
    copy: "Trusted by many teams for reliable transcription. All processed with industry-leading accuracy.",
  },
] as const;

const statDelayClasses = ["delay-100", "delay-150", "delay-200"] as const;

function CompatibilityRow() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-5 text-center md:px-8">
      <span className="text-xs font-semibold text-[#8C929D] uppercase">
        Compatible with every tool
      </span>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-9 gap-y-5 md:gap-x-14 lg:gap-x-[54px]">
        {compatibleTools.map((tool) => (
          <div key={tool.name} className="flex items-center gap-2.5">
            <Image
              src={tool.icon}
              alt={tool.name}
              width={tool.width}
              height={tool.height}
              className="size-6 md:size-7"
            />
            <span className="text-sm font-medium text-[#3D4150] md:text-base">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TranscriptImage({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-[radial-gradient(92.09%_126.39%_at_50%_100%,#DDE2EE_58.91%,#BBC5DD_100%)] pt-8 pr-3 pb-4 pl-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_28px_60px_rgba(74,84,109,0.12)] ring-1 ring-white/50 backdrop-blur",
        className,
      )}
    >
      <Image
        src="/images/cluely/transcript-tab.1c48d5b2.png"
        alt="Real-time transcript"
        width={2010}
        height={2541}
        className="pointer-events-none select-none"
        sizes="(max-width: 1024px) calc(100vw - 80px), 432px"
      />
    </div>
  );
}

function StatRow({
  stat,
  isFirst,
}: Readonly<{
  stat: (typeof stats)[number];
  isFirst: boolean;
}>) {
  return (
    <div
      className={cn(
        "border-t border-[#ECEEF3] py-9 lg:flex lg:gap-0 lg:py-12",
        isFirst ? "mt-10 lg:mt-16" : "",
      )}
    >
      <div className="text-5xl leading-none text-black lg:w-48 lg:shrink-0">
        {stat.value}
        {"unit" in stat ? (
          <span className="align-baseline text-3xl">{stat.unit}</span>
        ) : null}
      </div>
      <div className="mt-5 lg:mt-0 lg:flex-1">
        <span className="block text-[28px] leading-tight font-light text-black md:text-4xl">
          {stat.label}
        </span>
        <span className="mt-3 block text-base leading-7 text-zinc-500/70 md:text-lg lg:max-w-[450px]">
          {stat.copy}
        </span>
      </div>
    </div>
  );
}

export function CompatibilityStatsSection() {
  return (
    <section className="relative z-10 overflow-hidden pb-20 md:pb-24">
      <ScrollReveal>
        <CompatibilityRow />
      </ScrollReveal>

      <div className="w-full pt-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-y-12 px-5 md:px-8 lg:flex-row lg:items-start lg:gap-x-[72px] lg:px-0">
          <ScrollReveal
            className="hidden w-[464px] shrink-0 lg:block"
            delayClassName="delay-100"
          >
            <TranscriptImage />
          </ScrollReveal>

          <div className="w-full max-w-[616px]">
            <ScrollReveal>
              <h2 className="bg-gradient-to-r from-[#19191D] to-[#31343E] bg-clip-text text-3xl leading-[1.25] font-medium text-transparent lg:text-5xl">
                Real-time transcription
              </h2>
            </ScrollReveal>

            <ScrollReveal
              className="mt-8 max-w-[464px] lg:hidden"
              delayClassName="delay-100"
            >
              <TranscriptImage />
            </ScrollReveal>

            <div>
              {stats.map((stat, index) => (
                <ScrollReveal
                  key={stat.label}
                  delayClassName={statDelayClasses[index]}
                >
                  <StatRow stat={stat} isFirst={index === 0} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
