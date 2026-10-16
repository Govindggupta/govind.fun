import Section from '@/components/Section';
import { capabilities } from '@/lib/content';

export default function Capabilities() {
  return (
    <Section
      id="capabilities"
      index="02 — What I do"
      title={
        <>
          Things I{' '}
          <span className="font-serif font-normal italic text-[#39d353]">build</span>
        </>
      }
      intro="Four lanes, one philosophy: understand the invisible layer, then make it useful."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {capabilities.map((capability, index) => (
          <article
            key={capability.title}
            data-reveal
            style={{ ['--reveal-delay' as string]: `${index * 80}ms` }}
            className="group rounded-2xl border border-white/10 bg-[#0d0f11] p-7 transition-colors duration-300 hover:border-[#39d353]/50 md:p-9"
          >
            <p className="font-mono text-[11px] tracking-[0.3em] text-[#5b6167] transition-colors group-hover:text-[#39d353]">
              0{index + 1}
            </p>
            <h3 className="mt-5 text-xl font-semibold tracking-tight md:text-2xl">
              {capability.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#9a9fa5]">
              {capability.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {capability.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#9a9fa5]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
