import Section from '@/components/Section';
import type { GitHubRepo } from '@/lib/github';
import { projects } from '@/lib/content';

interface Props {
  repos: GitHubRepo[];
}

export default function Work({ repos }: Props) {
  const repoByName = new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]));

  return (
    <Section
      id="work"
      index="03 — Selected work"
      title={
        <>
          Shipped &{' '}
          <span className="font-serif font-normal italic text-[#39d353]">shipping</span>
        </>
      }
      intro="A few things I'm proud of — some live, some still cooking. Stars and languages come straight from GitHub."
    >
      <div className="border-b border-white/10">
        {projects.map((project, index) => {
          const repo = project.repoName
            ? repoByName.get(project.repoName.toLowerCase())
            : undefined;
          const language = repo?.language;
          const stars = repo?.stargazers_count ?? 0;

          return (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${index * 60}ms` }}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t border-white/10 px-2 py-7 transition-colors duration-300 hover:bg-[#39d353] hover:text-[#08090a] md:grid-cols-[3.5rem_1fr_auto_auto] md:items-center md:gap-8 md:px-4 md:py-9"
            >
              <span className="font-mono text-xs text-[#5b6167] transition-colors group-hover:text-[#08090a]/60 md:text-sm">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div>
                <h3 className="flex items-center gap-3 text-2xl font-semibold tracking-tight md:text-4xl">
                  {project.name}
                  <span
                    aria-hidden="true"
                    className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                  {project.live && (
                    <span className="hidden font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-[#39d353] transition-colors group-hover:text-[#08090a]/60 sm:inline">
                      live
                    </span>
                  )}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9a9fa5] transition-colors group-hover:text-[#08090a]/70 md:text-base">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap items-center gap-2">
                  {language && (
                    <li className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#9a9fa5] transition-colors group-hover:border-black/20 group-hover:text-[#08090a]/70">
                      {language}
                    </li>
                  )}
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#9a9fa5] transition-colors group-hover:border-black/20 group-hover:text-[#08090a]/70"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              {stars > 0 ? (
                <span className="hidden font-mono text-xs text-[#5b6167] transition-colors group-hover:text-[#08090a]/60 md:block">
                  ★ {stars}
                </span>
              ) : (
                <span className="hidden md:block" />
              )}

              <span className="font-mono text-xs text-[#5b6167] transition-colors group-hover:text-[#08090a]/60 md:text-sm">
                {project.year}
              </span>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
