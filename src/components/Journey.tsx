import Section from '@/components/Section';
import ContributionCalendar from '@/components/ContributionCalendar';
import type { Contribution } from '@/lib/github';
import { timeline } from '@/lib/content';

interface Props {
  contributions: Contribution[];
  totalContributions: number | null;
  repoCount: number;
  totalStars: number;
  followers: number;
}

export default function Journey({
  contributions,
  totalContributions,
  repoCount,
  totalStars,
  followers,
}: Props) {
  const stats = [
    { value: totalContributions ?? '—', label: 'contributions / year' },
    { value: repoCount, label: 'public repos' },
    { value: totalStars, label: 'stars earned' },
    { value: followers, label: 'followers' },
  ];

  return (
    <Section
      id="journey"
      index="04 — Journey"
      title={
        <>
          The road{' '}
          <span className="font-mono font-normal italic text-[0.85em] text-[#39d353]">
            so far
          </span>
        </>
      }
      intro="Everything below is pulled from my GitHub at build time — numbers, calendar, the lot. No vanity metrics, just receipts."
    >
      {/* Stats */}
      <div
        data-reveal
        className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#08090a] p-6 md:p-8">
            <p className="font-mono text-4xl tracking-tight text-[#39d353] md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9a9fa5]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Contribution calendar */}
      <div
        data-reveal
        style={{ ['--reveal-delay' as string]: '80ms' }}
        className="mt-6 rounded-2xl border border-white/10 bg-[#0d0f11] p-6 md:p-9"
      >
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">
            Last 12 months on GitHub
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5b6167]">
            hover a square for the day
          </p>
        </div>
        <ContributionCalendar contributions={contributions} total={totalContributions} />
      </div>

      {/* Timeline */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl" data-reveal>
          Milestones,{' '}
          <span className="font-mono font-normal italic text-[0.85em] text-[#39d353]">
            loosely ordered
          </span>
        </h3>
        <ol className="border-l border-white/10">
          {timeline.map((milestone, index) => (
            <li
              key={milestone.year}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${index * 70}ms` }}
              className="group relative grid gap-1 pb-10 pl-8 last:pb-0 md:grid-cols-[6rem_1fr] md:gap-6"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full bg-[#5b6167] transition-colors group-hover:bg-[#39d353]"
              />
              <span className="font-mono text-sm text-[#39d353]">{milestone.year}</span>
              <p className="leading-relaxed text-[#9a9fa5]">{milestone.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
