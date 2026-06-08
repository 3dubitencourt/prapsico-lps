"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  FileText,
  Radio,
  BarChart3,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

export type AdminSection = "conteudo" | "live" | "campanhas";

const NAV: {
  key: AdminSection;
  label: string;
  href: string;
  icon: typeof FileText;
  desc: string;
}[] = [
  { key: "conteudo", label: "Conteúdo das LPs", href: "/admin/conteudo", icon: FileText, desc: "Textos, checkout e FAQ" },
  { key: "live", label: "Config da Live", href: "/admin/live", icon: Radio, desc: "Links da live de 8/jun" },
  { key: "campanhas", label: "Campanhas", href: "/admin/campanhas", icon: BarChart3, desc: "Resultados do Meta Ads" },
];

export function AdminShell({
  active,
  title,
  children,
}: {
  active: AdminSection;
  title: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white transition-transform md:static md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <p className="text-base font-bold tracking-tight">Painel Prapsico</p>
              <p className="text-xs text-slate-500">Gestão das landing pages</p>
            </div>
            <button
              className="md:hidden text-slate-500"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = item.key === active;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-start gap-3 rounded-xl px-3 py-3 transition ${
                    isActive
                      ? "bg-[#06163A] text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`mt-0.5 h-5 w-5 ${isActive ? "text-[#3FC1E8]" : "text-slate-400"}`} />
                  <span>
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className={`block text-xs ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                      {item.desc}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-1 border-t border-slate-200 px-3 py-4">
            <a
              href="https://prapsico.com.br/certificacao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              <ExternalLink className="h-5 w-5 text-slate-400" />
              Ver o site
            </a>
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              <LogOut className="h-5 w-5 text-slate-400" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Conteúdo */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-4 md:px-8">
          <button
            className="md:hidden text-slate-600"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold tracking-tight md:text-xl">{title}</h1>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
