import Image from "next/image";
import { Apple } from "lucide-react";

import { ScrollReveal } from "@/components/ScrollReveal";

export function CtaSection() {
  return (
    <section id="download" className="relative z-20 overflow-x-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#DDE2EE_37.04%)] pt-32 pb-16 text-black md:pt-[174px] md:pb-[160px] lg:pb-[210px] xl:pt-[220px]">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <ScrollReveal className="max-w-[680px]">
          <h3 className="text-[20px] leading-tight font-medium text-black sm:text-[28px] md:text-[24px] lg:text-[28px]">
            Meeting AI that helps during the call, not after.
          </h3>
          <p className="mt-1 bg-[linear-gradient(96.56deg,#667799_21.01%,#94A0B8_34.62%,#667799_47.64%,#667799_76.57%)] bg-clip-text text-[20px] leading-tight font-medium text-transparent sm:text-[28px] md:text-[24px] lg:text-[28px]">
            Try TeamSync on your next meeting today.
          </p>
          <a
            href="https://teamsync.com/download"
            className="cluely-gradient-button cluely-magnetic-button mt-8 w-auto min-w-[156px]"
          >
            <span className="absolute top-0 left-0 z-20 h-full w-full blur-[1px]" aria-hidden="true">
              <span className="blurred-border absolute -top-px -left-px z-20 h-full w-full" />
            </span>
            <Apple className="relative z-10 mb-0.5 size-4 fill-current" aria-hidden="true" />
            <span className="relative z-10">Get for Mac</span>
          </a>
        </ScrollReveal>
      </div>

      <ScrollReveal
        className="pointer-events-none absolute top-[156px] left-[calc(50%+348px)] z-0 hidden w-[238px] md:block"
        delayClassName="delay-150"
      >
        <Image
          src="/images/cluely/return-active.30ff0cd8.png"
          alt=""
          width={476}
          height={476}
          className="absolute top-0 left-0 h-auto w-full"
          sizes="238px"
          quality={100}
        />
        <Image
          src="/images/cluely/return-btn.f7f71a9d.png"
          alt=""
          width={476}
          height={476}
          className="absolute top-0 left-0 h-auto w-full"
          sizes="238px"
          quality={100}
        />
      </ScrollReveal>
      <ScrollReveal
        className="pointer-events-none absolute top-[300px] left-[calc(50%+124px)] z-0 hidden w-[264px] md:block"
        delayClassName="delay-300"
      >
        <Image
          src="/images/cluely/command-btn.05a11379.png"
          alt=""
          width={560}
          height={476}
          className="absolute top-0 left-0 h-auto w-full"
          sizes="264px"
          quality={100}
        />
        <Image
          src="/images/cluely/command-active.83241958.png"
          alt=""
          width={560}
          height={476}
          className="absolute top-0 left-0 h-auto w-full"
          sizes="264px"
          quality={100}
        />
      </ScrollReveal>
    </section>
  );
}
