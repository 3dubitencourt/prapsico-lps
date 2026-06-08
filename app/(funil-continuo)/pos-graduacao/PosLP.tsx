"use client";

import { useEffect } from "react";
import { trackViewPos } from "@/lib/tracking";

import { PosHero } from "@/components/sections/pos/PosHero";
import { InstitutionalBarPos } from "@/components/sections/pos/InstitutionalBarPos";
import { PainValidationPos } from "@/components/sections/pos/PainValidationPos";
import { ComparisonTable } from "@/components/sections/pos/ComparisonTable";
import { CurriculumPos } from "@/components/sections/pos/CurriculumPos";
import { JourneyTimelinePos } from "@/components/sections/pos/JourneyTimelinePos";
import { FacultyPos } from "@/components/sections/pos/FacultyPos";
import { TestimonialsPos } from "@/components/sections/pos/TestimonialsPos";
import { BonusesPos } from "@/components/sections/pos/BonusesPos";
import { OfferCardPos } from "@/components/sections/pos/OfferCardPos";
import { GuaranteePos } from "@/components/sections/pos/GuaranteePos";
import { PosFaq } from "@/components/sections/pos/PosFaq";
import { FinalClosingPos } from "@/components/sections/pos/FinalClosingPos";
import { PosStickyBar } from "@/components/sections/pos/PosStickyBar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import {
  PosContentProvider,
  type FaqItem,
} from "@/components/sections/pos/pos-content";

export function PosLP({
  checkoutUrl,
  faqs,
}: {
  checkoutUrl?: string;
  faqs?: FaqItem[];
}) {
  useEffect(() => {
    trackViewPos();
  }, []);

  return (
    <PosContentProvider value={{ checkoutUrl, faqs }}>
      <main className="bg-navy-950 pb-24 md:pb-0">
        <PosHero />
        <InstitutionalBarPos />
        <PainValidationPos />
        <ComparisonTable />
        <CurriculumPos />
        <JourneyTimelinePos />
        <FacultyPos />
        <TestimonialsPos />
        <BonusesPos />
        <OfferCardPos />
        <GuaranteePos />
        <PosFaq />
        <FinalClosingPos />
      </main>

      <PosStickyBar />
      <WhatsAppFloat />
    </PosContentProvider>
  );
}
