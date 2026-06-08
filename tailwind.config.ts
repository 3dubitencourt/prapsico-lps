import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        psa: ["var(--font-psa)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#06163A",
          900: "#0A1F4C",
          800: "#0F2A5C",
          700: "#163675",
          600: "#1E458D",
          500: "#2E5FB0",
          400: "#5685D1",
        },
        cyan: {
          DEFAULT: "#06A4D4",
          light: "#3FC1E8",
          dark: "#057AA0",
        },
        ink: "#FFFFFF",
        muted: "#B8C5DB",
        subtle: "#7A8AA8",
        success: "#2FBE7A",
        // Paleta exclusiva da LP Comunidade Psicoaplique (creme + verde-limão + marinho).
        // Prefixo "psa-" pra não conflitar com o tema padrão (navy/cyan) das outras LPs.
        psa: {
          cream: "#FAF3E3", // fundo principal
          "cream-200": "#F3E9D2", // faixa alternada / cards mais escuros
          lime: "#A3D63F", // acento / CTA
          "lime-dark": "#8FC52E", // hover do CTA
          navy: "#1E2261", // texto e títulos
          "navy-700": "#3A3F86", // texto secundário
          "navy-500": "#6B6FA3", // texto sutil / legendas
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
