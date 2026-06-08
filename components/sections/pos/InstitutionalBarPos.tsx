import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export function InstitutionalBarPos() {
  return (
    <section className="border-y border-white/5 bg-navy-900 py-10 md:py-14">
      <div className="container-lp">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center">
          <div className="flex items-center gap-4 sm:gap-5 md:gap-7 shrink-0">
            <Image
              src="/logo-anhanguera.png"
              alt="Anhanguera"
              width={240}
              height={60}
              className="h-7 sm:h-9 md:h-12 w-auto object-contain"
            />
            <div className="h-7 sm:h-9 md:h-12 w-px bg-white/10" />
            <Image
              src="/logo-prapsico.png"
              alt="Prapsico"
              width={240}
              height={60}
              className="h-7 sm:h-9 md:h-12 w-auto object-contain"
            />
          </div>

          <div className="md:border-l md:border-white/10 md:pl-10 text-center md:text-left max-w-md">
            <div className="inline-flex items-center gap-2 mb-1.5 text-cyan">
              <ShieldCheck className="w-4 h-4" strokeWidth={2} />
              <span className="eyebrow !text-cyan">Pós Lato Sensu</span>
            </div>
            <p className="text-base md:text-lg text-ink font-semibold leading-tight">
              Reconhecida pelo MEC
            </p>
            <p className="text-sm md:text-base text-muted leading-snug mt-1 text-pretty">
              Carga horária:{" "}
              <span className="text-ink font-medium">360h</span>{" "}
              · Certificação institucional{" "}
              <span className="text-ink font-medium">Anhanguera</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
