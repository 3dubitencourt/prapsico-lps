"use client";

import { cn } from "@/lib/utils";
import { trackCheckout } from "@/lib/tracking";
import { useLiveCheckout } from "@/components/live/LiveCheckout";

type Props = {
  href: string;
  size?: "md" | "lg";
  className?: string;
};

export function CTAPrimary({ href, size = "md", className }: Props) {
  const liveCheckout = useLiveCheckout();
  return (
    <a
      href={href}
      onClick={liveCheckout ? liveCheckout.onCheckoutClick : () => trackCheckout()}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-wide whitespace-nowrap",
        "bg-cyan text-navy-950 hover:bg-cyan-light transition",
        "shadow-[0_8px_24px_rgba(6,164,212,0.35)] hover:shadow-[0_12px_32px_rgba(6,164,212,0.5)]",
        size === "lg" ? "px-6 md:px-10 py-4 md:py-5 text-sm md:text-lg" : "px-6 md:px-8 py-3 md:py-4 text-sm md:text-base",
        className,
      )}
    >
      GARANTIR MINHA VAGA · R$ 38
      <span aria-hidden>→</span>
    </a>
  );
}
