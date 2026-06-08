"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { z } from "zod";
import { trackGenerateLeadAulaCert } from "@/lib/tracking";

const schema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome completo"),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, {
      message: "WhatsApp inválido (inclua DDD)",
    }),
  email: z.string().trim().email("E-mail inválido"),
});

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

type FieldErrors = Partial<Record<"nome" | "whatsapp" | "email", string>>;

export function AulaCertForm({ id = "form-aula-cert" }: { id?: string }) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setWhatsapp(maskPhone(e.target.value));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const parsed = schema.safeParse({ nome, whatsapp, email });
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads/aula-cert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Falha ao enviar. Tente novamente.");
      }
      trackGenerateLeadAulaCert();
      window.location.assign("/obrigado-aula-cert");
    } catch (err) {
      setSubmitting(false);
      setSubmitError(err instanceof Error ? err.message : "Erro inesperado.");
    }
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      noValidate
      className="
        w-full max-w-md mx-auto md:mx-0
        rounded-2xl border border-cyan/30 bg-navy-900/80 backdrop-blur
        shadow-[0_20px_60px_rgba(6,164,212,0.18)]
        p-6 md:p-8
      "
    >
      <p className="eyebrow mb-2 text-center">ASSISTA AGORA · GRÁTIS</p>
      <h2 className="text-xl md:text-2xl font-bold text-center text-ink mb-6 leading-tight">
        Receba o link da aula agora mesmo
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-xs font-medium text-muted mb-1.5">
            Nome completo
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Como você se chama?"
            className="w-full rounded-lg bg-navy-950 border border-white/10 px-4 py-3 text-ink placeholder:text-subtle focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition"
          />
          {errors.nome ? <p className="mt-1 text-xs text-red-400">{errors.nome}</p> : null}
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-xs font-medium text-muted mb-1.5">
            WhatsApp (com DDD)
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={whatsapp}
            onChange={handlePhoneChange}
            placeholder="(35) 99999-9999"
            className="w-full rounded-lg bg-navy-950 border border-white/10 px-4 py-3 text-ink placeholder:text-subtle focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition"
          />
          {errors.whatsapp ? <p className="mt-1 text-xs text-red-400">{errors.whatsapp}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-medium text-muted mb-1.5">
            Seu melhor e-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            className="w-full rounded-lg bg-navy-950 border border-white/10 px-4 py-3 text-ink placeholder:text-subtle focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-400">{errors.email}</p> : null}
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
        {submitting ? "ENVIANDO..." : "QUERO ASSISTIR A AULA"}
        {!submitting && <span aria-hidden>→</span>}
      </button>

      {submitError ? (
        <p className="mt-3 text-xs text-red-400 text-center">{submitError}</p>
      ) : null}

      <p className="mt-4 text-[11px] text-subtle text-center leading-relaxed">
        Seus dados estão protegidos. Não enviamos spam.
      </p>
    </form>
  );
}
