"use client";

import { useEffect } from "react";
import { trackViewCert } from "@/lib/tracking";

import { CertHero } from "@/components/sections/cert/CertHero";
import { InstitutionalBar } from "@/components/sections/InstitutionalBar";
import { PainValidation } from "@/components/sections/cert/PainValidation";
import { FourPillars } from "@/components/sections/cert/FourPillars";
import { CurriculumCert } from "@/components/sections/cert/CurriculumCert";
import { JourneyTimeline } from "@/components/sections/cert/JourneyTimeline";
import { Faculty } from "@/components/sections/cert/Faculty";
import { Testimonials } from "@/components/sections/cert/Testimonials";
import { Bonuses } from "@/components/sections/cert/Bonuses";
import { OfferCard } from "@/components/sections/cert/OfferCard";
import { GuaranteeCert } from "@/components/sections/cert/GuaranteeCert";
import { CertFaq } from "@/components/sections/cert/CertFaq";
import { FinalClosing } from "@/components/sections/cert/FinalClosing";
import { CertStickyBar } from "@/components/sections/cert/CertStickyBar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import {
  CertContentProvider,
  type FaqItem,
} from "@/components/sections/cert/cert-content";

export function CertLP({
  checkoutUrl,
  faqs,
}: {
  checkoutUrl?: string;
  faqs?: FaqItem[];
}) {
  useEffect(() => {
    trackViewCert();
  }, []);

  return (
    <CertContentProvider value={{ checkoutUrl, faqs }}>
      <main className="pb-32 md:pb-24">
        <CertHero />
        <InstitutionalBar />
        <PainValidation />
        <FourPillars />
        <CurriculumCert />
        <JourneyTimeline />
        <Faculty />
        <Testimonials />
        <Bonuses />
        <OfferCard />
        <GuaranteeCert />
        <CertFaq />
        <FinalClosing />
      </main>

      <CertStickyBar />
      <WhatsAppFloat />
    </CertContentProvider>
  );
}
