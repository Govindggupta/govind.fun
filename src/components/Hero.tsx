import Image from 'next/image';
import Marquee from '@/components/Marquee';
import TypingGreeting from '@/components/TypingGreeting';
import type { GitHubUser } from '@/lib/github';
import { site, stackMarquee } from '@/lib/content';

interface Props {
  user: GitHubUser;
}

export default function Hero({ user }: Props) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-16"
    >
      {/* Parallax backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          data-parallax="-0.06"
          className="hero-grid absolute inset-[-15%]"
        />
        <div
          data-parallax="-0.22"
          className="absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-[#39d353]/12 blur-[130px]"
        />
        <div
          data-parallax="-0.14"
          className="absolute -right-40 top-1/2 h-[28rem] w-[28rem] rounded-full bg-[#39d353]/8 blur-[120px]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-5 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-14 py-16 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
          {/* Copy */}
          <div>
            <div data-reveal>
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-[#9a9fa5]">
                <span className="text-[#39d353]">{'//'}</span> Full Stack Developer — Surat, India
              </p>
            </div>

            <div data-reveal style={{ ['--reveal-delay' as string]: '80ms' }}>
              <h1
                data-parallax="-0.1"
                className="mt-6 text-[clamp(3.4rem,13vw,11rem)] font-bold leading-[0.85] tracking-[-0.04em]"
              >
                GOVIND
                <br />
                <span className="font-serif font-normal italic text-[#39d353]">
                  Gupta
                </span>
              </h1>
            </div>

            <div data-reveal style={{ ['--reveal-delay' as string]: '160ms' }}>
              <div className="mt-8">
                <TypingGreeting
                  className="text-sm text-[#9a9fa5] md:text-base"
                  href={site.github}
                />
              </div>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#9a9fa5] md:text-lg">
                I build real-time systems and AI-powered products — and I&apos;m
                genuinely obsessed with the invisible layer underneath.
              </p>
            </div>

            <div
              data-reveal
              style={{ ['--reveal-delay' as string]: '240ms' }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#work"
                className="rounded-full bg-[#39d353] px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#08090a] transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              >
                View selected work ↓
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-[#ededea] transition-colors hover:border-[#39d353] hover:text-[#39d353]"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Portrait */}
          <div data-reveal style={{ ['--reveal-delay' as string]: '320ms' }}>
            <div data-parallax="-0.16" className="relative mx-auto w-56 md:w-72">
              <div className="rotate-2 rounded-3xl border border-white/10 bg-[#0d0f11] p-3 shadow-[0_30px_80px_-20px_rgba(57,211,83,0.25)] transition-transform duration-500 hover:rotate-0">
                <Image
                  src={user.avatar_url}
                  alt={site.name}
                  width={280}
                  height={280}
                  priority
                  className="w-full rounded-2xl"
                />
                <div className="flex items-center justify-between px-1 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5b6167]">
                  <span>@{user.login}</span>
                  <span>{site.pronouns}</span>
                </div>
              </div>
              <span className="absolute -right-3 -top-3 rounded-full bg-[#39d353] px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#08090a] shadow-lg">
                Open to work
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 border-t border-white/5">
        <p className="sr-only">Technologies I work with</p>
        <Marquee
          items={stackMarquee}
          duration="40s"
          className="py-4 font-mono text-xs uppercase tracking-[0.3em] text-[#9a9fa5]"
        />
      </div>
    </section>
  );
}
