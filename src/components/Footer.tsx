export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-white">PERSIMMON QUEST</p>
          <p className="mt-2 text-xs text-zinc-400">Deeptech infrastructure for future-ready nursing homes.</p>
        </div>
        <div className="flex items-center gap-5 text-xs text-zinc-300">
          <a href="#" className="transition hover:text-persimmon">
            Technical Whitepapers
          </a>
          <a href="#" className="transition hover:text-persimmon">
            Compliance Documentation
          </a>
          <a href="mailto:founder@persimmon.quest" className="transition hover:text-persimmon">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
