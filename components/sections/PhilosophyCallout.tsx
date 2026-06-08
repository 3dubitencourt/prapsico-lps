import { ScrollText } from "lucide-react";

const bullets = [
  "Sem countdown",
  'Sem "últimas vagas"',
  "Sem pressão de fechamento",
  "Sem dor manufaturada",
];

export function PhilosophyCallout() {
  return (
    <section className="py-16 md:py-20 bg-navy-950">
      <div className="container-lp max-w-3xl">
        <div className="rounded-2xl bg-cyan/5 border border-cyan/20 p-8 md:p-12">
          <p className="eyebrow mb-4 flex items-center gap-2">
            <ScrollText className="w-4 h-4 text-cyan" strokeWidth={1.75} />
            SOBRE A FILOSOFIA DESSA AULA
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-ink mb-6">
            Essa não é uma{" "}
            <em className="font-serif italic">&ldquo;aula gratuita disfarçada de venda&rdquo;</em>
            . É uma aula clínica paga (R$ 37), com tom consultivo, alinhada ao código de ética da nossa profissão.
          </p>
          <ul className="space-y-2 mb-8 text-muted">
            {bullets.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="text-cyan">→</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-base md:text-lg leading-relaxed text-muted">
            O ingresso de R$ 37 existe pra filtrar quem realmente quer estar lá. Se ao final fizer sentido apresentar nossos caminhos formativos, faremos — de forma consultiva, com tempo pra você decidir.
          </p>
        </div>
      </div>
    </section>
  );
}
