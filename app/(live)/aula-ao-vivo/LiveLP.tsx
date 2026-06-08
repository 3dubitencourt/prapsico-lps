"use client";

import { useEffect } from "react";
import { trackView } from "@/lib/tracking";
import { Hero } from "@/components/sections/Hero";
import { InstitutionalBar } from "@/components/sections/InstitutionalBar";
import { Curriculum } from "@/components/sections/Curriculum";
import { TwoPaths } from "@/components/sections/TwoPaths";
import { PauloBioSection } from "@/components/sections/PauloBioSection";
import { Deliverables } from "@/components/sections/Deliverables";
import { PhilosophyCallout } from "@/components/sections/PhilosophyCallout";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { StickyFooterBar } from "@/components/StickyFooterBar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LiveCheckoutProvider } from "@/components/live/LiveCheckout";

const DEFAULT_CHECKOUT_URL = "https://pay.hotmart.com/Q105795816Y";

export function LiveLP({
  checkoutUrl = DEFAULT_CHECKOUT_URL,
}: {
  checkoutUrl?: string;
}) {
  useEffect(() => {
    trackView();
  }, []);

  return (
    <LiveCheckoutProvider checkoutUrl={checkoutUrl}>
      <main className="pb-32 md:pb-24">
        <Hero checkoutUrl={checkoutUrl} />
        <InstitutionalBar />
        <Curriculum />
        <TwoPaths />
        <PauloBioSection />
        <Deliverables />
        <PhilosophyCallout />
        <FaqAccordion />
        <FinalCTA checkoutUrl={checkoutUrl} />
      </main>
      <StickyFooterBar href={checkoutUrl} />
      <WhatsAppFloat />
    </LiveCheckoutProvider>
  );
}
