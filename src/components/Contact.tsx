import { site } from '@/lib/content';

const socials = [
  { label: 'GitHub', href: site.github },
  { label: 'LinkedIn', href: site.linkedin },
  { label: 'X / Twitter', href: site.twitter },
  { label: 'Discord', href: site.discord },
  { label: 'Blog', href: site.blog },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 px-5 py-28 sm:px-8 md:py-44 lg:px-12"
    >
      <div
        aria-hidden="true"
        data-parallax="-0.1"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39d353]/8 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#39d353]"
          data-reveal
        >
          05 — Contact
        </p>

        <h2
          data-reveal
          style={{ ['--reveal-delay' as string]: '80ms' }}
          className="mx-auto mt-6 max-w-5xl text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em]"
        >
          LET&apos;S BUILD
          <br />
          SOMETHING{' '}
          <span className="font-mono font-normal italic text-[0.85em] text-[#39d353]">
            great
          </span>
        </h2>

        <p
          data-reveal
          style={{ ['--reveal-delay' as string]: '160ms' }}
          className="mx-auto mt-8 max-w-xl leading-relaxed text-[#9a9fa5]"
        >
          Open to internships, collaborations and anything interesting. The
          fastest way to reach me is email — I usually reply within a day.
        </p>

        <div
          data-reveal
          style={{ ['--reveal-delay' as string]: '240ms' }}
          className="mt-12"
        >
          <a
            href={`mailto:${site.email}`}
            className="inline-block rounded-full bg-[#39d353] px-9 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#08090a] transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 md:px-12 md:py-5 md:text-sm"
          >
            {site.email} ↗
          </a>
        </div>

        <ul
          data-reveal
          style={{ ['--reveal-delay' as string]: '320ms' }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.25em] text-[#9a9fa5] transition-colors hover:text-[#39d353]"
              >
                {social.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
