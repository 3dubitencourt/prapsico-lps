const cards = [
  {
    title: "Sinto o chamado, mas não tenho graduação",
    quote:
      "Você cuida de pessoas há anos, ajuda quem chega perto, mas se sente travado pela falta de formação reconhecida.",
  },
  {
    title: "Tenho diploma, mas a faculdade não me preparou",
    quote:
      "Você se formou em Psicologia e percebeu que sair da graduação não é o mesmo que saber atender clinicamente.",
  },
  {
    title: "Quer mudar de carreira de maneira leve e prática",
    quote:
      "É possível se tornar psicoterapeuta e ajudar pessoas, ganhar por isso, tudo em um ano.",
  },
];

export function TwoPaths() {
  return (
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="container-lp max-w-5xl">
        <h2 className="text-2xl md:text-5xl font-bold leading-tight text-center mb-12 whitespace-nowrap md:whitespace-normal md:text-balance">
          Essa aula é pra você{" "}
          <em className="font-serif italic text-cyan font-normal">se...</em>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-navy-950 border border-white/5 p-8 md:p-10"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4">&ldquo;{card.title}&rdquo;</h3>
              <blockquote className="text-muted leading-relaxed border-l-2 border-cyan pl-4">
                {card.quote}
              </blockquote>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 font-serif italic text-xl md:text-2xl text-cyan-light">
          A aula é pros três caminhos.
        </p>
      </div>
    </section>
  );
}
