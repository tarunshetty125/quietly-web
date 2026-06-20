export function V2Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 px-6 md:px-28">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-white flex items-center justify-center">
            <span className="text-black text-[10px] font-bold">Q</span>
          </div>
          <span className="text-sm font-medium text-white/60">Quietly AI</span>
        </div>

        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Support"].map((link) => (
            <a key={link} href="#" className="text-xs text-[hsl(0_0%_40%)] hover:text-white/70 transition-colors">
              {link}
            </a>
          ))}
        </div>

        <p className="text-xs text-[hsl(0_0%_30%)]">
          © {new Date().getFullYear()} Quietly AI
        </p>
      </div>
    </footer>
  );
}
