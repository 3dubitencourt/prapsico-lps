"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Lock } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin/conteudo";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace(next);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Senha incorreta.");
      }
    } catch {
      setError("Erro de conexão. Tente de novo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06163A] text-[#3FC1E8]">
          <Lock className="h-6 w-6" />
        </span>
        <h1 className="text-xl font-bold tracking-tight">Painel Prapsico</h1>
        <p className="mt-1 text-sm text-slate-500">Acesso restrito da equipe</p>
      </div>

      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        Senha
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#06A4D4] focus:ring-2 focus:ring-[#06A4D4]/20"
        placeholder="Digite a senha"
      />

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="mt-5 w-full rounded-xl bg-[#06163A] py-3 text-sm font-semibold text-white transition hover:bg-[#0A1F4C] disabled:opacity-50"
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
