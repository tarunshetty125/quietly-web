import { CompatibilityStatsSection } from "@/components/CompatibilityStatsSection";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection";
import { MeetingHelpSection } from "@/components/MeetingHelpSection";
import { NativelyAssistantSection } from "@/components/NativelyAssistantSection";
import { NativelyModesSection } from "@/components/NativelyModesSection";
import { NotesSection } from "@/components/NotesSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { QuietlyAIProSection } from "@/components/QuietlyAIProSection";
import { UndetectabilitySection } from "@/components/UndetectabilitySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <SiteHeader />
      <main className="relative flex flex-col gap-12 overflow-hidden md:gap-24 lg:gap-32">
        <HeroSection />
        <MeetingHelpSection />
        <div className="flex flex-col">
          <NativelyAssistantSection />
          <NativelyModesSection />
        </div>
        <NotesSection />
        <UndetectabilitySection />
        <div className="flex flex-col">
          <CompatibilityStatsSection />
          <QuietlyAIProSection />
        </div>
        <div className="flex flex-col">
          <FaqSection />
          <CtaSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
