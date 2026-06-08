"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackClickPath } from "@/lib/tracking";
import { Countdown } from "./Countdown";
import { CERT_URL, POS_URL, WHATSAPP_URL, WHATSAPP_DISPLAY } from "./constants";

export function ReplayClosing() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-navy-900 to-navy-950 text-center border-t border-white/5">
      <div className="container-lp max-w-2xl">
        <Countdown className="eyebrow mb-6" prefix="Esse replay encerra em" />
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-balance">
          Não precisa decidir agora.{" "}
          <em className="font-serif italic text-cyan font-normal">
            Mas se a live fez sentido, os caminhos estão acima.
          </em>
        </h2>

        <div className="flex flex-col md:flex-row gap-3 justify-center mt-10">
          <Link
            href={CERT_URL}
            onClick={() => trackClickPath("cert")}
            className="inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-wide whitespace-nowrap bg-cyan text-navy-950 hover:bg-cyan-light transition shadow-[0_8px_24px_rgba(6,164,212,0.35)] px-6 md:px-8 py-4 text-sm md:text-base"
          >
            Conhecer a Certificação
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
          <Link
            href={POS_URL}
            onClick={() => trackClickPath("pos")}
            className="inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-wide whitespace-nowrap border border-cyan/50 text-cyan hover:bg-cyan/10 transition px-6 md:px-8 py-4 text-sm md:text-base"
          >
            Conhecer a Pós
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>

        <p className="mt-8 text-sm text-subtle">
          Prefere conversar?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:text-cyan-light underline-offset-4 hover:underline"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </p>
      </div>
    </section>
  );
}
