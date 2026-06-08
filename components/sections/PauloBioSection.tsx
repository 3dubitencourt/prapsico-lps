import { PauloDeTarsoBio } from "./PauloDeTarsoBio";

export function PauloBioSection() {
  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="container-lp max-w-4xl">
        <PauloDeTarsoBio variant="long" />
        <blockquote className="mt-12 border-l-2 border-cyan pl-6 max-w-2xl">
          <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-ink text-pretty">
            &ldquo;Não vou vender curso na live. Vou ensinar o que separa quem atende bem de quem só atende. Se ao final fizer sentido conhecer nossos caminhos, eu apresento. Sem pressão.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-subtle tracking-wide">
            — PSICÓLOGO PAULO DE TARSO
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
