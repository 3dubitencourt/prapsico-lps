import { Clock } from "lucide-react";
import { VimeoPlayer } from "./VimeoPlayer";
import { Countdown } from "./Countdown";
import { REPLAY_DEADLINE_UTC_MS, formatDeadlineBR } from "./constants";

export function ReplayHero({
  vimeoId,
  deadlineMs = REPLAY_DEADLINE_UTC_MS,
}: {
  vimeoId?: string;
  deadlineMs?: number;
}) {
  return (
    <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 bg-gradient-to-b from-navy-950 via-navy-950 to-navy-900">
      <div className="container-lp max-w-4xl">
        <p className="eyebrow text-center mb-5">
          Replay oficial ·<br className="md:hidden" />{" "}
          Psicólogo Paulo de Tarso · 8 de junho
        </p>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center leading-tight mb-5 text-balance">
          Como ir{" "}
          <em className="font-serif italic text-cyan font-normal">além da escuta</em>
        </h1>

        <p className="text-base md:text-xl text-muted text-center max-w-2xl mx-auto mb-10 text-balance">
          Você perdeu ao vivo. Mas o replay está aqui pelos próximos 7 dias, exatamente como foi transmitido.
        </p>

        <VimeoPlayer videoId={vimeoId} />

        <div className="mt-6 flex flex-col items-center gap-1 text-center px-2">
          <p className="text-sm md:text-base text-muted leading-relaxed">
            <Clock
              className="inline-block w-4 h-4 text-cyan -mt-0.5 mr-1.5 align-middle"
              strokeWidth={1.75}
              aria-hidden
            />
            Replay disponível até{" "}
            <span className="text-ink whitespace-nowrap">
              {formatDeadlineBR(deadlineMs)}
            </span>
          </p>
          <p className="text-xs md:text-sm text-subtle">7 dias após o fim da live</p>
          <Countdown className="text-xs md:text-sm text-subtle mt-1" deadlineMs={deadlineMs} />
        </div>
      </div>
    </section>
  );
}
