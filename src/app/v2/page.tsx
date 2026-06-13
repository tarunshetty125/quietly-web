import type { Metadata } from "next";

import { CtaSection } from "@/components/CtaSection";
import { ProOverlayV2Page } from "@/components/pro-overlay-v2/ProOverlayV2Page";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Quietly Pro Overlay V2 - Realtime Interview Intelligence",
  description:
    "An interactive Quietly Pro Overlay V2 product showcase for realtime interview intelligence.",
};

export default function V2Page() {
  return (
    <>
      <ProOverlayV2Page />
      <CtaSection />
      <SiteFooter />
    </>
  );
}
