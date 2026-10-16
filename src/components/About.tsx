import Section from '@/components/Section';
import LocalClock from '@/components/LocalClock';
import type { GitHubUser } from '@/lib/github';
import { aboutLead, aboutParagraphs, site } from '@/lib/content';

interface Props {
  user: GitHubUser;
}

export default function About({ user }: Props) {
  const facts: Array<{ label: string; value: React.ReactNode }> = [
    { label: 'Role', value: site.role },
    { label: 'Location', value: user.location || site.location },
    { label: 'Local time', value: <LocalClock /> },
    {
      label: 'Email',
      value: (
        <a
          href={`mailto:${site.email}`}
          className="transition-colors hover:text-[#39d353]"
        >
          {site.email}
        </a>
      ),
    },
    { label: 'Pronouns', value: site.pronouns },
    {
      label: 'Status',
      value: (
        <span className="text-[#39d353]">Open to work — internships & collabs</span>
      ),
    },
  ];

  return (
    <Section
      id="about"
      index="01 — About"
      title={
        <>
          A developer in the making,{' '}
          <span className="font-serif font-normal italic text-[#39d353]">
            since 2022
          </span>
        </>
      }
    >
      <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div>
          <p
            className="text-2xl leading-snug tracking-[-0.01em] text-[#ededea] md:text-3xl"
            data-reveal
          >
            {aboutLead}
          </p>
          <div className="mt-10 space-y-6">
            {aboutParagraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${index * 60}ms` }}
                className="max-w-2xl leading-relaxed text-[#9a9fa5]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Quick facts card */}
        <aside data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
          <div data-parallax="-0.05" className="rounded-2xl border border-white/10 bg-[#0d0f11] p-7 lg:sticky lg:top-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#39d353]">
              Quick facts
            </p>
            <dl className="mt-6 space-y-5">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#5b6167]">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-[#ededea]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </Section>
  );
}
