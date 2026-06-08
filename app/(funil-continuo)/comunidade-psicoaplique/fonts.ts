import localFont from "next/font/local";

/* Libre Franklin — fonte exclusiva da LP Comunidade Psicoaplique.
 * Escopada via variável CSS (--font-psa) pra NÃO afetar as outras LPs. */
export const libreFranklin = localFont({
  variable: "--font-psa",
  display: "swap",
  src: [
    { path: "./fonts/LibreFranklin-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/LibreFranklin-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/LibreFranklin-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/LibreFranklin-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/LibreFranklin-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/LibreFranklin-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/LibreFranklin-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "./fonts/LibreFranklin-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/LibreFranklin-Black.ttf", weight: "900", style: "normal" },
  ],
});
