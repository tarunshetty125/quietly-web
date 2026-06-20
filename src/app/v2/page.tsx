import type { Metadata } from "next";

import { HeroSection } from "@/components/v2/HeroSection";
import { SocialProofStrip } from "@/components/v2/SocialProofStrip";
import { WordRevealSection } from "@/components/v2/WordRevealSection";
import { ModesShowcase } from "@/components/v2/ModesShowcase";
import { SmartActionsDemo } from "@/components/v2/SmartActionsDemo";
import { PersonaSection } from "@/components/v2/PersonaSection";
import { SystemDesignSection } from "@/components/v2/SystemDesignSection";
import { PhoneMirrorSection } from "@/components/v2/PhoneMirrorSection";
import { StealthSection } from "@/components/v2/StealthSection";
import { PlatformFeatures } from "@/components/v2/PlatformFeatures";
import { ComparisonSection } from "@/components/v2/ComparisonSection";
import { CtaSection } from "@/components/v2/CtaSection";
import { V2Footer } from "@/components/v2/V2Footer";

export const metadata: Metadata = {
  title: "Quietly — Your Invisible AI Meeting Copilot",
  description:
    "Real-time AI answers, live transcription, stealth mode, and 11 specialized meeting modes. Pay once, own forever.",
};

export default function V2Page() {
  return (
    <main>
      <HeroSection />
      <SocialProofStrip />
      <WordRevealSection />
      <ModesShowcase />
      <SmartActionsDemo />
      <PersonaSection />
      <SystemDesignSection />
      <PhoneMirrorSection />
      <StealthSection />
      <PlatformFeatures />
      <ComparisonSection />
      <CtaSection />
    </main>
  );
}
