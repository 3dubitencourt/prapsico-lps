"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { z } from "zod";
import { trackGenerateLeadComunidade } from "@/lib/tracking";

/* ===========================================================================
 *  FORMULÁRIO DE CAPTURA — Comunidade Psicoaplique
 *  Campos: Nome, E-mail, WhatsApp. Ao enviar com sucesso, chama onSuccess()
 *  (que dispara o pop-up de revelação na LP). Os UTMs vêm prontos por prop.
 *  APLIQUE SEU DESIGN nas classes marcadas.
 * =========================================================================== */

export type Utm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

const schema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome completo"),
  email: z.string().trim().email("E-mail inválido"),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, {
      message: "WhatsApp inválido (inclua o DDD)",
    }),
});

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

type FieldKey = "nome" | "email" | "whatsapp";
type FieldErrors = Partial<Record<FieldKey, string>>;

export function CapturaForm({
  utm,
  onSuccess,
}: {
  utm: Utm;
  onSuccess: () => void;
}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setWhatsapp(maskPhone(e.target.value));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const parsed = schema.safeParse({ nome, email, whatsapp });
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldKey;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads/comunidade-psicoaplique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, ...utm }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Falha ao enviar. Tente novamente.");
      }
      trackGenerateLeadComunidade();
      // Sucesso → a LP abre o pop-up de revelação.
      onSuccess();
    } catch (err) {
      setSubmitting(false);
      setSubmitError(
        err instanceof Error ? err.message : "Erro inesperado. Tente de novo.",
      );
    }
  }

  const inputClass =
    "w-full rounded-lg bg-white border border-psa-navy/15 px-4 py-3 text-psa-navy placeholder:text-psa-navy-500 focus:outline-none focus:border-psa-lime focus:ring-2 focus:ring-psa-lime/30 transition";

  return (
    <form onSubmit={onSubmit} noValidate className="p-6 md:p-7">
      <p className="eyebrow text-psa-navy-700 mb-2 text-center">
        FALTA SÓ UM PASSO
      </p>
      <h2
        id="capturaform-titulo"
        className="text-xl md:text-2xl font-bold text-center text-psa-navy mb-5 leading-tight"
      >
        Preencha pra{" "}
        <span className="text-psa-lime-dark">desbloquear seu presente</span>
      </h2>

      <div className="space-y-3.5">
        <div>
          <label
            htmlFor="comunidade-nome"
            className="block text-xs font-medium text-psa-navy-700 mb-1.5"
          >
            Nome completo
          </label>
          <input
            id="comunidade-nome"
            name="nome"
            type="text"
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Como você se chama?"
            className={inputClass}
          />
          {errors.nome ? (
            <p className="mt-1 text-xs text-red-600">{errors.nome}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="comunidade-email"
            className="block text-xs font-medium text-psa-navy-700 mb-1.5"
          >
            E-mail
          </label>
          <input
            id="comunidade-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            className={inputClass}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="comunidade-whatsapp"
            className="block text-xs font-medium text-psa-navy-700 mb-1.5"
          >
            WhatsApp (com DDD)
          </label>
          <input
            id="comunidade-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={whatsapp}
            onChange={handlePhoneChange}
            placeholder="(35) 99999-9999"
            className={inputClass}
          />
          {errors.whatsapp ? (
            <p className="mt-1 text-xs text-red-600">{errors.whatsapp}</p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="
          mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full
          bg-psa-lime text-psa-navy font-bold tracking-wide text-sm md:text-base
          px-6 py-4 hover:bg-psa-lime-dark transition
          shadow-[0_8px_24px_rgba(143,197,46,0.45)]
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {submitting ? "ENVIANDO..." : "DESBLOQUEAR MEU PRESENTE"}
      </button>

      {submitError ? (
        <p className="mt-3 text-xs text-red-600 text-center">{submitError}</p>
      ) : null}

      <p className="mt-4 text-[11px] text-psa-navy-500 text-center leading-relaxed">
        Seus dados ficam seguros. Sem spam — só o necessário pra liberar seu
        presente.
      </p>
    </form>
  );
}
