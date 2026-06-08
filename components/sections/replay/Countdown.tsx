"use client";

import { useEffect, useState } from "react";
import { REPLAY_DEADLINE_UTC_MS } from "./constants";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

type Diff =
  | { mode: "days"; d: number; h: number; expired: false }
  | { mode: "hours"; h: number; m: number; expired: false }
  | { mode: "expired"; expired: true };

function diff(now: number, deadline: number): Diff {
  const ms = deadline - now;
  if (ms <= 0) return { mode: "expired", expired: true };
  // Antes do fim da live (>7 dias até a deadline), o contador trava em 7 dias
  // pra não contradizer a tarja "REPLAY DISPONÍVEL POR 7 DIAS".
  const cappedMs = Math.min(ms, SEVEN_DAYS_MS);
  const totalMin = Math.floor(cappedMs / 60000);
  if (cappedMs >= 24 * 60 * 60 * 1000) {
    const d = Math.floor(cappedMs / (24 * 60 * 60 * 1000));
    const h = Math.floor((cappedMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return { mode: "days", d, h, expired: false };
  }
  return {
    mode: "hours",
    h: Math.floor(totalMin / 60),
    m: totalMin % 60,
    expired: false,
  };
}

type Props = {
  className?: string;
  prefix?: string;
  deadlineMs?: number;
};

export function Countdown({
  className,
  prefix = "Tempo restante:",
  deadlineMs = REPLAY_DEADLINE_UTC_MS,
}: Props) {
  const [state, setState] = useState(() => diff(Date.now(), deadlineMs));

  useEffect(() => {
    const tick = () => setState(diff(Date.now(), deadlineMs));
    tick();
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, [deadlineMs]);

  if (state.expired) {
    return (
      <p className={className ?? "text-sm text-subtle"}>
        Replay encerrado.
      </p>
    );
  }

  const value =
    state.mode === "days"
      ? `${state.d}d ${state.h.toString().padStart(2, "0")}h`
      : `${state.h}h ${state.m.toString().padStart(2, "0")}min`;

  return (
    <p className={className ?? "text-sm text-subtle"}>
      <span className="text-subtle">{prefix} </span>
      <span className="text-muted">{value}</span>
    </p>
  );
}
