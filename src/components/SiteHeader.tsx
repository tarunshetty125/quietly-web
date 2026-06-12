"use client"

import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

const HEADER_ICON_SRC = "/images/teamsync/iconq-transparent.png"

const navLinks: readonly {
  label: string;
  href: string;
  variant?: "gold";
}[] = [
  { label: "Undetectability", href: "#undetectability" },
  { label: "Pro", href: "/pro", variant: "gold" },
]

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isMenuOpen])

  return (
    <header className="absolute z-9999 z-[9999] flex w-full pt-4 md:pt-6">
      <div className="relative flex h-8 w-full items-center justify-between px-5 md:px-12">
        <a
          href="#top"
          aria-label="TeamSync home"
          className="flex h-8 min-w-[132px] shrink-0 items-center gap-2.5 text-[20px] leading-tight font-semibold text-white md:text-[20px]"
        >
          <Image
            src={HEADER_ICON_SRC}
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-md object-contain"
            priority
          />
          TeamSync
        </a>

        <nav
          aria-label="Primary"
          className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.variant === "gold"
                  ? "flex items-center justify-center text-sm leading-5 font-semibold text-[#FFD36A] drop-shadow-[0_2px_10px_rgba(255,196,67,0.35)] transition-colors duration-200 hover:text-[#FFE7A3] focus-visible:ring-2 focus-visible:ring-[#FFD36A]/70 focus-visible:outline-none"
                  : "flex items-center justify-center text-sm leading-5 font-medium text-white transition-colors duration-200 hover:text-white/75 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex size-9 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none md:hidden"
        >
          {isMenuOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
        </button>
      </div>

      {isMenuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-50 bg-black/80 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 h-[75dvh] rounded-t-xl bg-white px-4 pt-5 pb-6 text-black shadow-[0_-24px_80px_rgba(0,0,0,0.28)] md:hidden">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-black/15" />
            <nav aria-label="Mobile primary" className="mt-7 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={
                    link.variant === "gold"
                      ? "flex h-9 items-center justify-between border-b border-black/10 text-base leading-5 font-semibold text-[#B77A00] transition-colors duration-200 hover:text-[#8A5A00] focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                      : "flex h-9 items-center justify-between border-b border-black/10 text-base leading-5 font-medium text-black transition-colors duration-200 hover:text-black/60 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      ) : null}
    </header>
  )
}
