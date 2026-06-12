import Image from "next/image";

import { ScrollReveal } from "@/components/ScrollReveal";

function DesktopNotesBrandOverlays() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      viewBox="0 0 3966 2536"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3456"
        y="64"
        width="350"
        height="90"
        rx="38"
        fill="#D7ECFF"
        stroke="#BFE2FF"
        strokeWidth="3"
      />
      <text
        x="3631"
        y="122"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="44"
        fontWeight="650"
        fill="#58AEFF"
      >
        Start Quietly AI
      </text>
      <rect
        x="1696"
        y="2304"
        width="1320"
        height="150"
        rx="36"
        fill="#F7F7F8"
      />
      <text
        x="1738"
        y="2403"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="58"
        fontWeight="600"
        fill="#8E8D98"
      >
        Ask Quietly AI about this meeting...
      </text>
    </svg>
  );
}

export function NotesSection() {
  return (
    <section
      aria-labelledby="notes-title"
      className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 px-6 sm:px-8 md:gap-14"
    >
      <ScrollReveal className="flex flex-col items-center gap-4 text-center">
        <h2
          id="notes-title"
          className="bg-[linear-gradient(90deg,#19191D_0%,#626275_100%)] bg-clip-text text-[40px] font-medium leading-[48px] text-transparent md:text-[56px] md:leading-[70px]"
        >
          Instant meeting notes
        </h2>
        <p className="max-w-2xl text-base leading-7 text-[#81818E] md:text-lg">
          The easiest way to get beautiful, shareable meeting notes.
        </p>
      </ScrollReveal>

      <ScrollReveal
        className="w-full max-w-4xl overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_50%_12%,#DDE2EE_0%,#BBC5DD_100%)] px-6 pt-8 pb-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] md:px-12 md:pt-16 lg:px-28 lg:pt-28"
        delayClassName="delay-150"
      >
        <div className="relative mx-auto block h-auto w-full sm:hidden">
          <Image
            src="/images/cluely/mobile-notes.5dc13f8d.png"
            alt="Quietly AI meeting notes interface"
            width={1962}
            height={2529}
            sizes="(max-width: 639px) calc(100vw - 96px), 1px"
            className="block h-auto w-full"
          />
        </div>
        <div className="relative mx-auto hidden h-auto w-full sm:block lg:hidden">
          <Image
            src="/images/cluely/tablet-notes.5560bad7.png"
            alt="Quietly AI meeting notes interface"
            width={3102}
            height={2508}
            sizes="(max-width: 1023px) calc(100vw - 160px), 1px"
            className="block h-auto w-full"
          />
        </div>
        <div className="relative mx-auto hidden h-auto w-full lg:block">
          <Image
            src="/images/cluely/desktop-notes-2.8614c68b.png"
            alt="Quietly AI meeting notes interface"
            width={3966}
            height={2536}
            sizes="(min-width: 1024px) 672px, 1px"
            className="block h-auto w-full"
          />
          <DesktopNotesBrandOverlays />
        </div>
      </ScrollReveal>
    </section>
  );
}
