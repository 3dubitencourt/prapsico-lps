import Image from "next/image";

type Props = {
  variant?: "long" | "short";
};

export function PauloDeTarsoBio({ variant = "long" }: Props) {
  return (
    <div>
      <p className="eyebrow mb-4">QUEM É O PROFESSOR</p>
      <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-balance">
        Psicólogo Paulo de Tarso
      </h2>

      <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-10 items-stretch">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] md:aspect-auto md:h-full md:min-h-[280px] w-full">
          <Image
            src="/paulo-de-tarso.png"
            alt="Psicólogo Paulo de Tarso"
            fill
            sizes="(min-width: 768px) 280px, 240px"
            className="object-cover object-top"
          />
        </div>

        <div className="space-y-4 text-muted leading-relaxed text-base md:text-lg text-pretty">
          <p>
            Psicólogo clínico há mais de 20 anos, supervisor de formação e diretor acadêmico da Prapsico, com atuação reconhecida na formação de profissionais da saúde emocional em todo o Brasil.
          </p>
          {variant === "long" && (
            <>
              <p>
                Especialista em clínica fundamental, dedica sua prática ao que ele chama de &ldquo;a diferença entre atender e atender bem&rdquo; — os fundamentos invisíveis que separam uma escuta competente de um atendimento improvisado.
              </p>
              <p>
                Coordenador da Pós-graduação em Psicoterapia da Anhanguera-Prapsico e responsável pela formação de mais de 2.000 alunos nas trilhas de Certificação e Pós-graduação ao longo dos últimos anos.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
