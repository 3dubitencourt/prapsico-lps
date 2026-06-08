import type { CSSProperties } from "react";

/* ===========================================================================
 *  BrandMark — usa os ELEMENTOS DE MARCA (estrelinha Psicoaplique) como
 *  decoração, pintados na cor da paleta via máscara CSS.
 *
 *  Os PNGs originais são azuis; aqui o azul é ignorado e a cor vem da classe
 *  `color` (ex: "bg-psa-lime", "bg-psa-navy"). Assim o mesmo elemento serve
 *  em qualquer cor da paleta.
 *
 *  Elementos disponíveis em /public/psa/:
 *    elemento-1.png → padrão repetido (textura)
 *    elemento-2.png → estrela em contorno
 *    elemento-3.png → chevrons (setas)
 *    elemento-4.png → estrela sólida (símbolo)
 * =========================================================================== */
export function BrandMark({
  src,
  color = "bg-psa-navy",
  className = "",
  repeat = false,
  tile,
  style,
}: {
  /** caminho do PNG (ex: "/psa/elemento-4.png") */
  src: string;
  /** classe de cor de fundo que vira a cor do elemento */
  color?: string;
  /** tamanho via classes (ex: "w-24 h-24") */
  className?: string;
  /** repetir como textura (padrão) */
  repeat?: boolean;
  /** tamanho do tile quando repeat (ex: "120px") */
  tile?: string;
  style?: CSSProperties;
}) {
  const maskStyle: CSSProperties = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: repeat ? "repeat" : "no-repeat",
    maskRepeat: repeat ? "repeat" : "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: repeat ? tile || "120px" : "contain",
    maskSize: repeat ? tile || "120px" : "contain",
    ...style,
  };

  return (
    <span
      aria-hidden
      className={`block ${color} ${className}`}
      style={maskStyle}
    />
  );
}
