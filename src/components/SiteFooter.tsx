import type { SVGProps } from "react";
import Image from "next/image";

type FooterLink = {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: readonly FooterLink[];
};

type SocialLink = {
  label: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactNode;
};

const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Resources",
    links: [
      { label: "Mobile", href: "https://cluely.com/mobile", badge: "New" },
      { label: "Manifesto", href: "https://cluely.com/manifesto" },
      { label: "Press", href: "https://cluely.com/press" },
      {
        label: "Bug Bounty",
        href: "https://cluelyhq.notion.site/bugbounty",
        external: true,
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        label: "Help Center",
        href: "https://support.cluely.com/en/",
        external: true,
      },
      { label: "Contact Us", href: "mailto:help@cluely.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "https://cluely.com/privacy-policy" },
      { label: "Terms of Service", href: "https://cluely.com/terms" },
      { label: "Subprocessors", href: "https://cluely.com/subprocessors" },
    ],
  },
];

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: "Twitter",
    href: "https://x.com/cluely",
    icon: XIcon,
  },
  {
    label: "Discord",
    href: "https://discord.gg/cluely",
    icon: DiscordIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cluely/",
    icon: InstagramIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/cluely",
    icon: GithubIcon,
  },
];

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.87 10.16 21.18 1.5h-1.73l-6.35 7.51L8.04 1.5H2.2l7.67 11.36-7.67 9.08h1.73l6.7-7.93 5.35 7.93h5.84l-7.95-11.78Zm-2.37 2.81-.78-1.13L4.54 2.83h2.91l4.99 7.27.78 1.13 6.48 9.45h-2.91l-5.29-7.71Z" />
    </svg>
  );
}

function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.55 5.02A16.2 16.2 0 0 0 15.56 3c-.17.31-.37.73-.51 1.05a15.1 15.1 0 0 0-4.5 0c-.15-.32-.34-.74-.52-1.05a16.13 16.13 0 0 0-4 2.03C3.5 8.09 2.97 11.03 3.24 13.9a16.28 16.28 0 0 0 4.9 2.52c.4-.55.75-1.13 1.04-1.74-.57-.22-1.11-.49-1.62-.79.14-.1.27-.21.4-.32a11.6 11.6 0 0 0 10.07 0l.4.32c-.52.31-1.06.57-1.63.79.3.61.65 1.19 1.04 1.74a16.24 16.24 0 0 0 4.91-2.52c.32-3.33-.55-6-3.2-8.88ZM9.71 12.11c-.95 0-1.73-.89-1.73-1.98s.76-1.98 1.73-1.98 1.74.89 1.73 1.98c0 1.09-.76 1.98-1.73 1.98Zm6.58 0c-.95 0-1.73-.89-1.73-1.98s.76-1.98 1.73-1.98 1.74.89 1.73 1.98c0 1.09-.76 1.98-1.73 1.98Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.19-3.37-1.19-.45-1.17-1.11-1.48-1.11-1.48-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.36 1.11 2.93.85.09-.66.35-1.11.64-1.36-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .85-.28 2.75 1.05a9.28 9.28 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9v2.81c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative bg-[#DDE2EE] pt-10 pb-5 text-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 -translate-y-full bg-[linear-gradient(180deg,rgba(221,226,238,0)_0%,#DDE2EE_100%)] xl:h-[140px]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <a
            href="https://cluely.com/"
            className="inline-flex w-fit rounded-md focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none"
          >
            <span className="sr-only">Cluely</span>
            <Image
              src="/images/cluely/wordmark.svg"
              alt=""
              width={85}
              height={30}
              className="h-[30px] w-[85px]"
            />
          </a>

          <div className="grid gap-8 sm:grid-cols-3 lg:min-w-[488px] lg:gap-x-[44px]">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.title} aria-labelledby={`footer-${column.title}`}>
                <h3
                  id={`footer-${column.title}`}
                  className="font-medium text-black"
                >
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-x-1.5 rounded text-base leading-snug font-normal text-[#242833] transition-colors duration-200 hover:text-[#2F6DE8] focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none"
                      >
                        <span>{link.label}</span>
                        {link.badge ? (
                          <span className="inline-flex items-center rounded-full bg-blue-500 px-1.5 py-0.5 text-[11px] leading-none font-semibold text-white">
                            {link.badge}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-11 md:mt-[30px]">
          <a
            href="https://cluely.trust.pagerduty.com/posts/dashboard/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[34px] items-center justify-center gap-x-1.5 rounded-[6px] border border-[rgba(201,208,228,0.50)] bg-[rgba(211,217,233,0.50)] px-3 text-sm leading-none font-medium text-[#343B4B] transition-colors duration-300 hover:bg-[rgba(211,217,233,0.90)] focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none"
          >
            <span className="size-1.5 rounded-full bg-[#51D36C]" />
            All systems operational
          </a>
          <p className="mt-8 text-xs leading-4 font-medium text-[#687286]">
            List of{" "}
            <a
              href="https://cluely.com/subprocessors"
              className="inline-flex items-center rounded font-medium text-[#2F6DE8] transition-colors duration-300 hover:text-[#2457BC] focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none"
            >
              subprocessors
            </a>
            .
          </p>
        </div>

        <div className="relative mt-[30px] flex flex-col pt-[30px] md:mt-5 md:flex-row md:items-center md:justify-between md:pt-5">
          <div className="absolute top-0 left-0 h-px w-full bg-[#C9D0E4]" />
          <p className="order-2 mt-7 text-sm leading-5 text-[#687286] md:order-1 md:mt-0">
            &copy; 2026 Cluely. All rights reserved.
          </p>
          <div className="order-1 flex items-center gap-5 md:order-2">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg text-black transition-colors duration-300 hover:text-[#687286] focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none"
                >
                  <span className="sr-only">
                    {social.label === "Discord"
                      ? "Join us on Discord"
                      : `Follow us on ${social.label}`}
                  </span>
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
