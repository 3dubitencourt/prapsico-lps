import Image from "next/image";
import { CTAPrimary } from "@/components/CTAPrimary";

type Props = { checkoutUrl: string };

export function Hero({ checkoutUrl }: Props) {
  return (
    <section className="relative w-full bg-navy-950 overflow-hidden">
      {/* ============== DESKTOP ============== */}
      <div className="hidden md:block relative w-full aspect-[2/1]">
        <Image
          src="/bg-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />

        {/* Overlay textual ancorado pelo fundo — cresce pra cima */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[5%] px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-cyan/30 bg-navy-900/70 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="text-[11px] lg:text-xs tracking-[0.18em] uppercase font-medium text-cyan">
              Aula ao vivo · 13 de julho, às 19h
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-4 text-3xl lg:text-[2.75rem] xl:text-5xl font-bold leading-[1.05] tracking-tight text-balance max-w-4xl text-center">
            Torne-se psicoterapeuta reconhecido{" "}
            <em className="block font-serif italic text-cyan font-normal">
              mesmo sem graduação em Psicologia.
            </em>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 lg:mt-4 text-sm lg:text-base text-muted leading-relaxed max-w-2xl text-center text-pretty">
            Vá além da escuta. Domine um método estruturado para conduzir atendimentos com segurança técnica, ética e resultado clínico — partindo do zero.
          </p>

          {/* CTA */}
          <div className="mt-5 lg:mt-6">
            <CTAPrimary href={checkoutUrl} />
          </div>
        </div>
      </div>

      {/* ============== MOBILE: seção com proporção do BG ============== */}
      <div className="md:hidden relative w-full aspect-[887/1680]">
        <Image
          src="/bg-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* Conteúdo ancorado pelo fundo — cresce pra cima */}
        <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/30 bg-navy-900/70 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="text-[10px] tracking-[0.16em] uppercase font-medium text-cyan">
              Ao vivo · 13 de julho, 19h
            </span>
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold leading-[1.15] tracking-tight text-center text-balance">
            Torne-se psicoterapeuta reconhecido{" "}
            <em className="font-serif italic text-cyan font-normal">
              mesmo sem graduação em Psicologia.
            </em>
          </h1>
          <p className="mt-3 text-sm text-muted leading-snug text-center">
            Vá além da escuta. Domine um método<br />
            estruturado para conduzir atendimentos<br />
            com segurança técnica, ética e resultado clínico
          </p>
          <div className="mt-5">
            <CTAPrimary href={checkoutUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
