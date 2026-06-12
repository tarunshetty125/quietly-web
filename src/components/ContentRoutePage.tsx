import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { allContentPagesByHref, type ContentPage } from "@/lib/teamsync-content";
import { TEAMSYNC_ICON_SRC } from "@/lib/brand";

export function ContentRoutePage({ page }: Readonly<{ page: ContentPage }>) {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full text-sm font-semibold text-slate-900 transition-colors hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:outline-none"
        >
          <Image
            src={TEAMSYNC_ICON_SRC}
            alt=""
            width={24}
            height={24}
            className="size-6 rounded-md"
          />
          TeamSync
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm transition-colors hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:outline-none"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Home
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <section className="grid gap-8 pt-10 md:grid-cols-[1fr_340px] md:items-end md:pt-16">
          <div>
            <span className="inline-flex rounded-full bg-indigo-600 px-3 py-1.5 text-[10px] font-bold text-white uppercase shadow-[0_8px_24px_rgba(79,70,229,0.18)]">
              {page.eyebrow}
            </span>
            <h1 className="mt-5 max-w-4xl text-[42px] leading-[0.98] font-bold text-slate-950 md:text-[72px]">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              {page.summary}
            </p>
          </div>

          <div className="rounded-[28px] border border-indigo-100 bg-white/80 p-5 shadow-[0_22px_70px_rgba(79,70,229,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold text-indigo-500 uppercase">
              TeamSync route
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {page.category}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              This page is generated from the same TeamSync route map used by
              the footer and homepage cards.
            </p>
            <Link
              href="/pro"
              className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 text-xs font-bold text-white shadow-[0_14px_32px_rgba(79,70,229,0.22)] transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:outline-none"
            >
              {page.primaryCta}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_300px]">
          <article className="space-y-4">
            {page.sections.map((section) => (
              <div
                className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.04)] md:p-8"
                key={section.heading}
              >
                <h2 className="text-2xl font-bold text-slate-950">
                  {section.heading}
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  {section.body}
                </p>
                {section.bullets ? (
                  <ul className="mt-5 grid gap-2">
                    {section.bullets.map((bullet) => (
                      <li
                        className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                        key={bullet}
                      >
                        <CheckCircle2
                          className="size-4 text-indigo-500"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </article>

          <aside className="h-fit rounded-[28px] border border-slate-200/70 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.04)]">
            <h2 className="text-sm font-bold text-slate-950 uppercase">
              Related
            </h2>
            <div className="mt-4 flex flex-col gap-2">
              {page.related.map((href) => {
                const related = allContentPagesByHref[href];

                return (
                  <Link
                    href={href}
                    className="group rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition-colors hover:border-indigo-100 hover:bg-indigo-50/60 focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:outline-none"
                    key={href}
                  >
                    <span className="block text-xs font-bold text-indigo-500 uppercase">
                      {related?.category ?? "TeamSync"}
                    </span>
                    <span className="mt-1 flex items-center justify-between gap-3 text-sm font-semibold text-slate-800">
                      {related?.eyebrow ?? "TeamSync Pro"}
                      <ArrowRight
                        className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
