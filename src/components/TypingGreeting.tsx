'use client';

import { useEffect, useState } from 'react';

const FULL_TEXT = "Hi, I'm Govind Gupta ✌️";
const CHARACTERS = Array.from(FULL_TEXT);
const TYPE_INTERVAL_MS = 100;

export default function TypingGreeting({
  href,
  className = 'text-2xl md:text-3xl font-mono text-[#808080]',
}: {
  href: string;
  className?: string;
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    // Respect users who prefer reduced motion: show the full text instantly.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // One-shot update on mount — not a render loop, so the set-state-in-effect
      // heuristic is safe to silence here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibleCount(CHARACTERS.length);
      return;
    }

    const interval = setInterval(() => {
      setVisibleCount((count) => {
        if (count + 1 >= CHARACTERS.length) {
          clearInterval(interval);
          return CHARACTERS.length;
        }
        return count + 1;
      });
    }, TYPE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className={`font-mono ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[#58a6ff] transition-colors"
      >
        {/* Full text for screen readers, crawlers and no-JS visitors; the
            visible copy is typed out by the animation. */}
        <span className="sr-only">{FULL_TEXT}</span>
        <span aria-hidden="true">
          {CHARACTERS.slice(0, visibleCount).join('')}
          <span className="animate-pulse motion-reduce:animate-none">|</span>
        </span>
      </a>
    </p>
  );
}
