import type { SVGProps } from "react";
import Image from "next/image";

import { ScrollReveal } from "@/components/ScrollReveal";

const DOWNLOAD_URL =
  "https://apps.apple.com/app/apple-store/id6755442775?pt=127480373&ct=Landing%20Page&mt=8";

function AppleLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 18 22"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M14.74 11.7c-.02-2.08 1.71-3.08 1.79-3.13-1.01-1.44-2.56-1.64-3.09-1.66-1.3-.13-2.56.76-3.22.76-.68 0-1.7-.74-2.8-.72-1.42.02-2.74.81-3.47 2.06-1.49 2.5-.38 6.18 1.05 8.2.72 1 1.56 2.12 2.66 2.08 1.08-.04 1.48-.67 2.78-.67 1.29 0 1.67.67 2.8.65 1.16-.02 1.89-1 2.58-2.01.83-1.15 1.16-2.29 1.17-2.35-.03-.01-2.25-.83-2.27-3.21h.02ZM12.6 5.56c.58-.7.98-1.66.87-2.64-.84.04-1.9.57-2.51 1.26-.54.61-1.03 1.59-.9 2.54.95.07 1.93-.46 2.54-1.16Z" />
    </svg>
  );
}

export function CtaSection() {
  return (
    <section className="relative z-20 overflow-x-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#DDE2EE_37.04%)] pt-32 pb-16 text-black md:pt-[174px] md:pb-[160px] lg:pb-[210px] xl:pt-[220px]">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <ScrollReveal className="max-w-[680px]">
          <h3 className="text-[20px] leading-tight font-medium text-black sm:text-[28px] md:text-[24px] lg:text-[28px]">
            Meeting AI that helps during the call, not after.
          </h3>
          <p className="mt-1 bg-[linear-gradient(96.56deg,#667799_21.01%,#94A0B8_34.62%,#667799_47.64%,#667799_76.57%)] bg-clip-text text-[20px] leading-tight font-medium text-transparent sm:text-[28px] md:text-[24px] lg:text-[28px]">
            Try Cluely on your next meeting today.
          </p>
          <a
            href={DOWNLOAD_URL}
            className="relative mt-8 inline-flex h-[45px] items-center justify-center gap-2 overflow-hidden rounded-[10px] bg-[linear-gradient(180deg,#6DA3FF_0%,#2F6DE8_100%)] px-8 text-base leading-none font-medium text-white shadow-[0_16px_32px_rgba(47,109,232,0.34)] ring-1 ring-white/40 transition-transform duration-300 before:absolute before:inset-x-1 before:top-1 before:h-px before:bg-white/60 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#2F6DE8]/40 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <AppleLogo className="relative z-10 size-[18px]" />
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
