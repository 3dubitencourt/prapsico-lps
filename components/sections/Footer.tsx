export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950 py-12">
      <div className="container-lp">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-between text-center md:text-left">
          <div className="flex items-center gap-4">
            <span className="font-bold text-base tracking-wider text-ink">ANHANGUERA</span>
            <div className="h-5 w-px bg-white/10" />
            <span className="font-bold text-base tracking-wider text-cyan">PRAPSICO</span>
          </div>
          <p className="text-xs text-subtle max-w-md leading-relaxed">
            Prapsico Educacional — Em parceria com a Anhanguera Educacional. Cursos reconhecidos pelo MEC.
          </p>
          <div className="flex flex-col items-center md:items-end gap-1 text-xs text-subtle">
            <a
              href="https://wa.me/5535992571045?text=Ol%C3%A1+Prapsico%21+Vim+pelo+site."
              className="hover:text-cyan transition"
            >
              WhatsApp · (35) 99257-1045
            </a>
            <span>contato@prapsico.com.br</span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-subtle">
          © {new Date().getFullYear()} Prapsico × Anhanguera. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
