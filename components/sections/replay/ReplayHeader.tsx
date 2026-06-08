import Image from "next/image";
import { REPLAY_DEADLINE_UTC_MS, formatDeadlineBR } from "./constants";

export function ReplayHeader() {
  return (
    <header className="bg-navy-950 border-b border-white/5">
      <div className="container-lp py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Image
            src="/logo-anhanguera.png"
            alt="Anhanguera"
            width={140}
            height={36}
            className="h-7 md:h-8 w-auto object-contain"
            priority
          />
          <div className="h-6 w-px bg-white/10" />
          <Image
            src="/logo-prapsico.png"
            alt="Prapsico"
            width={140}
            height={36}
            className="h-7 md:h-8 w-auto object-contain"
            priority
          />
        </div>
        <p className="text-[11px] md:text-xs tracking-[0.14em] uppercase text-subtle text-center">
          Replay disponível por 7 dias · até{" "}
          <span className="text-muted">{formatDeadlineBR(REPLAY_DEADLINE_UTC_MS)}</span>
        </p>
      </div>
    </header>
  );
}
