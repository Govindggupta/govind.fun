import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#39d353]">
          404 — Lost in the void
        </p>
        <h1 className="mt-6 text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em]">
          Nothing{' '}
          <span className="font-mono font-normal italic text-[0.85em] text-[#39d353]">
            here
          </span>
        </h1>
        <p className="mt-6 text-[#9a9fa5]">
          This page doesn&apos;t exist. The homepage does, though.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-[#39d353] px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#08090a] transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}
