import { CompatibilityStatsSection } from "@/components/CompatibilityStatsSection";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection";
import { MeetingHelpSection } from "@/components/MeetingHelpSection";
import { NativelyModesSection } from "@/components/NativelyModesSection";
import { NotesSection } from "@/components/NotesSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { UndetectabilitySection } from "@/components/UndetectabilitySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <SiteHeader />
      <main className="relative flex flex-col gap-12 overflow-hidden md:gap-24 lg:gap-32">
        <HeroSection />
        <MeetingHelpSection />
        <NativelyModesSection />
        <NotesSection />
        <UndetectabilitySection />
        <CompatibilityStatsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
