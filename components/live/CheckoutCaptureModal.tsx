"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { z } from "zod";
import { trackCheckout, trackLiveLead } from "@/lib/tracking";

const schema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome completo"),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, {
      message: "WhatsApp inválido (inclua DDD)",
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

/** Anexa dados do lead na URL do checkout Hotmart pra pré-preencher os campos. */
function buildCheckoutUrl(base: string, nome: string, whatsapp: string): string {
  const phone = whatsapp.replace(/\D/g, "");
  const phoneIntl = phone.length === 10 || phone.length === 11 ? `55${phone}` : phone;
  try {
    const url = new URL(base);
    url.searchParams.set("name", nome);
    url.searchParams.set("phonenumber", phoneIntl);
    return url.toString();
  } catch {
    return base;
  }
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* fallback abaixo */
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

type FieldErrors = Partial<Record<"nome" | "whatsapp", string>>;

type Props = {
  open: boolean;
  onClose: () => void;
  checkoutUrl: string;
};

export function CheckoutCaptureModal({ open, onClose, checkoutUrl }: Props) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !submitting) onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, submitting, onClose]);

  if (!open) return null;

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setWhatsapp(maskPhone(e.target.value));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const parsed = schema.safeParse({ nome, whatsapp });
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

    const dest = buildCheckoutUrl(checkoutUrl, parsed.data.nome, parsed.data.whatsapp);

    // event_id compartilhado entre Pixel (navegador) e CAPI (servidor) → desduplica no Meta.
    const eventId = newEventId();

    // Captura o lead sem travar o redirect: dispara em paralelo e segue.
    fetch("/api/leads/live-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        eventId,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
      }),
      keepalive: true,
    }).catch(() => {});

    trackLiveLead(eventId);
    trackCheckout(eventId);
    window.location.assign(dest);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
        onClick={() => !submitting && onClose()}
      />

      <form
        onSubmit={onSubmit}
        noValidate
        className="
          relative w-full max-w-md overflow-hidden
          rounded-2xl border border-cyan/30 bg-navy-900 shadow-[0_20px_70px_rgba(6,164,212,0.3)]
          p-6 md:p-8
        "
        style={{
          backgroundImage:
            "radial-gradient(ellipse 120% 60% at 50% -10%, rgba(6,164,212,0.16) 0%, transparent 70%)",
        }}
      >
        <button
          type="button"
          onClick={() => !submitting && onClose()}
          aria-label="Fechar"
          className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-full text-subtle hover:text-ink hover:bg-white/5 transition text-lg leading-none"
        >
          ×
        </button>

        {/* Badge ao vivo (mesma linguagem do Hero) */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/30 bg-navy-950/60 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="text-[10px] tracking-[0.16em] uppercase font-medium text-cyan">
              Aula ao vivo · 8 de junho · 19h
            </span>
          </div>
        </div>

        <h2
          id="checkout-modal-title"
          className="text-2xl md:text-[1.75rem] font-bold text-center text-ink leading-[1.15] tracking-tight text-balance"
        >
          Pra onde enviamos o seu{" "}
          <em className="font-serif italic text-cyan font-normal whitespace-nowrap">
            acesso?
          </em>
        </h2>
        <p className="mt-3 text-sm text-muted text-center leading-relaxed mb-6">
          Só nome e WhatsApp — a gente te leva pro pagamento na hora.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="cm-nome" className="block text-xs font-medium text-muted mb-1.5">
              Nome completo
            </label>
            <input
              id="cm-nome"
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
            <label htmlFor="cm-whatsapp" className="block text-xs font-medium text-muted mb-1.5">
              WhatsApp (com DDD)
            </label>
            <input
              id="cm-whatsapp"
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
          {submitting ? "LIBERANDO..." : "LIBERAR MEU ACESSO"}
          {!submitting && <span aria-hidden>→</span>}
        </button>

        {submitError ? (
          <p className="mt-3 text-xs text-red-400 text-center">{submitError}</p>
        ) : null}

        <p className="mt-4 text-[11px] text-subtle text-center leading-relaxed">
          Seus dados estão protegidos. Pagamento seguro via Hotmart.
        </p>
      </form>
    </div>
  );
}
