import type { Metadata } from "next";
import { EB_Garamond, Geist, Geist_Mono } from "next/font/google";

import { QUIETLY_ICON_SRC } from "@/lib/brand";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quietly.ai"),
  title: "Quietly AI - Live AI Meeting Assistant | Real-Time Meeting Notes and AI Insights",
  description:
    "AI meeting assistant that provides live meeting notes, instant answers, and real-time insights during calls.",
  icons: {
    icon: QUIETLY_ICON_SRC,
    apple: QUIETLY_ICON_SRC,
  },
  openGraph: {
    title:
      "Quietly AI - Live AI Meeting Assistant | Real-Time Meeting Notes and AI Insights",
    description:
      "AI meeting assistant that provides live meeting notes, instant answers, and real-time insights during calls.",
    images: ["/seo/cluely/social-previews-index.jpg"],
    siteName: "Quietly AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
