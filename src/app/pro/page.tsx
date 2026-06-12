import type { Metadata } from "next";

import { ProSimulationPage } from "@/components/ProSimulationPage";

export const metadata: Metadata = {
  title: "Quietly AI Pro - Built to get the offer.",
  description:
    "Watch how Quietly AI Pro uses resume context, company intelligence, and negotiation coaching in real time.",
};

export default function ProPage() {
  return <ProSimulationPage />;
}
