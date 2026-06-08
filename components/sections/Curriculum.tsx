const items = [
  "Como mudar de carreira e se tornar psicoterapeuta em um ano",
  "Por que 85% dos profissionais atendem mal — e o que diferencia quem atende bem",
  "Os 3 erros clínicos mais comuns nos primeiros atendimentos (e os 3 antídotos)",
  "Demonstração prática ao vivo de uma escuta clínica com método",
  "Os 3 pilares de uma prática sólida: método, supervisão e continuidade",
  "Momento tira dúvidas com o psicólogo Paulo de Tarso",
];

export function Curriculum() {
  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="container-lp max-w-3xl">
        <p className="eyebrow mb-4">PROGRAMA DA AULA</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12 text-balance">
          Em 90 minutos, o psicólogo Paulo de Tarso{" "}
          <em className="font-serif italic text-cyan font-normal">aborda:</em>
        </h2>

        <ol className="space-y-6">
          {items.map((item, i) => (
            <li key={i} className="flex gap-5 items-start">
              <span className="font-serif text-2xl text-cyan italic shrink-0 w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-lg leading-relaxed text-muted pt-1">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
