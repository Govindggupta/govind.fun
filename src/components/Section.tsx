import type { ReactNode } from 'react';

interface Props {
  id: string;
  index: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, index, title, intro, children, className }: Props) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-36 lg:px-12 ${className ?? ''}`}
    >
      <header className="mb-14 md:mb-20" data-reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#39d353]">
          {index}
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9a9fa5] md:text-lg">
            {intro}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}
