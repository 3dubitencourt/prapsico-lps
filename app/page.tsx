import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <p className="eyebrow mb-4">PRAPSICO × ANHANGUERA</p>
      <h1 className="text-3xl md:text-5xl font-bold mb-8 max-w-2xl text-balance">
        Landing pages do projeto-mestre 9 LPs
      </h1>
      <ul className="space-y-3 text-muted">
        <li>
          <Link
            href="/certificacao"
            className="text-cyan hover:text-cyan-light border-b border-cyan/30 hover:border-cyan transition"
          >
            LP #3 — Certificação (venda)
          </Link>
        </li>
        <li>
          <Link
            href="/aula-gratuita-pos"
            className="text-cyan hover:text-cyan-light border-b border-cyan/30 hover:border-cyan transition"
          >
            LP #4 — Aula Gratuita Pós (psicólogos formados)
          </Link>
        </li>
        <li>
          <Link
            href="/aula-ao-vivo"
            className="text-cyan hover:text-cyan-light border-b border-cyan/30 hover:border-cyan transition"
          >
            LP #7 — Aula ao Vivo (8 de junho)
          </Link>
        </li>
        <li>
          <Link
            href="/obrigado-live"
            className="text-cyan hover:text-cyan-light border-b border-cyan/30 hover:border-cyan transition"
          >
            LP #8 — Obrigado (pós-checkout)
          </Link>
        </li>
        <li>
          <Link
            href="/replay-live"
            className="text-cyan hover:text-cyan-light border-b border-cyan/30 hover:border-cyan transition"
          >
            LP #9 — Replay
          </Link>
        </li>
      </ul>
    </main>
  );
}
