export function HeaderLive() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-navy-950/95 backdrop-blur border-b border-white/5">
      <div className="container-lp py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-base md:text-lg tracking-wider text-ink">ANHANGUERA</span>
          <div className="h-6 w-px bg-white/10" />
          <span className="font-bold text-base md:text-lg tracking-wider text-cyan">PRAPSICO</span>
        </div>
        <span className="hidden md:inline text-xs text-subtle tracking-[0.18em]">EM PARCERIA</span>
      </div>
    </header>
  );
}
