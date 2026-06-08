"use client";

import { cn } from "@/lib/utils";
import { trackBeginCheckoutPos } from "@/lib/tracking";
import { usePosContent } from "./pos-content";

type Props = {
  source: string;
  size?: "md" | "lg" | "xl";
  label?: string;
  className?: string;
};

export function CTAPos({ source, size = "md", label, className }: Props) {
  const { checkoutUrl } = usePosContent();
  return (
    <a
      href={checkoutUrl}
      onClick={() => trackBeginCheckoutPos(source)}
      data-cta-source={source}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-wide whitespace-nowrap",
        "bg-cyan text-navy-950 hover:bg-cyan-light transition",
        "shadow-[0_8px_24px_rgba(6,164,212,0.35)] hover:shadow-[0_12px_32px_rgba(6,164,212,0.5)]",
        size === "xl"
          ? "px-8 md:px-12 py-5 md:py-6 text-base md:text-xl"
          : size === "lg"
            ? "px-6 md:px-10 py-4 md:py-5 text-sm md:text-lg"
            : "px-6 md:px-8 py-3 md:py-4 text-sm md:text-base",
        className,
      )}
    >
      {label ?? "QUERO ME INSCREVER · R$ 427/MÊS"}
      <span aria-hidden>→</span>
    </a>
  );
}
