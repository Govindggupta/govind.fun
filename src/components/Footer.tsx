import { site } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5b6167] sm:flex-row sm:px-8 lg:px-12">
        <p>© 2026 {site.name} — {site.location}</p>
        <p>
          Built with Next.js ·{' '}
          <a
            href={site.source}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#39d353]"
          >
            Source ↗
          </a>
        </p>
        <a href="#top" className="transition-colors hover:text-[#39d353]">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
