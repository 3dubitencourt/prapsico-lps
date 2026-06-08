import Image from "next/image";

export function InstitutionalBar() {
  return (
    <section className="border-y border-white/5 bg-navy-900 py-10">
      <div className="container-lp flex flex-col md:flex-row items-center justify-center gap-8 text-center">
        <div className="flex items-center gap-4 md:gap-6">
          <Image
            src="/logo-anhanguera.png"
            alt="Anhanguera"
            width={200}
            height={50}
            className="h-8 md:h-10 w-auto object-contain"
            priority
          />
          <div className="h-8 md:h-10 w-px bg-white/10" />
          <Image
            src="/logo-prapsico.png"
            alt="Prapsico"
            width={200}
            height={50}
            className="h-8 md:h-10 w-auto object-contain"
            priority
          />
        </div>
        <p className="text-[11px] md:text-base text-muted whitespace-nowrap">
          Cursos reconhecidos pelo <span className="text-ink font-medium">MEC</span> e <span className="text-ink font-medium">Ministério da Saúde</span>
        </p>
      </div>
    </section>
  );
}
