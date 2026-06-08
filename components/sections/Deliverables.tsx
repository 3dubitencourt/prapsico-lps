import { Video, MessagesSquare, Gift } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const items: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  {
    icon: Video,
    title: "Acesso à live ao vivo",
    desc: "8/jun às 19h no Zoom + Q&A aberto",
  },
  {
    icon: MessagesSquare,
    title: "Grupo VIP no WhatsApp",
    desc: "7 dias de conteúdo pré-aula do Paulo",
  },
  {
    icon: Gift,
    title: "Aula bônus de 3 minutos",
    desc: "Entregue após o evento",
  },
];

export function Deliverables() {
  return (
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="container-lp max-w-5xl">
        <p className="eyebrow mb-4 text-center">O QUE VOCÊ RECEBE</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-12 text-balance">
          Sua inscrição inclui{" "}
          <em className="font-serif italic text-cyan font-normal">três entregas</em>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl bg-navy-950 border border-white/5 p-6 md:p-8"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 mb-5">
                <Icon className="w-6 h-6 text-cyan" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
