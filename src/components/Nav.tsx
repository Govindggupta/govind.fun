import { navLinks, site } from '@/lib/content';

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#08090a]/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="font-mono text-lg font-semibold tracking-tight"
          aria-label="Back to top"
        >
          gg<span className="text-[#39d353]">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.2em] text-[#9a9fa5] transition-colors hover:text-[#ededea]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#9a9fa5] sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39d353] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#39d353]" />
            </span>
            Open to work
          </span>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.2em] text-[#9a9fa5] transition-colors hover:text-[#39d353]"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
