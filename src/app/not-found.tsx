"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{ background: "#000" }}
    >
      {/* Glowing 404 */}
      <div className="relative mb-8">
        <h1
          className="text-[120px] md:text-[180px] font-bold tracking-tighter leading-none"
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>
        {/* Glow behind */}
        <div
          className="absolute inset-0 -z-10 blur-[80px] opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 70%)",
          }}
        />
      </div>

      <p
        className="text-xl md:text-2xl font-medium text-white/60 mb-3 text-center"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        Page not found
      </p>
      <p className="text-sm text-white/30 mb-10 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/v2"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.8)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>
    </div>
  );
}
