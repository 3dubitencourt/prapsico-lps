/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      // beforeFiles roda ANTES das rotas do app — necessário pra sobrepor a home (/)
      beforeFiles: [
        // Home antiga do WordPress prapsico (LP pós-graduação) servida na raiz.
        { source: '/', destination: '/home-antiga/index.html' },
      ],
      afterFiles: [
        // Páginas institucionais do WordPress prapsico, espelhadas em /public.
        // NÃO afeta as LPs de anúncio (que ficam em sub-rotas próprias).
        { source: '/nossas-ofertas', destination: '/nossas-ofertas/index.html' },
        { source: '/comunidade', destination: '/comunidade/index.html' },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
