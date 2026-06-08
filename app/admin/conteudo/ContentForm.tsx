"use client";

import { useEffect, useState } from "react";
import { Save, Check, Plus, Trash2, ExternalLink } from "lucide-react";
import { Field } from "../live/LiveForm";

type FaqItem = { q: string; a: string };
type ContentSettings = {
  certCheckoutUrl: string;
  certFaqs: FaqItem[];
  posCheckoutUrl: string;
  posFaqs: FaqItem[];
};

type Tab = "cert" | "pos";

export function ContentForm() {
  const [data, setData] = useState<ContentSettings | null>(null);
  const [tab, setTab] = useState<Tab>("cert");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((s) =>
        setData({
          certCheckoutUrl: s.certCheckoutUrl,
          certFaqs: s.certFaqs ?? [],
          posCheckoutUrl: s.posCheckoutUrl,
          posFaqs: s.posFaqs ?? [],
        }),
      );
  }, []);

  function patch(p: Partial<ContentSettings>) {
    setData((d) => (d ? { ...d, ...p } : d));
    setSaved(false);
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
  }

  if (!data) return <p className="text-sm text-slate-500">Carregando…</p>;

  const isCert = tab === "cert";
  const checkoutUrl = isCert ? data.certCheckoutUrl : data.posCheckoutUrl;
  const faqs = isCert ? data.certFaqs : data.posFaqs;
  const pageUrl = isCert
    ? "https://prapsico.com.br/certificacao"
    : "https://prapsico.com.br/pos-graduacao";

  function setCheckout(v: string) {
    patch(isCert ? { certCheckoutUrl: v } : { posCheckoutUrl: v });
  }
  function setFaqs(next: FaqItem[]) {
    patch(isCert ? { certFaqs: next } : { posFaqs: next });
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        {(["cert", "pos"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setSaved(false);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              tab === t
                ? "bg-[#06163A] text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {t === "cert" ? "Certificação" : "Pós-graduação"}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            {isCert ? "Certificação" : "Pós-graduação"}
          </h2>
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-[#057AA0] hover:underline"
          >
            ver página <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <Field
          label="Link do checkout (Voomp)"
          hint="Para onde os botões 'Inscrever' levam nessa LP."
          value={checkoutUrl}
          onChange={setCheckout}
        />
      </div>

      {/* FAQ */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Perguntas frequentes ({faqs.length})
          </h2>
          <button
            onClick={() => setFaqs([...faqs, { q: "", a: "" }])}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-3.5 w-3.5" /> Adicionar
          </button>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  Pergunta {i + 1}
                </span>
                <button
                  onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}
                  className="text-slate-400 hover:text-red-500"
                  aria-label="Remover"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                value={faq.q}
                onChange={(e) =>
                  setFaqs(faqs.map((f, j) => (j === i ? { ...f, q: e.target.value } : f)))
                }
                placeholder="Pergunta"
                className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium outline-none focus:border-[#06A4D4]"
              />
              <textarea
                value={faq.a}
                onChange={(e) =>
                  setFaqs(faqs.map((f, j) => (j === i ? { ...f, a: e.target.value } : f)))
                }
                placeholder="Resposta"
                rows={3}
                className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#06A4D4]"
              />
            </div>
          ))}
          {faqs.length === 0 && (
            <p className="text-sm text-slate-400">
              Sem perguntas. A LP volta a usar o texto padrão do código.
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-[#06163A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0A1F4C] disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saving ? "Salvando…" : saved ? "Salvo!" : "Salvar alterações"}
        </button>
        <p className="text-xs text-slate-400">
          Salva as duas abas de uma vez.
        </p>
      </div>

      <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
        Os <strong>preços</strong> ainda estão fixos no código (aparecem em vários
        lugares como texto). Se precisar mudar valor, me avisa que eu ligo aqui
        também.
      </p>
    </div>
  );
}
