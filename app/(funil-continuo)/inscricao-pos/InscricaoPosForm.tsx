"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { z } from "zod";
import { trackGenerateLeadInscricaoPos } from "@/lib/tracking";

const AREA_OPTIONS = [
  { value: "consultorio_proprio", label: "Sim, em consultório próprio" },
  { value: "clinica_instituicao", label: "Sim, em clínica/instituição" },
  { value: "recem_formado", label: "Ainda não, recém-formado" },
  { value: "outra_area_psi", label: "Trabalho em outra área da Psi" },
] as const;

const TIMING_OPTIONS = [
  { value: "proxima_turma", label: "Próxima turma" },
  { value: "3_meses", label: "Próximos 3 meses" },
  { value: "avaliando", label: "Ainda avaliando" },
] as const;

const schema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome completo"),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, {
      message: "WhatsApp inválido (inclua DDD)",
    }),
  email: z.string().trim().email("E-mail inválido"),
  crp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 4, {
      message: "CRP inválido",
    }),
  area: z.enum(
    ["consultorio_proprio", "clinica_instituicao", "recem_formado", "outra_area_psi"],
    { message: "Selecione uma opção" },
  ),
  timing: z.enum(["proxima_turma", "3_meses", "avaliando"], {
    message: "Selecione uma opção",
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

function maskCrp(value: string): string {
  return value.replace(/[^\d/-]/g, "").slice(0, 15);
}

type FieldKey = "nome" | "whatsapp" | "email" | "crp" | "area" | "timing";
type FieldErrors = Partial<Record<FieldKey, string>>;

export function InscricaoPosForm({
  id = "form-inscricao-pos",
}: {
  id?: string;
}) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [crp, setCrp] = useState("");
  const [area, setArea] = useState("");
  const [timing, setTiming] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setWhatsapp(maskPhone(e.target.value));
  }

  function handleCrpChange(e: ChangeEvent<HTMLInputElement>) {
    setCrp(maskCrp(e.target.value));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const parsed = schema.safeParse({
      nome,
      whatsapp,
      email,
      crp,
      area,
      timing,
    });
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
      const res = await fetch("/api/leads/inscricao-pos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Falha ao enviar. Tente novamente.");
      }
      trackGenerateLeadInscricaoPos(parsed.data.area, parsed.data.timing);
      window.location.assign("/obrigado-inscricao-pos");
    } catch (err) {
      setSubmitting(false);
      setSubmitError(err instanceof Error ? err.message : "Erro inesperado.");
    }
  }

  const inputClass =
    "w-full rounded-lg bg-navy-950 border border-white/10 px-4 py-3 text-ink placeholder:text-subtle focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition";

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      noValidate
      className="
        w-full max-w-md mx-auto md:mx-0
        rounded-2xl border border-cyan/30 bg-navy-900/80 backdrop-blur
        shadow-[0_20px_60px_rgba(6,164,212,0.18)]
        p-6 md:p-7
      "
    >
      <p className="eyebrow mb-2 text-center">QUERO CONHECER A PÓS</p>
      <h2 className="text-xl md:text-2xl font-bold text-center text-ink mb-5 leading-tight">
        Fale com a <span className="text-cyan">Coordenação Acadêmica</span>
      </h2>

      <div className="space-y-3.5">
        <div>
          <label
            htmlFor="pos-nome"
            className="block text-xs font-medium text-muted mb-1.5"
          >
            Nome completo
          </label>
          <input
            id="pos-nome"
            name="nome"
            type="text"
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Como você se chama?"
            className={inputClass}
          />
          {errors.nome ? (
            <p className="mt-1 text-xs text-red-400">{errors.nome}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="pos-whatsapp"
            className="block text-xs font-medium text-muted mb-1.5"
          >
            WhatsApp (com DDD)
          </label>
          <input
            id="pos-whatsapp"
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
            <p className="mt-1 text-xs text-red-400">{errors.whatsapp}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="pos-email"
            className="block text-xs font-medium text-muted mb-1.5"
          >
            E-mail
          </label>
          <input
            id="pos-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            className={inputClass}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="pos-crp"
            className="block text-xs font-medium text-muted mb-1.5"
          >
            CRP (número)
          </label>
          <input
            id="pos-crp"
            name="crp"
            type="text"
            inputMode="numeric"
            value={crp}
            onChange={handleCrpChange}
            placeholder="04/12345"
            className={inputClass}
          />
          {errors.crp ? (
            <p className="mt-1 text-xs text-red-400">{errors.crp}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="pos-area"
            className="block text-xs font-medium text-muted mb-1.5"
          >
            Você atende clinicamente hoje?
          </label>
          <select
            id="pos-area"
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={`${inputClass} ${area ? "" : "text-subtle"}`}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {AREA_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-ink">
                {opt.label}
              </option>
            ))}
          </select>
          {errors.area ? (
            <p className="mt-1 text-xs text-red-400">{errors.area}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="pos-timing"
            className="block text-xs font-medium text-muted mb-1.5"
          >
            Quando pretende iniciar?
          </label>
          <select
            id="pos-timing"
            name="timing"
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
            className={`${inputClass} ${timing ? "" : "text-subtle"}`}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {TIMING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-ink">
                {opt.label}
              </option>
            ))}
          </select>
          {errors.timing ? (
            <p className="mt-1 text-xs text-red-400">{errors.timing}</p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="
          mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full
          bg-cyan text-navy-950 font-bold tracking-wide text-sm md:text-base
          px-6 py-4 hover:bg-cyan-light transition
          shadow-[0_8px_24px_rgba(6,164,212,0.45)]
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {submitting ? "ENVIANDO..." : "FALAR COM A COORDENAÇÃO"}
        {!submitting && <span aria-hidden>→</span>}
      </button>

      {submitError ? (
        <p className="mt-3 text-xs text-red-400 text-center">{submitError}</p>
      ) : null}

      <p className="mt-4 text-[11px] text-subtle text-center leading-relaxed">
        Retorno em até 5 minutos no WhatsApp
      </p>
    </form>
  );
}
