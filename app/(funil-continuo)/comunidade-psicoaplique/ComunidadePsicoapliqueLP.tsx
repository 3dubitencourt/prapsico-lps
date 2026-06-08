"use client";

import { useEffect, useState } from "react";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import {
  trackViewComunidade,
  trackClickWhatsAppComunidade,
} from "@/lib/tracking";

// Seções (copy + design ficam dentro de cada uma)
import { Hero } from "@/components/sections/comunidade-psicoaplique/Hero";
import { Agitacao } from "@/components/sections/comunidade-psicoaplique/Agitacao";
import { Solucao } from "@/components/sections/comunidade-psicoaplique/Solucao";
import { Entregaveis } from "@/components/sections/comunidade-psicoaplique/Entregaveis";
import { Identificacao } from "@/components/sections/comunidade-psicoaplique/Identificacao";
import { Autoridade } from "@/components/sections/comunidade-psicoaplique/Autoridade";
import { ProvaSocial } from "@/components/sections/comunidade-psicoaplique/ProvaSocial";
import { FinalCta } from "@/components/sections/comunidade-psicoaplique/FinalCta";
import { BannerFaixa } from "@/components/sections/comunidade-psicoaplique/BannerFaixa";
import {
  POPUP,
  buildWhatsAppUrl,
} from "@/components/sections/comunidade-psicoaplique/constants";

import { StickyBar } from "@/components/sections/comunidade-psicoaplique/StickyBar";
import { Modal } from "./Modal";
import { CapturaForm, type Utm } from "./CapturaForm";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function ComunidadePsicoapliqueLP() {
  const [formOpen, setFormOpen] = useState(false);
  const [revealOpen, setRevealOpen] = useState(false);
  const [utm, setUtm] = useState<Utm>({});

  // Captura os UTMs da URL uma vez (tráfego vem do Meta Ads).
  useEffect(() => {
    trackViewComunidade();
    const params = new URLSearchParams(window.location.search);
    const captured: Utm = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) captured[k] = v;
    }
    setUtm(captured);
  }, []);

  function openForm() {
    setFormOpen(true);
  }

  // Form enviado com sucesso → fecha o form e abre o pop-up de revelação.
  function handleFormSuccess() {
    setFormOpen(false);
    setRevealOpen(true);
  }

  function goToWhatsApp() {
    trackClickWhatsAppComunidade();
    window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <main className="bg-psa-cream min-h-screen pb-28 md:pb-24">
        {/* Ordem da carta de vendas (carta cega — sem preço na página) */}
        <Hero onOpenForm={openForm} />
        <Agitacao />
        {/* Faixa de banner #1 — ex: chamada visual / prova de transformação */}
        <BannerFaixa
          label="Banner / faixa promocional #1"
          hint="Recomendado: 1200 × 375 px"
        />
        <Solucao />
        <Entregaveis />
        <Identificacao />
        <Autoridade />
        <ProvaSocial />
        {/* Faixa de banner #2 — ex: oferta/gancho antes do CTA final */}
        <BannerFaixa
          label="Banner / faixa promocional #2"
          hint="Recomendado: 1200 × 375 px"
        />
        <FinalCta onOpenForm={openForm} />
      </main>

      {/* MODAL: formulário de captura (aberto pelos botões "Desbloquear presente") */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        labelledBy="capturaform-titulo"
        closeAriaLabel="Fechar formulário"
      >
        <CapturaForm utm={utm} onSuccess={handleFormSuccess} />
      </Modal>

      {/* POP-UP DE REVELAÇÃO: só aparece após envio bem-sucedido */}
      <Modal
        open={revealOpen}
        onClose={() => setRevealOpen(false)}
        labelledBy="reveal-titulo"
        closeAriaLabel="Fechar"
      >
        {/* ===== APLIQUE SEU DESIGN AQUI (pop-up de revelação) ===== */}
        <div className="p-7 md:p-8 text-center">
          <h2
            id="reveal-titulo"
            className="text-2xl md:text-3xl font-bold text-psa-navy leading-tight text-balance"
          >
            {POPUP.titulo}
          </h2>
          <p className="mt-4 text-base text-psa-navy-700 leading-relaxed">
            {POPUP.subtitulo}
          </p>

          <p className="mt-5 rounded-xl border border-psa-lime bg-psa-lime/20 px-4 py-3 text-sm text-psa-navy leading-relaxed">
            {POPUP.urgencia}
          </p>

          <button
            type="button"
            onClick={goToWhatsApp}
            className="
              mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full
              bg-psa-lime text-psa-navy font-bold tracking-wide text-sm md:text-base
              px-6 py-4 hover:bg-psa-lime-dark transition
              shadow-[0_8px_24px_rgba(143,197,46,0.45)]
            "
          >
            {POPUP.cta}
          </button>
        </div>
      </Modal>

      <StickyBar onOpenForm={openForm} />
      <WhatsAppFloat />
    </>
  );
}
