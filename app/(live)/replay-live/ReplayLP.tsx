"use client";

import { useEffect } from "react";
import { trackViewReplay } from "@/lib/tracking";
import { ReplayHero } from "@/components/sections/replay/ReplayHero";
import { MiniBio } from "@/components/sections/replay/MiniBio";
import { TwoPathsReplay } from "@/components/sections/replay/TwoPathsReplay";
import { InstitutionalBar } from "@/components/sections/InstitutionalBar";
import { ReplayChapters } from "@/components/sections/replay/ReplayChapters";
import { ConsultativeCTA } from "@/components/sections/replay/ConsultativeCTA";
import { ReplayFaq } from "@/components/sections/replay/ReplayFaq";
import { ReplayClosing } from "@/components/sections/replay/ReplayClosing";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export function ReplayLP({
  vimeoId,
  deadlineMs,
}: {
  vimeoId?: string;
  deadlineMs?: number;
}) {
  useEffect(() => {
    trackViewReplay();
  }, []);

  return (
    <>
      <main>
        <ReplayHero vimeoId={vimeoId} deadlineMs={deadlineMs} />
        <MiniBio />
        <TwoPathsReplay />
        <InstitutionalBar />
        <ReplayChapters />
        <ConsultativeCTA />
        <ReplayFaq />
        <ReplayClosing />
      </main>
      <WhatsAppFloat />
    </>
  );
}
