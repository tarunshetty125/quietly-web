"use client"

import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Undetectability", href: "#undetectability" },
  { label: "Mobile", href: "#mobile" },
  { label: "Blog", href: "#blog" },
] as const

function MacCta({
  className,
  tabIndex,
}: {
  className?: string
  tabIndex?: number
}) {
  return (
    <a
      href="#download"
      tabIndex={tabIndex}
      className={cn(
        "relative inline-flex h-11 w-[149px] items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(180deg,#70a8ff_0%,#2f6fff_51%,#1450d8_100%)] text-[15px] leading-5 font-semibold text-white shadow-[0_0_28px_rgba(67,131,255,0.72),inset_0_1px_0_rgba(255,255,255,0.45)] transition-[opacity,transform,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(67,131,255,0.86),inset_0_1px_0_rgba(255,255,255,0.52)] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none",
        className
      )}
    >
      <span className="relative z-10">Get for Mac</span>
      <span className="absolute inset-x-4 top-0 h-px bg-white/70" />
    </a>
  )
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false)

  useEffect(() => {
    const updateScrollState = () => {
      setHasScrolledPastHero(window.scrollY > 480)
    }

    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateScrollState)
    }
  }, [])

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
    <header className="absolute z-9999 z-[9999] flex w-full pt-2.5">
      <div className="mx-auto flex h-[34px] w-full items-center justify-between px-3 md:h-12 md:max-w-[1142px] md:justify-start md:px-0">
        <a
          href="#top"
          aria-label="Cluely home"
          className="flex h-[22px] w-[84px] shrink-0 items-center"
        >
          <Image
            src="/images/cluely/wordmark-light.svg"
            alt="Cluely"
            width={84}
            height={22}
            priority
            className="h-[22px] w-[84px]"
          />
        </a>

        <nav aria-label="Primary" className="ml-12 hidden items-center md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 text-sm leading-5 font-medium text-white transition-colors duration-200 hover:text-white/75 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
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

      <MacCta
        tabIndex={hasScrolledPastHero ? undefined : -1}
        className={cn(
          "fixed top-2.5 right-2.5 z-50 hidden md:inline-flex",
          hasScrolledPastHero
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

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
                  className="flex h-9 items-center justify-between border-b border-black/10 text-base leading-5 font-medium text-black transition-colors duration-200 hover:text-black/60 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <MacCta
              className="absolute right-4 bottom-6 left-4 w-auto rounded-[14px]"
              tabIndex={undefined}
            />
          </div>
        </>
      ) : null}
    </header>
  )
}
