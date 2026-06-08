"use client";

import { useEffect, useState } from "react";
import { Save, Check, ExternalLink } from "lucide-react";

type LiveSettings = {
  liveCheckoutUrl: string;
  liveWhatsappGroupUrl: string;
  liveBonusVideoUrl: string;
  replayVimeoId: string;
  replayDeadlineMs: number;
};

function msToLocalInput(ms: number): string {
  const d = new Date(ms);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

function localInputToMs(value: string): number {
  return new Date(value).getTime();
}

export function LiveForm() {
  const [data, setData] = useState<LiveSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((s) =>
        setData({
          liveCheckoutUrl: s.liveCheckoutUrl,
          liveWhatsappGroupUrl: s.liveWhatsappGroupUrl,
          liveBonusVideoUrl: s.liveBonusVideoUrl,
          replayVimeoId: s.replayVimeoId,
          replayDeadlineMs: s.replayDeadlineMs,
        }),
      );
  }, []);

  function set<K extends keyof LiveSettings>(key: K, value: LiveSettings[K]) {
    setData((d) => (d ? { ...d, [key]: value } : d));
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

  if (!data) {
    return <p className="text-sm text-slate-500">Carregando…</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Card
        title="Página da live · /aula-ao-vivo"
        href="https://prapsico.com.br/aula-ao-vivo"
      >
        <Field
          label="Link do checkout (Hotmart)"
          hint="Para onde o botão 'Inscreva-se' leva. Ex: https://pay.hotmart.com/XXXX"
          value={data.liveCheckoutUrl}
          onChange={(v) => set("liveCheckoutUrl", v)}
        />
      </Card>

      <Card
        title="Página de obrigado · /obrigado-live"
        href="https://prapsico.com.br/obrigado-live"
      >
        <Field
          label="Link do grupo VIP do WhatsApp"
          hint="Convite do grupo onde a live é divulgada. Ex: https://chat.whatsapp.com/XXXX"
          value={data.liveWhatsappGroupUrl}
          onChange={(v) => set("liveWhatsappGroupUrl", v)}
        />
        <Field
          label="Vídeo bônus (embed do YouTube)"
          hint="Use o link de EMBED, não o normal. Ex: https://www.youtube.com/embed/XXXX"
          value={data.liveBonusVideoUrl}
          onChange={(v) => set("liveBonusVideoUrl", v)}
        />
      </Card>

      <Card
        title="Replay · /replay-live"
        href="https://prapsico.com.br/replay-live"
      >
        <Field
          label="ID do vídeo no Vimeo"
          hint="Só o número do vídeo (não a URL inteira). Deixe vazio pra mostrar o aviso 'vídeo em breve'."
          value={data.replayVimeoId}
          onChange={(v) => set("replayVimeoId", v.trim())}
          placeholder="ex: 987654321"
        />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Replay encerra em
          </label>
          <input
            type="datetime-local"
            value={msToLocalInput(data.replayDeadlineMs)}
            onChange={(e) => set("replayDeadlineMs", localInputToMs(e.target.value))}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#06A4D4] focus:ring-2 focus:ring-[#06A4D4]/20"
          />
          <p className="mt-1 text-xs text-slate-400">
            Depois dessa data/hora o replay é bloqueado automaticamente (horário do
            seu computador).
          </p>
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-[#06163A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0A1F4C] disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saving ? "Salvando…" : saved ? "Salvo!" : "Salvar alterações"}
        </button>
        {saved && (
          <span className="text-sm text-slate-500">
            As páginas já refletem a mudança.
          </span>
        )}
      </div>
    </div>
  );
}

function Card({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
          {title}
        </h2>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-[#057AA0] hover:underline"
        >
          ver página <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#06A4D4] focus:ring-2 focus:ring-[#06A4D4]/20"
      />
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
